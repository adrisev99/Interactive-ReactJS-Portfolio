import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import TextWindow from './Textwindow';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Popup from '../Popup';

const About = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const mountRef = useRef(null);
    const modelRef = useRef(null);
    const rotationSpeed = useRef({ x: 0, y: 0.003, z: 0 });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        
        const scene = new THREE.Scene();

        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50).normalize();
        scene.add(directionalLight);

        
        const loader = new GLTFLoader();
        loader.load('/models/earth/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(15, 15, 15);
            model.position.set(0, 0, 0);
            scene.add(model);
            modelRef.current = model;
        }, undefined, (error) => {
            console.error('Error loading model:', error);
        });

        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; 
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;

        
        const animate = () => {
            requestAnimationFrame(animate);

            
            if (modelRef.current) {
                modelRef.current.rotation.x += rotationSpeed.current.x; 
                modelRef.current.rotation.y += rotationSpeed.current.y; 
                modelRef.current.rotation.z += rotationSpeed.current.z; 
            }

            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
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
        <>
            <div className="container about-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass}
                            strArray={"About Me".split("")}
                            idx={15}
                        />
                    </h1>
                    <p className={letterClass}>
                        Born in Tulsa, Oklahoma, I completed my undergraduate studies at the University of Tulsa, 
                        where I earned a Bachelor of Science degree in Engineering Physics with a Minor in Mathematics and specialization in Electronics. 
                        My academic achievements were recognized through scholarships such as 
                        the TU Royal Blue Academic Scholarship and the Dr. Jacob Jorushie Music Grant.
                    </p>
                    <p className={letterClass}>
                        Following my undergraduate studies, I pursued a Master of Science in Engineering at Johns Hopkins University in Baltimore, Maryland, specializing in Applied Mathematics and Statistics. 
                        This advanced education has equipped me with skills in machine learning, probabilistic modeling, and computational mathematics.
                    </p>
                    <p className={letterClass}>
                        Currently, I serve as a Modeling Engineer at Ten-Nine Technologies, where I focus on innovative battery technologies and chemical process modeling. My role involves leveraging machine learning methodologies to enhance our understanding of material behaviors and improve the accuracy of our predictive models. I remain committed to continuous learning and innovation, always seeking to advance technology and improve user experiences.
                    </p>
                </div>
                {/* Container for the Three.js canvas */}
                <div ref={mountRef} className="three-js-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                <div className="text-windows-container">
                    <TextWindow text="Fluency in three languages—English, Spanish, and Italian—enables me to connect with diverse groups and work effectively in international settings. This multilingual ability has been particularly valuable in my research collaborations and professional engagements." />
                    <TextWindow text="Beyond my academic and professional pursuits, I am deeply passionate about machine learning and programming. I enjoy exploring new algorithms and developing innovative solutions to complex problems. Additionally, I am a dedicated jazz saxophonist and have been playing for over a decade, which fosters creativity and discipline in all my endeavors." />
                    <TextWindow text="Having lived in both Italy and the United States has broadened my cultural horizons. 
                        I studied Electrical Engineering at Politecnico di Milano, which enriched my personal and professional life by providing a global perspective on engineering and technology." />
                </div>
                <Popup />
            </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    );
};

export default About;
