const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { Task } = require('../../models')

const { auth } = require('../../auth')

const router = Router.post('/card', auth,
    body('name').isString(),
    async (req, res) => {
        try {

            console.log(res.locals.someVariable)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const resultCheckingName = await Task.findOne({ where: { name: req.body.name } })
            if (resultCheckingName) {
                return res.status(400).send('Task already exists')
            }
            const card = await Task.create({ name: req.body.name });
            const countCards = await Task.findAndCountAll()

            console.log(req.headers.token)

            res.send({ card, countCards })
        } catch (e) {
            console.log(e);
        }

    })

module.exports = router