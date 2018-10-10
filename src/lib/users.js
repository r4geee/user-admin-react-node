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


const doWriteFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const ensureFileExits = () => {
    if (!fs.existsSync(filePath)) {
        fs.ensureFileSync(filePath);
        doWriteFile([]);
    }
};

const writeFile = (data) => {
    ensureFileExits();
    doWriteFile(data);
};

const readFile = () => {
    ensureFileExits();
    return JSON.parse(fs.readFileSync(filePath));
};

const findUserBy = (fieldName, fieldValue) => {
    const users = readFile();
    return users.find(user => user[fieldName] === fieldValue);
};

usersModule.getUsers = () => {
    return new Promise((resolve) => {
        resolve(readFile())
    });
};

usersModule.addUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        const pw = userData.password;
        delete userData.password;
        if (!!findUserBy('email', userData.email)) {
            reject("User already exists");
        }
        if (!password.validatePassword(pw)) {
            reject("Invalid password");
        }

        userData.passwordHash = md5(pw);

        userData.id = uuidv1();
        const users = await this.getUsers();
        users.push(userData);
        writeFile(users);

        email.sendEmail(userData.email, 'Account created', 'Password:', pw);
        resolve()
    });

};

usersModule.deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        const userToDelete = findUserBy('id', userId);
        if (!userToDelete) reject("User not found");

        const allUsers = await this.getUsers();
        writeFile(allUsers.filter(u => u.id !== userId));

        email.sendEmail(userToDelete.email, 'Account deleted', 'Notification', 'Your account has been deleted');
        resolve();
    });
};

usersModule.checkUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        const users = await this.getUsers();
        const passwordHash = md5(userData.password);
        if (!!users.find(user => user.email === userData.email && user.passwordHash === passwordHash)) {
            resolve();
        }
        else {
            reject('User validation failed');
        }
    });
};

usersModule.checkUserExists = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        const users = await this.getUsers();
        if (!!users.find(user => user.email === userEmail)) {
            resolve();
        }
        else {
            reject("User not found")
        }
    });
};

usersModule.changeUserPassword = (userEmail, newPassword) => {
    return new Promise(async (resolve, reject) => {
        const users = await this.getUsers();
        let found = false;
        users.forEach((user) => {
            if (user.email === userEmail) {
                found = true;

                user.passwordHash = md5(newPassword);
            }
        });

        if (!found) reject("User not found");
        writeFile(users);
        resolve();
    });
};

usersModule.addLoginEntry = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        const users = await this.getUsers();
        let found = false;
        users.forEach((user) => {
            if (user.email === userEmail) {
                found = true;

                if (!user.logins) {
                    user.logins = [];
                }

                user.logins.push(moment().format('DD-MM-YYYY hh:mm:ss'));
            }
        });

        if (!found) reject("User not found");
        writeFile(users);
        resolve();
    });

};
