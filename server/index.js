const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');
const cors = require('cors');
const bodyParser = require('body-parser');

//key and secret for get-stream
const {StreamChat} = require("stream-chat");
const api_key = "jhw8xp9vt565";
const api_secret = "nmar5njkvyghnqmdmmgmzv2dv48gmsdscecgjac3cmcgjrns26nps2ykmrhnsmnb";

//GETSTREAM Client
const serverClient = StreamChat.getInstance(api_key,api_secret);

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
app.use('/friends',restrictToLoggedInUserOnly,friendsRouter);//Friends-List ROuter

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