const express = require('express')
const Router = express.Router()
const { Task } = require('../models')

const router = Router.get('/card', async (req, res) => {

    // const param = {
    //     where: {},
    //     order: [],
    //     offset: req.query.page * 5,
    //     limit: 5
    // }
    
    // if (req.query.done)
    //     param.where = { done: req.query.done }
    // if (req.query.order)
    //     param.order.push(['createdAt', `${req.query.order}`])


    // const cards = await Task.findAndCountAll(param)

    res.send("sadasdasdasd")

})

module.exports = router