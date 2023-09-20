import { TagsInput } from 'react-tag-input-component';
import styles from './TagsInput.module.css';
import { TagsInputProps } from '../../interfaces/tagsInputProps';

const TagsInputComponent = (props: TagsInputProps) => {

    const { label, placeHolder, value, onChange , id, subtitle } = props;
    
    return (
        <div className={styles.tagContainer}>
            <div>
                <label className={styles.label}>
                    {label}
                </label>
                <br />
                <label className={styles.subtitle}
                    htmlFor={id}>{subtitle}
                </label>
            </div>
            <br />
            <div>
                <TagsInput
                    placeHolder={placeHolder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            
        </div>
    );
};

export default TagsInputComponent;