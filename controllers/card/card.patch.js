const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { Task } = require('../../models')

const { auth } = require('../../auth')


const router = Router.patch('/card/:id', auth,
    body('name').isString(),
    body('done').isBoolean(),

    async (req, res) => {
        const idCard = req.params.id

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const card = await Task.update({
            name: req.body.name,
            done: req.body.done
        },
            { where: { uuid: idCard } })
            
        res.send(card)
    })

module.exports = router