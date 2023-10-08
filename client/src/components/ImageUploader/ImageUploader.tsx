import styles from './ImageUploader.module.css';
import { RiFolderUploadFill } from 'react-icons/ri';

interface ImageUploaderProps {
    id: string;
    previewURL: string;
    imgVisibility: string;
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ImageUploader = ({ previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    return (
        <div data-testid="img-uploader" className={styles.uploadImgContainer} onDrop={onDrop} onDragOver={onDragOver}>
            <label className={styles.label}>Imagen</label>
            <br />
            <div className={styles.dragDropZone}>
                {previewURL ? null : ( 
                    <div>
                        <RiFolderUploadFill className={styles.icon} />
                        <br />
                        <br />
                        <p className={styles.text}>Arrastra una imagen</p>
                    </div>
                )}
                <img
                    src={previewURL}
                    className={styles.image}
                    style={{ display: imgVisibility }}
                    alt="uploaded"
                />
                <div className={styles.buttons} >
                    {previewURL && ( 
                        <button className={styles.remove} onClick={removeImage}>Eliminar</button>
                    )}
                </div>
            </div>
        </div>
    );
};
