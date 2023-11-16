const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');
const cors = require('cors');
const bodyParser = require('body-parser');

//db connection
require('./config/connection');

//Importing express Routers
const userRouter = require('./routes/user');

/*Middlewares*/
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));
// app.use(express.urlencoded({extended:false}));

//Using Routers
app.use('/user',userRouter);//User Login-SignUP Router

//Authentication Path Restricted ROUTE
app.get('/loggedIn',restrictToLoggedInUserOnly,(req,res)=>{
    return res.json({loggedIn:true});
});

app.get('/',(req,res)=>{
    res.send('Server is working');
})

app.listen(3005,()=>{
    console.log('Server is listening on PORT:3005');
})