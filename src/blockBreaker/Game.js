import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import * as constants from './constants.js';
import { handleClickL, handleClickR } from './libs.js';
import GameBoard from './Gameboard.js';

export let varStartedFlag = false;
let debugCounter = 0;

//操作盤のコンポーネント
const ControlPanel = (props) => {

  const panelStyle = {
    display:"float",
    //paddingTop: "0",
    gridArea: constants.areaName.controlPanel
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
    gridArea: constants.areaName.gameStatus,
    backgroundColor:"#ff00ff"
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
    gridArea: constants.areaName.score,
    backgroundColor:"#ff00ff"
  }
  
  return (
    <p style={scoreStyle}>Score:{props.score}</p>
  )
}

function Instruction() {
  const instructionStyle = {
    gridArea: constants.areaName.instruction,
    margin: "10px"
  }

  return (
    <div style={instructionStyle}>
      <h2>遊び方</h2>
      <ol>
        <li>
          <p>ブロック崩しの盤面をクリックしてゲーム開始．</p>
          <p>クリックした方向にボールが発射．</p>
        </li>
        <li>
          <p>Lボタン，Rボタンでスライドバーを移動可．</p>
          <p>PCだと，矢印キーでも移動できる．</p>
          <p>スライドバーを移動させてボールを打ち返せる．</p>
        </li>
        <li>
          <p>ボールを落とさず打ち返し続け，全てのブロックを破壊できればゲームクリア．</p>
          <p>ボールを落としてしまうとゲームオーバー．</p>
        </li>
      </ol>
    </div>
  );
}

function Game() {
  
  // スライドバー横位置
  const [barX, setBarX] = useState(constants.initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(constants.initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(constants.initialBallPosition.y);
  
  //ゲーム開始フラグ
  const [startedFlag, setStartedFlag] = useState(varStartedFlag);
  
  //ゲームオーバーフラグ
  const [gameoverFlag, setGameoverFlag] = useState(false);

  //ゲームクリアフラグ
  const [gameclearFlag, setGameclearFlag] = useState(false);

  //得点
  const [score, setScore] = useState(0);

  const PCStyle = {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    girdTemplateRows: "48% 48% 4%",
    gridTemplateAreas: `"${constants.areaName.score} ${constants.areaName.gameBorad} ${constants.areaName.instruction}"\n`
                      +`"${constants.areaName.gameStatus} ${constants.areaName.gameBorad} ${constants.areaName.instruction}"\n`
                      +`"${constants.areaName.gameStatus} ${constants.areaName.controlPanel} ${constants.areaName.instruction}"\n`
  }

  const SPStyle = {
    display: "grid",
    girdTemplateRows: "20px 20px 500px 20px 60px",
    gridTemplateAreas: `"${constants.areaName.score}"\n`
                      +`"${constants.areaName.gameStatus}"\n`
                      +`"${constants.areaName.gameBorad}"\n`
                      +`"${constants.areaName.controlPanel}"\n`
                      +`"${constants.areaName.description}"`
  }

  return (
    <div >
      <MediaQuery query={`(min-width: ${constants.SPsize}px)`}>
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
            score={score}
            setScore={setScore}
          />
          <ScoreBoard score={score}/>
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
          />
          <ControlPanel
            x={x}
            setX={setX}
            startedFlag={startedFlag}
            barX={barX}
            setBarX={setBarX}
          />
          <Instruction />
        </div>
      </MediaQuery>
      <MediaQuery query={`(max-width: ${constants.SPsize}px)`}>
        <div style={SPStyle}>
          
          <ScoreBoard score={score}/>
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
          />
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
          <Instruction />
        </div>
      </MediaQuery>
    </div>
  );
}
export default Game;