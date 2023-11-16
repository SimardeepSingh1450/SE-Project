import { Form, Link, useLoaderData } from 'react-router-dom'
import background from '../assets/space.jpg'
import backgroundVideo from '../assets/background.mp4'
import Popup from '../components/Popup'
import { useMemo, useState } from 'react'

export async function loader({params}) {
    const user = {
        name: params.userName,
        location: 'Punjab, India',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        rank: '7755',
        wins: '10',
        losses: '12'
    }

    const temp = await fetch('https://randomuser.me/api/?inc=name,picture,location&results=30')
    const data = await temp.json()
    let data5 = data.results;
    if (data5.length <5)
    {
        data5 = data5.slice(0,data5.length)
    }
    else
    {
        data5 = data5.slice(0,5)
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
        {
            name: 'singla',
            status: 'win',
            datePlayed: '24 Sept, 2023'
        },
    ]

    return {user, friends, games}

}


export default function Profile() {

    const {user, friends, games} = useMemo(()=>useLoaderData(),[]);
    const [openEditPopup,setOpenEditPopup] = useState(false);


    return (

        <>
        {/* <img src={background} className="profile-background"/> */}
        <video playsInline autoPlay muted loop className='profile-background'>
            <source src={backgroundVideo} type="video/mp4"/>
        </video>

        <div className='main-profile-div'>
        <div className="container pt-4 gap-3" id='container-blur'>
        <div className='container-blur'>
            <div className="row pb-5">
                <div className="col-3 d-flex justify-content-center " id='ongabunga'>
                    <div className='profile-pic-container'></div>
                        <img src="https://avatars.akamai.steamstatic.com/a2206a6601be3c539e00d8b4090512767462a190_full.jpg" className="profile-pic img-fluid"/>
    
                </div>
                <div className="col-5">
                    <div className="profile-baseInfo">
                        <div className=""><h3>{user.name}</h3></div>         
                        <div className="">{user.location}</div>    
                    </div>
                    <div className="profile-summary">
                        <div>{user.summary}</div>
                    </div>
                </div>
                <div className="col-4">
                    <h5>Global Rank: #{user.rank}</h5>
                    <h5>Wins: {user.wins}</h5>
                    <h5>Losses: {user.losses}</h5>
                    <Form>
                        <button onClick={()=>setOpenEditPopup(true)} type="submit" className="btn btn-outline-primary mt-auto edit-profile-button">Edit Profile</button>
                    </Form>
                </div>
            </div>

            <div className='row pb-3'>
                <div className='col ps-5'>
                    <div className='profile-titles pt-2 pb-2 rounded-pill shadow-lg border-dark-subtle d-flex justify-content-center'>Recent Games Played</div>
                    {games.map((obj) => {
                        return <div key={obj.name} className='mt-4 mb-4'>
                                    <div className='row gamesPlayed d-flex align-items-center shadow-lg'>
                                        <div className='col-7'>
                                            <div className='row d-inline-block'><span className='mute-text'>Played Against:</span> {obj.name}</div>
                                            <div className='row d-inline-block'><span className='mute-text'>Date Played:</span> {obj.datePlayed}</div>
                                        </div>
                                        <div className='col'>
                                            <span className={obj.status === 'win' ? 'winGame' : 'looseGame'}>{obj.status}</span>
                                        </div>
                                    </div>
                                </div>
                        
                    })}
                </div>




                <div className='col-4'>
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
                    
                </div>
            </div>

            {/*Open Pop-Up Component */}
            <Popup openPopup={openEditPopup} setOpenPopup={setOpenEditPopup}/>

        </div>
        </div>
        </div>

        </>
    )
}