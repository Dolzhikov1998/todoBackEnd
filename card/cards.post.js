const fs = require('file-system')
const express = require('express')
const { body, validationResult } = require('express-validator')


const Router = express.Router()

const filePath = 'cards.json'


const router = Router.post('/', body('name').isString(), function(req,res){
    if(!req.body.name) return res.status(400).send("Dont name task")
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const newCards = {uuid: Math.floor(Math.random()*1000000000000000), 
            date: new Date(), 
            done:false, 
            name: req.body.name}

        if(fs.existsSync(filePath)){
            const content  = fs.readFileSync(filePath, 'utf8')     
            const cards = JSON.parse(content)

            cards.push(newCards)

            fs.writeFileSync(filePath, JSON.stringify(cards), err => {
                if(err){
                     res.send(err)
                }
            }) 
            res.send(newCards)  
        }
        else {
            fs.appendFile(filePath, JSON.stringify([newCards]), function (err) {
                if (err) throw err
                res.send(newCards) 
            })
        }
})

module.exports = router