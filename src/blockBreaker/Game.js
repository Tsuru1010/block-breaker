import React, { useState, useEffect, useRef } from 'react';

const screenWidth = 320;
const screenHeight = 500;
const ballSize = 10;
const barWidth = 80;
const barHeight = 20;
const blockWidth = screenWidth/8;
const blockHeight = 20;
const initialBallPosition = {x:160, y:470};
const initialBarPosition = {x:160, y:480};

let velocity = {x:0, y:0};

const Game = () => {
  function initializeBlocksArray(blocksArray){
    let blockLeftX;
    let blockTopY;
    let index;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        blockLeftX = j * blockWidth;
        blockTopY = i * blockHeight;
        index = i*4 + j;
        blocksArray.push({index:index, flag:true, blockLeftX:blockLeftX, blockTopY:blockTopY})
      }
    }

    return blocksArray;
  }

  function handleClickL(){
    if (barX - 1 - barWidth/2 > 0){
      setBarX(barX - 1);
      if (startedFlag === false){
        setX(x - 1);
      }
    }
  }

  function handleClickR(){
    if (barX + 1 + barWidth/2 < screenWidth){
      setBarX(barX + 1);
      if (startedFlag === false){
        setX(x + 1);
      }
    }
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

  function moveEnd(){
    setEndFlag(true);
    setVelocityX(0);
    setVelocityY(0);
  }
  
  let blocksArray = [];

  blocksArray = initializeBlocksArray(blocksArray);

  // スライドバー横位置
  const [barX, setBarX] = useState(initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(initialBallPosition.y);
  
  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(false);
  
  //ゲーム終了フラグ
  const [endFlag, setEndFlag] = useState(false);

  //ボール速度絶対値（x軸方向）
  const [velocityX, setVelocityX] = useState(0);
  
  //ボール速度絶対値（y軸方向）
  const [velocityY, setVelocityY] = useState(0);

  // 横移動フラグ（true:右に移動、false:左に移動）
  const [moveXflag, setMoveXflag] = useState(true);
        
  // 縦移動フラグ（true:下に移動、false:上に移動）
  const [moveYflag, setMoveYflag] = useState(false);

  const [blocksStates, setBlocksStates] = useState(blocksArray);

  //ボールのコンポーネント
  const Ball = (props) => {
      
    useEffect(() => {
      // 端に行ったら方向を逆にする
      if (props.y <= 0) {
        props.setMoveYflag(true);
      }
      if (props.x >= screenWidth - ballSize) {
        props.setMoveXflag(false);
      }
      if (props.y >= screenHeight - ballSize) {
        moveEnd();
      }
      if (props.x <= 0) {
        props.setMoveXflag(true);
      }
    }, [props.x, props.y, props])
    
    useEffect(() => {
      // 移動速度
      const step = setTimeout(() => 
        {
          if (props.moveXflag) {
            props.setX(props.x + velocityX);
          } else {
            props.setX(props.x - velocityX);
          }
          if (props.moveYflag) {
            props.setY(props.y + velocityY);
          } else {
            props.setY(props.y - velocityY);
          }

        }
      , 10);
  
      return () => clearTimeout(step);
  
    }, [props.x, props.y, props.moveXflag, props.moveYflag, props])
  
    const ballStyle = {
      position: "absolute",
      top: y,
      left: x,
      width: ballSize + "px",
      height: ballSize + "px",
      backgroundColor:"#000000"
    }
  
    return (
        <div style={ballStyle}></div>
    );
  }

  //スライドバー（ボールを打ち返すやつ）のコンポーネント
  const Slidebar = (props) => {
    const barStyle = {  
      position: "absolute",
      top:initialBarPosition.y,
      left: props.barX - barWidth/2,
      height:barHeight + "px",
      width:barWidth + "px",
      backgroundColor:"#000000"
    }
    
    useEffect(() => {
      const handleKeyDown = (e) => {
        switch (e.key) {
          case 'ArrowLeft': handleClickL(); break;
          case 'ArrowRight': handleClickR(); break;
          default: break;
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    }, [])

    
    useEffect(() => {
      // スライドバーの上面に当たったらy方向の向きを逆にする
      if (props.y >= (screenHeight - ballSize - barHeight) && barX - barWidth/2 <= props.x && props.x <= barX + barWidth/2) {
        props.setMoveYflag(false);
      }
    }, [props.x, props.y, props])
    

    return (
      <div style={barStyle}></div>
    )
  }

  const Block = (props) => {
    const blockStyle = {
      display: props.flag ? "inline-block" : "none",
      position: "absolute",
      top: props.blockTopY,
      left: props.blockLeftX,
      height: blockHeight + "px",
      width: blockWidth + "px",
      backgroundColor: "#00ff00",
      border: "solid 1px #ff0000",
    }

    return (
      <div style={blockStyle}></div>
    )
  }

  //ゲームディスプレイのコンポーネント
  const GameDisplay = (props) => {  

    const screenStyle = {
      //marginLeft: "auto",
      //marginRight: "auto",
      width: screenWidth + "px",
      height: screenHeight + "px",
      border:"solid 1px #000000"
    };

    return (
        <div style={screenStyle} onClick={setVelocity}>
          {props.blocksStates.map((value) => {
            return (<Block 
                      flag={value.flag}
                      blockTopY={value.blockTopY}
                      blockLeftX={value.blockLeftX} 
                    />);
          })}
          <Ball
            x={props.x}
            setX={props.setX}
            y={props.y}
            setY={props.setY}
            velocityX={props.velocityX}
            setVelocityX={props.setVelocityX}
            velocityY={props.velocityY}
            setVelocityY={props.setVelocityY}
            moveXflag={props.moveXflag}
            setMoveXflag={props.setMoveXflag}
            moveYflag={props.moveYflag}
            setMoveYflag={props.setMoveYflag}
          />
          <Slidebar
            barX={props.barX}
            setBarX={props.setBarX}
            x={props.x}
            y={props.y}
            setMoveYflag={props.setMoveYflag}
          />
          {endFlag ? <p>GameOver</p> : <p></p>}
        </div>
    );
  }

  //操作盤のコンポーネント
  const ControlPanel = (props) => {

    const panelStyle = {
      display:"float"
    }
  
    return (
      <div style={panelStyle}>
        <button onClick={props.handleClickL}>L</button>
        <button onClick={props.handleClickR}>R</button>
      </div>
    );
  }

  return (
    <div>
      <GameDisplay
        x={x}
        setX={setX}
        y={y}
        setY={setY}
        velocityX={velocityX}
        setVelocityX={setVelocityX}
        velocityY={velocityY}
        setVelocityY={setVelocityY}
        moveXflag={moveXflag}
        setMoveXflag={setMoveXflag}
        moveYflag={moveYflag}
        setMoveYflag={setMoveYflag}
        barX={barX}
        setBarX={setBarX}
        blocksStates={blocksStates}
        setBlocksStates={setBlocksStates}
      />
      <ControlPanel
        barX={barX}
        setBarX={setBarX}
        handleClickL={handleClickL}
        handleClickR={handleClickR}
      />
    </div>
  );
}
export default Game;