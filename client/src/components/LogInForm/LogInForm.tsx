'use client';

import React, { useState } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import styles from './LogInForm.module.css';
import ButtonSubmit from '@/components/Button/ButtonSubmit';
import { LogInProps } from '@/app/interfaces/logInProps';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LogInForm = () => {
    const router = useRouter();

    const [ logInData, setLogInData ] = useState<LogInProps>({
        email: '',
        password: '',
    });
    const [ passwordError, setPasswordError ] = useState<string | null>(null);
    const [ emailError, setEmailError ] = useState<string | null>(null);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setLogInData({
            ...logInData,
            [id]: value,
        });
    };
    const [ loginError, setLoginError ] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate password
        const isValidPassword = validatePassword(logInData.password);
        if (!isValidPassword) {
            setPasswordError(
                'La contraseña debe tener al menos una mayúscula, un número y un carácter especial.'
            );
        } else {
            setPasswordError(null);
        }

        // Validate email
        const isValidEmail = validateEmail(logInData.email);
        if (!isValidEmail) {
            setEmailError('El email no tiene un formato válido.');
        } else {
            setEmailError(null);
        }

        requestLogin();
    };

    const requestLogin = async () => {
        const res = await signIn('credentials', {
            email: logInData.email,
            password: logInData.password,
            redirect: false
        });

        if(res?.error) return setLoginError(res.error as string);

        if(res?.ok) return router.push('/event');
    };

    // Function to validate password
    const validatePassword = (password: string) => {
        const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return passwordRegex.test(password);
    };

    // Function to validate email
    const validateEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <section className={styles.registerTitle}>
                    <h2>¿No tienes cuenta?</h2>
                    <h2 className={styles.registerLink}>Regístrate</h2>
                </section>
                <section className={styles.logInForm}>
                    <h1>Iniciar sesión</h1>
                    <TextInput
                        id="email"
                        label=""
                        placeholder="Email"
                        minLength={3}
                        maxLength={175}
                        value={logInData.email}
                        onChange={handleInputChange}
                    />
                    {emailError && <p className={styles.error}>{emailError}</p>}
                    <TextInput
                        id="password"
                        label=""
                        placeholder="Contraseña"
                        minLength={3}
                        maxLength={175}
                        value={logInData.password}
                        onChange={handleInputChange}
                        isPassword={true}
                    />
                    {passwordError && <p className={styles.error}>{passwordError}</p>}
                    <h3 className={styles.forgotPasswordLink}>
            ¿Has olvidado tu contraseña?
                    </h3>
                </section>
                <div className={styles.buttonSection}>
                    <ButtonSubmit label="Iniciar sesión" />
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
