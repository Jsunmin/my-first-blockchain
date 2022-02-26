import {MigrationInterface, QueryRunner} from "typeorm";

export class blockDifficultyUpdate1645873221394 implements MigrationInterface {
    name = 'blockDifficultyUpdate1645873221394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`difficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`difficulty\` varchar(255) NOT NULL COMMENT '채굴 난이도'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`totalDifficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`totalDifficulty\` varchar(255) NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`totalDifficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`totalDifficulty\` bigint UNSIGNED NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`difficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`difficulty\` bigint UNSIGNED NOT NULL COMMENT '채굴 난이도'`);
    }

}
