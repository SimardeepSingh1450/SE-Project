import { Form, Link, useLoaderData } from 'react-router-dom'
// import background from '../assets/space.jpg'
import backgroundVideo from './background.mp4'
// import Popup from '../Popup'
import Popup from '../Popup/Popup'
import { useMemo, useState, useEffect } from 'react'
import "./style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min"
import './profile.css'
import ButtonAppBar from '../Navbar/navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


async function getData() {
    const user = {
        name: 'test User',
        location: 'Punjab, India',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        rank: '7755',
        wins: '10',
        losses: '12'
    }

    const temp = await fetch('https://randomuser.me/api/?inc=name,picture,location&results=30')
    const data = await temp.json()
    let data5 = data.results;
    if (data5.length <3)
    {
        data5 = data5.slice(0,data5.length)
    }
    else
    {
        data5 = data5.slice(0,3)
    }
    const friends = data5;

    const games = [
        {
            name: 'jaskaran',
            status: 'win',
            datePlayed: '24 Sept, 2023'
        },
        {
            name: 'singh',
            status: 'loss',
            datePlayed: '24 Sept, 2023'
        },
        {
            name: 'simardeep',
            status: 'loss',
            datePlayed: '24 Sept, 2023'
        },
        {
            name: 'chirag',
            status: 'win',
            datePlayed: '24 Sept, 2023'
        },
        // {
        //     name: 'singla',
        //     status: 'win',
        //     datePlayed: '24 Sept, 2023'
        // },
    ]
    return {user, friends, games}

}


export default function Profile() {
    const cookies = new Cookies();
    const playerID = cookies.get("userId");
    const playerUsername = cookies.get("username");
    const navigate = useNavigate();

    // const {user, friends, games} = await getData();
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const [games, setGames] = useState([]);
    const [openEditPopup,setOpenEditPopup] = useState(false);
    const [userInfo,setUserInfo] = useState();
    const [userStats,setUserStats] = useState();
    const [gameHistory,setGameHistory] = useState();
    const [idMap,setIdMap] = useState();

    const fetchPlayerInfo = async()=>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const data = await fetch('http://localhost:3005/user/fetchUserInfo', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify({playerID:playerID})
        })


        const res = await data.json();
        console.log('UserInfo is :',res.userInfo);
        setUserInfo(res.userInfo);
    }

    const checkFn = async()=>{
        const res = await axios.get('http://localhost:3005/loggedIn',{withCredentials:true});
        if(!res.data.loggedIn){
            navigate("/loginPage");
            console.log('Did not pass restrictToLoginUsers code :',res.data);
        }
    }

    const fetchPlayerStats = async()=>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const data = await fetch('http://localhost:3005/stats/fetchStats', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify({playerID:playerID})
        })


        const res = await data.json();
        console.log('Player Stats are:',res.playerStats);
        setUserStats(res.playerStats);
    }

    const fetchGameHistory = async()=>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const data = await fetch('http://localhost:3005/history/fetchHistory', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify({playerID:playerID})
        })


        const res = await data.json();
        console.log('Gaming history of player is :',res.history);
        //setting the value
        setGameHistory(res.history);
        setIdMap(res.idMap);
    }


    useEffect(() => {
        checkFn();
    //     async function temp () {const {user, friends, games} = await getData(); 
    //         setUser(user);
    //         setFriends(friends);
    //         setGames(games)
    //     }
    // temp()

    fetchPlayerInfo();
    fetchPlayerStats();
    fetchGameHistory();
    }, [])

    return (

        <>
        {/* <img src={background} className="profile-background"/> */}
        <video playsInline autoPlay muted loop className='profile-background'>
            <source src={backgroundVideo} type="video/mp4"/>
        </video>

        <ButtonAppBar/>
        

        <div className='main-profile-div'>
        <div className="container pt-4 gap-3" id='container-blur'>
        <div className='container-blur'>
            <div className="row pb-3">
                <div className="col-3  " id='ongabunga'>
                    <div className='profile-pic-container'>
                        <img src="https://res.cloudinary.com/dv7jje0bw/image/upload/v1700427015/Software-Engineering-MP-Game/gamelogo_qeq6xq.jpg" className="profile-pic img-fluid"/>
                    </div>
                        
    
                </div>
                <div className="col-5 pt-4">
                    <div className="profile-baseInfo">
                        <div className=""><h3>Username : <span style={{color:'yellow'}}>{playerUsername}</span></h3></div>         
                        <div className=""><h4>E-Mail : <span style={{color:'yellow'}}>{userInfo?userInfo.email : ""}</span></h4></div>    
                        <div className=""><h4>PlayerID : <span style={{color:'yellow'}}>{userInfo?userInfo.PlayerID : ""}</span></h4></div>    
                    </div>
                    {/* <div className="profile-summary">
                        <div>{user.summary}</div>
                    </div> */}
                </div>
                <div className="col-4 statsDiv">
                    <h3 className='profileStats'>Wins: <span style={{color:'#66ff00'}}>{userStats?userStats.wins:""}</span></h3>
                    <h3 className='profileStats'>Losses: <span style={{color:'red'}}>{userStats?userStats.losses:""}</span></h3>
                    <h3 className='profileStats'>Games: <span style={{color:'#00C0A3'}}>{userStats?userStats.gamesPlayed:""}</span></h3>
                    {/* <Form>
                        <button onClick={()=>setOpenEditPopup(true)} type="submit" className="btn btn-outline-primary mt-auto edit-profile-button">Edit Profile</button>
                    </Form> */}
                </div>
            </div>

            <div className='row pb-3'>
                <div className='col ps-5'>
                    <div className='profile-titles pt-2 pb-2 rounded-pill shadow-lg border-dark-subtle d-flex justify-content-center'>Recent Games Played</div>
                    {gameHistory?gameHistory.map((obj) => {
                        return <div key={obj._id} className='mt-4 mb-4'>
                                    {obj.gameStatus == "loss" ? <div className='row gamesPlayed d-flex align-items-center shadow-lg'>
                                        {/* <div className='col'> */}
                                            <div className='col'><span className='mute-text'>Played Against:</span> {idMap[obj.winnerID]}</div>
                                            <div className='col'><span className='mute-text'>Date Played:</span> {obj.date?obj.date.slice(0,15):""}</div>
                                        {/* </div> */}
                                        <div className='col text-center'>
                                            <span className={obj.gameStatus == 'win' ? 'winGame' : 'looseGame'}>{obj.gameStatus}</span>
                                        </div>
                                    </div> : obj.gameStatus == "win" ? <div className='row gamesPlayed d-flex align-items-center shadow-lg'>
                                        {/* <div className='col'> */}
                                            <div className='col'><span className='mute-text'>Played Against:</span> {idMap[obj.loserID]}</div>
                                            <div className='col'><span className='mute-text'>Date Played:</span> {obj.date?obj.date.slice(0,15):""}</div>
                                        {/* </div> */}
                                        <div className='col text-center'>
                                            <span className={obj.gameStatus == 'win' ? 'winGame' : 'looseGame'}>{obj.gameStatus}</span>
                                        </div>
                                    </div> : <div className='row gamesPlayed d-flex align-items-center shadow-lg'>
                                        {/* <div className='col'> */}
                                            <div className='col'><span className='mute-text'>Played Against:</span> {idMap[obj.loserID]}</div>
                                            <div className='col'><span className='mute-text'>Date Played:</span> {obj.date?obj.date.slice(0,15):""}</div>
                                        {/* </div> */}
                                        <div className='col text-center'>
                                            <span className="tieGame" style={{color:'yellow'}}>{obj.gameStatus}</span>
                                        </div>
                                    </div> }
                                </div>
                        
                    }):<></>}
                    
                    
                </div>




                {/* <div className='col-4'>
                    <div className='profile-titles pt-2 pb-2 rounded-pill shadow-lg border-dark-subtle d-flex justify-content-center'>Friends List</div>
                    {friends.map((obj) => {
                        const name = obj.name.title + ' ' + obj.name.first + ' ' + obj.name.last;
                        const picurl = obj.picture.large
                        const key = obj.location.coordinates.latitute + obj.location.coordinates.longitude
                        return <div className='friends-list-profile-page' key={key}>
                                    <Link to={`/profile/${name}`} className='friends-link fw-bold'>
                                    <img src={picurl} className="friend-image "/>
                                        {name}
                                    </Link>
                                </div>
                    })}
                    
                </div> */}
            </div>

            {/*Open Pop-Up Component */}
            {/* <Popup openPopup={openEditPopup} setOpenPopup={setOpenEditPopup}/> */}

        </div>
        </div>
        </div>

        </>
    )
}