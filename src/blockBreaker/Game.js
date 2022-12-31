import React, { useState } from 'react';
import GameDisplay from './GameDisplay.js';
//defaultExportを使う場合は，{}を使わない

const Game = () => {
  return (
    <div>
      <GameDisplay />
    </div>
  );
}
export default Game;