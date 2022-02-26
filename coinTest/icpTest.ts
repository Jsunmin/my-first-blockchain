/**
 * 관련 독스
 *  js lib
 *  - https://www.npmjs.com/package/@dfinity/agent
 *  - https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app/agent/index.html
 *  ex
 *  - https://github.com/davidp94/icqs-demo/blob/master/worker/index.js
 *  - https://github.com/davidp94/icqs-demo/blob/master/src/icqs_demo/main.mo
 *  - 
 *  docs
 *  - https://smartcontracts.org/docs/quickstart/quickstart-intro.html
 *  - 
 */
 import fetch from 'node-fetch'

import { Actor, HttpAgent } from "@dfinity/agent";

const idlFactory = ({ IDL }: any) => {
  return IDL.Service({ 'greet' : IDL.Func([IDL.Text], [IDL.Text], []) });
};

const agent = new HttpAgent();
const example = Actor.createActor(idlFactory, { agent, canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai' });
console.log(example, 123)
