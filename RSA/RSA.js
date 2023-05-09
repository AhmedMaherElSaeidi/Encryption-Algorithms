const { coprimes, findMultiplicativeInverse, powMod } = require("./MathCust.js");


// ASYMMETRIC CRYPTOGRAPHIC ALGORITHM
const RSAEncryption = (first_prime, second_prime, message) => {
    let encryptions = []
    let n = first_prime * second_prime;
    let euler = (first_prime - 1) * (second_prime - 1);

    coprimes(euler).forEach(e_coprime => {
        let d = findMultiplicativeInverse(euler, e_coprime);
        let encrypted_msg = powMod(message, e_coprime, n);
        let dencrypted_msg = powMod(encrypted_msg, d, n);

        encryptions.push({
            n,
            euler,
            e_coprime,
            d,
            encrypted_msg,
            dencrypted_msg
        })
    })

    return encryptions;
}

const getSpecificRSAEnc = (e_coprime, rsa_encryption) => {
    return rsa_encryption.filter(enc => enc.e_coprime == e_coprime)[0];
}

module.exports = {
    RSAEncryption,
    getSpecificRSAEnc
}