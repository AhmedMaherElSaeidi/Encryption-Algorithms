// IF THE TWO DIGITS HAVE MORE THAN 1 DIVISOR RETURN TRUE
const haveCommonFactors = (n1, n2) => {
    let num = n1 > n2 ? n2 : n1;
    for (let divisor = 2; divisor < Math.ceil(num / 2); divisor++)
        if (n1 % divisor == 0 && n2 % divisor == 0)
            return true;

    return false;
}

// RETURN COPRIME NUMBERS
const coprimes = (euler) => {
    let _coprimes = [];
    for (let value = 2; value < euler; value++)
        if (euler % value != 0 && !haveCommonFactors(euler, value))
            _coprimes.push(value);

    return _coprimes;
}

// ed mod (euler) = 1 >>> RETURNS 'd' VALUE 
function findMultiplicativeInverse(euler, e_coprime) {
    let a = e_coprime, b = euler;
    let x = 0, y = 1, lastX = 1, lastY = 0;

    while (b !== 0) {
        let quotient = Math.floor(a / b);
        [a, b] = [b, a % b];
        [lastX, x] = [x, lastX - quotient * x];
        [lastY, y] = [y, lastY - quotient * y];
    }

    if (lastX < 0) {
        lastX += euler;
    }

    return lastX;
}

// HANDLES LARGE VALUES OF POWER RESULT AND RETURNS A MODE OF IT
function powMod(base, exponent, modulus) {
    let result = 1n;
    base = BigInt(base) % BigInt(modulus);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return +result.toString();
}

module.exports = {
    haveCommonFactors,
    coprimes,
    findMultiplicativeInverse,
    powMod,
}