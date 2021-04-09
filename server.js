const express = require('express')
const morgan = require('morgan');
const klawSync = require('klaw-sync');
const path = require('path')
require('dotenv').config();

const app = express()

const cors = require('cors')

app.use(morgan('tiny'));
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

async function useControllers() {
    const paths = klawSync(`${__dirname}/controllers`, { nodir: true });
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/api', require(`${file.path}`));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};

useControllers()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
})