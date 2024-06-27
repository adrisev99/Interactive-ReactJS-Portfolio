import React, { useState } from 'react';
import './index.scss';

const TextWindow = ({ text }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`text-window ${isOpen ? 'open' : ''}`}>
            <div className="lid" onClick={handleToggle}>
                {isOpen ? 'Hide' : 'Click to Learn More!'}
            </div>
            {isOpen && <div className="content">{text}</div>}
        </div>
    );
};

export default TextWindow;

