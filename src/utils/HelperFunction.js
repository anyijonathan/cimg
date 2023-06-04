import CryptoJS from "crypto-js";
const crypto = require('crypto');

// key = clentId padded with zero's till it 24 digits
const saltToKey = (salt) => {
  let clientKey = salt.toString();
  while (clientKey.length < 24) {
    clientKey = "0" + clientKey;
  }
  return clientKey;
};

// convert ascii characters to hex
const ascii_to_hex = (str) => {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};

export const encrypt = (value, salt) => {
  // if an object stringify
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  let key = CryptoJS.enc.Hex.parse(ascii_to_hex(saltToKey(salt)));

  let iv = CryptoJS.enc.Hex.parse(ascii_to_hex(process.env.REACT_APP_IV_KEY));

  let encrypted = CryptoJS.AES.encrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keysize: 192,
  });

  let transitmessage = encrypted.toString();
  return transitmessage;
};

export const decrypt = (value, salt) => {
  let key = CryptoJS.enc.Hex.parse(ascii_to_hex(saltToKey(salt)));

  let iv = CryptoJS.enc.Hex.parse(ascii_to_hex(process.env.REACT_APP_IV_KEY));

  let decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keysize: 192,
  });

  let transitmessage = decrypted.toString(CryptoJS.enc.Utf8)
  return transitmessage;
};

/* ----------------------------------------------------------------------------------------------------------- */


// generate request id
export const generateRequestId = () => {
  /*  const apiHeader = generateHeader(); */
  const newId = (
    Date.now().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 10)
  ).toUpperCase();
  return newId;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Search Filter logic */

function matchesAnyPropValue(obj, search) {
  return Object.values(obj).some(value =>
      Array.isArray(value)
      ? value.some(v => matchesAnyPropValue(v, search))
      : String(value).toLocaleLowerCase().includes(search)
  );
}

function applySearch(arr, filters) {
  const search = filters.toLocaleLowerCase();
  return arr.filter(entry => matchesAnyPropValue(entry, search));
}


export const filterHelper = (data, value) => {
  if (value === '' || !data) return data
  return applySearch(data, value)
}

/* Search Filter logic */

/* Encryption Algorithm Two */
const keySize = 256
const ivSize = 128
const saltSize = 256
const iterations = 1000
const pass = "1234567890_"


const hexToBase64 = (str) => {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

const base64ToHex = (str) => {
  // for (var i = 0, bin = atob(str.toString().replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
  for (var i = 0, bin = atob(str.toString().replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
}

// Encrypt
export const encryptTwo = (payload) => {
  payload = JSON.stringify(payload)
  var salt = CryptoJS.lib.WordArray.random(saltSize / 8);
  var key = CryptoJS.PBKDF2(pass, salt, { keySize: keySize / 32, iterations: iterations });
  var iv = CryptoJS.lib.WordArray.random(ivSize / 8);
  var encrypted = CryptoJS.AES.encrypt(payload, key, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC });
  var encryptedHex = base64ToHex(encrypted.toString());
  var base64result = hexToBase64(salt + iv + encryptedHex);
  return base64result.toString();
}

// Decrypt
export const decryptTwo = (transitmessage) => {
  var hexResult = base64ToHex(transitmessage)
  var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
  var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
  var encrypted = hexToBase64(hexResult.substring(96));
  var key = CryptoJS.PBKDF2(pass, salt, { keySize: keySize / 32, iterations: iterations });
  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}



/* AES ECB MODE ALGORITHM */


export function encryptEcb(plainText, key) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(plainText, keyUtf8, {
    mode: CryptoJS.mode.ECB,
  });

  return encrypted.toString();
}



export function decryptEcb(cipherText, key) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.AES.decrypt(cipherText, keyUtf8, {
    mode: CryptoJS.mode.ECB,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
