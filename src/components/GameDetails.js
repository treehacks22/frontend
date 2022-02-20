function GameDetails() {
  return (
    <div>
      <div class='game-details'>
        <div class='game-details'>
          <div class='game-details-left'>
            <h1 class='score'>Score: {}</h1>
            <h1 class='max-streak'>Max Streak: {}</h1>
          </div>
          <div class='game-details-right'>
            <h1 class='multiplier'>Multiplier: {}X</h1>
            <h1 class='streak'>Streak: {}</h1>
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
