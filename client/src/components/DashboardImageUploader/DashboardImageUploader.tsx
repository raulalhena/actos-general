import styles from './DashboardImageUploader.module.css';
import { RiFolderUploadFill } from 'react-icons/ri';

interface ImageUploaderProps {
    id: string;
    previewURL: string;
    imgVisibility: string;
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    image: Blob;
}

export const DashboardImageUploader = ({ image, previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    console.log('preview ', previewURL);

    return (
        <div className={styles.uploadImgContainer} onDrop={onDrop} onDragOver={onDragOver}>
            <label className={styles.label}>Imagen</label>
            <br />
            <div className={styles.dragDropZone}>
                {previewURL ? null : ( // Ocultar el icono y el texto si previewURL existe
                    <div>
                        <RiFolderUploadFill className={styles.icon} />
                        <br />
                        <br />
                        <p className={styles.text}>Arrastra una imagen</p>
                    </div>
                )}
                <img
                    src={image}
                    className={styles.image}
                    style={{ display: imgVisibility }}
                    alt="uploaded"
                />
                <div className={styles.buttons} >
                    {previewURL && ( // Mostrar el botón "Eliminar" solo si previewURL existe
                        <button className={styles.remove} onClick={removeImage}>Eliminar</button>
                    )}
                </div>
            </div>
        </div>
    );
};
