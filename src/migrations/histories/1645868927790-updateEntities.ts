import {MigrationInterface, QueryRunner} from "typeorm";

export class setupEntities1645868927790 implements MigrationInterface {
    name = 'setupEntities1645868927790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL COMMENT '로그인 아이디', \`password\` varchar(255) NOT NULL COMMENT '로그인 비밀번호', \`salt\` varchar(50) NOT NULL COMMENT '비밀번호 암호화 솔트', \`praivateKey\` varchar(255) NOT NULL COMMENT '지갑 pk', \`account\` varchar(255) NOT NULL COMMENT '퍼블릭 키로 만든 주소', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`accountIndex\` (\`account\`), INDEX \`usernameIndex\` (\`username\`), UNIQUE INDEX \`IDX_2591a20569135e2d9b0af5e943\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`extraData\` \`extraData\` varchar(255) NOT NULL COMMENT '추가 데이터'`);
        await queryRunner.query(`CREATE INDEX \`blockNumberIndex\` ON \`ethereumBlcocks\` (\`number\`)`);
        await queryRunner.query(`CREATE INDEX \`hashIndex\` ON \`ethereumTransactions\` (\`hash\`)`);
        await queryRunner.query(`CREATE INDEX \`blockNumberIndex\` ON \`ethereumTransactions\` (\`blockNumber\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`blockNumberIndex\` ON \`ethereumTransactions\``);
        await queryRunner.query(`DROP INDEX \`hashIndex\` ON \`ethereumTransactions\``);
        await queryRunner.query(`DROP INDEX \`blockNumberIndex\` ON \`ethereumBlcocks\``);
        await queryRunner.query(`ALTER TABLE \`ethereumBlcocks\` CHANGE \`extraData\` \`extraData\` varchar(255) NOT NULL COMMENT '채굴 난이도'`);
        await queryRunner.query(`DROP INDEX \`IDX_2591a20569135e2d9b0af5e943\` ON \`wallets\``);
        await queryRunner.query(`DROP INDEX \`usernameIndex\` ON \`wallets\``);
        await queryRunner.query(`DROP INDEX \`accountIndex\` ON \`wallets\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
    }

}
