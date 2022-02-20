import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GameDetails from '../components/GameDetails'
import GameView from '../components/GameView'

function Band() {
  const noteInterval = 237.8
  const musicDelay = 1980
  const startGame = useRef(null)

  let width = window.innerWidth,
    height = window.innerHeight

  // CAMERA ATTRIBUTE
  let viewAngle = 75,
    aspect = width / height,
    near = 0.1,
    far = 10000

  let scene = new THREE.Scene()
  let camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far)

  camera.position.z = 150

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)

  useEffect(() => {
    const element = document.getElementById('game-canvas')
    if (element) {
      document.body.appendChild(renderer.domElement)
    }
  }, [])

  // document.body.appendChild(renderer.domElement)

  return (
    <div>
      <div>
        <GameDetails></GameDetails>
      </div>
      <div id='game-canvas'>
        <GameView
          startGame={startGame}
          renderer={renderer}
          camera={camera}
          scene={scene}
          noteInterval={noteInterval}
          // key={key}
          // musicDelay={musicDelay}
        ></GameView>
        {/* <button onClick={() => startGame.current.addMovingNotes()}>Start</button> */}
      </div>
    </div>
  )
}

export default Band
