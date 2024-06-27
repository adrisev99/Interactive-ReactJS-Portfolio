import './index.scss';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Logo = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, 400 / 609, 0.1, 1000);
        camera.position.z = 120; // Move the camera back to accommodate the model

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(400, 609);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // OrbitControls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        // Add light to the scene
        const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50).normalize();
        scene.add(directionalLight);

        // Load the Rubik's cube model
        const loader = new GLTFLoader();
        loader.load('/models/rubiks_cube/scene.gltf', (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center); // Center the model
            model.scale.set(15, 15, 15); // Adjust scale if needed
            model.position.set(-20, -30, 0);
            model.rotation.set(Math.PI / 4, Math.PI / 4, 0); // Adjust position if needed
            scene.add(model);

            // Animation setup
            const mixer = new THREE.AnimationMixer(model);
            if (gltf.animations.length) {
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
            }

            // Animation loop
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

        // Handle window resize
        const handleResize = () => {
            camera.aspect = 400 / 609;
            camera.updateProjectionMatrix();
            renderer.setSize(400, 609);
        };

        window.addEventListener('resize', handleResize);

        // Clean up on unmount
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

