import React from 'react'
import './GamePage.css'
import TicTacToe from '../TicTacToe/tictactoe'

const GamePage = () => {
  return (
    <div className='d-flex align-items-center justify-content-center flex-column'>
        <h1>Tic-Tac-Toe Game</h1>
        <h1>You are playing as: User1</h1>
        <h1>Your opponent is: User2</h1>

        <br/>

        <h1>User1's Turn</h1>

        <br/>

        <p id="enterName">Enter your name:</p>
        <input type='text' placeholder='Enter your Name' id='name'/>

        <button>Search for a player</button>

        <div id="bigCont">
            <div id="cont">

                <div className="tictactoe">
                    <div className="square-row">
                    <div className="square">
                        <div className="cross">X</div>
                    </div>
                    <div className="square"></div>
                    <div className="square"> <div className="circle">O</div></div>
                    </div>
                    <div className="square-row">
                    <div className="square">
                    
                    </div>
                    <div className="square">
                    <div className="circle">O</div>
                    </div>
                    <div className="square">
                        <div className="cross">X</div>
                    </div>
                    </div>
                    <div className="square-row">
                    <div className="square">
                    <div className="circle">O</div>
                    </div>
                    <div className="square"></div>
                    <div className="square">
                    <div className="cross">X</div>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default GamePage