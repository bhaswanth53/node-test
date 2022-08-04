const { Validator } = require('node-input-validator')
const bcrypt = require('bcrypt')

// Models
const Agency = require("../models/agency")
const Client = require("../models/clients")

exports.home = (req, res) => {
    res.json({
        message: "Hello World"
    })
}

exports.add = (req, res) => {
    if(!req.headers._token) {
        return res.status(503).json({
            message: 'Unauthorized access'
        })
    }

    var apiValid = bcrypt.compareSync(process.env.API_KEY, req.headers._token)
    if(!apiValid) {
        return res.status(422).json({
            message: 'Invalid API Token'
        })
    }
    
    let formData = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        state: req.body.state,
        city: req.body.city,
        phone: req.body.phone,
        clients: req.body.clients
    }

    const v = new Validator(formData, {
        name: 'required|maxLength:255',
        address1: 'required',
        state: 'required|maxLength:255',
        city: 'required|maxLength:255',
        phone: 'required|maxLength:15',
        clients: 'array',
        'clients.*' : 'object',
        'clients.*.name' : 'required|maxLength:255',
        'clients.*.email' : 'required|email|maxLength:255',
        'clients.*.phone' : 'required|maxLength:15',
        'clients.*.bill' : 'required|decimal'
    })

    v.check().then((matched) => {
        if(matched) {
            let agency = new Agency()
            agency.name = formData.name
            agency.address1 = formData.address1
            agency.address2 = formData.address2
            agency.state = formData.state
            agency.city = formData.city
            agency.phone = formData.phone
            agency.save((err) => {
                if(err) {
                    return res.status(425).json({
                        message: "Error inserting agency to database.",
                        error: err
                    })
                }
            })

            if(formData.clients) {
                if(formData.clients.length > 0) {
                    formData.clients.forEach((item, key) => {
                        console.log(`Client ${key}`)
                        let client = new Client()
                        client.agency = agency._id
                        client.name = item.name
                        client.email = item.email
                        client.phone = item.phone
                        client.bill = item.bill
                        client.save((err) => {
                            if(err) {
                                return res.status(425).json({
                                    message: "Error inserting client to database.",
                                    error: err
                                })
                            }
                        })
                    })
                }
            }

            return res.status(200).json({
                message: 'Successfully added to database.',
            })
        } else {
            return res.status(422).json({
                message: 'Invalid form data',
                errors: v.errors
            })
        }
    })
}

exports.updateClient = (req, res) => {
    if(!req.headers._token) {
        return res.status(503).json({
            message: 'Unauthorized access'
        })
    }

    var apiValid = bcrypt.compareSync(process.env.API_KEY, req.headers._token)
    if(!apiValid) {
        return res.status(422).json({
            message: 'Invalid API Token'
        })
    }

    let formData = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        bill: req.body.bill
    }

    const v = new Validator(formData, {
        id: 'required',
        name: 'required|maxLength:255',
        phone: 'required|maxLength:15',
        email: 'required|email|maxLength:255',
        bill: 'required|decimal'
    })

    v.check().then((matched) => {
        if(matched) {
            let client = Client.findById(formData.id, (err, item) => {
                if(err) {
                    return res.status(404).json({
                        message: 'Client not found'
                    })
                } else {
                    let clt = {}
                    clt.name = formData.name
                    clt.phone = formData.phone
                    clt.email = formData.email
                    clt.bill = formData.bill

                    let query = { _id: formData.id }
                    Client.updateOne(query, clt, (err) => {
                        if(err) {
                            return res.status(425).json({
                                message: 'Error updating client in database'
                            })
                        } else {
                            return res.status(200).json({
                                message: 'Successfully updated the client'
                            })
                        }
                    })
                }
            })
        } else {
            return res.status(422).json({
                message: 'Invalid form data',
                errors: v.errors
            })
        }
    })
}

exports.get = (req, res) => {
    if(!req.headers._token) {
        return res.status(503).json({
            message: 'Unauthorized access'
        })
    }

    var apiValid = bcrypt.compareSync(process.env.API_KEY, req.headers._token)
    if(!apiValid) {
        return res.status(422).json({
            message: 'Invalid API Token'
        })
    }

    let client = Client.findOne().sort({
        'bill': -1
    }).exec((err, clt) => {
        if(err) {
            return res.status(425).json({
                message: 'Error getting client from database'
            })
        }
        let agency = Agency.findById(clt.agency, (err, agnc) => {
            if(err) {
                return res.status(425).json({
                    message: 'Error getting agency from database'
                })
            }
            
            return res.status(200).json({
                agency_name: agnc.name,
                client_name: clt.name,
                total_bill: clt.bill
            })
        })
    })
}