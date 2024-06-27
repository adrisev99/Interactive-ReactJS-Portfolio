import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-a.png';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';
import Loader from 'react-loaders';
import Popup from '../Popup';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = "drian,".split("")
    const jobArray = "Applied Mathematician".split("")

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 6000)

        return () => {
            clearTimeout(timeoutId); // Cleanup function
          };
    }, [])

    return (
        <>
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>i,</span>
                <br />
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>'m</span>
                <img src={LogoTitle} alt="developer" />
                <AnimatedLetters letterClass={letterClass}
                strArray={nameArray} 
                idx={15} />
                <br />
                <AnimatedLetters letterClass={letterClass}
                strArray={jobArray} 
                idx={21} />
                </h1>
                <h2>Modeling Engineer / Machine Learning Engineer / Full Stack Developer</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
            <Logo />
            <Popup />
        </div>
        <Loader type="line-scale-pulse-out-rapid" />
        </>
    );

}

export default Home