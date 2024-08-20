import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { createSphere } from './createMainGeometry'
export const createSubObject = (scene: THREE.Scene) => {
    scene.add(
        createSphere(-60, -35, 0, new THREE.Color(5, 5, 5), 10),
        createSphere(65, 40, 0, new THREE.Color(5, 5, 5), 10),
        createSphere(-180, 300, 0, new THREE.Color(5, 3, 2), 20),
        createSphere(0, 350, 0, new THREE.Color(1, 4, 1), 5),
        createSphere(150, 290, 0, new THREE.Color(5, 3, 8), 15),
        createSphere(-200, -350, 0, new THREE.Color(5, 3, 8), 10),
        createSphere(260, -300, 0, new THREE.Color(5, 3, 2), 20),
    )
    // 線の頂点データ
    const positions = [
        [-45, -25, 0, -20, -10, 0],
        [20, 10, 0, 45, 30, 0],
        [-70, -5, 0, -170, 260, 0],
        [-150, 310, 0, -20, 345, 0],
        [20, 345, 0, 120, 310, 0],
        [140, 260, 0, 70, 65, 0],
        [-70, -60, 0, -195, -325, 0],
        [-175, -350, 0, 225, -300, 0],
        [240, -260, 0, 75, 20, 0],
    ]

    const lines = positions.map((position) => {
        // LineGeometry の作成
        const geometry = new LineGeometry()
        geometry.setPositions(position)

        // LineMaterial の作成
        const material = new LineMaterial({
            color: 0xffffff,
            transparent: true,
            linewidth: 3, // ピクセル単位での線の太さ
            resolution: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight,
            ), // 必須
            opacity: 0.0,
        })

        // Line2 の作成
        const line = new Line2(geometry, material)
        line.computeLineDistances()
        scene.add(line)

        return line
    })

    // // ウィンドウのサイズ変更時に解像度を更新
    // window.addEventListener('resize', () => {
    //     renderer.setSize(window.innerWidth, window.innerHeight)
    //     scene.traverse((child) => {
    //         if (child instanceof Line2) {
    //             child.material.resolution.set(
    //                 window.innerWidth,
    //                 window.innerHeight,
    //             )
    //         }
    //     })
    // })

    return lines
}
