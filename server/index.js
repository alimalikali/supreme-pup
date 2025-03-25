require("dotenv").config()
const express = require('express')
const cors = require('cors')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const { connectToDB } = require("./database/db")
const setupRoutes = require("./routes")


// server init
const server = express()

// database connection
connectToDB()


// middlewares
server.use(cors({ origin: process.env.ORIGIN, credentials: true, exposedHeaders: ['X-Total-Count'], methods: ['GET', 'POST', 'PATCH', 'DELETE'] }))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// Routes setup
setupRoutes(server);


server.get("/", (req, res) => {
    res.status(200).json({ message: 'running' })
})

server.listen(5000, () => {
    console.log('server [STARTED] ~ http://localhost:5000');
})