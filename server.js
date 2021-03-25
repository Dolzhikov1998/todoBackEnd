const fs = require('file-system')
const express = require('express')
// const bodyParser = require('body-parser')

const app = express();

const PORT = 3000
const filePath = 'cards.json'


const parserJson = express.json()
const urlencoded = express.urlencoded({ extended: false })

app.get('/api/cards/:id', function (req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const card = cards.filter(item => item.id === Number(idCard))
    if(card)
        res.send(card)
    else
        res.status(404).send("User not found")
})

app.get('/api/cards', function (req, res){
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    if(cards)
        res.send(cards)
    else
        res.status(404).send("Content not found")
})

app.delete('/api/cards/:id',  function(req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const newCards = cards.filter(item => item.id !== Number(idCard))
    res.send(newCards)

     fs.writeFileSync(filePath, JSON.stringify(newCards))
     const newContent  = fs.readFileSync(filePath, 'utf8')
     res.send(newContent) 
     const newReadyCards = JSON.parse(newContent)
     res.send(newReadyCards)
    
})

app.post('/api/cards', parserJson, function(req,res){
    if(!req.body){
        return response.sendStatus(400)
    } 
    else{ 
        if(req.body){
            const content  = fs.readFileSync(filePath, 'utf8')      
            const cards = JSON.parse(content)    
            cards.push(req.body)
            fs.writeFileSync(filePath, JSON.stringify(cards))
        }
        else {
            res.status(404).send("Card not add!")
        }
        
    }
})

app.path('/api/cards/:id', parserJson, function(res, req){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    cards.filter(item =>{
        if(item.id === idCard)
        {
            
        }
    })
}
)



app.listen(PORT,()=>{
    console.log("Сервер ожидает подключения...");
})