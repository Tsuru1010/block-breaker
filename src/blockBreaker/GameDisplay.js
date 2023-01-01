import React, { useState, useEffect } from 'react';

let velocity = {x:0, y:0};
const screenWidth = 320;
const screenHeight = 500;
const ballSize = 10;
const initialBallPosition = {x:160, y:470};

const GameDisplay = () => {
  const screenStyle = {
    //marginLeft: "auto",
    //marginRight: "auto",
    width: screenWidth + "px",
    height: screenHeight + "px",
    border:"solid 1px #000000"
  };

  const [startedFlag, setStartedFlag] = useState(false);
  //ボール速度絶対値（x軸方向）
  const [velocityX, setVelocityX] = useState(1);
  
  //ボール速度絶対値（y軸方向）
  const [velocityY, setVelocityY] = useState(1);

  const Ball = () => {
    
    // 横位置
    const [x, setX] = useState(initialBallPosition.x);
  
    // 縦位置
    const [y, setY] = useState(initialBallPosition.y);
  
    // 横移動フラグ（true:右に移動、false:左に移動）
    const [moveXflag, setmoveXflag] = useState(true);
  
    // 縦移動フラグ（true:下に移動、false:上に移動）
    const [moveYflag, setmoveYflag] = useState(false);
  
    useEffect(() => {
      setVelocityX(velocity.x);
      setVelocityY(velocity.y);
  
      // 端に行ったら方向を逆にする
      if (y == 0) {
        setmoveYflag(true);
      }
      if (x == screenWidth - ballSize) {
        setmoveXflag(false);
      }
      if (y == screenHeight - ballSize) {
        setmoveYflag(false);
      }
      if (x == 0) {
        setmoveXflag(true);
      }
  
      // 移動速度
      const step = setTimeout(() => 
        {
          if (moveXflag) {
            setX(x + 1);
          } else {
            setX(x - 1);
          }
          if (moveYflag) {
            setY(y + 1);
            } else {
              setY(y - 1);
            }
        }
      , 10);
  
      return () => clearTimeout(step);
  
      }, [x, y, velocityX, velocityY])
  
    let screenStyle = {
      position: "absolute",
      top: y,
      left: x,
      width: ballSize + "px",
      height: ballSize + "px",
      backgroundColor:"#000000"
    }
  
    return (
        <div style={screenStyle}></div>
    );
  }
  
  function setVelocity(){
    if (startedFlag === true){
      return;
    } else {
       setStartedFlag(true);
      setVelocityX(1);
      setVelocityY(1);
    }
  }

  return (
      <div style={screenStyle}>
        <Ball />
      </div>
  );
}
export default GameDisplay;