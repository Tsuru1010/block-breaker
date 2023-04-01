import { areaName } from './constants.js';
import RetryButton from './RetryButton.js';

//ゲーム状態表示のコンポーネント
function GameStatus(props) {
  const statusStyle = {
    gridArea: areaName.gameStatus,
    backgroundColor:'#004444',
    margin:'10px',
    padding:'10px',
    border: 'solid 3px #8888ff',
    borderRadius: '10px',
    color: '#ffffff'
  }
  
  //console.log(props.msec);

  return (
    <div style={statusStyle}>
      <p>Score:{props.score}</p>
      {props.gameoverFlag ? 
        <div>
          <h1 style={{color:'#ff0000'}}>game over</h1>
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
        <div><h1> </h1><br/></div>
      }
      {props.gameclearFlag ?
        <div>
          <h1 style={{color:'#ffff00'}}>game clear!</h1>
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
        <div><h1> </h1><br/></div>
      }
    </div>
  )
}
export default GameStatus