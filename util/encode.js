import pb from 'protobufjs';

const root = await pb.load('./util/encode.proto');
export const VoteMessage = root.lookupType('cowri.Vote');

export const UserMessage = root.lookupType('cowri.User');
export const ContractMessage = root.lookupType('cowri.Contract');
export const MinerMessage = root.lookupType('cowri.Miner');

export const NodeMessage = root.lookupType('cowri.Node');