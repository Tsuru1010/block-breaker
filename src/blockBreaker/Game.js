import React, { useState, useEffect, useRef} from 'react';
import MediaQuery from 'react-responsive';

const SPsize = 480;
const boardWidth = calcBoardWidth();
const boardHeight = 500;
const ballSize = 10;
const barWidth = 80;
const barHeight = 20;
const blockWidth = boardWidth/8;
const blockHeight = 20;
const initialBallPosition = {x:boardWidth/2, y:475};
const initialBarPosition = {x:boardWidth/2, y:480};
const blocksArray = initializeBlocksArray();
const areaName = {
  gameBorad:"gameBoardArea",
  gameStatus:"gameStatusArea",
  score:"ScoreArea",
  controlPanel:"controlPanelArea",
  description:"instructionArea"
}

let velocity = {x:0, y:0};
let blockFlagsArray = [true, true, true, true, true, true, true, true,
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true, 
                       true, true, true, true, true, true, true, true];
let varScore = 0;
let varStartedFlag = false;
let debugCounter = 0;

function calcBoardWidth() {
  if (document.body.clientWidth > SPsize) {
    return 320;
  } else {
    return document.body.clientWidth;
  }
}

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
  if (barX + 5 + barWidth/2 < boardWidth){
    setBarX(barX + 5);
    if (startedFlag === false){
      setX(x + 5);
    }
  }
}

function moveEnd(setVelocityX, setVelocityY) {
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
    if (props.x + ballSize/2 >= boardWidth) {
      props.setMoveXflag(false);
    }
    if (props.y + ballSize/2 >= boardHeight) {
      props.setGameoverFlag(true);
      moveEnd(props.setVelocityX, props.setVelocityY);
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

  useEffect(() => {
    if (props.score === 32) {
      props.setGameclearFlag(true);
      moveEnd(props.setVelocityX, props.setVelocityY);
      
    }
  }, [props.score])

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
    if (props.y + ballSize/2 >= (boardHeight - barHeight) && props.barX - barWidth/2 <= props.x - ballSize/2 && props.x + ballSize/2 <= props.barX + barWidth/2) {
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

  const boardRef = useRef(null);

  const boardStyle = {
    gridArea: areaName.gameBorad,
    position: "relative",
    width: boardWidth + "px",
    height: boardHeight + "px",
    border:"solid 1px #000000"
  };

  useEffect(() => {
    let boardElm = boardRef.current;
    if (boardElm) {
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
  
      boardElm.addEventListener('click', setVelocity);
      
      return () => {
        boardElm.removeEventListener('click', setVelocity);  
      }
    }
  }, []);

  return (
    <div
      style={boardStyle}
      ref={boardRef}
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
        setGameoverFlag={props.setGameoverFlag}
        setGameclearFlag={props.setGameclearFlag}
        velocityX={velocityX}
        setVelocityX={setVelocityX}
        velocityY={velocityY}
        setVelocityY={setVelocityY}
        score={props.score}
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
  );
}

//操作盤のコンポーネント
const ControlPanel = (props) => {

  const panelStyle = {
    display:"float",
    gridArea: areaName.controlPanel
  }

  return (
    <div style={panelStyle}>
      <button onClick={() => {handleClickL(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>L</button>
      <button onClick={() => {handleClickR(props.barX, props.setBarX, props.startedFlag, props.setX, props.x);}}>R</button>
    </div>
  );
}

function GameStatus(props) {
  const statusStyle = {
    gridArea: areaName.gameStatus
  }
  
  return (
    <div style={statusStyle}>
      {props.gameoverFlag ? <p>game over</p> : <p></p>}
      {props.gameclearFlag ? <p>game clear!</p> : <p></p>}
    </div>
  )
}

function ScoreBoard(props) {
  const scoreStyle = {
    gridArea: areaName.score
  }
  
  return (
    <p style={scoreStyle}>Score:{props.score}</p>
  )
}

function Game() {
  
  // スライドバー横位置
  const [barX, setBarX] = useState(initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(initialBallPosition.y);
  
  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(varStartedFlag);
  
  //ゲームオーバーフラグ
  const [gameoverFlag, setGameoverFlag] = useState(false);

  //ゲームクリアフラグ
  const [gameclearFlag, setGameclearFlag] = useState(false);

  //ブロック存在フラグ（ture:存在，false:ボールと衝突して消失）
  const [blockFlags, setBlockFlags] = useState(blockFlagsArray);

  //得点
  const [score, setScore] = useState(0);

  const PCStyle = {
    display: "grid",
    gridTemplateColumns: "50% 320px 50%",
    girdTemplateRows: "50% 50% 20px",
    gridTemplateAreas: `"${areaName.score} ${areaName.gameBorad} ${areaName.instruction}"\n`
                      +`"${areaName.gameStatus} ${areaName.gameBorad} ${areaName.instruction}"\n`
                      +`"${areaName.gameStatus} ${areaName.controlPanel} ${areaName.instruction}"\n`
  }

  const SPStyle = {
    display: "grid",
    girdTemplateRows: "500px 15% 15% 15% 55%",
    gridTemplateAreas: `"${areaName.gameBorad}"\n`
                      +`"${areaName.controlPanel}"\n`
                      +`"${areaName.gameStatus}"\n`
                      +`"${areaName.score}"\n`
                      +`"${areaName.description}"`
  }

  return (
    <div >
      <MediaQuery query={`(min-width: ${SPsize}px)`}>
        <div style={PCStyle}>
          <GameBoard
            x={x}
            setX={setX}
            y={y}
            setY={setY}
            startedFlag={startedFlag}
            setStartedFlag={setStartedFlag}
            gameoverFlag={gameoverFlag}
            setGameoverFlag={setGameoverFlag}
            setGameclearFlag={setGameclearFlag}
            barX={barX}
            setBarX={setBarX}
            blockFlags={blockFlags}
            setBlockFlags={setBlockFlags}
            score={score}
            setScore={setScore}
          />
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
          />
          <ScoreBoard score={score}/>
          <ControlPanel
            x={x}
            setX={setX}
            startedFlag={startedFlag}
            barX={barX}
            setBarX={setBarX}
          />
        </div>
      </MediaQuery>
      <MediaQuery query={`(max-width: ${SPsize}px)`}>
        <div style={SPStyle}>
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
          />
          <ScoreBoard score={score}/>
          <GameBoard
            x={x}
            setX={setX}
            y={y}
            setY={setY}
            startedFlag={startedFlag}
            setStartedFlag={setStartedFlag}
            gameoverFlag={gameoverFlag}
            setGameoverFlag={setGameoverFlag}
            setGameclearFlag={setGameclearFlag}
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
      </MediaQuery>
    </div>
  );
}
export default Game;