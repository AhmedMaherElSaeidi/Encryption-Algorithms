const DESEncryption = require("./DES.js");

const sandBoxMatrix1 = [
    ["01", "00", "11", "10"],
    ["11", "10", "01", "00"],
    ["00", "10", "01", "11"],
    ["11", "01", "11", "10"]
]
const sandBoxMatrix2 = [
    ["00", "01", "10", "11"],
    ["10", "00", "01", "11"],
    ["11", "00", "01", "00"],
    ["10", "01", "00", "11"]
]


// msg 11011001 ==> encryption 01011001
// msg 00111011 ==> encryption 11011011
// msg 10101010 ==> encryption 01101010
console.log(DESEncryption(msg = "00110100",
    key = "10100010",
    initialPermutation = "26314857",
    expansionArray = "41232341",
    sb_matrix1 = sandBoxMatrix1,
    sb_matrix2 = sandBoxMatrix2));
