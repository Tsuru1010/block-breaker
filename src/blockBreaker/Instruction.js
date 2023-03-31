import { areaName } from './constants.js';

//操作説明のコンポーネント
function Instruction() {
  const instructionStyle = {
    gridArea: areaName.instruction,
    margin: '10px'
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
export default Instruction;