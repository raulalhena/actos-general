import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextInputProps } from '../../interfaces/textInputProps';
import styles from './TextArea.module.css';

export const TextArea = (props: TextInputProps) => {
    const { label, id, value, onChange } = props;

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
                    style={{ border: 'none', height: '180px'  }}
                    modules={{
                        toolbar: [
                            [ 'bold', 'italic', 'underline', 'strike' ],
                            [ 'link' ],
                            [ { list: 'ordered' }, { list: 'bullet' } ],
                            [ { size: [ 'small', false, 'large', 'huge' ] } ], 
                            [ { color: [] }, { background: [] } ],     
                            [ { font: [] } ],
                            [ { align: [] } ],
                        ],
                    }}
                    
                />
            </div>
        </div>
    );
};
