import { useState } from 'react';
import styles from './LogInForm.module.css';
import { LogInProps } from '../../interfaces/logInProps';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import { useAuth } from '../../hooks/useAuth';
import TextInputSmall from '../TextInputSmall/TextInputSmall';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogInForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [ logInData, setLogInData ] = useState<LogInProps>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setLogInData({
            ...logInData,
            [id]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
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
            login(user.user);
            navigate('/');
        } else {
            toast.error(message, {
                position: 'top-right',
                pauseOnHover: true,
            });
        }
    };

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
