import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './signup.module.css';

function SignupPage() {
    return (
        <>
            <section className={styles.header}>Aquí va una imagen</section>
            <div className={styles.container}>
                <SignupForm />
            </div>
        </>
    );
}

export default SignupPage;