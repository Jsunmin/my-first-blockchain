import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, Index} from 'typeorm';
import {EthTransaction} from '../types/transaction';

@Index('blockNumberIndex', ['blockNumber'])
@Index('hashIndex', ['hash'])
@Entity({name: 'ethereumTransactions'})
export class EthereumTransaction extends BaseEntity implements EthTransaction {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column({type: 'varchar', nullable: true, comment: '트랜잭션 위치 블록 해시'})
  blockHash: string | null;

  @Column('int', {nullable: true, comment: '트랜잭션 위치 블록 번호'})
  blockNumber: number | null;

  @Column('int', {nullable: true, comment: '블록내 트랜잭션 위치 (배열 인덱스)'})
  transactionIndex: number | null;

  @Column({type: 'varchar', comment: '송신 주소'})
  from: string;

  @Column({type: 'varchar', nullable: true, comment: '수신 주소'})
  to: string | null;

  @Column({type: 'varchar', comment: '송신금액 (wei)'})
  value: string;

  @Column('int', {comment: 'gas 소비량'})
  gas: number;

  @Column({type: 'varchar', comment: 'gas 가격 (wei)'})
  gasPrice: string;
  
  @Column({type: 'varchar', comment: '트랜잭션 해시'})
  hash: string;
  
  @Column({type: 'longtext', comment: '트랜잭션에 추가 전송한 데이터'})
  input: string;

  @Column({type: 'varchar', comment: '트랜잭션 시그니처 1'})
  r: string;

  @Column({type: 'varchar', comment: '트랜잭션 시그니처 2'})
  s: string;

  @Column({type: 'varchar', comment: '트랜잭션 시그니처 3'})
  v: string;
  
  // 거래 중복방지와 순서를 지키게끔한다!
  @Column('int', {comment: '트랜잭션 할당 번호 (중복거래 방지, ++, 순서대로 처리)'})
  nonce: number;

  @Column('varchar', {comment: '트랜잭션 타입'})
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
