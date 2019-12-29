const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

function encodeToken(data: any) {
    return jwt.sign(data, jwtSecret)
}

function decodeToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (error: any, result: any) => {
            if (error)
                reject(error);
            else
                resolve(result)
        })
    })
}

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
};

const compareWithTrim = (plainText: string, hash: string) => {
    return compare(String(plainText).trim(), hash)
};

function compare(plainText: string, hash: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hash, (error: any, result: any) => {
            if (error)
                reject(error)
            else
                resolve(result)
        })
    })
}

const protectWithTrim = (plainText: string) => {
    return protect(String(plainText).trim())
};

function protect(plainText: string) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (error: any, salt: any) => {
            if (error)
                reject(error)
            else {
                bcrypt.hash(plainText, salt, null, (error: any, result: any) => {
                    if (error)
                        reject(error)
                    else
                        resolve(result)
                })
            }
        })
    })
}

function tempToken(email: string) {
    return encodeToken({
        email: email,
        createdAt: new Date()
    })
}

function actionToken(userId: any, action: any, objectId: any) {
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
