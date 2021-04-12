const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

module.exports.auth = (req, res, next) => {    
    const token = req.headers.token

    if (token === null) return res.status(401).send('Token not provided')

    let tokenData;
    try {
        tokenData =  jwt.verify(token, process.env.TOKEN_SECRET); 
        console.log(tokenData);
    } catch(e) {
        return res.status(401).send('Invalid or expired token')
    }
    
    res.locals.userId = tokenData.uuid;
    
    next();
}