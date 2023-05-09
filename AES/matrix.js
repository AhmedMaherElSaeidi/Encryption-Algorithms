const transpose_matrix_2d = (matrix_2d) => {
    const _matrix = [];

    for (let index_x = 0; index_x < matrix_2d.length; index_x++)
        for (let index_y = 0; index_y < matrix_2d[index_x].length; index_y++) {
            if (index_x == 0) {
                _matrix.push([]);
            }

            _matrix[index_x].push(matrix_2d[index_y][index_x])
        }

    return _matrix;
}

const shift_matrix_1d = (matrix_1d, shift_count) => {
    const len = matrix_1d.length;
    const shifted_matrix = [];

    for (let cell_index = 0; cell_index < len; cell_index++) {
        let shift_index = (shift_count + cell_index) % len;
        shifted_matrix.push(matrix_1d[shift_index]);
    }

    return shifted_matrix;
}

const subBytes_1d = (matrix_1d, s_box) => {
    let _matrix = [...matrix_1d];

    for (let index = 0; index < matrix_1d.length; index++) {
        let row_index = matrix_1d[index].charAt(0);
        let col_index = matrix_1d[index].charAt(1);

        if (!Number.isInteger(row_index)) row_index = parseInt(row_index, 16);
        if (!Number.isInteger(col_index)) col_index = parseInt(col_index, 16);

        _matrix[index] = s_box[row_index][col_index];
    }

    return _matrix;
}

const hexToBinary = (hex) => {
    let result = '';
    for (let i = 0; i < hex.length; i++) {
        const hexDigit = parseInt(hex[i], 16);
        const binaryDigit = hexDigit.toString(2).padStart(4, '0');
        result += binaryDigit;
    }
    return result;
}

const matrix_hexToBinary_1d = (matrix1d) => {
    let _matrix1d = [];

    for (let index = 0; index < matrix1d.length; index++) {
        _matrix1d.push(hexToBinary(matrix1d[index]));
    }

    return _matrix1d;
}

function binaryToHex(binary) {
    const binaryDigits = binary.match(/.{1,4}/g);
    let hex = '';
    for (let i = 0; i < binaryDigits.length; i++) {
        const hexDigit = parseInt(binaryDigits[i], 2).toString(16).toUpperCase();
        hex += hexDigit;
    }
    return hex;
}

const matrix_binaryToHex_1d = (matrix1d) => {
    let _matrix1d = [];

    for (let index = 0; index < matrix1d.length; index++) {
        _matrix1d.push(binaryToHex(matrix1d[index]));
    }

    return _matrix1d;
}

const xorBinary = (a, b) => {
    if (a.length !== b.length) {
        throw new Error('Binary strings must be of the same length.');
    }
    let result = '';
    for (let i = 0; i < a.length; i++) {
        result += a.charAt(i) == b.charAt(i) ? '0' : '1';
    }
    return result;
}

const matrix_xor_1d = (matrix1, matrix2) => {
    let _matrix1d = [];

    if (matrix1.length != matrix2.length)
        return -1;

    for (let index = 0; index < matrix1.length; index++) {
        _matrix1d.push(xorBinary(matrix1[index], matrix2[index]))
    }

    return _matrix1d;
}

module.exports = {
    transpose_matrix_2d,
    shift_matrix_1d,
    subBytes_1d,
    matrix_hexToBinary_1d,
    matrix_binaryToHex_1d,
    matrix_xor_1d,
    hexToBinary,
     binaryToHex,
      xorBinary
}