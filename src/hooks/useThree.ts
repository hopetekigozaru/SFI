import { useEffect, useState } from 'react'
import * as THREE from 'three'
import {
    BufferGeometryUtils,
    EffectComposer,
    RenderPass,
    UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'

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

        scene.background = new THREE.Color('#21354C')

        // メインの緑色の球体
        const mainSphere = new THREE.Mesh(
            new THREE.SphereGeometry(10, 64, 32),
            new THREE.MeshLambertMaterial({
                color: 'green',
                emissive: 0x00ff00, // 自発光の色
                emissiveIntensity: 2,
            }),
        )
        scene.add(mainSphere)
        camera.lookAt(mainSphere.position)

        // ジオメトリを結合するための配列
        const geometryArray = []
        // 輪
        const torus = new THREE.TorusGeometry(20, 0.05, 30, 100)
        geometryArray.push(torus)

        // 輪の玉
        const subSphere = new THREE.SphereGeometry(0.8, 32, 16)
        const subSphereTrans = subSphere.translate(0, 20, 0)
        geometryArray.push(subSphereTrans)

        // ジオメトリ結合
        const geometry = BufferGeometryUtils.mergeGeometries(geometryArray)

        const material = new THREE.MeshToonMaterial({ color: 'white' })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y = 2
        mesh.rotation.y = 500
        mesh.rotation.x = -299.8

        scene.add(mesh)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
        directionalLight.position.set(1, 1, 1).normalize() // ライトの位置を設定
        scene.add(directionalLight)

        const innerLight = new THREE.PointLight(0x00ff00, 2, 20) // 光源の色、強度、距離
        mainSphere.add(innerLight) // MainSphereの内部に光源を追加

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
            mesh.rotation.z += -0.02
            // renderer.render(scene, camera);
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
        topNextAnime,
        aboutPrevAnime,
        canvas: canvasRef.current,
    }
}
