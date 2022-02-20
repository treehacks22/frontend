import VideoStream from './VideoStream'

function GameDetails(props) {
  const stats = props.stats
  return (
    <div className='game-holder'>
      <div class='game-details'>
        <div class='game-details'>
          <div class='game-details-left'>
            <h1 class='score'>Score: {stats.score}</h1>
            <h1 class='max-streak'>Max Streak: {stats.maxStreak}</h1>
          </div>
          <div class='game-details-right'>
            <h1 class='multiplier'>Multiplier: {stats.multiplier}X</h1>
            <h1 class='streak'>Streak: {stats.streak}</h1>
          </div>
        </div>
      </div>
      <div class='game-progress'>
        <input
          class='rock-input'
          type='range'
          min='-20'
          max='20'
          value='0'
        ></input>
        <h1 class='rock-header'>Rock Meter</h1>
      </div>
    </div>
  )
}

export default GameDetails
