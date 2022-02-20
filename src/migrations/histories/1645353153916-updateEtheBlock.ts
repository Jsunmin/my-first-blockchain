import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEtheBlock1645353153916 implements MigrationInterface {
    name = 'updateEtheBlock1645353153916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`timestamp\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`timestamp\` varchar(255) NOT NULL COMMENT '블록 생성날짜'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`timestamp\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`timestamp\` int NOT NULL COMMENT '블록 생성날짜'`);
    }

}
