import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import { Loader } from 'react-loaders'
import TextSphere from './TextSphere'

const Skills = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        return () => {
            clearTimeout(timeoutId);
          };
    }, [])

    return (
        <>
            <div className='container skills-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={"Skills & Experience".split("")}
                            idx={15}
                        />
                    </h1>
                    <p>
                        At Johns Hopkins University CBID, I led the development of Monte Carlo and ray tracing simulations to analyze photon propagation and light interactions in biological tissues, significantly improving simulation accuracy and diagnostic techniques.
                    </p>
                    <p>
                        As a Modeling Engineer at Ten-Nine Technologies, I implemented machine learning to understand complex material behaviors and designed innovative battery technologies using MATLAB and Simulink, enhancing the company's intellectual property. I also integrated COMSOL Multiphysics for advanced chemical process modeling.
                    </p>
                    <p>
                        Previously, at the University of Tulsa, I developed VR simulators for CCUS projects using Unity, creating over 10 interactive modules and improving user interfaces. My technical skills include Python, JavaScript, C++, TensorFlow, PyTorch, HTML, CSS, Three.js, and COMSOL Multiphysics, as well as expertise in developing realistic simulation environments and enhancing user engagement.
                    </p>
                </div>
                <TextSphere />
            </div>
        <Loader type="line-scale-pulse-out-rapid" />
        </>
    )


}

export default Skills