import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import {EthBlock} from '../types/block';

@Entity({name: 'ethereumBlcocks'})
export class EthereumBlock implements EthBlock {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('int', {comment: '채굴 난이도'})
  difficulty: number;

  @Column('varchar', {comment: '채굴 난이도'})
  extraData: string;

  @Column('int', {comment: '블록에서 사용할 수 있는 가스 최대크기'})
  gasLimit: number;

  @Column('int', {comment: '블록에서의 가스 사용량'})
  gasUsed: number;

  @Column('varchar', {comment: '블록해시'})
  hash: string;

  // 블룸필터: 블록에 특정 정보있는지 요청하면서, 익명성 보장하며 데이터 겟
  @Column('varchar', {comment: '데이터 요청때 쓰이는 블룸필터용 데이터'})
  logsBloom: string;

  @Column('varchar', {comment: '블록 채굴한 마이너 주소 (보상겟)'})
  miner: string;

  @Column('varchar', {comment: '블록 채굴 검증 데이터1'})
  mixHash: string;

  @Column('varchar', {comment: '블록 채굴 검증 데이터2'})
  nonce: string;

  @Column('int', {comment: '블록 번호: genesis(0)++'})
  number: number;

  @Column('varchar', {comment: '체이닝한 이전블록 해시'})
  parentHash: string;

  @Column('varchar', {comment: '거래정보 루트해시 (3state)'})
  receiptsRoot: string;

  // TODO
  @Column('varchar', {comment: '블록의 엉클블록들 해시'})
  sha3Uncles: string;

  @Column('int', {comment: '블록 크기'})
  size: number;

  @Column('varchar', {comment: '블록상태 루트해시 (3state)'})
  stateRoot: string;

  @Column('int', {comment: '블록 생성날짜'})
  timestamp: number;

  @Column('int', {comment: '전블록과 현블록의 난이도합'})
  totalDifficulty: number;

  @Column('int', {comment: '블록에 담긴 트랜잭션들'})
  transactions: string[];

  @Column('varchar', {comment: '트랜잭션 루트해시 (3state)'})
  transactionsRoot: string;

  @Column('simple-array', {comment: '엉클블록들 해시'})
  uncles: string[];

  @CreateDateColumn()
  createdAt: Date;
}
