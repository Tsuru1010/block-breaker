import React from 'react';
import pause from './images/pauseButton.png'
import { handlePauseButton } from './libs';

function PauseButton(props) {
  const pauseButtonStyle = {
    margin:'3px'
  }

  return (
    <img
      src={pause} alt='PauseButton' height='20px' width='20px'
      style={pauseButtonStyle}
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
    alignItems:'center',
    color:'#ffffff'
  }

  return (
    <div style={headerStyle}>
      <h1>Block Breaker</h1>
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