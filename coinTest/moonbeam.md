# Moonbeam
 - https://docs.moonbeam.network/learn/platform/networks/moonbeam/
 - https://docs.moonbeam.network/

### 거버넌스 토큰(코인): 글리머(GLMR)
   - 코인 단위
      - https://docs.moonbeam.network/learn/platform/networks/moonbeam/#token-denominations
<br/>

### 이더리움과 호환되는 폴카닷에 떠있는 블록체인
 - Web3, EVM, 솔리디티 기반한 스마트컨트랙트 등 호환

 - 이더리움의 기본 기능을 extend해 + a (substrate)

 - cf polkadot: 서로 다른 블록체인을 연결하는 인터체인 프로젝트, 체인간 원활한 데이터 전송이 가능
    - parachain: 릴레이체인에 붙는 독립된 네트워크 체인 ( ~ moonbeam 네트워크 )
    - relaychain: 중앙관리자 - 릴레이 체인 중심으로 여러 파라체인이 붙어 멀티체인 구성 / 각 파라체인의 헤더가 존재 / 보안 제공하고 / 연결된 네트워크 간의 통신 중개

 - Substrate 기반 체인: 
    - cf) Substrate: DApp 최적화 블록체인 개발지원 툴 / rust 개발 (moonbeam base image) / 폴카닷 프로토콜과 통합됨 / JS 실행 가능
    - 이더리움 + substrate 기능을 가짐

<br/>

### 이더리움과의 차이
 - basic ethereum + Substrate (extended)
 - account balance 관점
    - 문빔은 락 및 예약 balance 개념이 존재 (EOA 입장에서)
 - transaction 관점
    - Substrate API를 활용하는게 좀 더 좋음 (ethereum API 통해도 가능!)
 - consensus 관점
    - DPoS 기반 finality 제공 (ethe PoW / Polkadot NPoS)
        - cf) PoW 확률적 finality: 더 많은 자식 블록과 이어진 체인이 최종 승자
    - 폴카닷의 릴레이체인의 collator에 의존
        - collator: 파라체인 트랜잭션 수집, 블록 후보 집계, validator를 위한 증명 생성
        - https://wiki.polkadot.network/docs/learn-collator
    - 일정 수 (현재 53개)의 collator는 지분에 기반해 선정됨 (DPoS)
    - 블록 finality는 polkadoy GRANDPA에 의존 (..?)
        - https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa
    - difficulty, uncles 같은 PoW 개념 의미 X

<br/>

### 참고
 - Moonbeam 기반 네트워크
    - moonbeam: 폴카닷 파라체인, 20211217 부터
    - moonriver: 문빔 배포전, kusama 네트워크 (폴카닷의 카나리아 네트워크) 파라체인으로 시작
    - moonrock: Rococo (폴카닷 퍼블릭 테스트넷)에 배포된 네트워크
    - moonbase alpha: purestake에서 호스팅되는 testnet
 - networkId & chainId
    - 보통 둘 다 동일하게 사용됨
    - networkId: P2P 통신이 사용하는 아이디
    - chainId: 트랜잭션 서명 프로세스에서 사용하는 아이디 (..?) / genesis config 에서 설정