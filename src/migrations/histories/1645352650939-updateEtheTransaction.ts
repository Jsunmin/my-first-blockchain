import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEtheTransaction1645352650939 implements MigrationInterface {
    name = 'updateEtheTransaction1645352650939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`blockHash\` \`blockHash\` varchar(255) NULL COMMENT '트랜잭션 위치 블록 해시'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`blockNumber\` \`blockNumber\` int NULL COMMENT '트랜잭션 위치 블록 번호'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`transactionIndex\` \`transactionIndex\` int NULL COMMENT '블록내 트랜잭션 위치 (배열 인덱스)'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`to\` \`to\` varchar(255) NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`value\` varchar(255) NOT NULL COMMENT '송신금액 (wei)'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`gasPrice\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`gasPrice\` varchar(255) NOT NULL COMMENT 'gas 가격 (wei)'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`gasPrice\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`gasPrice\` int NOT NULL COMMENT 'gas 가격 (wei)'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`value\` int NOT NULL COMMENT '송신금액 (wei)'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`to\` \`to\` varchar(255) NOT NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`transactionIndex\` \`transactionIndex\` int NOT NULL COMMENT '블록내 트랜잭션 위치 (배열 인덱스)'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`blockNumber\` \`blockNumber\` int NOT NULL COMMENT '트랜잭션 위치 블록 번호'`);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` CHANGE \`blockHash\` \`blockHash\` varchar(255) NOT NULL COMMENT '트랜잭션 위치 블록 해시'`);
    }

}
