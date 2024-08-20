import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/Addons.js'
export const Animation = (
    mediaQueryMobile: MediaQueryList | undefined,
    mediaQueryTablet: MediaQueryList,
    camera: THREE.PerspectiveCamera | null,
) => {
    // カメラをZ軸方向に移動させるアニメーション
    const moveCameraZ = (
        targetZMb: number,
        targetZTb: number,
        targetZPc: number,
        easeFactorNum: number,
        callback: () => void,
    ) => {
        if (!camera) return
        if (!mediaQueryMobile || !mediaQueryTablet) return
        let animationId: number
        const currentZ = camera.position.z
        let targetZ //最終的に移動するZ座標
        let easeFactor //移動の速度
        if (mediaQueryMobile.matches) {
            targetZ = targetZMb //80
            easeFactor = easeFactorNum //0.01
        } else if (mediaQueryTablet.matches) {
            targetZ = targetZTb //50
            easeFactor = easeFactorNum
        } else {
            targetZ = targetZPc //50
            easeFactor = easeFactorNum
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

    const lineAddOpacity = (lines: Array<Line2>) => {
        // アニメーション関数
        const lineOpacity = (line: Line2) => {
            line.material.opacity += 0.01
            if (line.material.opacity >= 1.0) {
                line.material.opacity = 1.0
                return true // アニメーションを終了
            }
            return false // アニメーションを継続
        }

        // アニメーションループ
        const animate = () => {
            let allCompleted = true

            lines.forEach((line) => {
                if (!lineOpacity(line)) {
                    allCompleted = false // 少なくとも一つのアニメーションが未完了
                }
            })

            if (!allCompleted) {
                requestAnimationFrame(animate) // 未完了なら次のフレームをリクエスト
            }
        }

        animate()
    }

    const lineRemoveOpacity = (lines: Array<Line2>) => {
        // アニメーション関数
        const lineOpacity = (line: Line2) => {
            line.material.opacity -= 0.05
            if (line.material.opacity <= 0.0) {
                line.material.opacity = 0.0
                return true // アニメーションを終了
            }
            return false // アニメーションを継続
        }

        // アニメーションループ
        const animate = () => {
            let allCompleted = true

            lines.forEach((line) => {
                if (!lineOpacity(line)) {
                    allCompleted = false // 少なくとも一つのアニメーションが未完了
                }
            })

            if (!allCompleted) {
                requestAnimationFrame(animate) // 未完了なら次のフレームをリクエスト
            }
        }

        animate()
    }

    return { moveCameraZ, lineAddOpacity, lineRemoveOpacity }
}
