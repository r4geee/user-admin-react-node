const emailService = require('./email_service');
const password = require('./password');
const users = require('./users');

const recovery = module.exports;

const makeNewPassword = (emailAddress) => {
    return new Promise((resolve, reject) => {
        const newPassword = password.generatePassword();
        users.changeUserPassword(emailAddress, newPassword)
            .then(() => {
               resolve(newPassword);
            })
            .catch(() => {
                reject()
            });
    })
};

recovery.recover = (emailAddress) => {
    return new Promise((resolve, reject) => {
        users.checkUserExists(emailAddress)
            .then(() => {
                return makeNewPassword(emailAddress);
            })
            .then((newPassword) => {
                emailService.sendEmail(emailAddress, 'Password recovery', 'New password:', newPassword);
                resolve();
            })
            .catch(() => reject("Unable to recover"));


    })
};
