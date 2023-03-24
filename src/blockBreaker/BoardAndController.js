import React, { useState, useEffect, useRef } from 'react';
import * as constants from './constants.js';
import { handleClickL, handleClickR, moveEnd } from './libs.js';

let varStartedFlag = false;
let velocity = {x:0, y:0};
let blockFlagsArray = [true, true, true, true, true, true, true, true,
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true];
let varScore = 0;

//ボールのコンポーネント
function Ball(props) {
      
  useEffect(() => {
    // 端に行ったら方向を逆にする
    if (props.y - constants.ballSize/2 <= 0) {
      props.setMoveYflag(true);
    }
    if (props.x + constants.ballSize/2 >= constants.boardWidth) {
      props.setMoveXflag(false);
    }
    if (props.y + constants.ballSize/2 >= constants.boardHeight) {
      props.setGameoverFlag(true);
      moveEnd(props.setVelocityX, props.setVelocityY);
    }
    if (props.x - constants.ballSize/2 <= 0) {
      props.setMoveXflag(true);
    }
  }, [props.x, props.y, props])
  
  useEffect(() => {
    // 移動速度
    const step = setTimeout(() => 
      {
        if (props.startedFlag === true) {
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
  
          props.setMsec(props.msec + 20);
  
        }
        
      }
    , 20);

    return () => clearTimeout(step);

  }, [props.startedFlag, props.x, props.y, /*props.moveXflag, props.moveYflag, props*/])

  useEffect(() => {
    if (props.score === 32) {
      props.setGameclearFlag(true);
      moveEnd(props.setVelocityX, props.setVelocityY);
      
    }
  }, [props.score])

  const ballStyle = {
    position: "absolute",
    top: props.y - constants.ballSize/2,
    left: props.x - constants.ballSize/2,
    width: constants.ballSize + "px",
    height: constants.ballSize + "px",
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
    top:constants.initialBarPosition.y,
    left: props.barX - constants.barWidth/2,
    height:constants.barHeight + "px",
    width:constants.barWidth + "px",
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
    if (props.y + constants.ballSize/2 >= (constants.boardHeight - constants.barHeight) && props.barX - constants.barWidth/2 <= props.x - constants.ballSize/2 && props.x + constants.ballSize/2 <= props.barX + constants.barWidth/2) {
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
    height: constants.blockHeight + "px",
    width: constants.blockWidth + "px",
    backgroundColor: "#00ff00",
    border: "solid 1px #ff0000",
  }

  useEffect(() => {
    
    if (props.flag){
      // ブロックに当たったら方向を逆にする
    
      //上端との衝突
      if (Math.floor(props.y) + constants.ballSize/2 === props.blockTopY && props.blockLeftX <= props.x - constants.ballSize/2 && props.x + constants.ballSize/2 <= props.blockLeftX + constants.blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(false);
        varScore++;
      }

      //左端との衝突
      if (Math.floor(props.x) + constants.ballSize/2 === props.blockLeftX && props.blockTopY <= props.y - constants.ballSize/2 && props.y + constants.ballSize/2 <= props.blockTopY + constants.blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(false);
        varScore++;
      }

      //下端との衝突
      if (Math.floor(props.y) - constants.ballSize/2 === props.blockTopY + constants.blockHeight &&  props.blockLeftX <= props.x - constants.ballSize/2 && props.x + constants.ballSize/2 <= props.blockLeftX + constants.blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(true);
        varScore++;
      }

      //右端との衝突
      if (Math.floor(props.x) - constants.ballSize/2 === props.blockLeftX + constants.blockWidth && props.blockTopY <= props.y - constants.ballSize/2 && props.y + constants.ballSize/2 <= props.blockTopY + constants.blockWidth) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(true);
        varScore++;
      }
    }
      
  }, [props.x, props.y, props])

  //ブロックの衝突を検知してスコアをセット
  useEffect(() => {
    props.setScore(varScore);
  }, [props.flag])

  return (
    <div style={blockStyle}></div>
  )
}

//ゲームディスプレイのコンポーネント
const GameBoard = (props) => {  

  //ボール速度絶対値（x軸方向）
  const [velocityX, setVelocityX] = useState(0);
  
  //ボール速度絶対値（y軸方向）
  const [velocityY, setVelocityY] = useState(0);

  // 横移動フラグ（true:右に移動，false:左に移動）
  const [moveXflag, setMoveXflag] = useState(true);
        
  // 縦移動フラグ（true:下に移動，false:上に移動）
  const [moveYflag, setMoveYflag] = useState(false);

  //ブロック存在フラグ（ture:存在，false:ボールと衝突して消失）
  const [blockFlags, setBlockFlags] = useState(blockFlagsArray);
 
  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(varStartedFlag); 

  const boardRef = useRef(null);

  const boardStyle = {
    position: "relative",
    width: constants.boardWidth + "px",
    height: constants.boardHeight + "px",
    border:"solid 1px #000000"
  };

  useEffect(() => {
    let boardElm = boardRef.current;
    if (boardElm) {
      const setVelocity = (e) => {

        if (startedFlag === true){
          return;
        } else {
          const relativeClickPosition = {
            x: e.offsetX - props.x,
            y: e.offsetY - props.y
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
          setStartedFlag(varStartedFlag);
          setVelocityX(velocity.x);
          setVelocityY(velocity.y);
        }
      }
  
      boardElm.addEventListener('click', setVelocity);
      
      return () => {
        boardElm.removeEventListener('click', setVelocity);  
      }
    }
  }, [props.x]);

  return (
    <div
      style={boardStyle}
      ref={boardRef}
    >
      {constants.blocksArray.map((value, key) => {
        return (<Block
                  index={value.index}
                  blockTopY={value.blockTopY}
                  blockLeftX={value.blockLeftX}
                  x={props.x}
                  y={props.y}
                  score={props.score}
                  setScore={props.setScore}
                  setMoveXflag={setMoveXflag}
                  setMoveYflag={setMoveYflag}
                  flag={blockFlags[key]}
                  setBlockFlags={setBlockFlags}
                />);
      })}
      <Ball
        x={props.x}
        setX={props.setX}
        y={props.y}
        setY={props.setY}
        setGameoverFlag={props.setGameoverFlag}
        setGameclearFlag={props.setGameclearFlag}
        msec={props.msec}
        setMsec={props.setMsec}
        velocityX={velocityX}
        setVelocityX={setVelocityX}
        velocityY={velocityY}
        setVelocityY={setVelocityY}
        score={props.score}
        moveXflag={moveXflag}
        setMoveXflag={setMoveXflag}
        moveYflag={moveYflag}
        setMoveYflag={setMoveYflag}
        startedFlag={startedFlag}
        setStartedFlag={setStartedFlag}
      />
      <Slidebar
        x={props.x}
        setX={props.setX}
        y={props.y}
        barX={props.barX}
        setBarX={props.setBarX}
        setMoveYflag={setMoveYflag}
        startedFlag={startedFlag}
      />
    </div>
  );
}

//操作盤のコンポーネント
function ControlPanel(props) {

  const panelStyle = {
    display:"float",
    //paddingTop: "0",
  }

  return (
    <div style={panelStyle}>
      <button onClick={() => {handleClickL(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>L</button>
      <button onClick={() => {handleClickR(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>R</button>
    </div>
  );
}

//BaC：Board and Controller 長いので省略して記述
//レイアウト等で利点があり，2つのコンポーネントをまとめる
function BoardAndController(props) {  
  const BaCstyle = {
    gridArea:constants.areaName.BaC
  }

  return (
    <div style={BaCstyle}>
      <GameBoard
        x={props.x}
        setX={props.setX}
        y={props.y}
        setY={props.setY}
        gameoverFlag={props.gameoverFlag}
        setGameoverFlag={props.setGameoverFlag}
        setGameclearFlag={props.setGameclearFlag}
        barX={props.barX}
        setBarX={props.setBarX}
        score={props.score}
        setScore={props.setScore}
        msec={props.msec}
        setMsec={props.setMsec}
      />
      <ControlPanel
        x={props.x}
        y={props.y}
        setX={props.setX}
        barX={props.barX}
        setBarX={props.setBarX}
      />
    </div>
  );
}
export default BoardAndController