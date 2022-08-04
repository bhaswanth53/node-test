const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection

// Check DB Connection
db.once("open", () => {
    console.log("DB Connected")
})

// Check DB errors
db.on("error", (err) => {
    console.log(err)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Export and Use Router
const Routes = require("./routes/routes")
app.use("/", Routes)

const port = process.env.PORT || 8080

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})