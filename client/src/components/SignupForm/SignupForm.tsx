import React, { useState } from 'react';
import styles from './SignupForm.module.css';
import { SignupProps } from '../../interfaces/signupProps';
import ButtonSubmit from '../Button/ButtonSubmit';
import TextInput from '../TextInput/TextInput';

const SignupForm = () => {
    const [ signupData, setSignupData ] = useState<SignupProps>({
        name: '',
        surname: '',
        email: '',
        password: '',
    });
    const [ nameError, setNameError ] = useState<string | null>(null);
    const [ surnameError, setSurnameError ] = useState<string | null>(null);
    const [ passwordError, setPasswordError ] = useState<string | null>(null);
    const [ emailError, setEmailError ] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setSignupData({
            ...signupData,
            [id]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate name
        const isValidName = validateName(signupData.name);
        if(!isValidName) {
            setNameError('El nombre no puede estar en blanco, contener números o espacios en blanco o ser menor de 2 carácteres');
        } else {
            setNameError(null);
        }

        // Validate surname
        const isValidSurname = validateSurname(signupData.surname);
        if(!isValidSurname) {
            setSurnameError('El apellido no puede estar en blanco, contener números o ser menor de 2 carácteres');
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

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <section className={styles.signupForm}>
                    <h1>Registro de usuario</h1>
                    <TextInput
                        id="name"
                        label=""
                        placeholder="Nombre"
                        minLength={2}
                        maxLength={175}
                        value={signupData.name}
                        onChange={handleInputChange}
                    />
                    {nameError && <p className={styles.error}>{nameError}</p>}
                    <TextInput
                        id="surname"
                        label=""
                        placeholder="Apellidos"
                        minLength={2}
                        maxLength={175}
                        value={signupData.surname}
                        onChange={handleInputChange}
                    />
                    {surnameError && <p className={styles.error}>{surnameError}</p>}
                    <TextInput
                        id="email"
                        label=""
                        placeholder="Email"
                        minLength={3}
                        maxLength={175}
                        value={signupData.email}
                        onChange={handleInputChange}
                    />
                    {emailError && <p className={styles.error}>{emailError}</p>}
                    <TextInput
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
                    <TextInput
                        id="passwordConfirmed"
                        label=""
                        placeholder="Confirma tu contraseña"
                        minLength={3}
                        maxLength={175}
                        value={signupData.password}
                        onChange={handleInputChange}
                        isPassword={true}
                    />
                    {passwordError && <p className={styles.error}>{passwordError}</p>}
                </section>
                <div className={styles.buttonSection}>
                    <ButtonSubmit label="Registrarse" />
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
