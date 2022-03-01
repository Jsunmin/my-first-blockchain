import {MigrationInterface, QueryRunner} from "typeorm";

export class updateInputLongText1646107771102 implements MigrationInterface {
    name = 'updateInputLongText1646107771102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`input\` longtext NOT NULL COMMENT '트랜잭션에 추가 전송한 데이터'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`ethereumTransactions\` ADD \`input\` text NOT NULL COMMENT '트랜잭션에 추가 전송한 데이터'`);
    }

}
