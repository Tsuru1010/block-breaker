import React, { useState, useEffect, useRef } from 'react';
import * as constants from './constants.js';
import { handleClickL, handleClickR, setVelocity, detectCollision } from './libs.js';

let varStartedFlag = false;
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
      setVelocity(props.setVelocityX, props.setVelocityY, 0, 0);
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
          if (props.msec === constants.speedUpTiming || props.msec === constants.speedUpTiming*2) {
            setVelocity(props.setVelocityX, props.setVelocityY, props.velocityX * 2, props.velocityY * 2);
          }

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
  
          props.setMsec(props.msec + 16);
  
        }
      }
    , 16);

    return () => clearTimeout(step);

  }, [props.startedFlag, props.pauseFlag, props.x, props.y])

  useEffect(() => {
    if (props.score === 32) {
      props.setGameclearFlag(true);
      setVelocity(props.setVelocityX, props.setVelocityY, 0, 0);
      
    }
  }, [props.score])

  const ballStyle = {
    position: 'absolute',
    top: props.y - constants.ballSize/2,
    left: props.x - constants.ballSize/2,
    width: constants.ballSize + 'px',
    height: constants.ballSize + 'px',
    backgroundColor:'#ffff00'
  }

  return (
      <div style={ballStyle}></div>
  );
}

//スライドバー（ボールを打ち返すやつ）のコンポーネント
function Slidebar(props) {
  const barStyle = {  
    position: 'absolute',
    top:constants.initialBarPosition.y + 'px',
    left: props.barX - constants.barWidth/2 + 'px',
    height:constants.barHeight + 'px',
    width:constants.barWidth + 'px',
    backgroundColor:'#ffffff',
    border: '#0000ff 3px solid'
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
    if (props.y + constants.ballSize/2 >= (constants.boardHeight - constants.barHeight) && props.barX - constants.barWidth/2 <= props.x + constants.ballSize/2 && props.x - constants.ballSize/2 <= props.barX + constants.barWidth/2) {
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
    display: props.flag ? 'inline-block' : 'none',
    position: 'absolute',
    top: props.blockTopY,
    left: props.blockLeftX,
    height: constants.blockHeight + 'px',
    width: constants.blockWidth + 'px',
    backgroundColor: '#00ff00',
    border: 'solid 1px #ff0000',
  }

  useEffect(() => {
    
    // ブロックに当たったら方向を逆にする
    if (props.flag){
      let detictionFlag = false;

      //上端との衝突
      if (detectCollision(props.x, props.y, props.blockTopY, props.blockLeftX, 0)) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(false);
        if (detictionFlag === false) {
          varScore++;
          detictionFlag = true;
        }
      }

      //左端との衝突
      if (detectCollision(props.x, props.y, props.blockTopY, props.blockLeftX, 1)) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(false);
        if (detictionFlag === false) {
          varScore++;
          detictionFlag = true;
        }
      }

      //下端との衝突
      if (detectCollision(props.x, props.y, props.blockTopY, props.blockLeftX, 2)) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveYflag(true);
        if (detictionFlag === false) {
          varScore++;
          detictionFlag = true;
        }
      }

      //右端との衝突
      if (detectCollision(props.x, props.y, props.blockTopY, props.blockLeftX, 3)) {
        blockFlagsArray[props.index] = false;
        props.setBlockFlags(blockFlagsArray);
        props.setMoveXflag(true);
        if (detictionFlag === false) {
          varScore++;
          detictionFlag = true;
        }
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

  // 横移動フラグ（true:右に移動，false:左に移動）
  const [moveXflag, setMoveXflag] = useState(true);
        
  // 縦移動フラグ（true:下に移動，false:上に移動）
  const [moveYflag, setMoveYflag] = useState(false);

  //ブロック存在フラグ（ture:存在，false:ボールと衝突して消失）
  const [blockFlags, setBlockFlags] = useState(blockFlagsArray);
 
  const boardRef = useRef(null);

  const boardStyle = {
    position: 'relative',
    width: constants.boardWidth + 'px',
    height: constants.boardHeight + 'px',
    border:'solid 3px #ff00ff',
    backgroundColor:'#000010'
  };

  useEffect(() => {
    if (props.retryFlag === true) {
      blockFlagsArray = [true, true, true, true, true, true, true, true,
                         true, true, true, true, true, true, true, true, 
                         true, true, true, true, true, true, true, true, 
                         true, true, true, true, true, true, true, true];
      varStartedFlag = false;
      varScore = 0;
      setMoveXflag(true);
      setMoveYflag(false);
      setBlockFlags(blockFlagsArray);
      props.setStartedFlag(false);
      props.setRetryFlag(false);
    }
  }, [props.retryFlag])

  useEffect(() => {
    let boardElm = boardRef.current;
    if (boardElm) {
      const initializeVelocity = (e) => {
        let initialVelocity = {x:0, y:0};

        if (props.startedFlag === true){
          return;
        } else {
          const relativeClickPosition = {
            x: e.offsetX - props.x,
            y: e.offsetY - props.y
          }
  
          const hypotenuse = Math.sqrt(relativeClickPosition.x**2 + relativeClickPosition.y**2);
  
          initialVelocity.x = relativeClickPosition.x / hypotenuse / 2;
          initialVelocity.y = relativeClickPosition.y / hypotenuse / 2;
  
          if (initialVelocity.x < 0) {
            setMoveXflag(false);
            initialVelocity.x = -initialVelocity.x;
          }
  
          if (initialVelocity.y < 0) {
            setMoveYflag(false);
            initialVelocity.y = -initialVelocity.y;
          }
  
          varStartedFlag = true;
          props.setStartedFlag(varStartedFlag);
          setVelocity(props.setVelocityX, props.setVelocityY, initialVelocity.x, initialVelocity.y);
        }
      }
  
      boardElm.addEventListener('click', initializeVelocity);
      
      return () => {
        boardElm.removeEventListener('click', initializeVelocity);  
      }
    }
  }, [props.x, props.retryFlag]);

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
        velocityX={props.velocityX}
        setVelocityX={props.setVelocityX}
        velocityY={props.velocityY}
        setVelocityY={props.setVelocityY}
        score={props.score}
        pauseFlag={props.pauseFlag}
        moveXflag={moveXflag}
        setMoveXflag={setMoveXflag}
        moveYflag={moveYflag}
        setMoveYflag={setMoveYflag}
        startedFlag={props.startedFlag}
        setStartedFlag={props.setStartedFlag}
      />
      <Slidebar
        x={props.x}
        setX={props.setX}
        y={props.y}
        barX={props.barX}
        setBarX={props.setBarX}
        setMoveYflag={setMoveYflag}
        startedFlag={props.startedFlag}
      />
    </div>
  );
}

//操作盤のコンポーネント
function ControlPanel(props) {

  const panelStyle = {
    display:'flex',
    justifyContent: 'center',
    //paddingTop: '0',
  }
  const LRButtonStyle = {
    ...constants.buttonStyle
  }

  return (
    <div style={panelStyle}>
      <button style={LRButtonStyle} onClick={() => {handleClickL(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>L</button>
      <button style={LRButtonStyle} onClick={() => {handleClickR(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>R</button>
    </div>
  );
}

//BaC：Board and Controller 長いので省略して記述
//レイアウト等で利点があり，2つのコンポーネントをまとめる
function BoardAndController(props) {  
  const BaCstyle = {
    gridArea:constants.areaName.BaC
  }

  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(varStartedFlag); 

  return (
    <div style={BaCstyle}>
      <GameBoard
        x={props.x}
        setX={props.setX}
        y={props.y}
        setY={props.setY}
        velocityX={props.velocityX}
        setVelocityX={props.setVelocityX}
        velocityY={props.velocityY}
        setVelocityY={props.setVelocityY}
        gameoverFlag={props.gameoverFlag}
        setGameoverFlag={props.setGameoverFlag}
        setGameclearFlag={props.setGameclearFlag}
        barX={props.barX}
        setBarX={props.setBarX}
        score={props.score}
        setScore={props.setScore}
        msec={props.msec}
        setMsec={props.setMsec}
        retryFlag={props.retryFlag}
        setRetryFlag={props.setRetryFlag}
        pauseFlag={props.pauseFlag}
        startedFlag={startedFlag}
        setStartedFlag={setStartedFlag}
      />
      <ControlPanel
        x={props.x}
        y={props.y}
        setX={props.setX}
        barX={props.barX}
        setBarX={props.setBarX}
        startedFlag={startedFlag}
      />
    </div>
  );
}
export default BoardAndController;