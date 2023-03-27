import React from 'react';
import pause from './images/pauseButton.png'
import { handlePauseButton } from './libs';

function PauseButton(props) {
  return (
    <img
      src={pause} alt='PauseButton' height='20px' width='20px'
      onClick={() => {
        handlePauseButton(props.setPauseFlag, props.velocityX, props.setVelocityX, props.velocityY, props.setVelocityY);
      }}
    />
  );
}

function Header(props) {
  const headerStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }

  return (
    <div style={headerStyle}>
      <p>Block Breaker</p>
      <PauseButton 
        setPauseFlag={props.setPauseFlag}
        velocityX={props.velocityX}
        setVelocityX={props.setVelocityX}
        velocityY={props.velocityY}
        setVelocityY={props.setVelocityY}
      />
    </div>
  );
}
export default Header;