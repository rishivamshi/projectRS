// const redis = require('redis');

// const CHANNELS = {
//     TEST: 'TEST'
// };

// class PubSub {
//     constructor() {
//         this.publisher = redis.createClient();
//         this.subscriber = redis.createClient();


//         this.subscriber.subscribe(CHANNELS.TEST);

//         this.subscriber.on(
//             'message', 
//             (channel, message) => this.handleMessage(channel,message)
//         );
//     }
//         handleMessage(channel, message) {

//             console.log(`Message received. Channel: ${channel}. Message: ${message}`);

//         }
    
// }

// const testPubSub = new PubSub();
// setTimeout( () => testPubSub.publisher.publish(CHANNELS.TEST, 'foo'), 1000);

const PubNub  = require('pubnub');

const credentials = {
  publishKey: 'pub-c-9203426b-98c2-4042-8467-5f98e40aea54',
  subscribeKey: 'sub-c-1e22fa08-3466-11e9-979e-6e9033221872',
  secretKey: 'sec-c-OTJhNmEwNjItMWNmZS00OTY4LThkMDAtMGM5MTJhMmE2MDM0',

};

const CHANNEL = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {
    constructor({blockchain, transactionPool, wallet}) {

        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({channels : Object.values(CHANNEL) });
        this.pubnub.addListener( this.listener());
    }

    listener() {
        return {
            message: messageObject => {
                const {channel, message} = messageObject;

                console.log(`Message received. Channel : ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                switch(channel) {
                    case CHANNEL.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, true, () => {
                            this.transactionPool.clearBlockchainTransactions({
                                chain: parsedMessage
                            });
                        });
                        break;
                    case CHANNEL.TRANSACTION:
                        if(!this.transactionPool.existingTransaction({
                            inputAddress: this.wallet.publicKey
                        })) {
                            this.transactionPool.setTransaction(parsedMessage);

                        }
                        break;
                    default:
                        return;
                }

                // if(channel === CHANNEL.BLOCKCHAIN) {
                //     this.blockchain.replaceChain(parsedMessage);
                // }
            }
        };

    }

    publish({ channel, message}) {
        
        this.pubnub.publish({channel, message});
    }
    broadcastChain() {
        this.publish({
            channel: CHANNEL.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNEL.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }
}



// const testPubSub = new PubSub();
// testPubSub.publish({channel: CHANNEL.TEST, message: 'hello pubnub'});

module.exports = PubSub;