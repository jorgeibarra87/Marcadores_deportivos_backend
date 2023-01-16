//require('dotenv').config()
const express =require('express')
const mongoose =require('mongoose')
const bodyParser=require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const config = require('./config');

const app = express()
mongoose.Promise=global.Promise
mongoose.connect(
    config.BD,
    {useNewUrlParser:true}
    )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
try {
    app.use('/',routes())    
} catch (error) {
    console.log(error)
}


//app.get('/',(req,res)=>{
 //   res.send('mi mongo 2024')
//})
app.listen(config.PORT,()=>{
    console.log('server listen ' + config.PORT)
})