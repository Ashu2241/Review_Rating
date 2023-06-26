require("dotenv").config();

let express = require('express')
require('./config/modelConfig')

let userRouter = require('./routes/userRoutes');
const router = require('./routes/userRoutes');

let app = express()

app.use(express.json())
app.use('/', userRouter)

app.listen(process.env.PORT,(req,res) =>{
    console.log(`The server is running on port: ${process.env.PORT}`)
})