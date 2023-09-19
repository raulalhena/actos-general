import styles from './ImageUploader.module.css';
import { PiUploadSimpleLight } from 'react-icons/pi';

interface ImageUploaderProps {
    previewURL: string;
    imgVisibility: boolean;
    removeImage: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: () => void;
}

export const ImageUploader = ({ previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    return (
        <div className={styles.uploadImgContainer}>
            <label className={styles.label} >
                Imagen
            </label>
            <br />
            <div className={styles.dragDropZone}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <PiUploadSimpleLight className={styles.icon}/>
                <p>Arrastra una imagen.<img src={previewURL} style={{ objectFit: 'cover', display: imgVisibility }} alt='uploaded' width='300' height='300' /></p>
                
            </div>
            <button onClick={removeImage}>Remove</button>
        </div>
        
    );
};
