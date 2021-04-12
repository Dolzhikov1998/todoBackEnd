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

            const userLogin = await User.findOne({
                where: {
                    login: req.body.login,
                }
            })

            if (userLogin) {
                if (userLogin.password === CryptoJS.SHA256(req.body.password, process.env.WORD_SECRET).toString()) {
                    const token = jwt.sign(
                        {
                            uuid: userLogin.dataValues.uuid,
                            login: userLogin.dataValues.login
                        },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '2000s' })

                    return res.send({ msg: 'Auth success', token: token })
                }
                return res.send('Incorrect password')
            }
            return res.send('Incorrect login')

        } catch (e) {
            console.log(e)
        }


    })

module.exports = router