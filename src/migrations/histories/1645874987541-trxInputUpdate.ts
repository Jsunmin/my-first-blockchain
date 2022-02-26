import {MigrationInterface, QueryRunner} from "typeorm";

export class trxInputUpdate1645874987541 implements MigrationInterface {
    name = 'trxInputUpdate1645874987541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`input\` text NOT NULL COMMENT '트랜잭션에 추가 전송한 데이터'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`input\` varchar(255) NOT NULL COMMENT '트랜잭션에 추가 전송한 데이터'`);
    }

}
