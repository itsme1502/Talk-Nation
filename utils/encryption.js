const dotenv = require('dotenv');

dotenv.config();

const CryptoJS = require('crypto-js');

function encryptString(str) {
  const encrypted = CryptoJS.AES.encrypt(str, process.env.SECRET);
  //console.log(encrypted.toString());
  return encrypted.toString();
}

function dcryptString(encryptedStr) {
  encryptedStr = encryptedStr.replace(/ /g, '+');
  const decrypted = CryptoJS.AES.decrypt(encryptedStr, process.env.SECRET);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encryptString,
  dcryptString
}