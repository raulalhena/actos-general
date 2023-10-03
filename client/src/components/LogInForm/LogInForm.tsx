import { useState } from 'react';
import styles from './LogInForm.module.css';
import { LogInProps } from '../../interfaces/logInProps';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import { useAuth } from '../../hooks/useAuth';
import TextInputSmall from '../TextInputSmall/TextInputSmall';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const LogInForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [ logInData, setLogInData ] = useState<LogInProps>({
        email: '',
        password: '',
    });
    // const [ passwordError, setPasswordError ] = useState<string | null>(null);
    // const [ emailError, setEmailError ] = useState<string | null>(null);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setLogInData({
            ...logInData,
            [id]: value,
        });
    };
    // const [ loginError, setLoginError ] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate password
        /*         const isValidPassword = validatePassword(logInData.password);
        if (!isValidPassword) {
            setPasswordError(
                'La contraseña debe tener al menos una mayúscula, un número y un carácter especial.'
            );
        } else {
            setPasswordError(null);
        } */

        // Validate email
        /*         const isValidEmail = validateEmail(logInData.email);
        if (!isValidEmail) {
            setEmailError('El email no tiene un formato válido.');
        } else {
            setEmailError(null);
        } */

        requestLogin();
    };

    const requestLogin = async () => {
        const resp = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logInData),
        });
        
        const { accessToken, message, ...user } = await resp.json();
        
        if(resp.ok) {
            user.user.token = accessToken;
            console.log('user', user);

            login(user.user);
            navigate('/');
        } else {
            toast.error(message, {
                position: 'top-right',
                pauseOnHover: true,
            });
        }
    };

    // Function to validate password
    /*     const validatePassword = (password: string) => {
        const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return passwordRegex.test(password);
    }; */

    // Function to validate email
    /*     const validateEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }; */

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <section className={styles.optionTitle}>
                        <h2>¿No tienes cuenta?</h2>
                        <Link to="/signup" className={styles.registerLink}>
              Regístrate
                        </Link>
                    </section>
                    <section>
                        <h1>Iniciar sesión</h1>
                        <TextInputSmall
                            id="email"
                            type='email'
                            label=""
                            placeholder="Email"
                            minLength={3}
                            maxLength={175}
                            value={logInData.email}
                            onChange={handleInputChange}
                            isRequired={true}
                        />
                        {/* {emailError && <p className={styles.error}>{emailError}</p>} */}
                        <TextInputSmall
                            id="password"
                            label=""
                            placeholder="Contraseña"
                            minLength={3}
                            maxLength={175}
                            value={logInData.password}
                            onChange={handleInputChange}
                            isPassword={true}
                            isRequired={true}
                        />
                        {/* {passwordError && <p className={styles.error}>{passwordError}</p>} */}
                        <h3 className={styles.forgotPasswordLink}>
              ¿Has olvidado tu contraseña?
                        </h3>
                    </section>
                    <div className={styles.buttonSection}>
                        <ButtonSubmit label="Iniciar sesión" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogInForm;
