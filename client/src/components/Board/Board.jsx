import React,{useEffect, useState} from 'react';
import Square from './Sqaure';
import { useChannelStateContext,useChatContext } from 'stream-chat-react';
import {Patterns} from './WinningPatterns';
import './Board.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Board = ({result,setResult,setChannel}) => {
    const [board,setBoard] = useState(["","","","","","","","",""]);
    const [player,setPlayer] = useState("X");
    const [turn,setTurn] = useState("X");
    const [matchEnded,setMatchEnded] = useState(false);
    // const [winnerID,setWinnerID] = useState();
    // const [looserID,setLooserID] = useState();
    const [eventUserData,setEventUserData] = useState();
    const [clientUser,setClientUser] = useState();
    const [eventUser,setEventUser] = useState();
    const [matchTied,setMatchTied] = useState(false);

    const navigate = useNavigate();


    const {channel} = useChannelStateContext();
    const {client} = useChatContext();

    //Everytime there is a change in board-state we check wether there is a winner or not
    useEffect(()=>{
        checkWin();
        checkIfTie();
    },[board]);

    const chooseSquare=async(square)=>{
        if(!matchEnded && turn === player && board[square]===""){
            setTurn(player === "X"?"O":"X");

            //sending data of the board to other player
            await channel.sendEvent({
                type:"game-move",
                data:{square,player}
            })

            setBoard(board.map((val,idx)=>{
                if(idx === square && val === ""){
                    return player;
                }

                return val;
            }));
        }
    };


    channel.on((event)=>{
        if(result.status!="won" && result.status!="tie" && event.type=="game-move" && event.user.id !== client.userID){
            const currentPlayer = event.data.player === "X" ? "O":"X";
            setPlayer(currentPlayer);// next Turn -> O-Player (client-player)
            setTurn(currentPlayer);

            console.log('Event User:',event.user);
            console.log('UESRID CLIENT:',client);
            // setWinnerID(event.user.id);
            // setLooserID(client.user.id);
            setEventUserData(event.data);
            setClientUser(client.user);// O-Player (client-player)
            setEventUser(event.user);// X-Player (event-player)

            setBoard(board.map((val,idx)=>{
                if(idx === event.data.square && val === ""){
                    return event.data.player;
                }

                return val;
            }));
        }
    })


    const checkWin = () =>{
        Patterns.forEach((currPattern)=>{
            const firstPlayer = board[currPattern[0]];
            if(firstPlayer == "") return;
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if(board[idx] != firstPlayer){
                    foundWinningPattern = false;
                }
            });

            if(foundWinningPattern){
                alert(`Game has Ended and winner is: ${board[currPattern[0]]}`);
                setResult({winner:board[currPattern[0]],status:"Won"});
                setMatchEnded(true);
            }
        })
    }

    const checkIfTie = () =>{
        let filled = true;

        board.forEach((square)=>{
            if(square==""){
                filled=false;
            }
        });

        if(filled){
            alert(`Game has Ended and it is a TIE`);
            setResult({winner:"none",state:"tie"});
            setMatchTied(true);
        }
    }

    const exitButton = ()=>{
        if(matchEnded || matchTied){
            apiCallerFn();

            //finally navigate to dashboard
            navigate("/dashboard");
        }
    }

    const apiCallerFn = async() =>{
        console.log('Inside api-caller function');

        if(matchEnded){
            //the incremenet the wins of the winner and update gaming history of both the players, then navigate to dashboard screen

            //see which player is loose and which is winner and update the stats accordingly
            if(result.winner == player){// means the eventUser is the winner
                const res = await axios.post('http://localhost:3005/stats/win',{playerID:eventUser.id});
                console.log('Msg after updating the stats of winner:',res.data);

                //now updating the gaming history of winner
                const res3 = await axios.post('http://localhost:3005/history/updateHistory',{loserID:clientUser.id,winnerID:eventUser.id,playerID:eventUser.id,winType:"win"});
                console.log('Msg after updating gaming-history of winner :',res3.data);
            }else{//client is the winner and eventUser is the looser
                //increment the loss of the looser
                const res2 = await axios.post('http://localhost:3005/stats/loss',{playerID:eventUser.id});
                console.log('Msg after updating the stats of looser:',res2.data);
                //now updating the gaming history of looser
                const res4 = await axios.post('http://localhost:3005/history/updateHistory',{loserID:eventUser.id,winnerID:clientUser.id,playerID:eventUser.id,winType:"loss"});
                console.log('Msg after updating gaming-history of looser :',res4.data);
            }
            

            setChannel(false);
            
        }else if(matchTied){//it has to be a tie, hence tie increment
            //increment tie count of both the players
            const res1 = await axios.post('http://localhost:3005/stats/tie',{playerID:clientUser.id});
            console.log('Msg after updating stats as tie :',res1.data);

            //now updating the gaming history
            const res4 = await axios.post('http://localhost:3005/history/updateHistory',{loserID:eventUser.id,playerID:clientUser.id,winnerID:clientUser.id,winType:"tie"});
            console.log('Msg after updating history as tie :',res4.data);
            
            setChannel(false);
        }
        
    }

  return (
    <div className="board">

            <div className='top-game-content'>
                <h1 className='in-game-text ingame-text-1'>You are Player: {player}</h1>
                <h1 className='in-game-text ingame-text-2'>Current Player's Turn: {turn}</h1>
            </div>

        <div className="tictactoe board-in-game">

            <br/>

            <div className="square-row">
                <Square chooseSquare={()=>{chooseSquare(0)}} val={board[0]}/>
                <Square chooseSquare={()=>{chooseSquare(1)}} val={board[1]}/>
                <Square chooseSquare={()=>{chooseSquare(2)}} val={board[2]}/>
            </div>
            <div className="square-row">
                <Square chooseSquare={()=>{chooseSquare(3)}} val={board[3]}/>
                <Square chooseSquare={()=>{chooseSquare(4)}} val={board[4]}/>
                <Square chooseSquare={()=>{chooseSquare(5)}} val={board[5]}/>
            </div>
            <div className="square-row">
                <Square chooseSquare={()=>{chooseSquare(6)}} val={board[6]}/>
                <Square chooseSquare={()=>{chooseSquare(7)}} val={board[7]}/>
                <Square chooseSquare={()=>{chooseSquare(8)}} val={board[8]}/>
            </div>

        </div>

        <br/>
      <button onClick={()=>{exitButton()}} className='game-exit-button'>Exit Lobby</button>
    </div>
  )
}

export default Board