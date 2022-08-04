const mongoose = require('mongoose')

let clientSchema = mongoose.Schema({
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        maxlength: 15
    },
    bill: {
        type: Number,
        required: true
    }
})

let Client = module.exports = mongoose.model('client', clientSchema)