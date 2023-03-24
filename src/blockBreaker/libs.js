import * as constants from './constants.js';

export function calcBoardWidth() {
  const browserWidth = document.body.clientWidth;

  if (browserWidth) {
    if (browserWidth > constants.SPsize) {
      return browserWidth/3 - constants.borderSize*2;
    } else {
      return browserWidth - constants.borderSize*2;
    }
  } else {
    console.log("error at calcBoardWidth");
    return 320;
  }
}

export function initializeBlocksArray(){
  let blocksArray = [];
  let blockLeftX;
  let blockTopY;
  let index;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      blockLeftX = j * constants.blockWidth;
      blockTopY = i * constants.blockHeight;
      index = i*8 + j;
      blocksArray.push({index:index, blockLeftX:blockLeftX, blockTopY:blockTopY});
    }
  }

  return blocksArray;
}

export function handleClickL(barX, setBarX, startedFlag, setX, x) {
  if (barX - 5 - constants.barWidth/2 > 0){
    setBarX(barX - 5);
    if (startedFlag === false){
      setX(x - 5);
    }
  }
}

export function handleClickR(barX, setBarX, startedFlag, setX, x) {
  if (barX + 5 + constants.barWidth/2 < constants.boardWidth){
    setBarX(barX + 5);
    if (startedFlag === false){
      setX(x + 5);
    }
  }
}

export function moveEnd(setVelocityX, setVelocityY) {
  setVelocityX(0);
  setVelocityY(0);
}
