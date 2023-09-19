import './ImageUploader.css';

interface ImageUploaderProps {
    previewURL: string;
    imgVisibility: boolean;
    removeImage: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: () => void;
}

export const ImageUploader = ({ previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

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

    return (   
        <div style={{ width: '300px' }} className={'drag-drop-zone image-uploader'} onDrop={onDrop} onDragOver={onDragOver}>
            <p>Drag files here to upload<img src={previewURL} style={{ objectFit: 'cover', display: imgVisibility }} alt='uploaded' width='300' height='300' /></p>
            <button onClick={removeImage}>Remove</button>
        </div>
    );
};
