// this file contains hardcoded and global values.

// genesis data is the first block of the chain, which has hardcoded values.

// global mining rate. set in milli secs.
const MINE_RATE = 1000;
// increase the number for more difficulty.
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

// its the starting balance for every node
const STARTING_BALANCE = 1000;

const REWARD_INPUT = { address: '*authorized-reward*' };
const MINING_REWARD = 50;

module.exports = {
    GENESIS_DATA, 
    MINE_RATE, 
    STARTING_BALANCE,
    REWARD_INPUT,
    MINING_REWARD
};