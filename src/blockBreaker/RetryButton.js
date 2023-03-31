import { handleRetry } from './libs.js'

function RetryButton(props) {
  return (
    <button onClick={() => {
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
    }}>
      Retry
    </button>
  )
}
export default RetryButton;