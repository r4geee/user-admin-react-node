const fs = require('fs-extra');
const path = require('path');

const uuidv1 = require('uuid/v1');

const usersModule = module.exports;

const dirPath = path.resolve(__dirname, '..', 'data');
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

function checkNewUser(userData) {
    const users = readFile();
    const userExits = !!users.find(user => user.email === userData.email);
    return !userExits;
}

usersModule.getUsers = () => {
    return readFile();
};

usersModule.addUser = (userData) => {
    if (!checkNewUser(userData)) return;

    userData.id = uuidv1();
    const users = readFile();
    users.push(userData);
    writeFile(users);
    return true;
};

usersModule.checkUser = (userData) => {
    const users = this.getUsers();
    return !!users.find(user => user.email === userData.email && user.password === userData.password);
};
