const { RSAEncryption, getSpecificRSAEnc } = require("./RSA.js");

// RSAEncryption( p, q, msg ) => {object}
// console.log(RSAEncryption(3, 7, 4));
console.log(getSpecificRSAEnc(7, RSAEncryption(3, 7, 4)));

