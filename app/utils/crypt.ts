const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

function encodeToken(data) {
    return jwt.sign(data, jwtSecret)
}

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result)
        })
    })
}

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
};

const compareWithTrim = (plainText, hash) => {
    return compare(String(plainText).trim(), hash)
}

function compare(plainText, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hash, (error, result) => {
            if (error)
                reject(error)
            else
                resolve(result)
        })
    })
}

const protectWithTrim = (plainText) => {
    return protect(String(plainText).trim())
};

function protect(plainText) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (error, salt) => {
            if (error)
                reject(error)
            else {
                bcrypt.hash(plainText, salt, null, (error, result) => {
                    if (error)
                        reject(error)
                    else
                        resolve(result)
                })
            }
        })
    })
}

function tempToken(email) {
    return encodeToken({
        email: email,
        createdAt: new Date()
    })
}

function actionToken(userId, action, objectId) {
    return encodeToken({
        id: userId,
        action,
        objectId,
        createdAt: new Date()
    })
}

export {
    compareWithTrim,
    protectWithTrim,
    encodeToken,
    decodeToken,
    tempToken,
    actionToken,
    hashPassword
}
