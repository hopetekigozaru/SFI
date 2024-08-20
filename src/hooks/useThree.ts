'use client'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/Addons.js'
import { createCamera } from '../../three/Create/createCamera'
import { createComposer } from '../../three/Create/createComposer'
import {
    createDirectionalLight,
    createPointLight,
} from '../../three/Create/createLight'
import { createMainObject } from '../../three/Create/createMainGeometry'
import { createRenderer } from '../../three/Create/createRenderer'
import { createSubObject } from '../../three/Create/createSubObject'
import { Animation } from '../../three/anime'
import { onResize } from '../../three/resize'

export default function useThree(
    canvasRef: React.RefObject<HTMLCanvasElement>,
) {
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
    const [scene] = useState<THREE.Scene>(new THREE.Scene())
    const [lines, setLines] = useState<Array<Line2>>([])
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)')
    const mediaQueryTablet = window.matchMedia(
        '(min-width: 768px) and (max-width: 1024px)',
    )

    const { moveCameraZ, lineAddOpacity, lineRemoveOpacity } = Animation(
        mediaQueryMobile,
        mediaQueryTablet,
        camera,
    )

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const newRenderer = createRenderer(canvasRef.current)

        const newCamera = createCamera(mediaQueryMobile)
        console.log('aaaa')
        setRenderer(newRenderer ?? null)
        setCamera(newCamera)
    }, [canvasRef])

    useEffect(() => {
        if (!renderer || !camera) {
            return // rendererがnullの場合は何もしない
        }

        const { resize, resizeEvent, cleanResizeEvent } = onResize(
            renderer,
            camera,
        )

        const yellow = new THREE.Color(0, 1, 2)

        const mainSphere = createMainObject(0, 0, 0, scene, yellow, 10)
        setLines(createSubObject(scene))

        const directionalLight = createDirectionalLight()

        const pointLight = createPointLight()

        mainSphere.add(pointLight) // MainSphereの内部に光源を追加

        scene.background = new THREE.Color('#21354C')
        scene.add(directionalLight)
        scene.add(directionalLight)

        const composer = createComposer(renderer, scene, camera)

        // 初期化のために実行
        resize()
        // resizeイベント設定
        resizeEvent()

        const animate = () => {
            requestAnimationFrame(animate)
            mainSphere.children[1].rotation.z += -0.02
            composer.render()
        }

        animate()

        return () => {
            cleanResizeEvent()
        }
    }, [renderer, camera, scene])

    return {
        THREE,
        renderer,
        camera,
        scene,
        moveCameraZ,
        canvas: canvasRef.current,
        lineAddOpacity,
        lineRemoveOpacity,
        lines,
    }
}
