import './tictactoe.css'
import TicTacToe from '../TicTacToe/tictactoe'
import backgroundVideo from './assets/background.mp4'

export default function DashBoard() {
    return (
        <>
            <video playsInline autoPlay muted loop className='dashboard-background' id='myVideo'>
                <source src={backgroundVideo} type="video/mp4"/>
            </video>

            <div className='main-dashbard'>
                <TicTacToe />
            </div>


        </>
    )
}