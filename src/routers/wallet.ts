import express, { NextFunction, Request, Response } from 'express';
import {ethers} from 'ethers';
import {WalletEntity} from '../entities';
import AuthService from '../services/auth.service';
import {ethereum} from '../helper/web3';
import {BadRequest} from '../httpError';

const router = express.Router();

// 지갑 생성 (니모닉 월렛형 데이터 저장 및 지갑주소 리턴)
router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  const {username, password} = req.body;
  if (!username) {
    return next(new BadRequest('username이 없습니다.'))
  } else if (!password) {
    return next(new BadRequest('password가 없습니다.'))
  }

  try {
    const existedUsername = await WalletEntity.count({where: {username}});
    if (existedUsername) {
      return next(new BadRequest('이미 존재하는 계정입니다.'))
    }

    const walletInfo = ethers.Wallet.createRandom();
    const mnemonic = walletInfo.mnemonic.phrase;

    const {encryptedPassword, salt} = AuthService.createEncryptedPasswordAndSalt(password);

    const wallet = WalletEntity.create({
      username,
      password: encryptedPassword,
      salt,
      praivateKey: walletInfo.privateKey,
      account: walletInfo.address,
    });
    await wallet.save();

    res.send({ mnemonic });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

// 지갑 로그인
router.post('/login', async function(req: Request, res: Response, next: NextFunction) {
  const {username, password} = req.body;
  if (!username) {
    return next(new BadRequest('username이 없습니다.'))
  } else if (!password) {
    return next(new BadRequest('password가 없습니다.'))
  }

  try {
    const wallet = await WalletEntity.findOne({where: {username}});
    if (!wallet) {
      return next(new BadRequest('존재하지 않는 계정입니다.'))
    }
    
    const correctPassword = AuthService.comparePassword(password, wallet.password, wallet.salt);
    if (!correctPassword) {
      return next(new BadRequest('비밀번호가 다릅니다.'))
    }

    wallet.balance = await ethereum.getBalance(wallet.account);
    wallet.salt = '';
    wallet.password = '';
    wallet.praivateKey = '';

    res.send({ wallet });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

// 니모닉으로 계정 찾아 비밀번호 변경
router.post('/find', async function(req: Request, res: Response, next: NextFunction) {
  const {mnemonic, passwordToChange} = req.body;
  if (!mnemonic) {
    return next(new BadRequest('니모닉이 없습니다.'))
  } else if (mnemonic.split(' ').length !== 12) {
    return next(new BadRequest('잘못된 형식의 니모닉입니다.'))
  } else if (!passwordToChange) {
    return next(new BadRequest('변경할 비밀번호가 없습니다.'))
  }

  try {
    const walletInfo = ethers.Wallet.fromMnemonic(mnemonic);

    const wallet = await WalletEntity.findOne({
      where: {praivateKey: walletInfo.privateKey}
    });
    if (!wallet) {
      return next(new BadRequest('잘못된 니모닉입니다.'))
    }

    const {encryptedPassword, salt} = AuthService.createEncryptedPasswordAndSalt(passwordToChange);
    wallet.password = encryptedPassword;
    wallet.salt = salt;
    await wallet.save();

    res.send({ username: wallet.username });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});


export default router;
