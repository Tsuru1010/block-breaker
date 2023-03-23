import { areaName } from './constants.js';

//ゲーム状態表示のコンポーネント
function GameStatus(props) {
  const statusStyle = {
    gridArea: areaName.gameStatus,
    backgroundColor:"#ff00ff"
  }
  
  return (
    <div style={statusStyle}>
      {props.gameoverFlag ? <p>game over</p> : <p></p>}
      {props.gameclearFlag ? <p>game clear!</p> : <p></p>}
    </div>
  )
}
export default GameStatus