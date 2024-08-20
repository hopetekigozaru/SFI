import * as THREE from 'three'

export const createDirectionalLight = (): THREE.DirectionalLight => {
    const light = new THREE.DirectionalLight(0xffffff, 5)
    light.position.set(1, 1, 1).normalize() // ライトの位置を設定
    return light
}

export const createPointLight = () => {
    const light = new THREE.PointLight(0x00ff00, 2, 20) // 光源の色、強度、距離
    return light
}
