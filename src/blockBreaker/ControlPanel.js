import { areaName } from './constants.js';
import { handleClickL, handleClickR } from './libs.js';

//操作盤のコンポーネント
const ControlPanel = (props) => {

  const panelStyle = {
    display:"float",
    //paddingTop: "0",
    gridArea: areaName.controlPanel
  }

  return (
    <div style={panelStyle}>
      <button onClick={() => {handleClickL(props.barX, props.setBarX, props.y, props.setX, props.x);}}>L</button>
      <button onClick={() => {handleClickR(props.barX, props.setBarX, props.y, props.setX, props.x);}}>R</button>
    </div>
  );
}
export default ControlPanel;