/**
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
 */

export interface EthTransaction {
    blockHash: string | null,
    blockNumber: number | null,
    from: string,
    gas: number,
    gasPrice: string,
    hash: string,
    input: string,
    nonce: number,
    r: string,
    s: string,
    to: string | null,
    transactionIndex: number | null,
    type: string,
    v: string,
    value: string
    maxPriorityFeePerGas?: string,
    maxFeePerGas?: string,
}