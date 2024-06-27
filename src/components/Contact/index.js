import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => {
            clearTimeout(timeoutId);
          };
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'default_service',
                'template_ff22d3r',
                refForm.current,
                'PIvKK8JcY_JVBTvKh'
            )
            .then(
                () => {
                    alert('Message successfully sent.')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message. Please try again.')
                }
            )
    }

    return (
    <>
        <div className="container contact-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters 
                    letterClass={letterClass}
                    strArray={"Contact Me".split("")}
                    idx={15}
                    />

                </h1>
                <p>
                    contact me please
                </p>
                <div className='contact-form'>
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type='text' name='name' placeholder='Name' required />
                            </li>
                            <li className='half'>
                                <input type="email" name='email' placeholder='Email' required />
                            </li>
                            <li>
                                <input placeholder='Subject' type="text" name='subject' required />
                            </li>
                            <li>
                                <textarea placeholder='Message' name='message' required>
                                </textarea>
                            </li>
                            <li>
                                <input type='submit' className='flat-button' value='SEND' />
                            </li>
                        </ul>

                    </form>
                </div>
            </div>
        
        </div>
        <Loader type="line-scale-pulse-out-rapid" />
    </>    
    )

}

export default Contact