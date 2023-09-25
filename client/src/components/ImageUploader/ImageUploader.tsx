import styles from './ImageUploader.module.css';
import { PiUploadSimpleLight } from 'react-icons/pi';

interface ImageUploaderProps {
    id: string;
    previewURL: string;
    imgVisibility: string;
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    sendImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ImageUploader = ({ previewURL, imgVisibility, sendImage, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    return (
        <div className={styles.uploadImgContainer} onDrop={onDrop} onDragOver={onDragOver}>
            <label className={styles.label}>Imagen</label>
            <br />
            <div className={styles.dragDropZone}>
                <PiUploadSimpleLight className={styles.icon} />
                <p>
          Arrastra una imagen.
                    <img
                        src={previewURL}
                        style={{ objectFit: 'cover', display: imgVisibility }}
                        alt="uploaded"
                        width="300"
                        height="300"
                    />
                </p>
                {previewURL && ( // Mostrar el botón "Remove" solo si previewURL existe
                    <button onClick={removeImage}>Remove</button>
                )}
                {/* <button onClick={sendImage}>Enviar</button> */}
            </div>
        </div>
    );
};