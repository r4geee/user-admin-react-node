const fs = require('fs-extra');
const path = require('path');

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const compileHtml = (title, text) => {
    const templatePath = path.resolve(__dirname, '../templates/email.handlebars');
    const fileContent = fs.readFileSync(templatePath).toString();
    const template = handlebars.compile(fileContent);
    return template({ title, text });
};

const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: CONF.mail.gmailAcc,
        pass: CONF.mail.gmailPass
    }
});

module.exports.sendEmail = (to, subject, title, text) => {
    mailTransport.sendMail({
        from: `<${CONF.mail.gmailAcc}>`,
        to,
        subject,
        html: compileHtml(title, text)
    }, (err) => {
        if (err) console.error(`Unable to send email: ${err}`);
    });
};
