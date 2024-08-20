import * as THREE from 'three'

export const onResize = (
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
): {
    resize: () => void | undefined
    resizeEvent: () => void
    cleanResizeEvent: () => void
} => {
    const resize = () => {
        // サイズを取得
        const width = window.innerWidth
        const height = window.innerHeight
        console.log(window.innerWidth, window.innerHeight)

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)

        // カメラのアスペクト比を正す
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }

    let resizeTimeout: NodeJS.Timeout

    const resizeEvent = () => {
        return window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(resize, 300) // 200msの遅延後にonResizeを実行
        })
    }

    // クリーンアップようイベント
    const cleanResizeEvent = () => {
        return window.removeEventListener('resize', resize)
    }

    return { resize, resizeEvent, cleanResizeEvent }
}
