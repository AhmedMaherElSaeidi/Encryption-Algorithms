// SYMMETRIC CRYPTOGRAPHIC ALGORITHM
const DESEncryption = (msg, key, initialPermutation, expansionArray, sb_matrix1, sb_matrix2) => {
    // Checking whether inputs are valid
    if (!msg || msg.length != 8) return -1;
    if (!key || key.length != 8) return -2;
    if (!initialPermutation || initialPermutation.length != 8) return -3;
    if (!expansionArray || expansionArray.length != 8) return -4;
    if (!sb_matrix1 || !sb_matrix2) return -5;

    // Converting inputs to array of numbers 
    msg = Array.from(msg, Number)
    key = Array.from(key, Number)
    initialPermutation = Array.from(initialPermutation, Number)
    expansionArray = Array.from(expansionArray, Number)

    // Step 1 intial permutation
    msg = initialPermutation.map((bit) => msg[bit - 1]);
    const intial_permutation = msg.join("");

    // Step 2 divide to L0, R0
    let l0 = msg.splice(0, 4)
    let r0 = [...msg]
    const l0_divide = l0.join(""), r0_divide = r0.join("");

    // Step 3
    // Find L1, R1
    // L1 = R0, R1 = f(L0 ^ f(R0 ^ Key) ^ R0)
    let r0_exp = expansionArray.map((bit) => r0[bit - 1]); // Expanding R0 form 4-bits to 8-bits
    let r0_XOR_key = XOR(r0_exp, key)
    const expansion = {
        r0_exp : r0_exp.join(""),
        r0_XOR_key : [...r0_XOR_key].join(""),
    }

    // Compressing r0_XOR_key from 8-bits to 4-bits using sandbox matrix
    let s0 = r0_XOR_key.splice(0, 4)
    let s1 = [...r0_XOR_key]

    let s0_row = parseInt(s0[0] + "" + s0[3], 2); // changes from binary to decimal
    let s0_col = parseInt(s0[1] + "" + s0[2], 2);
    let s0_value = sb_matrix1[s0_row][s0_col] // accessing matrix value

    let s1_row = parseInt(s1[0] + "" + s1[3], 2);
    let s1_col = parseInt(s1[1] + "" + s1[2], 2);
    let s1_value = sb_matrix2[s1_row][s1_col]

    r0_XOR_key = Array.from(s0_value + s1_value, Number)
    let l1 = [...r0]
    let r1 = XOR(XOR(l0, r0_XOR_key), r0)
    const find_l1 = l1.join(""), find_r1 = r1.join(""), fn_r0_xor_key = r0_XOR_key.join("");
    const sand_box = {
        sb_s0: s0.join(""),
        s0_row, s0_col, s0_value,
        sb_s1: s1.join(""),
        s1_row, s1_col, s1_value,
    }

    // Step 4 Concat(r1 + l1)
    msg = Array.from(r1.join("") + l1.join(""), Number)
    const msg_concat = msg.join("");

    // Step 5 Final permutation INV(IP) - Inversing Step 1
    let initialPermutationInverse = initialPermutation.map((value, index) => [value, (index + 1)])
        .sort((a, b) => a[0] - b[0]).map((value) => value[1])


    // Returns encrypted message in string
    const final_permutation = initialPermutationInverse.map(index => msg[index - 1]).join("");
    return {
        intial_permutation,
        l0_divide,
        r0_divide,
        expansion,
        find_l1,
        find_r1,
        fn_r0_xor_key,
        sand_box,
        msg_concat,
        initial_permutation_inverse_indexes : initialPermutationInverse.join(""),
        final_permutation,
    };
}

function XOR(binary1, binary2) {
    return binary1.map((binary, index) => binary ^ binary2[index])
}

module.exports = DESEncryption;