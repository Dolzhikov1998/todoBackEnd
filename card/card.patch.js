const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator')

const filePath = 'cards.json'

const router = Router.patch('/:id', body('name').isString(),body('done').isBoolean(), function(req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCards = cards.map(item =>{
        if(item.uuid === Number(idCard))
        {
            item =  {...item, ...req.body}
            return item
        }
        return item
    })
    fs.writeFileSync(filePath, JSON.stringify(newCards), err => {
        if(err) return res.status(400).send("Task can't deleted")
    })
    res.send(newCards)
})

module.exports = router