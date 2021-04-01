const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const { Task } = require('../models')

const router = Router.delete('/card/:id', async (req, res) => {
    const idCard = req.params.id
    console.log(idCard)
    await Task.destroy({where: {uuid: idCard}})
    res.status(204).send()
})

module.exports = router