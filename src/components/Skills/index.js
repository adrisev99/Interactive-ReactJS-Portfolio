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
                        skills
                    </p>
                    <p>
                        put more skills
                    </p>
                    <p>
                        I still love you mi amor
                    </p>
                </div>
                <TextSphere />
            </div>
        <Loader type="line-scale-pulse-out-rapid" />
        </>
    )


}

export default Skills