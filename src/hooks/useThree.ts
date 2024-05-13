import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { BufferGeometryUtils, EffectComposer, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

export default function useThree(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
    const [scene] = useState<THREE.Scene>(new THREE.Scene);


    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const mediaQuery = window.matchMedia('(max-width: 768px)')

        const newRenderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        newRenderer.setSize(window.innerWidth, window.innerHeight);
        newRenderer.setPixelRatio(window.devicePixelRatio);
        setRenderer(newRenderer);

        const newCamera = new THREE.PerspectiveCamera();
        if (mediaQuery.matches) {
            newCamera.position.set(0, 0, 50);
        } else {
            newCamera.position.set(0, 0, 50);
        }
        newCamera.aspect = window.innerWidth / window.innerHeight;
        setCamera(newCamera);
    }, [canvasRef]);


    useEffect(() => {
        if (!renderer || !camera) {
            return; // rendererがnullの場合は何もしない
        }



        scene.background = new THREE.Color('#21354C');



        // メインの緑色の球体
        const mainSphere = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 32), new THREE.MeshLambertMaterial({
            color: 'green',
            emissive: 0x00ff00, // 自発光の色
            emissiveIntensity: 2,
        }));
        scene.add(mainSphere);
        camera.lookAt(mainSphere.position);

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

        // レンダリング用のRenderPassを作成
        const renderPass = new RenderPass(scene, camera);

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






        // 初期化のために実行
        onResize();
        // リサイズイベント発生時に実行
        window.addEventListener('resize', onResize);

        function onResize() {
            if (!renderer || !camera) {
                return
            }
            // サイズを取得
            const width = window.innerWidth;
            const height = window.innerHeight;

            // レンダラーのサイズを調整する
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            // カメラのアスペクト比を正す
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.z += -0.02;
            // renderer.render(scene, camera);
            composer.render();
        };

        animate();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [renderer, camera]);


    const topNextAnime = () => {
        if (!camera) {
            return
        }
        let animationId;
        const currentZ = camera.position.z;
        const targetZ = 15;
        const distanceToTarget = Math.abs(currentZ - targetZ); // 現在位置から目標位置までの距離

        // イーズイン、イーズアウトの速度制御
        const easeFactor = 0.04; // イーズインおよびイーズアウトの速度調整パラメータ

        const speed = distanceToTarget * easeFactor;

        // カメラの移動方向を決定するために目標位置と現在位置の比較
        const direction = targetZ < currentZ ? -1 : 1;

        // 目標位置に近づける
        if (currentZ > targetZ) {
            const newPositionZ = currentZ + (speed * direction);

            // 移動が目標位置を超えたら、目標位置に設定
            camera.position.z = direction === 1 ? Math.min(newPositionZ, targetZ) : Math.max(newPositionZ, targetZ);
            console.log(camera.position.z)

            camera.updateProjectionMatrix(); // カメラの更新を反映
            animationId = requestAnimationFrame(topNextAnime);

            if(Math.floor(camera.position.z) === targetZ){
                cancelAnimationFrame(animationId);
            }
        }
    };

    const aboutPrevAnime = () => {
        if (!camera) {
            return;
        }

        let animationId;
        const currentZ = camera.position.z;
        const targetZ = 50;
        const distanceToTarget = Math.abs(currentZ - targetZ); // 現在位置から目標位置までの距離
    
        // イーズイン、イーズアウトの速度制御
        const easeFactor = 0.01; // イーズインおよびイーズアウトの速度調整パラメータ
    
        const speed = distanceToTarget * easeFactor;
    
        // カメラの移動方向を決定するために目標位置と現在位置の比較
        const direction = targetZ > currentZ ? 1 : -1;
    
        // 目標位置に近づける
        if (currentZ < targetZ) {
            const newPositionZ = currentZ + (speed * direction);
            
            // 移動が目標位置を超えたら、目標位置に設定
            camera.position.z = direction === 1 ? Math.min(newPositionZ, targetZ) : Math.max(newPositionZ, targetZ);
            console.log(camera.position.z)
            
            camera.updateProjectionMatrix(); // カメラの更新を反映

            animationId = requestAnimationFrame(aboutPrevAnime);
            if(Math.floor(camera.position.z) === targetZ - 1){
                cancelAnimationFrame(animationId);
            }
        }
    };
    

    return { THREE, renderer, camera, scene, topNextAnime, aboutPrevAnime, canvas: canvasRef.current };
}