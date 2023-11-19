import TicTacToe from '../TicTacToe/tictactoe'
import backgroundVideo from './assets/background.mp4'
// import "./style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min"
import './Dashboard.css'
import './tictactoe.css'
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import GamePage from '../GamePage/GamePage'
import {StreamChat} from 'stream-chat';
import {Channel,Chat} from 'stream-chat-react';
import ButtonAppBar from '../Navbar/navbar';

export default function DashBoard() {
    const [opponentName,setOpponentName] = useState("");
    const navigate = useNavigate();
    const api_key = "jhw8xp9vt565";
    const client = StreamChat.getInstance(api_key);

    const [channel,setChannel] = useState();

    const createChannel = async() => {
        const response = await client.queryUsers({name:{$eq:opponentName}});

        if(response.users.length==0){
            alert("User not found online...");
            return;
        }

        //else user exists and we will create a new channel
        const newChannel = client.channel("messaging",{
            members:[client.userID,response.users[0].id]
        });

        await newChannel.watch();

        setChannel(newChannel);
    }

    useEffect(()=>{
        //Now we will check wether user is logged in by checking the loggedIn route
        const checkFn = async()=>{
            const res = await axios.get('http://localhost:3005/loggedIn',{withCredentials:true});
            if(!res.data.loggedIn){
                navigate("/loginPage");
                console.log('Did not pass restrictToLoginUsers code :',res.data);
            }
        }

        checkFn();
    },[]);

    return (
        <>
            <video playsInline autoPlay muted loop className='dashboard-background' id='myVideo'>
                <source src={backgroundVideo} type="video/mp4"/>
            </video>
            
            {
                channel ? <Chat client={client}><Channel channel={channel}><GamePage setChannel={setChannel} channel={channel}/></Channel></Chat>:<>
            <ButtonAppBar/>
                
                <div className='main-dashbard'>
                <div className='title'>Start Game</div>
                <TicTacToe className='tictactoe'/>
                <div className='button-container'>
                    <button onClick={()=>{createChannel()}} type="button" className='button' id='join'>Join Room/Create Game</button>
                    <input onChange={(e)=>{setOpponentName(e.target.value)}} className='game-room-input' placeholder='Enter the username of your Opponent...'/>
                    {/* <button type="button" className='button' id='rand'>Play With Random</button>
                    <button type="button" className='button' id='create'>Create Room</button> */}
                </div>

            </div>

            </>
            }

        </>
    )
}
