const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const { Task } = require('../models')


const router = Router.get('/card/:id', async (req, res) => {
    const idCard = req.params.id
    console.log(idCard)
    const card = await Task.findAll({ where: { uuid: idCard } })
    res.send(card)
})

module.exports = router