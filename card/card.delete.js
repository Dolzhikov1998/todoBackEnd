const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'cards.json'

const router = Router.delete('/:id', function(req, res){
    const idCard = req.params.id
    console.log(typeof(idCard))
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
        const newCards = cards.filter(item => item.uuid !== Number(idCard))
        fs.writeFileSync(filePath, JSON.stringify(newCards), err => {
            if(err)
                return res.status(400).send("Task can't deleted")
        })
        
    // const newContent  = fs.readFileSync(filePath, 'utf8')
    // const newReadyCards = JSON.parse(newContent)
    res.send(newCards)
})

module.exports = router