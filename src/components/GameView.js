import { useState, useImperativeHandle } from 'react'
import * as THREE from 'three'
import GameDetails from '../components/GameDetails'
import { songNotes, beatsPerMeasure } from '../lib/song'
import { addLights } from '../utils/lighting'
import { setNoteCheck } from '../utils/scoring'

function GameView(props) {
  console.log(songNotes)
  const startGame = props.startGame

  const renderer = props.renderer
  const camera = props.camera
  const scene = props.scene
  const key = props.key
  const musicDelay = props.musicDelay
  const noteInterval = props.noteInterval
  const [stats, setStats] = useState({
    score: 0,
    maxStreak: 0,
    streak: 0,
    multiplier: 1,
    hits: 0,
    misses: 0,
    totalNotes: 0,
    rockInput: 0
  })

  const note = {}

  const zStartPoint = -500
  const zEndPoint = 0
  const yStartPoint = 50
  const yEndPoint = -75
  const xPos = [-37.5, -12.5, 12.5, 37.5]

  const xRotation = -Math.atan(
    (zEndPoint - zStartPoint) / (yStartPoint - yEndPoint)
  )

  var spheres = []
  var cylinders = []
  var beatLines = []

  const t = 0

  const measures = [0]

  const setWindowResizer = () => {
    let width, height

    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })
  }

  const backgroundSetup = () => {
    let backgroundGeometry = new THREE.BoxGeometry(2000, 1000, 1000)
    let backgroundMaterials = [
      '',
      '',
      '',
      '',
      '',
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('band_background.jpeg'),
        side: THREE.DoubleSide
      })
    ]

    addLights(scene)

    let background = new THREE.Mesh(backgroundGeometry, backgroundMaterials)
    scene.add(background)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })

    for (let x of xPos) {
      const points = []
      points.push(new THREE.Vector3(x, yStartPoint, zStartPoint))
      points.push(new THREE.Vector3(x, yEndPoint, zEndPoint))

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }
  }

  const addFretBoard = () => {
    let width = xPos[4] - xPos[0] + 50
    let height = Math.sqrt(
      Math.pow(zEndPoint - zStartPoint, 2) +
        Math.pow(yEndPoint - yStartPoint, 2)
    )
    let boardGeometry = new THREE.PlaneGeometry(width, height)
    let boardMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    })
    let board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.rotateX(xRotation)
    board.position.set(0, -15, -250)
    scene.add(board)
  }

  const setNoteAttributes = () => {
    note.vel = 0.75

    note.yVel = (note.vel * (yEndPoint - yStartPoint)) / 100
    note.zVel = (note.vel * (zEndPoint - zStartPoint)) / 100

    note.radius = 7.5

    note.colors = []
    note.colors[0] = 0x7af002 // Green
    note.colors[1] = 0xec0255 // Red
    note.colors[2] = 0xffc202 // Yellow
    note.colors[3] = 0x2720d2 // Blue
    // note.colors[4] = 0xff5722 // Orange
    note.colors[4] = 0xffffff // White - selected

    note.geometry = new THREE.SphereGeometry(note.radius)

    note.materials = []
    note.colors.forEach((color, idx) => {
      note.materials[idx] = new THREE.MeshPhongMaterial({
        color: note.colors[idx]
      })
    })

    const circles = []
  
    const handImages = ['A_Hand.png', 'B_Hand.png','C_Hand.png','D_Hand.png']
    const geometry = new THREE.PlaneGeometry(60, 60, 10, 10)

    var textureImage, texture, material
    for (let i = 0; i < 4; i++) {
      textureImage = require('../images/' + handImages[i]);
      texture = new THREE.TextureLoader().load(textureImage);
      material = new THREE.MeshBasicMaterial( { map: texture } );
      material.transparent = true
      circles[i] = new THREE.Mesh(geometry, material)
    }

    circles.forEach((circle, idx) => {
      circle.position.set(xPos[idx], yEndPoint, zEndPoint)
      circle.rotateX(-0.2)

      // LIGHT UP CIRCLE WHEN KEY IS PRESSED
      //   setInterval(() => {
      //     if (key.isDownVisually(key.pos[idx + 1])) {
      //       circle.material = note.materials[5]
      //     } else {
      //       circle.material = note.materials[idx]
      //     }
      //   }, 100)

      scene.add(circle)
    })
  }

  useImperativeHandle(startGame, () => ({
    addMovingNotes() {
      addMovingNotes()
    }
  }))

  const addMovingNotes = () => {
    console.log('noteInterval = ' + noteInterval)
    let noteMaterial

    // gameNotes = new GameNotes(
    //   noteInterval, musicDelay, key
    // );

    songNotes.forEach((songNote, idx) => {
      noteMaterial = note.materials[songNote.pos - 1]

      spheres[idx] = new THREE.Mesh(note.geometry, noteMaterial)

      let time =
        noteInterval * ((songNote.m - 1) * beatsPerMeasure + songNote.t)
      let lag = 0

      if (songNote.m > 94) {
        lag = 12.5 * songNote.m
        time += lag
      } else if (songNote.m > 79) {
        lag = 10 * songNote.m
        time += lag
      } else if (songNote.m > 71) {
        lag = 7.5 * songNote.m
        time += lag
      } else if (songNote.m > 48) {
        lag = 5 * songNote.m
        time += lag
      }

      // CREATE HOLDS
      if (songNote.hold) {
        let cylinderMaterial = note.materials[songNote.pos - 1]
        let cylinderGeometry = new THREE.CylinderGeometry(
          3.5,
          3.5,
          songNote.hold * note.vel * 30
        )
        cylinders[idx] = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
        cylinders[idx].rotateX(xRotation)
      }

      addMovingBeatLine(songNote.m, noteInterval, lag)

      // POSITION & ADD TO SCENE NOTES & HOLDS & BeatLines
      setTimeout(() => {
        if (cylinders[idx]) {
          let hold = songNote.hold * 3
          cylinders[idx].hold = hold
          cylinders[idx].position.set(
            xPos[songNote.pos - 1],
            yStartPoint - hold * note.yVel,
            zStartPoint - hold * note.zVel
          )
          scene.add(cylinders[idx])
        }
        scene.add(spheres[idx])
        spheres[idx].position.set(
          xPos[songNote.pos - 1],
          yStartPoint,
          zStartPoint
        )
      }, time)
      setStats(
        setNoteCheck(noteInterval, musicDelay, key, songNote, time, stats)
      )
    })
  }

  const addMovingBeatLine = (measure, noteInterval, lag) => {
    if (measures[measures.length - 1] < measure) {
      measures.push(measure)
      let onBeatLineMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 })
      let offBeatLineMaterial = new THREE.MeshBasicMaterial({ color: 0x3b3b3b })
      let beatLineGeometry = new THREE.CylinderGeometry(
        0.25,
        0.25,
        xPos[4] - xPos[0] + 50
      )
      for (let t = 1; t < 9; t++) {
        let time = lag + noteInterval * ((measure - 1) * beatsPerMeasure + t)
        let idx = measure * beatsPerMeasure + t
        if (t % 2 === 0) {
          beatLines[idx] = new THREE.Mesh(beatLineGeometry, offBeatLineMaterial)
        } else {
          beatLines[idx] = new THREE.Mesh(beatLineGeometry, onBeatLineMaterial)
        }

        setTimeout(() => {
          scene.add(beatLines[idx])
          beatLines[idx].position.set(0, yStartPoint, zStartPoint)
          beatLines[idx].rotateZ(Math.PI / 2)
        }, time)
      }
    }
  }

  const sceneUpdate = () => {
    spheres.forEach((sphere) => {
      sphere.position.y += note.yVel
      sphere.position.z += note.zVel
      if (sphere.position.z > zEndPoint) {
        scene.remove(sphere)
      }
    })
    cylinders.forEach((cylinder) => {
      if (cylinder) {
        cylinder.position.y += note.yVel
        cylinder.position.z += note.zVel
        if (cylinder.position.z > zEndPoint + cylinder.hold * note.zVel) {
          scene.remove(cylinder)
        }
      }
    })
    beatLines.forEach((beatLine) => {
      if (beatLine) {
        beatLine.position.y += note.yVel
        beatLine.position.z += note.zVel
        if (beatLine.position.z > zEndPoint) {
          scene.remove(beatLine)
        }
      }
    })
  }

  const sceneRender = () => {
    renderer.render(scene, camera)
  }

  const gameLoop = () => {
    requestAnimationFrame(gameLoop.bind(this))

    sceneUpdate()
    sceneRender()
  }

  const setup = () => {
    setWindowResizer()
    backgroundSetup()
    addFretBoard()
    setNoteAttributes()
    gameLoop()
  }

  setup()

  return (
    <div>
      <GameDetails stats={stats}></GameDetails>
    </div>
  )
}

export default GameView
