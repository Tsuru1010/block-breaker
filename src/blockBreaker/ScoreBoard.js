import { areaName } from './constants.js';

//スコア表示板のコンポーネント
function ScoreBoard(props) {
  const scoreStyle = {
    gridArea: areaName.score,
    backgroundColor:"#ff00ff"
  }
  
  return (
    <p style={scoreStyle}>Score:{props.score}</p>
  )
}
export default ScoreBoard;