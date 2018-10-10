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
            users.addLoginEntry(user.email);
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
            let from = +req.query.from;
            const limit = +req.query.limit;

            const allUsers = users.getUsers();

            if (from > allUsers.length) {
                from = allUsers.length - limit;
            }

            const hasPrev = from > 0;
            const hasNext = from + limit < allUsers.length;
            const slicedUsers = allUsers.slice(from, from + limit);

            res.json({
                users: slicedUsers.map(user => {
                    return {
                        email: user.email,
                        id: user.id
                    }
                }),
                hasNext,
                hasPrev
            });
        }
    });
});

router.get('/user', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const id = req.query.id;
            const user = users.getUsers().find(user => user.id === id);
            if (user) {
                res.json({
                    email: user.email,
                    id: user.id,
                    logins: user.logins || []
                });
            } else {
                res.sendStatus(404);
            }
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

router.post('/delete-user', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const success = users.deleteUser(req.body.id);
            if (success) {
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        }
    });
});

router.post('/recovery', function (req, res) {
    const email = req.body.email;
    recovery.recover(email);
    res.sendStatus(200);
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
