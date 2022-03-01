import _ from 'lodash';
import {getConnection} from 'typeorm';
import {EthereumTransaction, EthereumBlock} from '../src/entities';
import {sleep} from './utils';
import {ethereum, web3} from './web3';

export default async function main() {
  let startBlockNumber = 14288330;
  // db 데이터부터 다시 시작
  const [latestTransactionInDb] = await EthereumTransaction.find({
    order: {id : 'DESC'},
    take: 1,
  })
  if (latestTransactionInDb && latestTransactionInDb && latestTransactionInDb?.blockNumber) {
    startBlockNumber = latestTransactionInDb.blockNumber;
  }
  
  while (1) {
    const targetBlock = await EthereumBlock.findOne({where: {number: startBlockNumber}});
    if (!targetBlock) {
      console.log(startBlockNumber, 'block empty!')
      break;
    }
    
    const {transactions} = targetBlock;
    
    // 데이터 존재하는 다음부터 스크랩핑 시작
    const targetIndex = transactions.findIndex((txId) => {
      if (latestTransactionInDb && txId === latestTransactionInDb.hash) {
        return true;
      }
    })
    
    let tartgetTransactionIds = transactions;
    if (targetIndex > -1) {
      tartgetTransactionIds = transactions.slice(targetIndex + 1)
    }
    
    console.log(`start transaction scraping from block: ${startBlockNumber}, TransactionIndex: ${(targetIndex === -1) ? 0 : targetIndex}`);
    // 하나의 노에는 300ms 쓰로틀링 주고, 10개씩 처리하는게 call limit 인 듯!
    const chunkedTrxIds = _.chunk(tartgetTransactionIds, 10)
    try {
      for await (const transactionIds of chunkedTrxIds) {
        const promises = _.map(transactionIds, trxId => ethereum.getTransaction(trxId));
        const transactions = await Promise.all(promises);
        
        const transactionsForDb: EthereumTransaction[] = _.map(transactions, transaction => {
          // let inputString;
          // if (transaction && transaction.input) {
          //   inputString = web3.utils.hexToString(transaction.input);
          // }

          return EthereumTransaction.create({
            blockHash: transaction.blockHash,
            blockNumber: transaction.blockNumber,
            transactionIndex: transaction.transactionIndex,
            from: transaction.from,
            to: transaction.to,
            value: transaction.value,
            gas: transaction.gas,
            gasPrice: transaction.gasPrice,
            hash: transaction.hash,
            input: transaction.input,
            r: (transaction as any).r,
            s: (transaction as any).s,
            v: (transaction as any).v,
            nonce: transaction.nonce,
            type: (transaction as any).type,
            createdAt: (transaction as any).createdAt,
          })
        })
        await bulkInsertWithTypeorm(transactionsForDb);
        
        await sleep(100);
      }
      
      startBlockNumber++;
    } catch (err) {
      console.error(`blockNumber: ${startBlockNumber} )`, err);
      throw new Error(err);
    }
  }
  
  return 1;
}

async function bulkInsertWithTypeorm(entities: EthereumTransaction[]) {
  const dbConnection = getConnection();
  await dbConnection
  .createQueryBuilder()
  .insert()
  .into(EthereumTransaction)
  .values(entities)
  .execute();
}