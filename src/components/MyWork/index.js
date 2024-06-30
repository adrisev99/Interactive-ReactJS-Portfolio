import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinux, faPython, faRProject, faReact, faSwift } from '@fortawesome/free-brands-svg-icons';
import Popup from '../Popup';

const MyWork = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [activeFace, setActiveFace] = useState(null);
    const [animationClass, setAnimationClass] = useState('');
    const descriptionRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => {
            clearTimeout(timeoutId);
          };
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
                setAnimationClass('bounce-out');
                setTimeout(() => setActiveFace(null), 600);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (face, event) => {
        event.stopPropagation();
        if (face !== activeFace) {
            setAnimationClass('bounce-out');
            setTimeout(() => {
                setActiveFace(face);
                setAnimationClass('bounce-in');
            }, 600); 
        } else {
            setActiveFace(face);
            setAnimationClass('bounce-in');
        }
    };

    const descriptions = {
        face1: { title: "Swift", description: "I am currently developing a new iOS app called ClosetAI, which leverages artificial intelligence to help users organize and select outfits from their wardrobe. Built using Swift, this app aims to provide personalized fashion recommendations and outfit planning features. While ClosetAI is still under construction, more details and updates will be available soon. Stay tuned!" },
        face2: { title: "Python", description: "I have extensive experience in Python, applying it to a wide range of projects. At Ten-Nine Technologies, I utilized TensorFlow and PyTorch for machine learning models to predict material behaviors. My work includes developing an astrophysical machine learning CNN in TensorFlow and creating a SnakeAI game with deep Q-learning. These projects highlight my ability to leverage Python for complex problem-solving and innovative applications. Check out my <a href='https://github.com/adrisev99' target='_blank' rel='noopener noreferrer'>GitHub</a> to see them in action!" },
        face3: { title: "Linux", description: "I have extensive experience working with Linux, particularly in server implementation and management. At Johns Hopkins University, I use CentOS 7 daily for various research and development tasks. Additionally, I've set up and maintained game servers, including Minecraft, on Raspberry Pi using Raspbian Linux. My work highlights my proficiency in configuring, optimizing, and managing Linux-based servers for both research and gaming environments." },
        face4: { title: "React", description: "This portfolio website demonstrates my proficiency in modern web development technologies. Built with React for component-based architecture, CSS for advanced styling, JavaScript for dynamic functionality, and Three.js for rendering interactive 3D graphics, it showcases my ability to create responsive and visually engaging web applications. The project emphasizes my skills in integrating complex libraries and frameworks to deliver an exceptional user experience." },
        face5: { title: "R", description: "At Johns Hopkins University, I have extensively used R for statistical and probability modeling and analysis. My work includes applying R for Monte Carlo simulations and various statistical coursework, providing deep insights and accurate predictions for multivariable datasets. I have been cultivating my skills in R since my first semester as an undergraduate, consistently leveraging it for complex data analysis and modeling tasks." },
        face6: { title: "GitHub", description: "My GitHub showcases a diverse collection of projects highlighting my expertise in various programming languages and technologies. From machine learning models in Python and TensorFlow to web development with React and Three.js, and server implementations on Linux, my repositories reflect a broad range of skills and interests. Visit my <a href='https://github.com/adrisev99' target='_blank' rel='noopener noreferrer'>GitHub</a> to explore my work and see these projects in action." }
    };

    return (
        <>
            <div className="container mywork-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass}
                            strArray={"My Work".split("")}
                            idx={15}
                        />
                    </h1>
                    <p className={letterClass}>
                        Click on the cube's faces to learn about my work!
                    </p>
                </div>
                <div className="interactive-area">
                    <div className='stage-cube-cont'>
                        <div className='cubespinner'>
                            <div className='face1' onClick={(event) => handleClick('face1', event)}>
                                <FontAwesomeIcon icon={faSwift} />
                            </div>
                            <div className='face2' onClick={(event) => handleClick('face2', event)}>
                                <FontAwesomeIcon icon={faPython} />
                            </div>
                            <div className='face3' onClick={(event) => handleClick('face3', event)}>
                                <FontAwesomeIcon icon={faLinux} />
                            </div>
                            <div className='face4' onClick={(event) => handleClick('face4', event)}>
                                <FontAwesomeIcon icon={faReact} />
                            </div>
                            <div className='face5' onClick={(event) => handleClick('face5', event)}>
                                <FontAwesomeIcon icon={faRProject} />
                            </div>
                            <div className='face6' onClick={(event) => handleClick('face6', event)}>
                                <FontAwesomeIcon icon={faGithubSquare} />
                            </div>
                        </div>
                    </div>
                    {activeFace && (
                        <div className={`description-window ${animationClass}`} ref={descriptionRef}>
                            <h2>{descriptions[activeFace].title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: descriptions[activeFace].description }}></p>
                        </div>
                    )}
                </div>
                <Popup />
            </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    );
};

export default MyWork;

