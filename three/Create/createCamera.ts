import * as THREE from 'three'

export const createCamera = (mediaQueryMobile: MediaQueryList) => {
    const newCamera = new THREE.PerspectiveCamera()
    if (mediaQueryMobile.matches) {
        newCamera.position.set(0, 0, 80) //80
    } else {
        newCamera.position.set(0, 0, 50) //50
    }
    newCamera.aspect = window.innerWidth / window.innerHeight

    return newCamera
}
