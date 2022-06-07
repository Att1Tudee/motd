const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
    
})

module.exports =  mongoose.model('motd', schema)//Note this adds 's' in end of the collection name
