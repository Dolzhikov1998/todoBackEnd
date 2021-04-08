const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();


const router = Router.post('/user/auth',
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)
        const resultCheckingAuth = await User.findOne({
            where: {
                login: req.body.login,
                password: req.body.password
            }
        })

        if (resultCheckingAuth) {

            const token = jwt.sign(
                { ...req.body },
                process.env.TOKEN_SECRET,
                { expiresIn: '10s' })

            res.send({ msg: 'Auth success',  token: token })
        }

        res.status(400).send('Incorrect login or password')

    })

module.exports = router