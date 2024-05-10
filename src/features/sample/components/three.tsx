"use client"
import { useEffect } from 'react'
import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

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

        let canvasContainer = document.getElementById('canvasContainer');
        canvasContainer?.appendChild(canvas);

        const toonMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(0x00ff00) }, // 緑色
                uEmissiveColor: { value: new THREE.Color(0x00ff00) }, // 発光色
                uEmissiveIntensity: { value: 2.0 } // 発光の強度
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform vec3 uColor;
                uniform vec3 uEmissiveColor;
                uniform float uEmissiveIntensity;
                void main() {
                    float intensity = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
                    vec3 finalColor = uColor * intensity;
                    vec3 emissive = uEmissiveColor * uEmissiveIntensity;
                    gl_FragColor = vec4(finalColor + emissive, 1.0);
                }
            `
        });

        const mainSphere = new THREE.Mesh(new THREE.SphereGeometry(7, 32, 16), toonMaterial);
        scene.add(mainSphere);

        const outlineMaterial = new THREE.MeshToonMaterial({
            color: 0x000000,
            side: THREE.BackSide // 背面をレンダリング
        });

        const outlineMesh = new THREE.Mesh(mainSphere.geometry.clone(), outlineMaterial);
        outlineMesh.scale.multiplyScalar(1.08); // 球体のサイズよりも大きなアウトラインを描画
        mainSphere.add(outlineMesh);

        const geometryArray = []

        const torus = new THREE.TorusGeometry(20, 0.25, 30, 100);
        geometryArray.push(torus);

        const subSphere = new THREE.SphereGeometry(0.8, 32, 16);
        const subSphereTrans = subSphere.translate(0, 20, 0);
        geometryArray.push(subSphereTrans);

        const geometry = BufferGeometryUtils.mergeGeometries(geometryArray);

        const material = new THREE.MeshToonMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = 500;
        mesh.rotation.x = -299.9;

        scene.add(mesh);

        // MainSphere内部の発光用の光源を作成
        const innerLight = new THREE.PointLight(0x00ff00, 2, 20); // 光源の色、強度、距離
        mainSphere.add(innerLight); // MainSphereの内部に光源を追加

        // 内部の光源の位置を調整（必要に応じて）
        innerLight.position.set(0, 0, 0); // MainSphereの中心に配置

        camera.position.set(0, 0, 50);
        camera.lookAt(mainSphere.position);

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
            renderer.render(scene, camera);
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
