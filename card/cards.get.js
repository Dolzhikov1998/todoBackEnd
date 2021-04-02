const express = require('express')
const Router = express.Router()
const { Task } = require('../models')

const router = Router.get('/card', async (req, res) => {

    const param = {
        where: {},
        order: [],
    }
    
    console.log(req.query.page)

    if (req.query.done)
        param.where = { done: req.query.done }
    if (req.query.order)
        param.order.push(['createdAt', `${req.query.order}`])
    

    const cards = await Task.findAll(param)
    res.send(cards)

})

module.exports = router