import { areaName } from './constants.js';
import RetryButton from './RetryButton.js';

//ゲーム状態表示のコンポーネント
function GameStatus(props) {
  const statusStyle = {
    gridArea: areaName.gameStatus,
    backgroundColor:"#ffffff"
  }
  
  //console.log(props.msec);

  return (
    <div style={statusStyle}>
      <p>Score:{props.score}</p>
      {props.gameoverFlag ? 
        <div>
          <p>game over</p>
          <RetryButton
            setBarX={props.setBarX} 
            setX={props.setX} 
            setY={props.setY}
            setVelocityX={props.setVelocityX}
            setVelocityY={props.setVelocityY}
            setScore={props.setScore}
            setMsec={props.setMsec}
            setRetryFlag={props.setRetryFlag}
            setPauseFlag={props.setPauseFlag}
            setGameoverFlag={props.setGameoverFlag}
            setGameclearFlag={props.setGameclearFlag}
          />
        </div>
      :
        <div><br/><br/></div>
      }
      {props.gameclearFlag ?
        <div>
          <p>game clear!</p>
          <RetryButton
            setBarX={props.setBarX} 
            setX={props.setX} 
            setY={props.setY}
            setVelocityX={props.setVelocityX}
            setVelocityY={props.setVelocityY}
            setScore={props.setScore}
            setMsec={props.setMsec}
            setRetryFlag={props.setRetryFlag}
            setPauseFlag={props.setPauseFlag}
            setGameoverFlag={props.setGameoverFlag}
            setGameclearFlag={props.setGameclearFlag}
          />
        </div> 
      :
        <div><br/><br/></div>
      }
    </div>
  )
}
export default GameStatus