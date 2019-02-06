const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it('contains a `chain` array instance' , () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length -1 ].data).toEqual(newData);
    });


    describe('isValidChain()', () => {
        describe('when the chain doesnot start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        describe('when the chain starts with the genesis block and has multiple blocks', () => {

            beforeEach(() => {
                blockchain.addBlock({data: 'Bears'});
                blockchain.addBlock({data: 'Beets'});
                blockchain.addBlock({data: 'Battlestar'});
            });

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    


                    blockchain.chain[2].lastHash = 'broken-lasthash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);


                });
            });

            describe('when the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                
                    blockchain.chain[2].data = 'some-changed-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                });
            });

            describe('and the chain doesnot contain any invalid blocks', () => {
                it('returns true', () => {
                    
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

                });
            });
        });
    });


    describe('replaceChain()', () => {
        describe('when the chain is not longer', () => {
            it('doest not replace the chain', () => {
                newChain.chain[0] = {new : 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
        });
        describe('when the chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({data: 'Bears'});
                newChain.addBlock({data: 'Beets'});
                newChain.addBlock({data: 'Battlestar'});
            });
             describe('and the chain is invalid', () => {
                it('does not replace th chain', () => {
                    newChain.chain[2].hash = 'fake-hash';
                    blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
                });
             });
             describe('and the chanin is valid', () => {
                it('does replace the chain', () => {
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
             });
        });

    });


});
