import {Column, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, Index} from 'typeorm';

@Index('usernameIndex', ['username'])
@Index('accountIndex', ['account'])
@Entity({name: 'wallets'})
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('varchar', {length: 50, unique: true, comment: '로그인 아이디'})
  username: string;

  @Column('varchar', {comment: '로그인 비밀번호'})
  password: string;

  @Column('varchar', {length: 50, comment: '비밀번호 암호화 솔트'})
  salt: string;

  @Column('varchar', {comment: '지갑 pk'})
  praivateKey: string;

  @Column('varchar', {comment: '퍼블릭 키로 만든 주소'})
  account: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 계정 잔액
  balance?: string;
}
