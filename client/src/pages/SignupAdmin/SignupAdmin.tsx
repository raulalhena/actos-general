import SignupAdminForm from '../../components/SignupAdminForm/SignupAdminForm';
import styles from './SignupAdmin.module.css';

function SignupAdmin() {
    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.title}>
                        <h1 className={styles.dash}>—</h1>
                        <h1>Registro de Usuario Administrador</h1>
                    </div>
                    <SignupAdminForm />
                </div>
            </div>
        </>
    );
}

export default SignupAdmin;
