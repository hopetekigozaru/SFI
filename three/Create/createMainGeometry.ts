import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js'

// 緑色の球体を作成する関数
export const createSphere = (
    x: number,
    y: number,
    z: number,
    color: THREE.Color,
    radius: number,
) => {
    // Mainオブジェクトのジオメトリー作成
    const geometry = new THREE.SphereGeometry(radius, 64, 32)

    // Mainオブジェクトのマテリアル作成
    const material = new THREE.MeshLambertMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.5,
    })
    // Mainオブジェクトのメッシュ作成
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z

    return mesh
}

// 白色の輪を作成する関数
export const createCircle = () => {
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

    const circle = new THREE.Mesh(geometry, material)

    return circle
}

// メインオブジェクトグループを作成　引数:(x;x座標 y:y座標 z:z座標)
export const createMainObject = (
    x: number,
    y: number,
    z: number,
    scene: THREE.Scene,
    color: THREE.Color,
    radius: number,
) => {
    const group = new THREE.Group()

    const mainSphere = createSphere(x, y, z, color, radius)

    const circle = createCircle()

    circle.position.y = mainSphere.position.y
    circle.position.x = mainSphere.position.x
    circle.position.z = mainSphere.position.z
    circle.rotation.y = 500
    circle.rotation.x = -299.8

    group.add(mainSphere, circle)
    scene.add(group)

    return group
}
