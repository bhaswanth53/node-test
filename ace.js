const hat = require('hat')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

// console.log(hat())

bcrypt.hash(process.env.API_KEY, 10, function(err, hash) {
    console.log(hash)
});
