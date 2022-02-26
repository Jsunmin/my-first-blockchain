import express from 'express';
import { NextFunction, Request, Response } from 'express';
import {ethereum, web3} from '../helper/web3';

const router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('healthcheck');
});

router.get('/web3', async function(req: Request, res: Response, next: NextFunction) {
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

router.get('/web3/transaction', async function(req: Request, res: Response, next: NextFunction) {
  const transactionId = '0xb3f75349446954df8b4f397082c9ac5236a2683db3c2266aa232c709e9790363';
  const transaction = await ethereum.getTransaction(transactionId);
  const inputString = web3.utils.hexToString(transaction.input);
  console.log(inputString)
  res.send({ transaction });
});

router.get('/web3/subscribe', async function(req: Request, res: Response, next: NextFunction) {
  const sub = ethereum.subscribe('syncing', (error, result) => {
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(result)
  });
  sub.on('data', (data) => { console.log('data', data) });
  sub.on('connected', (data) => { console.log('connected', data) });
  sub.on('error', (data) => { console.log('error', data) });
  sub.on('changed', (data) => { console.log('changed', data) });
  const isSyncing = await ethereum.isSyncing();
  res.send({ isSyncing });
});

router.get('/web3/network', async function(req: Request, res: Response, next: NextFunction) {
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

/*
{
  transaction: {
    type: 2,
    hash: "0x89845677f67cde76529f9f362ae3fd3692a9a3bf27d66fd40bc17c1bbb04dcdc",
    chainId: "0x539",
    nonce: 0,
    blockHash: "0x7db4ea0d5d4f8edb4ac7d9628aefac836e8463d7718bfe34039199771e144ef1",
    blockNumber: 1,
    transactionIndex: 0,
    from: "0x79fC9168FEC6b3258D5ce883C324eB7EB367E27F",
    to: "0x74930F1a9EB9791fE8b5083ECddf9b8fa8549DFD",
    value: "1000000000000000000",
    maxPriorityFeePerGas: "2500000000",
    maxFeePerGas: "4500000000",
    gasPrice: "3375000000",
    gas: 20000000,
    input: "0x74686973497354657374",
    accessList: [ ],
    v: "0x0",
    r: "0xb4feac86bd6d95e333fcefc1ebabdb2437759c893cc9f5b3c1ec7bdda52aedb6",
    s: "0x40340e13fb8f7e813e0b365182f0d37d6225a65872e87ad7529d72d400d1c5b2"
  }
}
  - v, r, s are the values for the transaction's signature
  - hash: TXID
  - chainId: 네트워크 아이디
  - input: 트랜잭션 생성시 보내는 데터
 */

export default router;

function setWeiToEth(value: string) {
  return web3.utils.fromWei(value);
}

function setEthToWei(value: string) {
  return web3.utils.toWei(value);
}