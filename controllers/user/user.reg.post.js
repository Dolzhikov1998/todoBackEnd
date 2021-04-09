const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require("crypto")
dotenv.config();

const router = Router.post('/user/reg',
    async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const resultCheckingLogin = await User.findOne({ where: { login: req.body.login } })
            if (resultCheckingLogin) {
                res.status(400).send('User with this login already exists')
            }
            const resultCheckingEmail = await User.findOne({ where: { email: req.body.email } })
            if (resultCheckingEmail) {
                res.status(400).send('User with this email already exists')
            }

            const sha256 = crypto.createHash("sha256");
            sha256.update(String(req.body.pasword), "utf8");
            const hashPassword = sha256.digest("base64");

            // const key = CryptoJS.enc.Hex.parse(Generate_key());
            // const iv = CryptoJS.enc.Hex.parse(Generate_key());
            // const hashPassword = CryptoJS.AES.encrypt((String(req.body.pasword),key, { iv: iv }))

            // const hashPassword = crypto.AES.encrypt(req.body.pasword, "asdasdasd")

            console.log(hashPassword)

            const user = await User.create({
                login: req.body.login,
                password: hashPassword,
                email: req.body.email
            });

            const token = jwt.sign(
                { uuid: user.dataValues.uuid },
                process.env.TOKEN_SECRET,
                { expiresIn: '2000s' })

            res.send({ user: user, msg: 'Register success', token: token })
        } catch (e) {
            console.log(e)
        }


    })

module.exports = router