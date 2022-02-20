# Web3 prj
 - web3: https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#towei
 - geth: https://geth.ethereum.org/docs/getting-started

 - 관련 블로그1: http://blockchaindev.kr/models/content/81
 - 관련 블로그2 geth: https://piepiesw.tistory.com/32

* geth --syncmode light [--http | --ws]
    - geth attach /Users/xxx/Library/Ethereum/ropsten/geth.ipc
    - geth attach http://127.0.0.1:8545


----
# Geth

## genesis.json 
```bash
{
    # 이더리움 설정
    "config": {
        "chainId": 8484, # chain 구분값

        # 사설 블록체인을 만들 때 기본적으로 동일한 설정 (4개)
        "homesteadBlock": 0, # 이더리움 2단계) replay attack을 막기 위한 설정 (0: true)
        "eip150Block": 0, # IO가 많은 작업에 대한 가스변경 비용 설정
        "eip155Block": 0, # replay attack을 막기 위한 설정
        "eip158Block": 0 # state clear
    },
    "difficulty": "20", # 채굴 난이도 (클수록 상승)
    "gasLimit": "2100000", # 블록당 담을 수 있는 가스 한도 (한 블록안 트랜잭션 수 결정에 쓰이는 옵션 ~ 클수록 트랜잭션 많이 쌓음)
    "alloc": { # 블록 생성과 동시에 등록된 주소로 ETH 전송
        "0xFC30800B66F4975BD45e3c785D22Cf421A2c4E2A": {
            "balance": "300000"
        }
    }
    # 이외
    #  parentHash 부모블록 해시 (genesis 필요X)
    #  coinbase: 제네시스 블록 채굴시 주어지는 보상
    #  nonce, mixhash: 블록이 올바르게 채굴되었는지 증명 ~ 블록 검증용 값
    #  timestamp 블록 취득 시점 (genesis: 0) ~ 블록간 timestamp 갭이 난이도 조절에 활용!
}
```

## geth 실행
``` bash
geth 
    --networkid 8484 # 네트워크 식별자
    --nodiscover # 타노드가 해당노드 검색 못함 처리 (8484 네트워크 노드들 접근 불가!)
    --datadir test_data # 연결된 데이터 디렉토리
    -allow-insecure-unlock # http 접근시 계정해제 관련
    --http.addr 0.0.0.0 # 접속 ip
    --http --http.port 8545 # 접속 port
    --http.corsdomain "*"
    --http.api="db,eth,net,web3,personal,web3,miner,admin" # geth내 접근가능 api (명령어)
    --miner.threads 1 # 마이닝 스레드 1
    console # 대화형 JS 콘솔
    2>> test_data/geth.log # 로그 파일 셋팅 옵션 (경로에 저장)
```

## 명령어
``` bash
# 계정 관련
## 1. 계정 확인
eth.accounts
## 2. password로 들어갈 수 있는 주소 리턴
personal.newAccount('password')
## 3. Etherbase: 이더리움을 채굴하고 보상을 받는 계정
### a. 채굴 보상 계정 세팅
miner.setEtherbase(personal.listAccounts[1]);
### b. 보상 계정 확인
eth.coinbase
## 4. 계정 잔고 확인
eth.getBalance(eth.accounts[0])
# cf : web3.js 사용 가능
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')

# 블록 관련
## 1. 생성된 블록 수 조회
eth.blockNumber
## 2. 0번째 블록의 정보 출력
eth.getBlock(0)

# 계정 상태 (지갑?)
## 1. 특정 계정의 상태 확인
personal.listWallets[0].status
## 2. 잠긴 계정 해제 ~ Error: authentication needed: password or unlock 방지!
personal.unlockAccount(eth.accounts[0])

# 채굴
## 1. n개 스레드로 마이닝 시작
miner.start(n)
## 2. 마이닝 상태 확인
eth.mining
## 3. 마이닝 종료
miner.stop()
## eth.blockNumber 으로 늘고있는 블록 확인 가능
## web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether') ~ 채굴 보상으로 eth 증가!
```

## 트랜잭션
```bash
# 트랜잭션 발행
eth.sendTransaction({
    from:eth.accounts[1],
    to:eth.accounts[2],
    value: web3.toWei(2,"ether"),
    data: web3.toHex("hello!!!")
})

# 팬딩중인 트랜잭션 확인 ~ 마이닝 시작한 것 있으면 팬딩에 머물다 사라지겠지?!
eth.pendingTransactions

# 트랜잭션 확인
eth.getTransaction("0xeca6076ee0d4a4d019e5992f16fbd0171ab792ba7980fb55bc1400558d6ed643")
## 아래와 같은 트랜잭션
{
  blockHash: "0x49ddb60df0b7a50ea4fc65a7522d4b67110f9754bb83fdd81bef612d4bf91d88",
  blockNumber: 261,
  from: "0xe1cd5234577e1bbdef622f5fd72d9296331baac5",
  gas: 21544,
  gasPrice: 1000000000,
  hash: "0xeca6076ee0d4a4d019e5992f16fbd0171ab792ba7980fb55bc1400558d6ed643",
  input: "0x68656c6c6f212121",
  nonce: 2,
  r: "0xe861e887bc260caf5c554522ef4d94f6486f4551c66dabf392a6b895116952cf",
  s: "0x75320241d63bf85ceb6df7e18d0680c4cbf73b6fe5a19cbf5172b5e94b226541",
  to: "0xc420d1ed0a6f8acc82989afbba0fdd60533e99a3",
  transactionIndex: 0,
  type: "0x0",
  v: "0x426b",
  value: 2000000000000000000
}
## 아래와 같은 블락 내용 확인 가능 ~ eth.getBlock(261)
{
  difficulty: 147595,
  extraData: "0xd883010a10846765746888676f312e31372e35856c696e7578",
  gasLimit: 2708866,
  gasUsed: 21544,
  hash: "0x49ddb60df0b7a50ea4fc65a7522d4b67110f9754bb83fdd81bef612d4bf91d88",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0xe1cd5234577e1bbdef622f5fd72d9296331baac5",
  mixHash: "0xdf9bb26baf88fd15ea2d3104e3a01f58cd8b4c68bbd03a2cdc3421a2e7545b0e",
  nonce: "0x728b2e9c1494c7a3",
  number: 261,
  parentHash: "0xc37ce9eb2d897c899b32bd2e5e4552c5a952426dc6d7ccf85770717cd4983531",
  receiptsRoot: "0x8bc9adf052bade784dcf99ab2719d59da12e64534f0cd67f915e2493a6be6c43",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 660,
  stateRoot: "0xf3bc17a6b4be50597cedbba7cf1465a07d95ea3dc2a62dc3aa7cce18e7c811b4",
  timestamp: 1645186517,
  totalDifficulty: 36368488,
  transactions: ["0xeca6076ee0d4a4d019e5992f16fbd0171ab792ba7980fb55bc1400558d6ed643"],
  transactionsRoot: "0x10264e800fffced834492e7eb35ced983bb793c89223dd56237105d492dbc4cc",
  uncles: []
}
```

## 노드 피어링
 - 하나의 geth에서 같은 networkId를 바라보는, 2개의 노드 생성 (각 노드는 서로 다른 data-dir 참조)
```bash
    # 1. 특정 노드 enode 주소 겟
    admin.nodeInfo.enode
    # 2. 타 노드에서 연결
    admin.addPeer("첫번째 노드의 enode 주소")
    # 3. 각 노드에서 피어링된 노드 확인
    admin.peers
    # 4. 각 노드의 계정간 트랜잭션 등이 가능!
```

## bootnode
 - 이더리움 식별 프로토콜을 실행하는 부트스트립 노드
 - bootnode에 연결된 노드들은 bootnode로 부터 정기적으로 node 목록을 받고, 이 목록에 기초하여 block 정보를 동기화
 - 