export default function TicTacToe() {
    return (
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
    );
  }
  