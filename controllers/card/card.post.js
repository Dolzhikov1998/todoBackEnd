const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt_decode = require('jwt-decode')

const { auth } = require('../../auth')
const { Task } = require('../../models')

const router = Router.post('/card', auth,
    body('name').isString(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const token = req.headers.token
            const decodeToken = jwt_decode(token)




            const resultCheckingName = await Task.findOne({
                where: {
                    name: req.body.name,
                    uuidUser: decodeToken.uuid
                }
            })
            if (resultCheckingName) {
                return res.status(400).send('Task already exists')
            }

            const card = await Task.create({ name: req.body.name, uuidUser: decodeToken.uuid });
            const countCards = await Task.findAndCountAll({ where: { uuidUser: decodeToken.uuid } })

            res.send({ card, countCards })
        } catch (e) {
            console.log(e);
        }

    })

module.exports = router