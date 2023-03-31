import { handleContinue } from './libs.js'

function ContinueButton(props) {
  return (
    <button onClick={() => {
      handleContinue(props.setVelocityX,
                     props.setVelocityY,
                     props.setPauseFlag
                    );
    }}>
      Continue
    </button>
  )
}
export default ContinueButton;