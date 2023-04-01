import { calcBoardWidth, initializeBlocksArray} from './libs.js';

export const borderSize = 1;
export const SPsize = 800; //スマホとタブレットの横幅からブレークポイントとして想定する値
export const boardWidth = calcBoardWidth();
export const boardHeight = 500;
export const ballSize = 10;
export const barWidth = 80;
export const barHeight = 20;
export const blockWidth = boardWidth/8;
export const blockHeight = 20;
export const speedUpTiming = 20 * 1000;
export const browserWidth = document.body.clientWidth;
export const browserHeight = document.documentElement.clientHeight;
export const initialBallPosition = {x:boardWidth/2, y:475};
export const initialBarPosition = {x:boardWidth/2, y:480};
export const blocksArray = initializeBlocksArray();
export const areaName = {
  BaC:'BoardAndControllerArea',
  gameStatus:'gameStatusArea',
  instruction:'instructionArea'
}
export const buttonStyle = {
  Color: '#ff0000',
  backgroundColor: '#a0a0ff',
  width: '150px',
  margin: '3px',
  padding: '3px',
  borderRadius: '3px'
}
