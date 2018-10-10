const generatePassword = require('password-generator');

module.exports.generatePassword = function () {
    return generatePassword(8, false, /[\da-zA-Z]/)
};

const validPwRegex =/^[0-9a-zA-Z]{8,20}$/;
module.exports.validatePassword = function (password) {
    return validPwRegex.test(password);
};
