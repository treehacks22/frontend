export const setNoteCheck = (
  noteInterval,
  musicDelay,
  key,
  songNote,
  time,
  stats
) => {
  let timeDelay = 260 + musicDelay + time

  setTimeout(() => checkNote(songNote, key, stats), timeDelay)
}

const checkNote = (songNote, key, stats) => {
  if (key.isDown(key.pos[songNote.pos])) {
    if (stats.streak === 30) {
      stats.multiplier = 4
    } else if (stats.streak === 20) {
      stats.multiplier = 3
    } else if (stats.streak === 10) {
      stats.multiplier = 2
    }
    stats.score += 100 * Number(stats.multiplier)
    stats.hits += 1
    stats.streak += 1
    if (stats.rockInput < 20) {
      stats.rockInput += 1
    } else {
      stats.streak = 0
      stats.misses += 1
      stats.multiplier = 1
      if (stats.rockInput > -20) {
        stats.rockInput -= 1
      }
      // if (stats.rockInput < -10) {
      //   gameProgressEl.className = 'game-progress red';
      //   setTimeout(() => {gameProgressEl.className = 'game-progress';}, 75);
      // }
    }
    //   if (rockInput > 19) {
    //     gameProgressEl.className = 'game-progress green';
    //   } else if (rockInput > 10) {
    //     gameProgressEl.className = 'game-progress yellow';
    //   } else if (rockInput > -10 && rockInput < 10) {
    //     gameProgressEl.className = 'game-progress';
    //   }

    if (stats.streak > stats.maxStreak) {
      stats.maxStreak = stats.streak
    }

    stats.totalNotes += 1
  }

  return stats
}
