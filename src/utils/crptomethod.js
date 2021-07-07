const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const algorithm = 'aes-256-ctr';
const secretKey =  sessionStorage.getItem('SECRET')?.toString() || 'vOVHdf';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {

    // const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    // const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    var cipher = CryptoJS.AES.encrypt(text, secretKey);
    cipher = cipher.toString();
    return cipher;
    // return {
    //     iv: iv.toString('hex'),
    //     content: encrypted.toString('hex')
    // };
};

const decrypt = (hash) => {

    // const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    // const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    // return decrpyted.toString();
    var decipher = CryptoJS.AES.decrypt(hash, secretKey);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
};

module.exports = {
    encrypt,
    decrypt
};