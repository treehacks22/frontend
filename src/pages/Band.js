import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GameView from '../components/GameView'
import VideoStream from '../components/VideoStream'

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
      <VideoStream />
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
        <button
          onClick={() => startGame.current.addMovingNotes()}
          className='test'
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default Band
