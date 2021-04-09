
// const  {jwt_decode} = require "jwt-decode"

const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { Task } = require('../../models')

const { auth } = require('../../auth')
const jwt_decode = require('jwt-decode')

const router = Router.post('/card', auth,
    body('name').isString(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const resultCheckingName = await Task.findOne({ where: { name: req.body.name } })
            if (resultCheckingName) {
                return res.status(400).send('Task already exists')
            }

            const token = req.headers.token

            const decodeToken = jwt_decode(token)

            console.log('=============================')
            console.log(decodeToken.uuid)


            const card = await Task.create({ name: req.body.name, uuidUser: decodeToken.uuid });
            const countCards = await Task.findAndCountAll()


            res.send({ card, countCards })
        } catch (e) {
            console.log(e);
        }

    })

module.exports = router