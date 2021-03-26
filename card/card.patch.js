const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'cards.json'

const router = Router.patch('/:id', function(req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const newCards = cards.map(item =>{
        if(item.id === Number(idCard))
        {
            return item =  {...item, ...req.body}
        }
        return item
    })
    fs.writeFileSync(filePath, JSON.stringify(newCards), err => {
        if(err)
            return res.status(400).send("Task can't deleted")
    })

})

module.exports = router