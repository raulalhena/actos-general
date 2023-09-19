import './ImageUploader.css';

interface ImageUploaderProps {
    previewURL: string;
    imgVisibility: boolean;
    removeImage: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: () => void;
}

export const ImageUploader = ({ previewURL, imgVisibility, removeImage, onDrop, onDragOver }: ImageUploaderProps) => {

    return (   
        <div style={{ width: '300px' }} className={'drag-drop-zone image-uploader'} onDrop={onDrop} onDragOver={onDragOver}>
            <p>Drag files here to upload<img src={previewURL} style={{ objectFit: 'cover', display: imgVisibility }} alt='uploaded' width='300' height='300' /></p>
            <button onClick={removeImage}>Remove</button>
        </div>
    );
};
