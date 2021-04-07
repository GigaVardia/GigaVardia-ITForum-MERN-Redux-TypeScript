const express = require('express');
const ForumUser = require('../MongoDB/Models/user.model')
const {check, validationResult} = require('express-validator')
const {v4} = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const router = express.Router()

require('dotenv').config();

router.post('/register',
    [
        check('email', 'Incorrect Email').isEmail(),
        check('password', 'Incorrect Password').isLength({min: 6})
    ],
    async  (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), msg: 'Not valid Email Or Password'})
            }

            const {username, email, password} = req.body

            const candidate = await ForumUser.findOne({email})

            if (candidate) {
                return res.status(400).json({msg: 'This email have already used'})
            }

            const hashedPassword = await bcrypt.hash(password, 8)
            const user = new ForumUser({username, email, password: hashedPassword, id: v4()})

            await user.save()

            res.status(201).json({msg: 'New user created'});
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.post('/login',
    [
        check('password', 'Enter correct password').exists()
    ],
    async  (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), msg: 'Not valid Email Or Password'})
            }

            const {username, password} = req.body;

            const user = await ForumUser.findOne({username});

            if (!user) {
                return res.status(400).json({msg: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({msg: 'Incorrect password'});
            }
            const token = jwt.sign(
                { userId: user.id},
                process.env.jwt,
                {expiresIn: '1h'}
            );
            return res.json({token, userId: user.id});
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

module.exports = router;
