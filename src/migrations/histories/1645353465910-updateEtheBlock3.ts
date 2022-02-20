import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEtheBlock31645353465910 implements MigrationInterface {
    name = 'updateEtheBlock31645353465910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`transactions\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`transactions\` text NOT NULL COMMENT '블록에 담긴 트랜잭션들'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`transactions\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`transactions\` int NOT NULL COMMENT '블록에 담긴 트랜잭션들'`);
    }

}
