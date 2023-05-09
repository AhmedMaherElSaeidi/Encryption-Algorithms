const { s_box, r_conn } = require("./constants.js");
const { transpose_matrix_2d, shift_matrix_1d, subBytes_1d, matrix_hexToBinary_1d,
     matrix_binaryToHex_1d, matrix_xor_1d } = require("./matrix.js");

const aes_key_exp = (key, round_count) => {
    const transposed_key = transpose_matrix_2d(key);
    const transposed_key_len = transposed_key.length;
    let _newKEy = [];

    // GET W0 VALUE
    let w0 = transposed_key[transposed_key_len - 1];
    w0 = shift_matrix_1d(w0, 1);
    w0 = subBytes_1d(w0, s_box);

    const w0_subBytes = matrix_hexToBinary_1d(w0);
    const w0_original = matrix_hexToBinary_1d(transposed_key[0]);
    const rconn = matrix_hexToBinary_1d(r_conn[round_count]);
    w0 = matrix_xor_1d(matrix_xor_1d(w0_subBytes, w0_original), rconn);
    w0 = matrix_binaryToHex_1d(w0);
    _newKEy.push(w0);

    for (let index = 1; index < transposed_key_len; index++) {
        let w0 = matrix_hexToBinary_1d(_newKEy[index - 1]);
        let w = matrix_hexToBinary_1d(transposed_key[index]);
        w = matrix_xor_1d(w, w0);
        w = matrix_binaryToHex_1d(w);
        _newKEy.push(w);
    }

    return transpose_matrix_2d(_newKEy);
}

module.exports = aes_key_exp;