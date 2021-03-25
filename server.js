const fs = require('file-system')
const express = require('express')

const app = express()

const PORT = 3000
const filePath = 'cards.json'


const cardRouter = express.Router()
const cardsRouter = express.Router()

app.use("/api/card", cardRouter);
app.use('/api/cards', cardsRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

cardRouter.get('/:id', function (req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const card = cards.filter(item => item.id === Number(idCard))
    if(card)
        res.send(card)
    else
        res.status(404).send("User not found")
})

cardRouter.delete('/:id', function(req, res){
    const idCard = req.params.id
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    const newCards = cards.filter(item => item.id !== Number(idCard))

    fs.writeFileSync(filePath, JSON.stringify(newCards))
    const newContent  = fs.readFileSync(filePath, 'utf8')
    const newReadyCards = JSON.parse(newContent)
    res.send(newReadyCards)
})

cardRouter.patch('/:id', function(req, res){
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

cardsRouter.get('/', function (req, res){
    const content  = fs.readFileSync(filePath, 'utf8')
    const cards = JSON.parse(content)
    if(cards)
        res.send(cards)
    else
        res.status(404).send("Content not found")
})



cardsRouter.post('/', function(req,res){
    if(!req.body){
        return response.sendStatus(400)
    } 
    else{ 
        if(req.body){
            const content  = fs.readFileSync(filePath, 'utf8')      
            const cards = JSON.parse(content)    
            cards.push({id:1, date: new Date(), ...req.body})
            // cards.push(req.body)
            fs.writeFileSync(filePath, JSON.stringify(cards))
        }
        else {
            res.status(404).send("Card not add!")
        }
        
    }
})


app.listen(PORT,()=>{
    console.log("Сервер ожидает подключения...");
})