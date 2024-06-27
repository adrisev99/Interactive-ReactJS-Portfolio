import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular, faDocker, faJsSquare, faLinux, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import Popup from '../Popup';

const MyWork = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [activeFace, setActiveFace] = useState(null);
    const [animationClass, setAnimationClass] = useState('');
    const descriptionRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
                setAnimationClass('bounce-out');
                setTimeout(() => setActiveFace(null), 600); // Wait for the animation to finish
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (face, event) => {
        event.stopPropagation(); // Stop the event from propagating to the document
        if (face !== activeFace) {
            setAnimationClass('bounce-out');
            setTimeout(() => {
                setActiveFace(face);
                setAnimationClass('bounce-in');
            }, 600); // Wait for the bounce-out animation to complete
        } else {
            setActiveFace(face);
            setAnimationClass('bounce-in');
        }
    };

    const descriptions = {
        face1: "Description for Angular",
        face2: "Description for Python",
        face3: "Description for Linux",
        face4: "Description for React",
        face5: "Description for JavaScript",
        face6: "Description for Docker"
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
                        Click on the cube faces to learn more!
                    </p>
                </div>
                <div className="interactive-area">
                    <div className='stage-cube-cont'>
                        <div className='cubespinner'>
                            <div className='face1' onClick={(event) => handleClick('face1', event)}>
                                <FontAwesomeIcon icon={faAngular} />
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
                                <FontAwesomeIcon icon={faJsSquare} />
                            </div>
                            <div className='face6' onClick={(event) => handleClick('face6', event)}>
                                <FontAwesomeIcon icon={faDocker} />
                            </div>
                        </div>
                    </div>
                    {activeFace && (
                        <div className={`description-window ${animationClass}`} ref={descriptionRef}>
                            <h2>{descriptions[activeFace]}</h2>
                            <p>{descriptions[activeFace]}</p>
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






