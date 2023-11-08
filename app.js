const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');


const app = express();

//-------------------------------------------------------------------------------------
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
//-------------------------------------------------------------------------------------


app.get('/',(req,res)=>{

    res.render('home');
})













app.listen(3000,()=>{
    console.log("Listining on port 3000");
})