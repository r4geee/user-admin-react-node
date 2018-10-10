const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('./users');
const recovery = require('./recovery');

function verifyToken (req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.sendStatus(403);
    }
    else {
        req.token = authToken;
        next();
    }
}

router.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    jwt.sign({ user }, 'secretkey', { expiresIn: '10m' }, (err, token) => {
        if (err) {
            res.sendStatus(403);
        }
        users.checkUser(user.email, user.password)
            .then(() => {
                return users.addLoginEntry(user.email);
            })
            .then(() => {
                res.json({ token });
            })
            .catch((error) => {
                res.status(403).send(error);
            });
    });
});

router.get('/users', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            let from = +req.query.from;
            const limit = +req.query.limit;

            const allUsers = await users.getUsers();

            if (from > allUsers.length) {
                from = allUsers.length - limit;
            }

            const hasPrev = from > 0;
            const hasNext = from + limit < allUsers.length;
            const slicedUsers = allUsers.slice(from, from + limit);

            res.json({
                users: slicedUsers.map((user) => {
                    return {
                        email: user.email,
                        id: user.id
                    };
                }),
                hasNext,
                hasPrev
            });
        }
    });
});

router.get('/user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            const { id } = req.query;
            const requestedUser = (await users.getUsers()).find(user => user.id === id);
            if (requestedUser) {
                res.json({
                    email: requestedUser.email,
                    id: requestedUser.id,
                    logins: requestedUser.logins || []
                });
            }
            else {
                res.sendStatus(404);
            }
        }
    });
});

router.post('/new-user', (req, res) => {
    const { email, password } = req.body;
    users.addUser(email, password)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.status(403).send(error);
        });
});

router.post('/delete-user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            users.deleteUser(req.body.id)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.status(403).send(error);
                });
        }
    });
});

router.post('/recovery', (req, res) => {
    const { email } = req.body;
    recovery.recover(email)
        .then(() => {
            res.sendStatus(200);
        });
});


module.exports = router;
