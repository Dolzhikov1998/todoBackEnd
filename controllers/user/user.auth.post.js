const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { recurse } = require('file-system')
const CryptoJS = require("crypto-js")

dotenv.config();


const router = Router.post('/user/auth',
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // ПЕРЕДЕЛАТЬ ПРОВЕРКУ АВТОРИЗАЦИИ!!!!!!!!!!!!!!!!!!!
            const user = await User.findOne({
                where: {
                    login: req.body.login,
                    password: CryptoJS.SHA256(req.body.password,  process.env.WORD_SECRET).toString()
                }
            })
            /////////////////////////////////////////////
            if (user) {
                const token = jwt.sign(
                    { uuid: user.dataValues.uuid },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '2000s' })

                res.send({ msg: 'Auth success', token: token })
            }

            res.status(400).send('Incorrect login or password')

        } catch (e) {
            console.log(e)
        }


    })

module.exports = router