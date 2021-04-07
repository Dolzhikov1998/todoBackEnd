const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { User } = require('../../models')

const router = Router.post('/user',
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const resultCheckingName = await Task.findOne({ where: { name: req.body.name } })
        // if (resultCheckingName) {
        //     res.status(400).send('Task already exists')
        // }

        const user = await User.create({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        });
        res.send(user)
    })

module.exports = router