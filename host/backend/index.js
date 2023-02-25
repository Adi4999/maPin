require('dotenv').config()
const express= require('express')
const mongoose  =require('mongoose')
const pinRoute = require('./routes/Pins')
const userRoute = require('./routes/Users')
const app = express()
app.use(express.json())
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("DB CONNECTED")
}).catch(err=>{
    console.log(err)
})

app.post('/', (req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

app.use('/api/pins', pinRoute)
app.use('/api/users', userRoute)


if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontend/build"))
}

app.listen(process.env.PORT||8800,()=>{
    console.log("Server is running")
})
