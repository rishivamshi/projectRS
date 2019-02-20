const EC = require('elliptic').ec;


// standards for efficiend cryptography, prime, 256 bits = bitcoin uses this.
const ec = new EC('secp256k1');

module.exports = {ec};