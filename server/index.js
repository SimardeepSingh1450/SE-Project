const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');
const cors = require('cors');
const bodyParser = require('body-parser');


//Socket.io setup
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on('connection', (socket)=> {
    console.log(socket.id);
})

//db connection
require('./config/connection');

//Importing express Routers
const userRouter = require('./routes/user');
const friendsRouter = require('./routes/friends');
const statsRouter = require('./routes/stats');
const gamingHistory = require('./routes/history');
const notificationsRouter = require("./routes/notifications");
const leaderboardRouter = require("./routes/leaderboard");

/*Middlewares*/
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","DELETE"],
    credentials:true
}));
// app.use(express.urlencoded({extended:false}));

//Using Routers
app.use('/user',userRouter);//User Login-SignUP Router
app.use('/friends',restrictToLoggedInUserOnly,friendsRouter);//Friends-List ROuter
app.use('/stats',statsRouter);
app.use('/history',gamingHistory);
app.use('/notifications',notificationsRouter);
app.use('/leaderboard',leaderboardRouter);

//Authentication Path Restricted ROUTE
app.get('/loggedIn',restrictToLoggedInUserOnly,(req,res)=>{
    return res.json({loggedIn:true});
});

app.get('/',(req,res)=>{
    res.send('Server is working');
})


server.listen(3005,()=>{
    console.log('Server is listening on PORT:3005');
})