import styles from  './ImageQR.module.css';

type Props = {
    qr: string | undefined;
}

const ImageQR = ({ qr }: Props) => {
    return (
        <div className={styles.qr}>
            { <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qr)}`} /> }
        </div>
    );
};

export default ImageQR;
