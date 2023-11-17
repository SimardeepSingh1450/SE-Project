import React from 'react'

const Sqaure = ({chooseSquare,val}) => {
    const circleComponent = <div className="circle">O</div>;
    const crossComponent = <div className="cross">X</div>;
  return (
    <div onClick={chooseSquare} className="square">
    {val==="X"?crossComponent:val==="O"?circleComponent:""}        
    </div>
  )
}

export default Sqaure