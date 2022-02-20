import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEtheBlock21645353237518 implements MigrationInterface {
    name = 'updateEtheBlock21645353237518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`logsBloom\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`logsBloom\` text NOT NULL COMMENT '데이터 요청때 쓰이는 블룸필터용 데이터'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`logsBloom\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`logsBloom\` varchar(255) NOT NULL COMMENT '데이터 요청때 쓰이는 블룸필터용 데이터'`);
    }

}
