import './index.scss';
import { useState, useEffect } from 'react';

const Popup = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="popup">
            Click to interact!
        </div>
    );
};

export default Popup;
