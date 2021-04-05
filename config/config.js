
module.exports = {     
    "database": "d6k84om0ofqveo",
    "host": "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
    "dialect": "postgres",
    "username": 'fnholjatfgwlvu',
    "password": '65e9f77f66fbe1354efa916f8ee68b7ca032d05bbc8a80d1e1da8cc153bf3764',
    "port": 5432,
    "URI": process.env.DATABASE_URL,
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
      }
}
