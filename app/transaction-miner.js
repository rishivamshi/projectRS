class TransactionMiner {

    constructor({blockchain, transactionPool, wallet, pubsub}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }

    mineTransactions() {
        // get the transaction pool's valid transactions

        // generating the miners reward

        // add a block consisting of these transactions to the blockchain

        // broadcasting the updated blockchain

        // clearing the transaction pool after including the data in the blockchain
    }
}

module.exports = TransactionMiner;