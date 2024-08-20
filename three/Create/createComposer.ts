import * as THREE from 'three'
import {
    EffectComposer,
    RenderPass,
    UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'

export const createComposer = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
) => {
    // レンダリング用のRenderPassを作成
    const renderPass = new RenderPass(scene, camera)

    // 光エフェクト設定
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.3, // 強度
        0.4, // 半径
        0.85, // 閾値
    )

    const composer = new EffectComposer(renderer)
    composer.addPass(renderPass)
    composer.addPass(bloomPass)

    return composer
}
