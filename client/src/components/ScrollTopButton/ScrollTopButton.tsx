import  { useState, useEffect } from 'react';
import styles from './ScrollTopButton.module.css';

const ScrollTopButton = () => {
    const [ isVisible, setIsVisible ] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`${styles.scrolltotopbutton} ${
                isVisible ? styles.visible : ''
            }`}
            onClick={scrollToTop}
        >
            ↑
        </div>
    );
};

export default ScrollTopButton;
