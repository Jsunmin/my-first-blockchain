import {MigrationInterface, QueryRunner} from "typeorm";

export class init1645334920950 implements MigrationInterface {
    name = 'init1645334920950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ethereumTransactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`blockHash\` varchar(255) NOT NULL COMMENT '트랜잭션 위치 블록 해시', \`blockNumber\` int NOT NULL COMMENT '트랜잭션 위치 블록 번호', \`transactionIndex\` int NOT NULL COMMENT '블록내 트랜잭션 위치 (배열 인덱스)', \`from\` varchar(255) NOT NULL COMMENT '송신 주소', \`to\` varchar(255) NOT NULL COMMENT '수신 주소', \`value\` int NOT NULL COMMENT '송신금액 (wei)', \`gas\` int NOT NULL COMMENT 'gas 소비량', \`gasPrice\` int NOT NULL COMMENT 'gas 가격 (wei)', \`hash\` varchar(255) NOT NULL COMMENT '트랜잭션 해시', \`input\` varchar(255) NOT NULL COMMENT '트랜잭션에 추가 전송한 데이터', \`r\` varchar(255) NOT NULL COMMENT '트랜잭션 시그니처 1', \`s\` varchar(255) NOT NULL COMMENT '트랜잭션 시그니처 2', \`v\` varchar(255) NOT NULL COMMENT '트랜잭션 시그니처 3', \`nonce\` int NOT NULL COMMENT '트랜잭션 할당 번호 (중복거래 방지, ++, 순서대로 처리)', \`type\` varchar(255) NOT NULL COMMENT '트랜잭션 타입', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ethereumBlcocks\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`difficulty\` int NOT NULL COMMENT '채굴 난이도', \`extraData\` varchar(255) NOT NULL COMMENT '채굴 난이도', \`gasLimit\` int NOT NULL COMMENT '블록에서 사용할 수 있는 가스 최대크기', \`gasUsed\` int NOT NULL COMMENT '블록에서의 가스 사용량', \`hash\` varchar(255) NOT NULL COMMENT '블록해시', \`logsBloom\` varchar(255) NOT NULL COMMENT '데이터 요청때 쓰이는 블룸필터용 데이터', \`miner\` varchar(255) NOT NULL COMMENT '블록 채굴한 마이너 주소 (보상겟)', \`mixHash\` varchar(255) NOT NULL COMMENT '블록 채굴 검증 데이터1', \`nonce\` varchar(255) NOT NULL COMMENT '블록 채굴 검증 데이터2', \`number\` int NOT NULL COMMENT '블록 번호: genesis(0)++', \`parentHash\` varchar(255) NOT NULL COMMENT '체이닝한 이전블록 해시', \`receiptsRoot\` varchar(255) NOT NULL COMMENT '거래정보 루트해시 (3state)', \`sha3Uncles\` varchar(255) NOT NULL COMMENT '블록의 엉클블록들 해시', \`size\` int NOT NULL COMMENT '블록 크기', \`stateRoot\` varchar(255) NOT NULL COMMENT '블록상태 루트해시 (3state)', \`timestamp\` int NOT NULL COMMENT '블록 생성날짜', \`totalDifficulty\` int NOT NULL COMMENT '전블록과 현블록의 난이도합', \`transactions\` int NOT NULL COMMENT '블록에 담긴 트랜잭션들', \`transactionsRoot\` varchar(255) NOT NULL COMMENT '트랜잭션 루트해시 (3state)', \`uncles\` text NOT NULL COMMENT '엉클블록들 해시', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ethereumBlcocks\``);
        await queryRunner.query(`DROP TABLE \`ethereumTransactions\``);
    }

}
