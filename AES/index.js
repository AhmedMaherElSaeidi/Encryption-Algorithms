const AESEncryption = require("./AES.js");
const aes_key_exp = require("./AES_Key_Expansion.js");

const aes_key = [
    ['2B', '28', 'AB', '09'],
    ['7E', 'AE', 'F7', 'CF'],
    ['15', 'D2', '15', '4F'],
    ['16', 'A6', '88', '3C']
];

const aes_msg = [
    ['32', '88', '31', 'E0'],
    ['43', '5A', '31', '37'],
    ['F6', '30', '98', '07'],
    ['A8', '8D', 'A2', '34']
];

// generating rounds key
let aes_keys = [];
let _aes_key = [...aes_key];
for (let index = 0; index < 10; index++) {
    _aes_key = aes_key_exp(_aes_key, index);
    aes_keys.push(_aes_key);
}

// printing final resutl
const aes = AESEncryption(aes_msg, aes_key, aes_keys)
aes.forEach(e => console.log(e));