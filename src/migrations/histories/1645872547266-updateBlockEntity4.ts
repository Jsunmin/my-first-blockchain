import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlockEntity41645872547266 implements MigrationInterface {
    name = 'updateBlockEntity41645872547266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`difficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`difficulty\` bigint UNSIGNED NOT NULL COMMENT '채굴 난이도'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`gasLimit\` \`gasLimit\` int UNSIGNED NOT NULL COMMENT '블록에서 사용할 수 있는 가스 최대크기'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`gasUsed\` \`gasUsed\` int UNSIGNED NOT NULL COMMENT '블록에서의 가스 사용량'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`number\` \`number\` int UNSIGNED NOT NULL COMMENT '블록 번호: genesis(0)++'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`totalDifficulty\` \`totalDifficulty\` int UNSIGNED NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`totalDifficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`totalDifficulty\` bigint UNSIGNED NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`totalDifficulty\` \`totalDifficulty\` int NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`number\` \`number\` int NOT NULL COMMENT '블록 번호: genesis(0)++'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`gasUsed\` \`gasUsed\` int NOT NULL COMMENT '블록에서의 가스 사용량'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`gasLimit\` \`gasLimit\` int NOT NULL COMMENT '블록에서 사용할 수 있는 가스 최대크기'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`difficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`difficulty\` int NOT NULL COMMENT '채굴 난이도'`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` DROP COLUMN \`totalDifficulty\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` ADD \`totalDifficulty\` int UNSIGNED NOT NULL COMMENT '전블록과 현블록의 난이도합'`);
    }

}
