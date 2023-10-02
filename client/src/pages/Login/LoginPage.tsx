import { useState, useEffect } from 'react';
import LogInForm from '../../components/LogInForm/LogInForm';
import styles from './login.module.css';
import Img from '../../assets/login.png';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [ showImg, setShowImg ] = useState(true);

    const handleResize = () => {
        if (window.innerWidth < 900) {
            setShowImg(false);
        } else {
            setShowImg(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.sectionImg}>
                    {showImg ? (
                        <Link to="/">
                            <img src={Img} alt="NousCims" className={styles.img} />
                        </Link>
                    ) : (
                        <Link to="/">
                            <img src={Logo} alt="Logo" className={styles.logo} />
                        </Link>
                    )}
                </div>
                <LogInForm />
            </div>
        </div>
    );
};

export default LoginPage;
