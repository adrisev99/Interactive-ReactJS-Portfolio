import './index.scss';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Logo = () => {
    const mountRef = useRef(null);

    useEffect(() => {
       
        const scene = new THREE.Scene();

        
        const camera = new THREE.PerspectiveCamera(75, 400 / 609, 0.1, 1000);
        camera.position.z = 120; 

        
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(400, 609);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        
        const light = new THREE.AmbientLight(0xffffff, 1); 
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50).normalize();
        scene.add(directionalLight);

        
        const loader = new GLTFLoader();
        loader.load(`${process.env.PUBLIC_URL}/models/rubiks_cube/scene.gltf`, (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center); 
            model.scale.set(15, 15, 15); 
            model.position.set(-20, -30, 0);
            model.rotation.set(Math.PI / 4, Math.PI / 4, 0); 
            scene.add(model);

            
            const mixer = new THREE.AnimationMixer(model);
            if (gltf.animations.length) {
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
            }

            
            const clock = new THREE.Clock();
            const animate = () => {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                mixer.update(delta);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        }, undefined, (error) => {
            console.error('Error loading model:', error);
        });

        
        const handleResize = () => {
            camera.aspect = 400 / 609;
            camera.updateProjectionMatrix();
            renderer.setSize(400, 609);
        };

        window.addEventListener('resize', handleResize);

        
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className='logo-container' ref={mountRef} style={{ position: 'absolute', top: 0, right: '15%', bottom: 0, left: 'auto', margin: 'auto' }}>
        </div>
    );
};

export default Logo;

