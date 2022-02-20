import * as THREE from 'three'

export const addLights = (scene) => {
  let lights = []
  lights[0] = new THREE.PointLight(0xffffff, 0.9, 10000)
  lights[0].position.set(0, 300, 0)
  lights[1] = new THREE.PointLight(0xffffff, 1, 2000)
  lights[1].position.set(0, 200, 100)
  lights.forEach((light) => scene.add(light))
}
