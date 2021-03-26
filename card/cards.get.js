const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'cards.json'

const router = Router.get('/', function (req, res){
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    if(cards.length > 0){
        res.send(cards)
    } else
        res.status(404).send("Content not found")
})

module.exports = router