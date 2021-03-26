const fs = require('file-system')
const express = require('express')


const Router = express.Router()

const filePath = 'cards.json'


const router = Router.post('/', function(req,res){
    if(!req.body.name){
        return res.status(400).send("Dont name task")
    } 
    else{
        const content  = fs.readFileSync(filePath, 'utf8')     
        const cards = JSON.parse(content)

        cards.push({id: Math.floor(Math.random()*1000000000000000), 
            date: new Date(), 
            done:false, 
            name: req.body.name})
            fs.writeFileSync(filePath, JSON.stringify(cards), err => {
                if(err){
                    res.send(err)
                }
            })        
    } 
})

module.exports = router