import { handleContinue } from "./libs.js"
import RetryButton from "./RetryButton.js"

function PauseMenu(props) {
  const menuWrapperPosition = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: document.body.offsetHeight + 'px',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden'
  }

  const menuWrapperStyle = {
    position:'relative',
    width: '100vw',
    height: document.body.offsetHeight + 'px'
  }

  const menuBodyStyle = {
    position:'absolute',
    top: window.innerHeight/2 + 'px',
    left: window.innerWidth/2 + 'px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffff00',
    border: 'solid #0000ff',
    textAlign: 'center'
  }

  return (
    <div style={menuWrapperPosition}>
      <div style={menuWrapperStyle}>
        <div style={menuBodyStyle}>
          <p>Pause Menu</p>
          <button onClick={() => {
            handleContinue(props.setVelocityX, props.setVelocityY, props.setPauseFlag, props.setPauseFlag)
          }}>
            Continue
          </button>
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
            setGameclearFlag={props.setGameclearFlag}
            setGameoverFlag={props.setGameoverFlag}
          />
        </div>
      </div>
    </div>
  )
}
export default PauseMenu;