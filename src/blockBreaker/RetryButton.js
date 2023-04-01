import { handleRetry } from './libs.js'
import { buttonStyle } from './constants.js';

function RetryButton(props) {
  const retryStyle = {
    ...buttonStyle
  }
  
  return (
    <div >
      <button 
        onClick={() => {
          handleRetry(props.setBarX, 
                    props.setX, 
                    props.setY,
                    props.setVelocityX,
                    props.setVelocityY,
                    props.setScore,
                    props.setMsec,
                    props.setRetryFlag,
                    props.setPauseFlag,
                    props.setGameclearFlag,
                    props.setGameoverFlag
                    );
        }}
        style={retryStyle}
      >
        Retry
      </button>
    </div>
  )
}
export default RetryButton;