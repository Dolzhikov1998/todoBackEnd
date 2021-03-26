const fs = require('file-system')
const express = require('express')
const morgan = require('morgan');
const app = express()

const PORT = 3000
const cors = require('cors')

app.use(morgan('tiny'));
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
//   });
app.use(express.static('card'));

app.use("/api/cards", require('./card/cards.get'));
app.use("/api/cards", require('./card/cards.post'));

app.use("/api/card", require('./card/card.patch'));
app.use("/api/card", require('./card/card.get'));
app.use("/api/card", require('./card/card.delete'));



app.listen(PORT,()=>{
    console.log("Server run...");
})