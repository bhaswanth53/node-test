const mongoose  = require('mongoose')

let agencySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    state: {
        type: String,
        required: true,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        maxlength: 15
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

let Agency = module.exports = mongoose.model('agency', agencySchema)