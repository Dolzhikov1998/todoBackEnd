const fs = require('file-system')
const express = require('express')
const morgan = require('morgan');
const klawSync = require('klaw-sync');
const path = require('path')

const db = require('./models/index')

const app = express()

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

async function useControllers() {
    const paths = klawSync(`${__dirname}/card`, { nodir: true });
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/api', require(`${file.path}`));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};


app.use(express.static('card'));

useControllers()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
})