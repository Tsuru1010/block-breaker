import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import * as constants from './constants.js';
import GameBoard from './Gameboard.js';
import GameStatus from './GameStatus.js';
import ScoreBoard from './ScoreBoard.js';
import Instruction from './Instruction.js';
import ControlPanel from './ControlPanel.js';

let debugCounter = 0;

function Game() {
  
  // スライドバー横位置
  const [barX, setBarX] = useState(constants.initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(constants.initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(constants.initialBallPosition.y);
   
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

  const contents = (
    <div>
      
    </div>
    
  );

  return (
    <div >
      <MediaQuery query={`(min-width: ${constants.SPsize}px)`}>
        <div style={PCStyle}>
          <GameBoard
            x={x}
            setX={setX}
            y={y}
            setY={setY}
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
            y={y}
            setX={setX}
            barX={barX}
            setBarX={setBarX}
          />
          <Instruction />
        </div>
      </MediaQuery>
      <MediaQuery query={`(max-width: ${constants.SPsize}px)`}>
        <div style={SPStyle}>
          <GameBoard
            x={x}
            setX={setX}
            y={y}
            setY={setY}
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
            y={y}
            setX={setX}
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