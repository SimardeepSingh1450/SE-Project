const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');

//db connection
require('./config/connection');

//Importing express Routers
const userRouter = require('./routes/user');

/*In-built Middlewares */
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({extended:false}));

//Using Routers
app.use('/user',userRouter);//User Login-SignUP Router

//Authentication Path Restricted ROUTE
app.get('/loggedIn',restrictToLoggedInUserOnly,(req,res)=>{
    res.send('Logged In');
});

app.get('/',(req,res)=>{
    res.send('Server is working');
})

app.listen(3005,()=>{
    console.log('Server is listening on PORT:3005');
})