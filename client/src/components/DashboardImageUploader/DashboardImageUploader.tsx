import styles from './DashboardImageUploader.module.css';
import { RiFolderUploadFill } from 'react-icons/ri';

interface ImageUploaderProps {
    id: string;
    previewURL: string;
    imgVisibility: string;
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    image: string | undefined;
    value: string | undefined;
}

export const DashboardImageUploader = ({ image, previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    return (
        <div data-testid="dashboard-img" className={styles.uploadImgContainer} onDrop={onDrop} onDragOver={onDragOver}>
            <label className={styles.label}>Imagen</label>
            <br />
            <div className={styles.dragDropZone}>
                {(image || previewURL) ? null : ( // Ocultar el icono y el texto si previewURL existe
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
                    {(image || previewURL) && ( // Mostrar el botón "Eliminar" solo si previewURL existe
                        <button className={styles.remove} onClick={removeImage}>Eliminar</button>
                    )}
                </div>
            </div>
        </div>
    );
};
