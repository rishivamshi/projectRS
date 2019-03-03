const Transaction = require('../wallet/transaction');

class TransactionMiner {

    constructor({blockchain, transactionPool, wallet, pubsub}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }

    mineTransactions() {
        // get the transaction pool's valid transactions
        const validTransactions = this.transactionPool.validTransactions();


        // generating the miners reward
        validTransactions.push(
        Transaction.rewardTransaction({ minerWallet: this.wallet })
        );
        
        // add a block consisting of these transactions to the blockchain
        this.blockchain.addBlock({ data: validTransactions });

        // broadcasting the updated blockchain
        this.pubsub.broadcastChain();

        // clearing the transaction pool after including the data in the blockchain
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner;