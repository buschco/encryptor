const fs = require('fs');
const crypto = require('crypto');

var encr = document.getElementById('encrypt');
encr.ondragover = () => {
    return false;
};
encr.ondragleave = () => {
  return false;
};
encr.ondragend = () => {
  return false;
};
encr.ondrop = (e) => {
  e.preventDefault();
  for (let f of e.dataTransfer.files) {
    var key = document.getElementById('passphrase').value;
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var input = fs.createReadStream(f.path);
    var output = fs.createWriteStream(f.path + '.enc');
    input.pipe(cipher).pipe(output);
  }
  return false;
};

var decr = document.getElementById('decrypt');
decr.ondragover = () => {
    return false;
};
decr.ondragleave = () => {
  return false;
};
decr.ondragend = () => {
  return false;
};
decr.ondrop = (e) => {
  e.preventDefault();
  for (let f of e.dataTransfer.files) {
    var key = document.getElementById('passphrase').value;
    var decipher = crypto.createDecipher('aes-256-cbc', key)
    var input = fs.createReadStream(f.path);
    var output = fs.createWriteStream(f.path.slice(0,-4));
    input.pipe(decipher).pipe(output);
  }
  return false;
};
