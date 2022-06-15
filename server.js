const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const routs=require('./router/index')


const app =express()
app.use('/grinhits.com',routs)
const port=process.env.PORT||8095
const url=process.env.URL

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>{
    console.log('connected');

}).catch((err)=>{
    console.log("Error"+err);
})

app.listen(port,()=>{
    console.log('successful run at particular port');
})