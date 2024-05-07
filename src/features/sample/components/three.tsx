"use client"
import { useEffect } from 'react'
import * as THREE from 'three'
export const Three = () => {
    let canvas: HTMLElement
    useEffect(() => {
        canvas = document.getElementById('canvas')!
        // シーン
        const scene = new THREE.Scene()

        // サイズ
        const sizes = {
            width: innerWidth,
            height: innerHeight
        }

        // カメラ
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            1000
        )

        // レンダラー
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas || undefined,
            antialias: true,
            alpha: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio)
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // ボックスジオメトリー
        const geometry = new THREE.SphereGeometry(1, 32, 16);
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const color = new THREE.Color("rgb(8, 246, 4)");
        const material = new THREE.MeshToonMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        // cube.castShadow = true;
        scene.add(cube);
        

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(2, 0.04, 13, 100), // 芯円半径、断面円半径、断面円分割、芯円分割
            new THREE.MeshPhongMaterial({ color: 'black' })
        );
        torus.position.set(0, 0, 0);
        // Y軸周りに90度回転させる
        torus.rotation.x = Math.PI / 2; // ラジアンで90度
        torus.rotation.y = Math.PI / 6; // ラジアンで90度
        scene.add(torus);

        // 床
        // const white = new THREE.Color('white');
        // const meshFloor = new THREE.Mesh(
        //     new THREE.BoxGeometry(30, 1, 30),
        //     new THREE.MeshStandardMaterial({ color: white }));
        // // 影を受け付ける
        // meshFloor.receiveShadow = true;
        // meshFloor.position.set(0, -1.5, 0)
        // console.log(meshFloor)
        // scene.add(meshFloor);

        // ライト
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)
        const light = new THREE.SpotLight(0xffffff, 5);
        light.position.set(1, 3, 1);
        // ライトに影を有効にする
        // light.castShadow = true;
        scene.add(light)
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
        // scene.add(directionalLight);


        camera.position.z = 7;
        camera.position.y = 1;

        // アニメーション
        const clock = new THREE.Clock()
        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            cube.rotation.x = elapsedTime
            cube.rotation.y = elapsedTime
            window.requestAnimationFrame(tick)
            renderer.render(scene, camera)
        }
        tick()
    }, [])
    return (
        <>
            <canvas id="canvas" className="w-full h-full"></canvas>
        </>
    )
}