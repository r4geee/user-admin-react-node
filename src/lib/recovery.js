const email = require('./email');
const password = require('./password');
const users = require('./users');

const recovery = module.exports;

recovery.recover = emailAddress => {
    if (!users.checkUserExists(emailAddress)) return;

    const newPassword = makeNewPassword(emailAddress);
    email.sendEmail(emailAddress, "Password recovery", "New password:", newPassword);
};

function makeNewPassword (emailAddress) {
    const newPassword = password.generatePassword();
    users.changeUserPassword(emailAddress, newPassword);
    return newPassword;
}
