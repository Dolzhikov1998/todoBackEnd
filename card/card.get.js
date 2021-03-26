const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'cards.json'

const router = Router.get('/:id', function (req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const card = cards.filter(item => item.id === Number(idCard))
    if(card)
        res.send(card)
    else
        res.status(404).send("User not found")
})

module.exports = router