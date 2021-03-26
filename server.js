const fs = require('file-system')
const express = require('express')

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/cards", require('./card/cards.get'));
app.use("/api/cards", require('./card/cards.post'));

app.use("/api/card", require('./card/card.patch'));
app.use("/api/card", require('./card/card.get'));
app.use("/api/card", require('./card/card.delete'));



app.listen(PORT,()=>{
    console.log("Сервер ожидает подключения...");
})