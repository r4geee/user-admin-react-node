const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('./users');
const recovery = require('./recovery');

router.post('/login', function (req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    jwt.sign({ user }, 'secretkey', { expiresIn: '10m' }, (err, token) => {
        if (users.checkUser(user) && !err) {
            res.json({ token })
        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/users', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                users: users.getUsers().map(user => {
                    return {
                        email: user.email,
                        id: user.id
                    }
                })
            });
        }
    });
});

router.post('/new-user', function (req, res) {
    const success = users.addUser(req.body);
    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

router.post('/recovery', function (req, res) {
    const email = req.body.email;
    const success = recovery.recover(email);

    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

function verifyToken(req, res, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        res.sendStatus(403);
    } else {
        req.token = authToken;
        next();
    }
}

module.exports = router;
