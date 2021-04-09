const express = require('express')

const Router = express.Router()
const { Task } = require('../../models')    


const { auth } = require('../../auth')

const jwt_decode = require('jwt-decode')

const router = Router.get('/card', auth, async (req, res) => {

    const param = {
        where: {},
        order: [],
        offset: req.query.page * 5,
        limit: 5
    }

    const token = req.headers.token
    const decodeToken = jwt_decode(token)
    if(decodeToken)
        param.where ={uuidUser: decodeToken.uuid}
    if (req.query.done)
        param.where = { done: req.query.done, uuidUser: decodeToken.uuid}
    if (req.query.order)
        param.order.push(['createdAt', `${req.query.order}`])


   

    // console.log('=========================')
    // console.log(decodeToken.uuid)

    const cards = await Task.findAndCountAll(param)

    res.send(cards)

})

module.exports = router