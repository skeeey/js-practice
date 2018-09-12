#!/usr/bin/env node
/*eslint no-console: ["error", { allow: ["info", "error", "log"] }] */

const program = require('commander');
const crypto = require('crypto');
const os = require('os');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const pwdFile = path.format({
    dir: os.homedir(),
    base: '.mypasswd.dat'
});

const encrypt = function(key, password) {
    let cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = function(key, encrypted) {
    let decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// console.log(decrypt('a1234', encrypt('a1234', '~`!@#$%^&*()-_+=[]{}\\|:";\'<>?,./')));
// console.log(decrypt('a1234', encrypt('a1234', 'as4gh8l;')));

program
    .version('0.1.0')
    .option('-l, --list', 'List all passwords')
    .option('-a, --add [password]', 'Add a new password')
    .option('-c, --comment [comment]', 'When adding a new password, add a comment for it')
    .parse(process.argv);

if (program.list) {
    let readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readlineInterface.question('Input your encryption key: ', function (key) {
        if (!key) {
            console.error('An encryption is required.');
            process.exit(22);
        }
        let count = 1;
        readline.createInterface({
            input: fs.createReadStream(pwdFile, 'utf8')
        }).on('line', function(line) {
            try {
                let decrypted = decrypt(key, line);
                console.info('%d) %s', count, decrypted);
                count = count + 1;
            } catch (err) {
                console.error('Your encryption key is wrong.');
                process.exit(22);
            }
        }).on('close', function() {
            process.exit(0);
        });
    });
} else if (program.add) {
    if (Object.prototype.toString.call(program.add) !== '[object String]') {
        console.error('A password is required.');
        process.exit(22);
    }
    let readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readlineInterface.question('Input your encryption key: ', function (key) {
        if (!key) {
            console.error('An encryption is required.');
            process.exit(22);
        }
        let record = program.add;
        if (program.comment) {
            record = record + ' ' + program.comment;
        }
        console.log('test', record);
        let encrypted = encrypt(key, record);
        fs.appendFile(pwdFile, encrypted + os.EOL, (err) => {
            if (err) {
                console.error(err);
            }
            console.info('The password was appended to file.');
            process.exit(0);
        });
    });
} else {
    console.error('Select an option.');
    console.error('');
    console.error('- %s', program.help());
}
