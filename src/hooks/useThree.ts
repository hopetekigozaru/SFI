'use client'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { createComposer } from '../../three/Create/createComposer'
import {
    createDirectionalLight,
    createPointLight,
} from '../../three/Create/createLight'
import { createMainObject } from '../../three/Create/createMainGeometry'
import { createSubObject } from '../../three/Create/createSubObject'

export default function useThree(
    canvasRef: React.RefObject<HTMLCanvasElement>,
) {
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
    const [scene] = useState<THREE.Scene>(new THREE.Scene())
    const [mediaQueryMobile, setMediaQueryMobile] = useState<MediaQueryList>()
    const [mediaQueryTablet, setMediaQueryTablet] = useState<MediaQueryList>()

    useEffect(() => {
        setMediaQueryMobile(window.matchMedia('(max-width: 767px)'))
        setMediaQueryTablet(
            window.matchMedia('(min-width: 768px) and (max-width: 1024px)'),
        )
    }, [])

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const mediaQueryMobile = window.matchMedia('(max-width: 768px)')

        const newRenderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        newRenderer.setSize(window.innerWidth, window.innerHeight)
        newRenderer.setPixelRatio(window.devicePixelRatio)
        setRenderer(newRenderer)

        const newCamera = new THREE.PerspectiveCamera()
        if (mediaQueryMobile.matches) {
            newCamera.position.set(0, 0, 80)
        } else {
            newCamera.position.set(0, 0, 50)
        }
        newCamera.aspect = window.innerWidth / window.innerHeight
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
        onResize()

        // リサイズイベント発生時に実行
        let resizeTimeout: NodeJS.Timeout
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(onResize, 300) // 200msの遅延後にonResizeを実行
        })

        function onResize() {
            if (!renderer || !camera) {
                return
            }
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

        const animate = () => {
            requestAnimationFrame(animate)
            mainSphere.children[1].rotation.z += -0.02
            composer.render()
        }

        animate()

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [renderer, camera, scene])

    const topNextAnime = (callback: () => void) => {
        if (!camera) return
        if (!mediaQueryMobile || !mediaQueryTablet) return

        let animationId: number
        const currentZ = camera.position.z
        let targetZ
        let easeFactor
        if (mediaQueryMobile.matches) {
            targetZ = 25
            easeFactor = 0.02
        } else if (mediaQueryTablet.matches) {
            targetZ = 20
            easeFactor = 0.02
        } else {
            targetZ = 15
            easeFactor = 0.02
        }
        const distanceToTarget = Math.abs(currentZ - targetZ)
        const speed = distanceToTarget * easeFactor
        const direction = targetZ < currentZ ? -1 : 1

        const animate = () => {
            if (Math.abs(camera.position.z - targetZ) < 0.1) {
                camera.position.z = targetZ
                camera.updateProjectionMatrix()
                cancelAnimationFrame(animationId)
                callback()
                return
            }

            const newPositionZ = camera.position.z + speed * direction
            camera.position.z =
                direction === 1
                    ? Math.min(newPositionZ, targetZ)
                    : Math.max(newPositionZ, targetZ)
            camera.updateProjectionMatrix()
            animationId = requestAnimationFrame(animate)
        }

        animate()
    }

    const aboutPrevAnime = (callback: () => void) => {
        if (!camera) return
        if (!mediaQueryMobile || !mediaQueryTablet) return
        let animationId: number
        const currentZ = camera.position.z
        let targetZ
        let easeFactor
        if (mediaQueryMobile.matches) {
            targetZ = 80
            easeFactor = 0.01
        } else if (mediaQueryTablet.matches) {
            targetZ = 50
            easeFactor = 0.01
        } else {
            targetZ = 50
            easeFactor = 0.01
        }
        const distanceToTarget = Math.abs(currentZ - targetZ)
        const speed = distanceToTarget * easeFactor
        const direction = targetZ > currentZ ? 1 : -1

        const animate = () => {
            if (Math.abs(camera.position.z - targetZ) < 0.1) {
                camera.position.z = targetZ
                camera.updateProjectionMatrix()
                cancelAnimationFrame(animationId)
                callback()
                return
            }

            const newPositionZ = camera.position.z + speed * direction
            camera.position.z =
                direction === 1
                    ? Math.min(newPositionZ, targetZ)
                    : Math.max(newPositionZ, targetZ)
            camera.updateProjectionMatrix()
            animationId = requestAnimationFrame(animate)
        }

        animate()
    }

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
