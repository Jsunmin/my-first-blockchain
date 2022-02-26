import { BlockTransactionString } from 'web3-eth';
import {EthereumBlock} from '../src/entities';
import {sleep} from './utils';
import {ethereum} from './web3';

export default async function main() {
  let startBlockNumber = 0;
  // db 데이터부터 다시 시작
  const latestBlockInDb = await EthereumBlock.find({
    order: {id : 'DESC'},
    take: 1,
  })
  if (latestBlockInDb && latestBlockInDb[0]) {
    startBlockNumber = latestBlockInDb[0].number + 1;
  }

  while (1) {
    console.log(`start block scraping from ${startBlockNumber}`);

    let targetBlock: undefined | BlockTransactionString;
    try {
      targetBlock = await ethereum.getBlock(startBlockNumber);
    } catch (err) {
      if (err.data === null) {
        console.log(startBlockNumber, 'block empty!')
        break;
      }
      console.error(`blockNumber: ${startBlockNumber} ) : can not get blockinfo from network`);
      throw new Error(err);
    }

    try {
      if (!targetBlock) {
        console.log(`blockNumber: ${startBlockNumber} ) : noblockData`);
        break;
      }
      await sleep(100);
      const blockForDb = EthereumBlock.create({
        difficulty: String(targetBlock.difficulty),
        extraData: targetBlock.extraData,
        gasLimit: targetBlock.gasLimit,
        gasUsed: targetBlock.gasUsed,
        hash: targetBlock.hash,
        logsBloom: targetBlock.logsBloom,
        miner: targetBlock.miner,
        mixHash: (targetBlock as any).mixHash,
        nonce: targetBlock.nonce,
        number: targetBlock.number,
        parentHash: targetBlock.parentHash,
        receiptsRoot: targetBlock.receiptsRoot,
        sha3Uncles: targetBlock.sha3Uncles,
        size: targetBlock.size,
        stateRoot: targetBlock.stateRoot,
        timestamp: (targetBlock as any).timestamp,
        totalDifficulty: String(targetBlock.totalDifficulty),
        transactions: targetBlock.transactions,
        transactionsRoot: (targetBlock as any).transactionsRoot,
        uncles: targetBlock.uncles,
        createdAt: (targetBlock as any).createdAt,
      })
      await EthereumBlock.save(blockForDb);

      startBlockNumber++;
    } catch (err) {
      console.error(`blockNumber: ${startBlockNumber} )`, err);
      throw new Error(err);
    }
  }

  return 1;
}
