import { FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const socialMediaLinks = [
    {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/company/fundaci%C3%B3-nous-cims?originalSubdomain=es',
        icon: <FaLinkedinIn className={styles.icon} />,
    },
    {
        title: 'YouTube',
        url: 'https://www.youtube.com/channel/UCOQ37wdv56JE3o133NR1u5g',
        icon: <FaYoutube className={styles.icon} />,
    },
];

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <section className={styles.sectionFooter}>
                    <div className={styles.brandSection}>
                        <img src={logo} className={styles.logo} alt="Logo" />
                        <p className={styles.brandName}>Fundación Privada Nous Cims</p>
                    </div>
                </section>
                <section className={styles.sectionFooter}>
                    <div className={styles.contactSection}>
                        <h1 className={styles.titleFooter}>Contacto</h1>
                        <h2 className={styles.contactInfo}>
              Oficina Nous Cims en Barcelona
                        </h2>
                        <p className={styles.contactAddress}>
              Entença, 332-334. 7ª planta
                            <br />
              08029 Barcelona
                            <br />
              Tel: +34 677920250
                        </p>
                    </div>
                </section>
                <section className={styles.sectionFooter}>
                    <div className={styles.socialSection}>
                        <h1 className={styles.titleFooter}>#nouscims</h1>
                        <div className={styles.socialIcons}>
                            {socialMediaLinks.map((link, index) => (
                                <div className={styles.iconModeContainer} key={index}>
                                    <a href={link.url} className={styles.iconLink} target="_blank" >
                                        <div className={styles.iconContainer}>{link.icon}</div>
                                    </a>
                                    <span className={styles.mode}></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.copyright}>
        © 2023 Nous Cims by ACTOS. Todos los derechos
        reservados&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                    className={styles.copyrightLink}
                    href="https://www.nouscims.com/aviso-legal/"
                >
          Aviso Legal
                </a>
        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                    className={styles.copyrightLink}
                    href="https://www.nouscims.com/politica-privacidad/"
                >
          Política de Privacidad
                </a>
        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                    className={styles.copyrightLink}
                    href="https://www.nouscims.com/politica-de-cookies/"
                >
          Política de Cookies
                </a>
        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                    className={styles.copyrightLink}
                    href="https://www.nouscims.com/politica-de-calidad/"
                >
          Política de Calidad
                </a>
            </div>
        </>
    );
};

export default Footer;
