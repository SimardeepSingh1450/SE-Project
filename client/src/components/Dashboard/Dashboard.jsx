import TicTacToe from '../TicTacToe/tictactoe'
import backgroundVideo from './assets/background.mp4'
// import "./style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min"
import './Dashboard.css'
import './tictactoe.css'
import {useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function DashBoard() {
    const navigate = useNavigate();
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
                    <button type="button" className='button' id='join'>Join Room</button>
                    <button type="button" className='button' id='rand'>Play With Random</button>
                    <button type="button" className='button' id='create'>Create Room</button>
                </div>
                
            </div>


        </>
    )
}