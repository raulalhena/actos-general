import React, { useState } from 'react';
import styles from './SignupAdminForm.module.css';
import { SignupAdminProps } from '../../interfaces/signupAdminProps';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import TextInputSmall from '../TextInputSmall/TextInputSmall';
import ConfirmPasswordInput from '../ConfirmPasswordInput/ConfirmPasswordInput';
import { BsPatchCheckFill } from 'react-icons/bs';
import ModalDisplay from '../Modal/ModalDisplay';
import { ToastContainer, toast } from 'react-toastify';

const SignupAdminForm = () => {
    const [ signupData, setSignupData ] = useState<SignupAdminProps>({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'admin'
    });

    const nameError = null;
    const surnameError = null;
    const emailError = null;
    const passwordError = null;
    const notPasswordMatchError = null;
    const [ passwordConfirmed, setPasswordConfirmed ] = useState<string>('');
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setSignupData({
            name: '',
            surname: '',
            email: '',
            password: '',
            role: 'admin'
        });
        setPasswordConfirmed('');
    };

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

        let errorMessage = '';
        if (!validateEmail(signupData.email)) {
            errorMessage = 'Error: Por favor, introduce una dirección de correo electrónico válida.';
        } else if (!validateName(signupData.name)) {
            errorMessage = 'Error: Nombre no válido. Asegúrate de que tenga al menos 2 caracteres y no contenga números ni espacios.';
        } else if (!validateSurname(signupData.surname)) {
            errorMessage ='Error: Apellido no válido. Asegúrate de que tenga al menos 2 caracteres y no contenga números.';
        } else if (!validatePassword(signupData.password)) {
            errorMessage = 'Error: La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.';
        } else if (!matchPassword(signupData.password, passwordConfirmed)) {
            errorMessage = 'Error: Las contraseñas no coinciden.';
        } else {
            const resp = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            if (resp.ok) {
                setIsModalOpen(true);
            }
        }

        if (errorMessage.trim() !== '') { 
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
                    <ToastContainer position="top-right" autoClose={3000} />
                    <section>
                        <h1>Registro de usuario Administrador</h1>
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
                        <ButtonSubmit label="Crear usuario" />
                    </div>
                    <div>
                        {isModalOpen && (
                            <ModalDisplay
                                icon={<BsPatchCheckFill className={styles.checkIcon} />}
                                title={'Registrado con éxito'}
                                subtitle={'El administrador ya puede iniciar sesión'}
                                button1Text={'Cerrar'}
                                button2Text={''}
                                onClose={closeModal}
                                isOpen={true}
                                onButton1Click={closeModal}
                                onButton2Click={() => {}}
                                showCloseButton={true}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupAdminForm;
