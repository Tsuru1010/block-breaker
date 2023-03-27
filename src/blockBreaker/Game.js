import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import * as constants from './constants.js';
import BoardAndController from './BoardAndController.js';
import GameStatus from './GameStatus.js';
import Instruction from './Instruction.js';
import Header from './Header.js';

let debugCounter = 0;
let varPauseFlag = false;

function Game() {
  
  // スライドバー横位置
  const [barX, setBarX] = useState(constants.initialBarPosition.x);
    
  // ボール横位置
  const [x, setX] = useState(constants.initialBallPosition.x);

  // ボール縦位置
  const [y, setY] = useState(constants.initialBallPosition.y);

  //ボール速度絶対値（x軸方向）
  const [velocityX, setVelocityX] = useState(0);
  
  //ボール速度絶対値（y軸方向）
  const [velocityY, setVelocityY] = useState(0);
   
  //ゲームオーバーフラグ
  const [gameoverFlag, setGameoverFlag] = useState(false);

  //ゲームクリアフラグ
  const [gameclearFlag, setGameclearFlag] = useState(false);

  //得点
  const [score, setScore] = useState(0);

  //経過時間
  const [msec, setMsec] = useState(0);

  const [pauseFlag, setPauseFlag] = useState(varPauseFlag);

  const PCStyle = {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    gridTemplateAreas: `"${constants.areaName.gameStatus} ${constants.areaName.BaC} ${constants.areaName.instruction}"\n`
  }

  const SPStyle = {
    display: "grid",
    girdTemplateRows: "auto auto auto",
    gridTemplateAreas: `"${constants.areaName.BaC}"\n`
                      +`"${constants.areaName.gameStatus}"\n`
                      +`"${constants.areaName.instruction}"`
  }

  return (
    <div >
      <MediaQuery query={`(min-width: ${constants.SPsize}px)`}>
        <Header 
          setPauseFlag={setPauseFlag}
          velocityX={velocityX}
          setVelocityX={setVelocityX}
          velocityY={velocityY}
          setVelocityY={setVelocityY}
        />
        <div style={PCStyle}>
          <BoardAndController
            x={x}
            setX={setX}
            y={y}
            setY={setY}
            velocityX={velocityX}
            setVelocityX={setVelocityX}
            velocityY={velocityY}
            setVelocityY={setVelocityY}
            gameoverFlag={gameoverFlag}
            setGameoverFlag={setGameoverFlag}
            setGameclearFlag={setGameclearFlag}
            barX={barX}
            setBarX={setBarX}
            score={score}
            setScore={setScore}
            msec={msec}
            setMsec={setMsec}
          />
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
            msec={msec}
            score={score}
          />
          <Instruction />
        </div>
      </MediaQuery>
      <MediaQuery query={`(max-width: ${constants.SPsize}px)`}>
        <Header
          setPauseFlag={setPauseFlag}
          velocityX={velocityX}
          setVelocityX={setVelocityX}
          velocityY={velocityY}
          setVelocityY={setVelocityY}
        />
        <div style={SPStyle}>
          <BoardAndController
            x={x}
            setX={setX}
            y={y}
            setY={setY}
            velocityX={velocityX}
            setVelocityX={setVelocityX}
            velocityY={velocityY}
            setVelocityY={setVelocityY}
            gameoverFlag={gameoverFlag}
            setGameoverFlag={setGameoverFlag}
            setGameclearFlag={setGameclearFlag}
            barX={barX}
            setBarX={setBarX}
            score={score}
            setScore={setScore}
            msec={msec}
            setMsec={setMsec}
          />
          <GameStatus
            gameoverFlag={gameoverFlag}
            gameclearFlag={gameclearFlag}
            score={score}
          />
          <Instruction />
        </div>
      </MediaQuery>
    </div>
  );
}
export default Game;