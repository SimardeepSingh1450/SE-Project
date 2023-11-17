import React from 'react'
import './GamePage.css'
import {useState} from 'react';
import Board from '../Board/Board';

const GamePage = ({channel,setChannel}) => {
    const [result,setResult] = useState({winner:"none",state:"none"});

    // console.log('Channel in GamePage:',channel);
    const [playersJoined,setPlayersJoined] = useState(channel.state.watcher_count===2);

    channel.on("user.watching.start",(event)=>{
        setPlayersJoined(event.watcher_count === 2);
    });

    if(!playersJoined){
        return <div className='waiting-lobby-msg'>Waiting for other player to join...</div>
    }

  return (
    <div>
        <Board setChannel={setChannel} result={result} setResult={setResult}/>
    </div>
  )
}

export default GamePage