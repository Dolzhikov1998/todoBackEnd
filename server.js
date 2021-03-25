const fs = require('file-system')
const express = require('express')

const app = express();

const PORT = 3000
const filePath = 'cards.json'


app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.get('/api/card/:id', function (req, res){
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

app.delete('/api/card/:id',  function(req, res){
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

app.post('/api/cards', function(req,res){
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

app.patch('/api/card/:id', function(req, res){
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
    res.send(newCards)

    fs.writeFileSync(filePath, JSON.stringify(newCards))

})


app.listen(PORT,()=>{
    console.log("Сервер ожидает подключения...");
})