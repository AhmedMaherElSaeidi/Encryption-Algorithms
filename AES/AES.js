const { s_box, rounds, const_matrix } = require("./constants.js");
const { transpose_matrix_2d, shift_matrix_1d, subBytes_1d, matrix_hexToBinary_1d,
    matrix_binaryToHex_1d, matrix_xor_1d, hexToBinary, binaryToHex, xorBinary } = require("./matrix.js");

const intialRound = (msg, key) => {
    let _intial_round = [];

    if (msg.length != key.length)
        return -1;

    for (let index_x = 0; index_x < key.length; index_x++) {
        let col1 = matrix_hexToBinary_1d(msg[index_x]);
        let col2 = matrix_hexToBinary_1d(key[index_x]);
        let col3 = matrix_xor_1d(col1, col2);
        col3 = matrix_binaryToHex_1d(col3);
        _intial_round.push(col3);
    }

    return _intial_round;
}

const subBytes = (matrix) => {
    const _matrix = [];

    for (let row = 0; row < matrix.length; row++)
        _matrix.push(subBytes_1d(matrix[row], s_box));

    return _matrix;
}

const shiftRows = (matrix) => {
    const _matrix = [];

    for (let row = 0; row < matrix.length; row++)
        _matrix.push(shift_matrix_1d(matrix[row], row));

    return _matrix;
}

// MIX COLUMNS
// When multiply with 02 if the number start with 0, we shift this zero left to the last bit.
// When multiply with 02 if the number start with 1, we delete this one and add zero left to the last bit then we make XOR with 1B.
// Returns result in binary
const fn_2 = (matrix_cell) => {
    let cell = hexToBinary(matrix_cell)
    if (cell.charAt(0) == '1') {
        cell = cell.slice(1, cell.length) + '0'
        cell = xorBinary(cell, '00011011')
        return cell;
    }

    cell = cell.slice(1, cell.length) + '0'
    return cell;
}

const mixColumns_cell = (matrix1d_cell, matrix1d_const) => {
    const _temp = [];
    for (let index = 0; index < matrix1d_const.length; index++) {
        switch (matrix1d_const[index]) {
            case '01':
                _temp.push(hexToBinary(matrix1d_cell[index]));
                break;
            case '02':
                _temp.push(fn_2(matrix1d_cell[index]))
                break;
            case '03':
                _temp.push(xorBinary(hexToBinary(matrix1d_cell[index]), fn_2(matrix1d_cell[index])))
                break;
        }
    }

    let xor_temp = _temp[0];
    for (let index = 0; index < _temp.length - 1; index++)
        xor_temp = xorBinary(xor_temp, _temp[index + 1])

    return binaryToHex(xor_temp);
}

const mixColumns = (matrix2d_cell, matrix2d_const) => {
    const _matrix2d = transpose_matrix_2d(matrix2d_cell)
    const _matrix2d_result = [];

    for (let x = 0; x < matrix2d_cell.length; x++) {
        const _temp = []
        for (let y = 0; y < matrix2d_cell[x].length; y++) {
            const cell = mixColumns_cell(_matrix2d[x], matrix2d_const[y])
            _temp.push(cell)
        }

        _matrix2d_result.push(_temp)
    }

    return transpose_matrix_2d(_matrix2d_result)
}

// SAME AS INTIAL ROUND
const addRoundKey = (matrix, key) => {
    return intialRound(matrix, key)
}

const AESEncryption = (msg, key, keys) => {
    // GETTING ROUNDS COUNT DEPENDING ON KEY LENGTH
    const rounds_count = rounds['byte_' + (key.length * key[0].length)]
    let msg_round = intialRound(msg, key)

    let results = []
    let round_count = 0
    results.push(['intial_round', msg, [], [], [], key])

    for (; round_count < rounds_count; round_count++) {
        results.push([`msg_round_${round_count + 1}`, msg_round])

        msg_round = subBytes(msg_round)
        results[round_count + 1].push(msg_round)

        msg_round = shiftRows(msg_round)
        results[round_count + 1].push(msg_round)

        if (round_count != rounds_count - 1) {
            msg_round = mixColumns(msg_round, const_matrix)
            results[round_count + 1].push(msg_round)
        }

        msg_round = addRoundKey(msg_round, keys[round_count])
        results[round_count + 1].push(keys[round_count])
    }

    results[results.length - 1].splice(4,0,[])
    results.push(['final_result', msg_round])
    return results
}

module.exports = AESEncryption;