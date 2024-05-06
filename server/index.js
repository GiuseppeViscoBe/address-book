const express = require('express')
const router = require('./routes/apiRoutes')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const cors = require('cors');

const app = express()
app.use(cors());
const port = process.env.PORT | 3000

connectDb()
app.use(express.json())
app.use('/api/contacts', router)
app.use(errorHandler)

app.listen(port, console.log("App listening on port: " + port))
