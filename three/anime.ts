import { MutableRefObject } from 'react'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/Addons.js'

export const Animation = (
    mediaQueryMobile: MediaQueryList | undefined,
    mediaQueryTablet: MediaQueryList,
    camera: THREE.PerspectiveCamera | null,
) => {
    const moveCameraZ = (
        targetZMb: number,
        targetZTb: number,
        targetZPc: number,
        easeFactorNum: number,
        callback: () => void,
    ) => {
        if (!camera || !mediaQueryMobile || !mediaQueryTablet) {
            callback()
            return
        }

        let animationId: number
        const currentZ = camera.position.z
        let targetZ = mediaQueryMobile.matches ? targetZMb : (mediaQueryTablet.matches ? targetZTb : targetZPc)
        const easeFactor = easeFactorNum
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

    const lineAddOpacity = (lines: Array<Line2>, eventFlg: MutableRefObject<boolean>, callback: () => void) => {
        const lineOpacity = (line: Line2) => {
            line.material.opacity += 0.01
            if (line.material.opacity >= 1.0) {
                line.material.opacity = 1.0
                return true
            }
            return false
        }

        const animate = () => {
            let allCompleted = true

            lines.forEach((line) => {
                if (!lineOpacity(line)) {
                    allCompleted = false
                }
            })

            if (!allCompleted) {
                requestAnimationFrame(animate)
            } else {
                eventFlg.current = false
                callback()
            }
        }

        animate()
    }

    const lineRemoveOpacity = (lines: Array<Line2>, callback: () => void) => {
        const lineOpacity = (line: Line2) => {
            line.material.opacity -= 0.05
            if (line.material.opacity <= 0.0) {
                line.material.opacity = 0.0
                return true
            }
            return false
        }

        const animate = () => {
            let allCompleted = true

            lines.forEach((line) => {
                if (!lineOpacity(line)) {
                    allCompleted = false
                }
            })

            if (!allCompleted) {
                requestAnimationFrame(animate)
            } else {
                callback()
            }
        }

        animate()
    }

    return { moveCameraZ, lineAddOpacity, lineRemoveOpacity }
}