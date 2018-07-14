var fs = require('fs');
var crypto = require('crypto');

var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var cipher = crypto.createCipher('aes-256-cbc', key);

(function () {
    var holder = document.getElementById('drag-file');
    holder.ondragover = () => {
        return false;
    };
    holder.ondragleave = () => {
        return false;
    };
    holder.ondragend = () => {
        return false;
    };

    holder.ondrop = (e) => {
        e.preventDefault();
        for (let f of e.dataTransfer.files) {
          console.log(f.path);
          var input = fs.createReadStream(f.path);
          var output = fs.createWriteStream(f.path + '.enc');
          input.pipe(cipher).pipe(output);
          output.on('finish', function() {
            console.log('Encrypted file written to disk!');
          });
        }
        return false;
    };
})();
