const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'cards.json'

const router = Router.delete('/:id', function(req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const newCards = cards.filter(item => item.id !== Number(idCard))

    fs.writeFileSync(filePath, JSON.stringify(newCards))
    const newContent  = fs.readFileSync(filePath, 'utf8')
    const newReadyCards = JSON.parse(newContent)
    res.send(newReadyCards)
})

module.exports = router