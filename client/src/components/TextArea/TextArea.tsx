import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextAreaProps } from '../../interfaces/textAreaProps';
import styles from './TextArea.module.css';

const TextArea = (props: TextAreaProps) => {
    const { label, id, value, onChange } = props;

    const quillStyles = {
        border: 'none',
        height: '180px',
    };

    return (
        <div className={styles.textContainer}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <br />
            <div className={styles.input}>
                <ReactQuill
                    id={id}
                    value={value}
                    onChange={e => onChange(e)}
                    theme="snow"
                    placeholder="Cuéntanos más sobre el evento..."
                    style={quillStyles}
                    modules={{
                        toolbar: [
                            [ 'bold', 'italic', 'underline', 'strike' ],
                            [ 'link' ],
                            [ { list: 'ordered' }, { list: 'bullet' } ],
                            [ { size: [ 'small', false, 'large', 'huge' ] } ], 
                            [ { color: [ ] }, { background: [] } ],     
                            [ { font: [] } ],
                            [ { align: [] } ],
                        ],
                    }}
                    
                />
            </div>
        </div>
    );
};

export default TextArea;
