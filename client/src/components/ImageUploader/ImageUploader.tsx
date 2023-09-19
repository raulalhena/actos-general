import { useState } from 'react';
import styles from './ImageUploader.module.css';
import { PiUploadSimpleLight } from 'react-icons/pi';

export const ImageUploader = () => {

    const [ bgImage, setBgImage ] = useState(null);
    const [ previewURL, setPreviewURL ] = useState('http://localhost:5000/public/next.svg');
    const [ imgVisibility, setImgVisibility ] = useState('none');

    const handleFile = (file: any) => {
        setBgImage(file);
        setPreviewURL(URL.createObjectURL(file));
        setImgVisibility('block');
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        e.dataTransfer.clearData();
        console.log(file);
        handleFile(file);
    };

    // const handleSubmit = (e: SubmitEvent) => {
    //     e.preventDefault();
    //     const url = 'http://localhost:5000/uploadFile';
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('fileName', file.name);
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data',
    //         },
    //     };
    //     console.log(file);
    //     // Envío de fichero de imagen al backend para almacenarlo
    //     // const resp = await fetch('http://localhost:5000/api/events, method: 'POST')
    //     // const data = await resp.json();
    //     // setPreviewURL(data.fileUrl);

    // };

    const removeImage = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setBgImage(null);
        setPreviewURL('');
        setImgVisibility('none');
    };

    return (   
        <div className={styles.uploadImgContainer}>
            <label className={styles.label} >
                Imagen
            </label>
            <br />
            <div className={styles.dragDropZone}
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
            >
                <PiUploadSimpleLight className={styles.icon}/>
                <p>Arrastra una imagen.<img src={previewURL} style={{ objectFit: 'cover', display: imgVisibility }} alt='uploaded' width='300' height='300' /></p>
                
            </div>
            <button onClick={removeImage}>Remove</button>
        </div>
        
    );
};
