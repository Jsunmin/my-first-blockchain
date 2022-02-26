import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { EthereumBlock } from '../entities/block.entity';
import { EthereumTransaction } from '../entities/transaction.entity';
import {ethereum, web3} from '../helper/web3';

const router = express.Router();

router.get('/network', async function(req: Request, res: Response, next: NextFunction) {
  const addresses = await ethereum.getAccounts();
  const chainId = await ethereum.getChainId();
  const node = await ethereum.getNodeInfo();

  const blockNumber = await ethereum.getBlockNumber();

  const currentBlock = await ethereum.getBlock(blockNumber);
  // const blockPromises: Promise<any>[] = [];
  // for (let i = 0; i <= blockNumber; i++) {
  //   blockPromises.push(ethereum.getBlock(i));
  // }
  // const blocks = await Promise.all(blockPromises);

  res.send({ chainId, addresses, node, currentBlock });
});

router.get('/transactions', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const addresses = await ethereum.getAccounts();
    const address1 = addresses[0];
    const address2 = addresses[1];
    const address3 = addresses[2];

    const sendValue = setEthToWei('2');
    const sendData = web3.utils.toHex('thisIsTest');
    const gas = setEthToWei('0.00000000002');
    console.log(sendData, gas)
    const transactions = await Promise.all([
      ethereum.sendTransaction({
        from: address1,
        to: address2,
        value: sendValue,
        data: sendData,
        gas,
        chainId: 1337,
        // gasPrice: 2000000000,
      }),
      ethereum.sendTransaction({
        from: address2,
        to: address3,
        value: sendValue,
        data: sendData,
        gas,
        chainId: 1337,
        // gasPrice: 2000000000,
      }),
    ]);
    const balance1 = await ethereum.getBalance(address1);
    const balance2 = await ethereum.getBalance(address2);
    const balance3 = await ethereum.getBalance(address3);

    res.send({
      transactions,
      address1,
      address2,
      address3,
      balance1: setWeiToEth(balance1),
      balance2: setWeiToEth(balance2),
      balance3: setWeiToEth(balance3),
    });
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

router.get('/blocks/:id', async function(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    throw new Error('No Block ID');
  }
  const blockId = id as string;
  const block = await ethereum.getBlock(blockId);
  console.log(block)
  res.send({ block });
});

router.get('/blocks/:id/save', async function(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    throw new Error('No Block ID');
  }
  const blockId = id as string;
  const etheBlock = await ethereum.getBlock(blockId);

  const ethereumBlock = EthereumBlock.create({
    ...etheBlock,
    difficulty: String(etheBlock.difficulty),
    totalDifficulty: String(etheBlock.totalDifficulty),
    timestamp: String(etheBlock.timestamp),
  });
  const savedBlock = await ethereumBlock.save();
  res.send({ transaction: savedBlock });
});

router.get('/transactions/:id', async function(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    throw new Error('No TXID');
  }
  const transactionId = id as string;
  const transaction = await ethereum.getTransaction(transactionId);

  let inputString;
  if (transaction && transaction.input) {
    inputString = web3.utils.hexToString(transaction.input);

  }
  console.log(transaction, inputString, '!')
  res.send({ transaction });
});

router.get('/transactions/:id/save', async function(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if (!id) {
    throw new Error('No TXID');
  }
  const transactionId = id as string;
  const etheTransaction = await ethereum.getTransaction(transactionId);

  const ethereumTransaction = EthereumTransaction.create({
    ...etheTransaction,
    input: etheTransaction.input && web3.utils.hexToString(etheTransaction.input),
  });
  const savedTransaction = await ethereumTransaction.save();
  res.send({ transaction: savedTransaction });
});

export default router;

function setWeiToEth(value: string) {
  return web3.utils.fromWei(value);
}

function setEthToWei(value: string) {
  return web3.utils.toWei(value);
}