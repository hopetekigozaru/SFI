"use client"
import { useEffect } from 'react'
import * as THREE from 'three'
import { BufferGeometryUtils, EffectComposer, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';



export const Three = () => {
    let canvas: HTMLElement;
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;

    useEffect(() => {

        canvas = document.createElement('canvas')!;
        const scene = new THREE.Scene();

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            1000
        );



        renderer = new THREE.WebGLRenderer({
            canvas: canvas || undefined,
            antialias: true,
            alpha: true
        });

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(window.devicePixelRatio);
        scene.background = new THREE.Color('#21354C');
        

        // レンダリング用のRenderPassを作成
        const renderPass = new RenderPass(scene, camera);



        let canvasContainer = document.getElementById('canvasContainer');
        canvasContainer?.appendChild(canvas);


        // メインの緑色の球体
        const mainSphere = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshLambertMaterial({
            color: 'green',
            emissive: 0x00ff00, // 自発光の色
            emissiveIntensity: 2,
        }));
        scene.add(mainSphere);

        // ジオメトリを結合するための配列
        const geometryArray = []
        // 輪
        const torus = new THREE.TorusGeometry(20, 0.05, 30, 100);
        geometryArray.push(torus);

        // 輪の玉
        const subSphere = new THREE.SphereGeometry(0.8, 32, 16);
        const subSphereTrans = subSphere.translate(0, 20, 0);
        geometryArray.push(subSphereTrans);

        // ジオメトリ結合
        const geometry = BufferGeometryUtils.mergeGeometries(geometryArray);

        const material = new THREE.MeshToonMaterial({ color: 'white' });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 2;
        mesh.rotation.y = 500;
        mesh.rotation.x = -299.8;

        scene.add(mesh);


        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(1, 1, 1).normalize(); // ライトの位置を設定
        scene.add(directionalLight);

        const innerLight = new THREE.PointLight(0x00ff00, 2, 20); // 光源の色、強度、距離
        mainSphere.add(innerLight); // MainSphereの内部に光源を追加


        camera.position.set(0, 0, 30);
        camera.lookAt(mainSphere.position);

        // 光エフェクト設定
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3,  // 強度
            0.4,  // 半径
            0.85  // 閾値
        );


        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        const handleResize = () => {
            // ウィンドウのサイズを取得
            const width = window.innerWidth;
            const height = window.innerHeight;

            // レンダラーのサイズを変更
            renderer.setSize(width, height);

            // カメラのアスペクト比を更新
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        // ウィンドウのリサイズイベントを監視
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.z += -0.02;
            // renderer.render(scene, camera);
            composer.render();
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvasContainer?.removeChild(canvas);
        };
    }, []);

    return (
        <div id='canvasContainer'></div>
    );
};
