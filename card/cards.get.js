const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const { Task } = require('../models')

const router = Router.get('/card', async (req, res) => {
    const cards =  await Task.findAll()
    console.log(cards)
    res.send(cards)
})

module.exports = router