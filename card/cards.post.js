const fs = require('file-system')
const express = require('express')


const Router = express.Router()

const filePath = 'cards.json'


const router = Router.post('/', function(req,res){
    if(!req.body){
        return res.sendStatus(400)
    } 
            const content  = fs.readFileSync(filePath, 'utf8')     
            console.log(req.body)
            const cards = JSON.parse(content)   
            cards.push({id:1, date: new Date(), ...req.body})
            fs.writeFileSync(filePath, JSON.stringify(cards))
})

module.exports = router