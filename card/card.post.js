const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')
const { Task } = require('../models')

const router = Router.post('/card',
    body('name').isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const card = await Task.create({
            done: false,
            name: req.body.name
        });
        res.send(card)
    })

module.exports = router