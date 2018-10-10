const fs = require('fs-extra');
const path = require('path');

const uuidv1 = require('uuid/v1');
const moment = require('moment');
const md5 = require('md5');

const password = require('./password');
const email = require('./email');

const usersModule = module.exports;

const dirPath = path.resolve(__dirname, '../../data');
const filePath = path.resolve(dirPath, 'users.json');

function ensureFileExits() {
    if (!fs.existsSync(filePath)) {
        fs.ensureFileSync(filePath);
        writeFile([]);
    }
}

function readFile() {
    ensureFileExits();
    return JSON.parse(fs.readFileSync(filePath));
}

function writeFile(data) {
    ensureFileExits();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

function findUserBy(fieldName, fieldValue) {
    const users = readFile();
    return users.find(user => user[fieldName] === fieldValue);
}


usersModule.getUsers = () => {
    return readFile();
};

usersModule.addUser = userData => {
    const pw = userData.password;
    delete userData.password;

    if (!!findUserBy('email', userData.email) || !password.validatePassword(pw)) return false;

    userData.passwordHash = md5(pw);

    userData.id = uuidv1();
    const users = this.getUsers();
    users.push(userData);
    writeFile(users);

    email.sendEmail(userData.email, "Account created", "Password:", pw);
    return true;
};

usersModule.deleteUser = userId => {
    const user = findUserBy('id', userId);
    if (!user) return;

    const users = this.getUsers();
    writeFile(users.filter(user => user.id !== userId));

    email.sendEmail(user.email, "Account deleted", "Notification", "Your account has been deleted");
    return true;
};

usersModule.checkUser = (userData) => {
    const users = this.getUsers();
    const passwordHash = md5(userData.password);
    return !!users.find(user => user.email === userData.email && user.passwordHash === passwordHash);
};

usersModule.checkUserExists = (userEmail) => {
    const users = this.getUsers();
    return !!users.find(user => user.email === userEmail);
};

usersModule.changeUserPassword = (userEmail, newPassword) => {
    const users = this.getUsers();
    let found = false;
    users.forEach(user => {
        if (user.email === userEmail) {
            found = true;

            user.passwordHash = md5(newPassword);
        }
    });

    if (!found) return;
    writeFile(users);
};

usersModule.addLoginEntry = userEmail => {
    const users = this.getUsers();
    let found = false;
    users.forEach(user => {
        if (user.email === userEmail) {
            found = true;

            if (!user.logins) {
                user.logins = [];
            }

            user.logins.push(moment().format('DD-MM-YYYY hh:mm:ss'));
        }
    });

    if (!found) return;
    writeFile(users);
};
