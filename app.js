const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project'


const app = express();

mongoose.connect(url, {useNewUrlParser:true,  useUnifiedTopology: true }, (err)=>{
    if(err) console.log(err);
    console.log('Connected');
})

//app setting

app.use(express.urlencoded({extended: false}));


//route
app.use('/', require('./api/joblist'))
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})