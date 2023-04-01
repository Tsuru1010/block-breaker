import { handleContinue } from './libs.js'
import { buttonStyle } from './constants.js';

function ContinueButton(props) {
  const continueStyle = {
    ...buttonStyle
  }

  return (
    <div>
      <button
        onClick={() => {
          handleContinue(props.setVelocityX,
                        props.setVelocityY,
                        props.setPauseFlag
                        );
        }}
        style={continueStyle}
      >
        Continue
      </button>  
    </div>
    
  )
}
export default ContinueButton;