import * as THREE from 'three'

export const createRenderer = (canvas: HTMLCanvasElement) => {
    if (canvas === null) return

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    return renderer
}
