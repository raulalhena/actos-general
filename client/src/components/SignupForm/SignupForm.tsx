import React, { useState } from 'react';
import styles from './SignupForm.module.css';
import { SignupProps } from '../../interfaces/signupProps';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import TextInputSmall from '../TextInputSmall/TextInputSmall';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmPasswordInput from '../ConfirmPasswordInput/ConfirmPasswordInput';

const SignupForm = () => {
    const [ signupData, setSignupData ] = useState<SignupProps>({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [ nameError, setNameError ] = useState<string | null>(null);
    const [ surnameError, setSurnameError ] = useState<string | null>(null);
    const [ passwordError, setPasswordError ] = useState<string | null>(null);
    const [ emailError, setEmailError ] = useState<string | null>(null);
    const [ notPasswordMatchError, setNotPasswordMatchError ] = useState<string | null>(null);
    const [ passwordConfirmed, setPasswordConfirmed ] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setSignupData({
            ...signupData,
            [id]: value,
        });
    };

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
    
        setPasswordConfirmed(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate name
        const isValidName = validateName(signupData.name);
        if (!isValidName) {
            setNameError(
                'El nombre no puede estar en blanco, contener números o espacios en blanco o ser menor de 2 carácteres'
            );
        } else {
            setNameError(null);
        }

        // Validate surname
        const isValidSurname = validateSurname(signupData.surname);
        if (!isValidSurname) {
            setSurnameError(
                'El apellido no puede estar en blanco, contener números o ser menor de 2 carácteres'
            );
        } else {
            setSurnameError(null);
        }

        // Validate password
        const isValidPassword = validatePassword(signupData.password);
        if (!isValidPassword) {
            setPasswordError(
                'La contraseña debe tener al menos una mayúscula, un número y un carácter especial.'
            );
        } else {
            setPasswordError(null);
        }

        // Validate email
        const isValidEmail = validateEmail(signupData.email);
        if (!isValidEmail) {
            setEmailError('El email no tiene un formato válido.');
        } else {
            setEmailError(null);
            console.log(signupData);
        }

        // Validate match password
        const isMatchPassword = matchPassword(signupData.password, passwordConfirmed);
        if (!isMatchPassword) {
            setNotPasswordMatchError('Las contraseñas no coinciden.');
        } else {
            setNotPasswordMatchError(null);
        }

        console.log('sign up ', signupData);

        if(
            validateEmail(signupData.email) &&
            validateName(signupData.name) &&
            validateSurname(signupData.surname) &&
            validatePassword(signupData.password) &&
            matchPassword(signupData.password, passwordConfirmed)
        ){

            const resp = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            if(resp.ok) navigate('/login');
        }

    };

    // Function to validate name
    const validateName = (name: string) => {
        const nameRegex = /(.*[a-z]){2}/i;
        return nameRegex.test(name);
    };

    // Function to validate surname
    const validateSurname = (surname: string) => {
        const surnameRegex = /(.*[a-z]){2}/i;
        return surnameRegex.test(surname);
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

    // Function to validate match password
    const matchPassword = (password: string, confirmedPassword: string) => {
        return password === confirmedPassword;
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <section className={styles.optionTitle}>
                        <h2>¿Ya tienes cuenta?</h2>
                        <Link to="/login" className={styles.registerLink}>
                            Inicia sesión
                        </Link>
                    </section>
                    <section>
                        <h1>Registro de usuario</h1>
                        <TextInputSmall
                            id="name"
                            label=""
                            placeholder="Nombre"
                            minLength={2}
                            maxLength={175}
                            value={signupData.name}
                            onChange={handleInputChange}
                        />
                        {nameError && <p className={styles.error}>{nameError}</p>}
                        <TextInputSmall
                            id="surname"
                            label=""
                            placeholder="Apellidos"
                            minLength={2}
                            maxLength={175}
                            value={signupData.surname}
                            onChange={handleInputChange}
                        />
                        {surnameError && <p className={styles.error}>{surnameError}</p>}
                        <TextInputSmall
                            id="email"
                            label=""
                            placeholder="Email"
                            minLength={3}
                            maxLength={175}
                            value={signupData.email}
                            onChange={handleInputChange}
                        />
                        {emailError && <p className={styles.error}>{emailError}</p>}
                        <TextInputSmall
                            id="password"
                            label=""
                            placeholder="Contraseña"
                            minLength={3}
                            maxLength={175}
                            value={signupData.password}
                            onChange={handleInputChange}
                            isPassword={true}
                        />
                        {passwordError && <p className={styles.error}>{passwordError}</p>}
                        <ConfirmPasswordInput
                            id="passwordConfirmed"
                            label=""
                            placeholder="Confirma tu contraseña"
                            minLength={3}
                            maxLength={175}
                            value={passwordConfirmed}
                            onChange={handleConfirmPassword}
                            isPassword={true}
                        />
                        {notPasswordMatchError && <p className={styles.error}>{notPasswordMatchError}</p>}
                    </section>
                    <div className={styles.buttonSection}>
                        <ButtonSubmit label="Registrarse" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
