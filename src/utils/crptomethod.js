const CryptoJS = require("crypto-js");

const secretKey = sessionStorage.getItem("SECRET")?.toString() || "vOVHdf";

const encrypt = (text) => {
  var cipher = CryptoJS.AES.encrypt(text, secretKey);
  cipher = cipher.toString();
  return cipher;
};

const decrypt = (hash) => {
  var decipher = CryptoJS.AES.decrypt(hash, secretKey);
  decipher = decipher.toString(CryptoJS.enc.Utf8);
  return decipher;
};

module.exports = {
  encrypt,
  decrypt,
};
