import TicTacToe from '../TicTacToe/tictactoe'
import backgroundVideo from './assets/background.mp4'
// import "./style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min"
import './Dashboard.css'
import './tictactoe.css'
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {StreamChat} from 'stream-chat';

export default function DashBoard() {
    // const api_key = "jhw8xp9vt565";
    // const cookies = new Cookies();
    // const token = cookies.get('token');
    // const client = StreamChat.getInstance(api_key);

    const [opponentName,setOpponentName] = useState("");
    const navigate = useNavigate();

    // if(token){
    //     client.connectUser({
    //       id:cookies.get('userId'),
    //       name:cookies.get('username'),
    //       hashedPassword:cookies.get('hashedPassword'),
    //     },token).then((user)=>{
    //       console.log('getStream Account User:',user)
    //     })
    //   }

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

            <div className='main-dashbard'>
                <div className='title'>Start Game</div>
                <TicTacToe className='tictactoe'/>
                <div className='button-container'>
                    <button type="button" className='button' id='join'>Join Room/Create Game</button>
                    <input onChange={(e)=>{setOpponentName(e.target.value)}} className='game-room-input' placeholder='Enter the username of your Opponent...'/>
                    {/* <button type="button" className='button' id='rand'>Play With Random</button>
                    <button type="button" className='button' id='create'>Create Room</button> */}
                </div>
                
            </div>


        </>
    )
}