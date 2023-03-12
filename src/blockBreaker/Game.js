import React, { useState, useEffect, useRef} from 'react';

const screenWidth = 320;
const screenHeight = 500;
const ballSize = 10;
const barWidth = 80;
const barHeight = 20;
const blockWidth = screenWidth/8;
const blockHeight = 20;
const initialBallPosition = {x:160, y:475};
const initialBarPosition = {x:160, y:480};
const blocksArray = initializeBlocksArray();

let velocity = {x:0, y:0};
let blockFlagsArray = [true, true, true, true, true, true, true, true,
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true];
let varScore = 0;
let varStartedFlag = false;
let debugCounter = 0;

function initializeBlocksArray(){
  let blocksArray = [];
  let blockLeftX;
  let blockTopY;
  let index;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      blockLeftX = j * blockWidth;
      blockTopY = i * blockHeight;
      index = i*8 + j;
      blocksArray.push({index:index, blockLeftX:blockLeftX, blockTopY:blockTopY});
    }
  }

  return blocksArray;
}

function handleClickL(barX, setBarX, startedFlag, setX, x) {
  if (barX - 5 - barWidth/2 > 0){
    setBarX(barX - 5);
    if (startedFlag === false){
      setX(x - 5);
    }
  }
}

function handleClickR(barX, setBarX, startedFlag, setX, x) {
  if (barX + 5 + barWidth/2 < screenWidth){
    setBarX(barX + 5);
    if (startedFlag === false){
      setX(x + 5);
    }
  }
}

function moveEnd(setEndFlag, setVelocityX, setVelocityY) {
  setEndFlag(true);
  setVelocityX(0);
  setVelocityY(0);
}

//ボールのコンポーネント
function Ball(props) {
      
  useEffect(() => {
    // 端に行ったら方向を逆にする
    if (props.y - ballSize/2 <= 0) {
      props.setMoveYflag(true);
    }
    if (props.x + ballSize/2 >= screenWidth) {
      props.setMoveXflag(false);
    }
    if (props.y + ballSize/2 >= screenHeight) {
      moveEnd(props.setEndFlag, props.setVelocityX, props.setVelocityY);
    }
    if (props.x - ballSize/2 <= 0) {
      props.setMoveXflag(true);
    }
  }, [props.x, props.y, props])
  
  useEffect(() => {
    // 移動速度
    const step = setTimeout(() => 
      {
        if (props.moveXflag) {
          props.setX(props.x + props.velocityX);
        } else {
          props.setX(props.x - props.velocityX);
        }
        if (props.moveYflag) {
          props.setY(props.y + props.velocityY);
        } else {
          props.setY(props.y - props.velocityY);
        }

      }
    , 10);

    return () => clearTimeout(step);

  }, [props.x, props.y, props.moveXflag, props.moveYflag, props])

  const ballStyle = {
    position: "absolute",
    top: props.y - ballSize/2,
    left: props.x - ballSize/2,
    width: ballSize + "px",
    height: ballSize + "px",
    backgroundColor:"#000000"
  }

  return (
      <div style={ballStyle}></div>
  );
}

//スライドバー（ボールを打ち返すやつ）のコンポーネント
function Slidebar(props) {
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
        case 'ArrowLeft': handleClickL(props.barX, props.setBarX, props.startedFlag, props.setX, props.x); break;
        case 'ArrowRight': handleClickR(props.barX, props.setBarX, props.startedFlag, props.setX, props.x); break;
        default: break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [props.startedFlag, props.barX])


  useEffect(() => {
    // スライドバーの上面に当たったらy方向の向きを逆にする
    if (props.y + ballSize/2 >= (screenHeight - barHeight) && props.barX - barWidth/2 <= props.x - ballSize/2 && props.x + ballSize/2 <= props.barX + barWidth/2) {
      props.setMoveYflag(false);
    }
  }, [props.x, props.y, props])
  

  return (
    <div style={barStyle}></div>
  )
}

//ブロック一つのコンポーネント
function Block(props) {
  
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

  useEffect(() => {
    
    if (props.flag){
      // ブロックに当たったら方向を逆にする
    
      //上端との衝突
      if (Math.floor(props.y) + ballSize/2 === props.blockTopY && props.blockLeftX <= props.x - ballSize/2 && props.x + ballSize/2 <= props.blockLeftX + blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(false);
        varScore++;
      }

      //左端との衝突
      if (Math.floor(props.x) + ballSize/2 === props.blockLeftX && props.blockTopY <= props.y - ballSize/2 && props.y + ballSize/2 <= props.blockTopY + blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(false);
        varScore++;
      }

      //下端との衝突
      if (Math.floor(props.y) - ballSize/2 === props.blockTopY + blockHeight &&  props.blockLeftX <= props.x - ballSize/2 && props.x + ballSize/2 <= props.blockLeftX + blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(true);
        varScore++;
      }

      //右端との衝突
      if (Math.floor(props.x) - ballSize/2 === props.blockLeftX + blockWidth && props.blockTopY <= props.y - ballSize/2 && props.y + ballSize/2 <= props.blockTopY + blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(true);
        varScore++;
      }
    }
      
  }, [props.x, props.y, props])

  useEffect(() => {
    props.setScore(varScore);
  }, [props.flag])

  return (
    <div style={blockStyle}></div>
  )
}

//ゲームディスプレイのコンポーネント
const GameDisplay = (props) => {  

  //ボール速度絶対値（x軸方向）
  const [velocityX, setVelocityX] = useState(0);
  
  //ボール速度絶対値（y軸方向）
  const [velocityY, setVelocityY] = useState(0);

  // 横移動フラグ（true:右に移動，false:左に移動）
  const [moveXflag, setMoveXflag] = useState(true);
        
  // 縦移動フラグ（true:下に移動，false:上に移動）
  const [moveYflag, setMoveYflag] = useState(false);

  const displayRef = useRef(null);

  const screenStyle = {
    //marginLeft: "auto",
    //marginRight: "auto",
    width: screenWidth + "px",
    height: screenHeight + "px",
    border:"solid 1px #000000"
  };

  useEffect(() => {
    let displayElm = displayRef.current;
    if (displayElm) {
      const setVelocity = (e) => {

        if (varStartedFlag === true){
          return;
        } else {
          const relativeClickPosition = {
            x: e.offsetX - initialBallPosition.x,
            y: e.offsetY - initialBallPosition.y
          }
  
          const hypotenuse = Math.sqrt(relativeClickPosition.x**2 + relativeClickPosition.y**2);
  
          velocity.x = relativeClickPosition.x / hypotenuse;
          velocity.y = relativeClickPosition.y / hypotenuse;
  
          if (velocity.x < 0) {
            setMoveXflag(false);
            velocity.x = -velocity.x;
          }
  
          if (velocity.y < 0) {
            setMoveYflag(false);
            velocity.y = -velocity.y;
          }
  
          varStartedFlag = true;
          props.setStartedFlag(varStartedFlag);
          setVelocityX(velocity.x);
          setVelocityY(velocity.y);
        }
      }
  
      displayElm.addEventListener('click', setVelocity);
      
      return () => {
        displayElm.removeEventListener('click', setVelocity);  
      }
    }
  }, []);

  return (
    <div>
      <div
        style={screenStyle}
        ref={displayRef}
      >
        {blocksArray.map((value, key) => {
          return (<Block
                    index={value.index}
                    blockTopY={value.blockTopY}
                    blockLeftX={value.blockLeftX}
                    flag={props.blockFlags[key]}
                    setBlockFlags={props.setBlockFlags}
                    x={props.x}
                    y={props.y}
                    score={props.score}
                    setScore={props.setScore}
                    setMoveXflag={setMoveXflag}
                    setMoveYflag={setMoveYflag}
                  />);
        })}
        <Ball
          x={props.x}
          setX={props.setX}
          y={props.y}
          setY={props.setY}
          startedFlag={props.startedFlag}
          setStartedFlag={props.setStartedFlag}
          setEndFlag={props.setEndFlag}
          velocityX={velocityX}
          setVelocityX={setVelocityX}
          velocityY={velocityY}
          setVelocityY={setVelocityY}
          moveXflag={moveXflag}
          setMoveXflag={setMoveXflag}
          moveYflag={moveYflag}
          setMoveYflag={setMoveYflag}
        />
        <Slidebar
          x={props.x}
          setX={props.setX}
          y={props.y}
          startedFlag={props.startedFlag}
          barX={props.barX}
          setBarX={props.setBarX}
          setMoveYflag={setMoveYflag}
        />
      </div>
      {props.endFlag ? <p>GameOver Score:{props.score}</p> : <p>Score:{props.score}</p>}
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
      <button onClick={() => {handleClickL(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>L</button>
      <button onClick={() => {handleClickR(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>R</button>
    </div>
  );
}


function Game() {
  //console.log("A Component, Game, is called." + varStartedFlag);
  
  // スライドバー横位置
  const [barX, setBarX] = useState(initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(initialBallPosition.y);
  
  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(varStartedFlag);
  
  //ゲーム終了フラグ
  const [endFlag, setEndFlag] = useState(false);

  //ブロック存在フラグ（ture:存在，false:ボールと衝突して消失）
  const [blockFlags, setBlockFlags] = useState(blockFlagsArray);

  //得点
  const [score, setScore] = useState(0);

  return (
    <div>
      <GameDisplay
        x={x}
        setX={setX}
        y={y}
        setY={setY}
        startedFlag={startedFlag}
        setStartedFlag={setStartedFlag}
        endFlag={endFlag}
        setEndFlag={setEndFlag}
        barX={barX}
        setBarX={setBarX}
        blockFlags={blockFlags}
        setBlockFlags={setBlockFlags}
        score={score}
        setScore={setScore}
      />
      <ControlPanel
        x={x}
        setX={setX}
        startedFlag={startedFlag}
        barX={barX}
        setBarX={setBarX}
      />
    </div>
  );
}
export default Game;