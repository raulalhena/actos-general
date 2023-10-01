import styles from './ImageUploader.module.css';
import { RiFolderUploadFill } from 'react-icons/ri';

interface ImageUploaderProps {
    id: string;
    previewURL: string;
    imgVisibility: string;
    removeImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    convertToBase64: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    image: Blob;
}

export const ImageUploader = ({ image, previewURL, imgVisibility, convertToBase64, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    console.log('image', image);

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
                    {previewURL && ( // Mostrar el botón "Guardar" solo si previewURL existe
                        <button className={styles.save} onClick={convertToBase64}>Guardar</button>
                    )}
                </div>
            </div>
        </div>
    );
};
