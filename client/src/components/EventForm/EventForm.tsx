import { useState, ChangeEvent } from 'react';
import { ButtonCardRadioProps } from '../../interfaces/buttonCardRadioProps';
import { EventFormProps } from '../../interfaces/eventFormProps';
import ButtonSubmit from '../Button/ButtonSubmit';
import RadioGroupContainer from '../Button/ButtonContainer/RadioCardContainer';
import DateInput from '../DateInput/DateInput';
import FormField from '../FormField/FormField';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import SectionForm from '../SectionForm/SectionForm';
import Select from '../Select/Select';
import TagsInputComponent from '../TagsInput/TagsInput';
import { TextArea } from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import TextInputWithSubtitle from '../TextInputWithSubtitle/TextInputWithSubtitle';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import modeRadioButtonsContainer from '../../data/modeRadioButtons.json';
import styles from './EventForm.module.css';
import categories from '../../data/category.json';
import timeZone from '../../data/timeZone.json';
import languages from '../../data/languages.json';
import time from '../../data/time.json';
import ProgressTracker from '../ProgressTracker/ProgressTracker';
import { useNavigate } from 'react-router';
import DropdownCheck from '../DropDownCheckbox/DropdownCheck';

// Form
const EventForm = () => {
    const navigator = useNavigate();

    const [ formData, setFormData ] = useState<EventFormProps>({
        name: '',
        category: '',
        tags: [],
        mode: '',
        type: '',
        address: '', 
        webLink: '', 
        date: '',
        startTime: '',
        endTime: '',
        timeZone: '',
        showTime: false,
        showDate: false,
        confirmed: false, 
        description: '',
        web: '', 
        organizedBy: [], 
        contact: '',
        isPrivate: false,
        language: [], //Select con checkbox
        image: '', 
        video: '', 
        capacity: 0
        // qrEvent: '',
        // qrAttendees: [],
        // attendees: [],
        // submitted: [],
        // price: 0, 
        // payment: '', 
        // visibility: false,
        // status: false
    });

    // Visibility
    const [ isSection1Visible, setIsSection1Visible ] = useState(false);
    const [ isSection2Visible, setIsSection2Visible ] = useState(false);
    const [ isSection3Visible, setIsSection3Visible ] = useState(false);

    // Text area
    const handleTextChange = (text: string ) => {
        // console.log(text)
        setFormData({
            ...formData,
            description: text,
        });
    };

    // Input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        let value : string | number = event.target.value;
        id === 'capacity' ? value = +value : ' ';
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // Select
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;

        //EventTime: Start and End Time
        if (id === 'endTime' && value < formData.startTime) {
            alert('La hora de finalización no puede ser anterior a la hora de inicio.');

        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    // Tags
    const handleTagsChange = (newTags: string[]) => {
        setFormData({
            ...formData,
            tags: newTags,
        });
    };

    const handleTagsOrganizadorChange = (newOrganizedBy: string[]) => {
        setFormData({
            ...formData,
            organizedBy: newOrganizedBy,
        });
    };

    // DateInput
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
        if (newDate >= currentDate) {
            setFormData({
                ...formData,
                date: newDate,
            });
        } else {
            alert('La fecha seleccionada es anterior a la fecha actual');
        }
    };

    // Send Image
    const sendImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const imageData = new FormData();
        imageData.append('file', eventImage);
        const resp = await fetch('http://localhost:8000/api/events/upload', {
            method: 'POST',
            body: imageData
        });
        const imageResp = await resp.json();
        setFormData((prevData) => ({ 
            ...prevData,
            image: imageResp.imageUrl 
        }));
    };

    // Submit Button
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);

        const resp = await fetch('http://localhost:8000/api/events', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await resp.json();
        navigator('/eventdashboard', { state: { id: result._id } });
    };

    // Button Radio
    const [ selectedMode, setSelectedMode ] = useState<string>('');

    // Mode Radio Groug handler
    const handleModeChange = (value: string) => {
        setSelectedMode(value);
        setFormData({
            ...formData,
            mode: value,
        });
    };

    // Mode Radio Group
    const modeRadioButtons: ButtonCardRadioProps[] = modeRadioButtonsContainer.map((container) => ({
        ...container,
        checked: selectedMode === container.value,
        onChange: () => handleModeChange(container.value),
    }));

    /**************************************************
    ** Image Uploader
    ******************/

    //  States
    const [ previewURL, setPreviewURL ] = useState<string>('');
    const [ imgVisibility, setImgVisibility ] = useState<string>('none');
    const [ eventImage, setEventImage ] = useState<any>('');

    // File Handler
    const handleFile = (file: any) => {
        setEventImage(() => file);
        setPreviewURL(URL.createObjectURL(file));
        setImgVisibility('block');
    };

    // Drop handler
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        e.dataTransfer.clearData();
        // setEventImage(file);
        handleFile(file);
    };

    // Drag Over handler
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Image remover
    const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPreviewURL('');
        setImgVisibility('none');
        setEventImage(() => '');
    };

    /******************
    ** Image Uploader
    **************************************************/
    
    //Toggle Switch

    const handleToggleTimeChange = (checked: boolean) => {
        setFormData({
            ...formData,
            showTime: checked,
        });
    };

    const handleToggleDateChange = (checked: boolean) => {
        setFormData({
            ...formData,
            showDate: checked,
        });
    };

    const handleToggleIsPrivateChange = (checked: boolean) => {
        setFormData({
            ...formData,
            isPrivate: checked,
        });
    };  

    const handleToggleCapacityChange = (checked: boolean) => { 
        console.log(checked);  
        setSelectedCapacity(!selectedCapacity);
    };
    
    const [ selectedCapacity, setSelectedCapacity ] = useState<boolean>(false);

    return (
        <div className={styles.form}>
            <form data-testid="event-form" onSubmit={handleSubmit}>

                <SectionForm
                    title="1 INFORMACIÓN BÁSICA"
                    isVisible={isSection1Visible}
                    toggleVisibility={() => setIsSection1Visible(!isSection1Visible)}>

                    <FormField>
                        <TextInput
                            isRequired={true}
                            id="name" 
                            label="Nombre del evento*"
                            placeholder="Evento"
                            minLength={3}
                            maxLength={75}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Select
                            id="category"
                            label="Categoría"
                            options={categories}
                            value={formData.category}
                            onChange={handleSelectChange}
                        />
                        <TagsInputComponent
                            id="tags"
                            value={formData.tags}
                            label="Etiquetas"
                            onChange={handleTagsChange}
                            placeHolder="Escribe etiquetas y presione Enter"
                            subtitle=''
                        />
                    </FormField>

                    <FormField>
                        <RadioGroupContainer
                            radioButtons={modeRadioButtons}
                            selectedValue={selectedMode}
                            label="Modalidad"
                            onChange={handleModeChange}
                        />
                        {selectedMode === 'option1' && (
                            <TextInput
                                id="address"
                                label="Añade una dirección"
                                placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                minLength={3}
                                maxLength={75}
                                value={formData.address}
                                onChange={handleInputChange}
                                isRequired={false}
                            />
                        )}
                        {selectedMode === 'option2' && (
                            <TextInput
                                isRequired={false}
                                id="webLink"
                                label="Añade un link de acceso"
                                placeholder="Escribe el link de acceso a tu evento."
                                minLength={3}
                                maxLength={75}
                                value={formData.webLink}
                                onChange={handleInputChange}
                                type="url"
                            />
                        )}
                        {selectedMode === 'option3' && (
                            <>
                                <TextInput
                                    id="address"
                                    label="Añade una dirección"
                                    placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    id="webLink"
                                    label="Añade un link de acceso"
                                    placeholder="Escribe el link de acceso a tu evento."
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.webLink}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                    type="url"
                                />
                            </>
                        )}
                    </FormField>
                    <FormField>
                        <DateInput 
                            id='date' 
                            name='date' 
                            value={formData.date} 
                            onChange={handleDateChange} />
                        <ToggleSwitch
                            id="confirmDate"
                            label="Fecha por confirmar."
                            subtitle="Si activas el botón, la fecha no se mostrará en el evento." 
                            isChecked={formData.showDate} 
                            onChange={handleToggleDateChange} 
                        />
                        <br />
                        <div className={styles.timeContainer}>
                            <div className={styles.selectTime}>
                                <Select
                                    id="startTime"
                                    label="Hora de Inicio"
                                    options={time}
                                    value={formData.startTime}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className={styles.selectTime}>
                                <Select
                                    id="endTime"
                                    label="Hora de fin"
                                    options={time}
                                    value={formData.endTime}
                                    onChange={handleSelectChange}
                                />
                            </div>
                        </div>
                        <Select
                            id="timeZone"
                            label="Zona Horaria"
                            options={timeZone}
                            value={formData.timeZone}
                            onChange={handleSelectChange}
                        />
                        <ToggleSwitch
                            id="confirmTime"
                            label="Horarios por confirmar"
                            subtitle="Si activas el botón, la información de los horarios no se mostrará en el evento" 
                            isChecked={formData.showTime} 
                            onChange={handleToggleTimeChange}/>
                    </FormField>
                </SectionForm>

                <SectionForm
                    title="2 DETALLES"
                    isVisible={isSection2Visible}
                    toggleVisibility={() => setIsSection2Visible(!isSection2Visible)}>
                    <FormField>
                        <TextArea
                            id="description"
                            label="Descripción del evento *"
                            placeholder="Añade una descripción a tu evento."
                            minLength={3}
                            maxLength={500}
                            value={formData.description}
                            onChange={handleTextChange}
                        />
                    </FormField>
                    <FormField>
                        <TagsInputComponent
                            id="organizedBy"
                            label="Organizadores"
                            subtitle="Entidades que colaboran en el evento."
                            placeHolder="Añade un nombre y presiona Enter"
                            value={formData.organizedBy}
                            onChange={handleTagsOrganizadorChange}
                        />
                        <TextInputWithSubtitle
                            id="contact"
                            label="Información de contacto"
                            placeholder="email@email.com"
                            minLength={3}
                            maxLength={75}
                            value={formData.contact}
                            onChange={handleInputChange}
                            subtitle='Contacto para mas informacion'
                            isRequired={false}
                            type="email"
                        />
                        <TextInput
                            id="web"
                            label="Añade un enlace a un página web con más información"
                            placeholder="https://actos.com"
                            minLength={3}
                            maxLength={75}
                            value={formData.web}
                            onChange={handleInputChange}
                            isRequired={false}
                            type="url"
                        />
                    </FormField>
                    <FormField>
                        <DropdownCheck 
                            id="languages"
                            label="Idioma del Evento"
                            options={languages}/>

                    </FormField>
                    
                    <FormField>
                        <ImageUploader 
                            id="image"
                            removeImage={removeImage}
                            sendImage={sendImage}
                            previewURL={previewURL}
                            imgVisibility={imgVisibility}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        />
                    </FormField>

                </SectionForm>

                <SectionForm
                    title="3 INSCRIPCIONES Y ENTRADAS"
                    isVisible={isSection3Visible}
                    toggleVisibility={() => setIsSection3Visible(!isSection3Visible)}>
                    <FormField>
                        <ToggleSwitch
                            id="private"
                            label="Evento privado"
                            subtitle="Activa el botón para que solo los usuarios con enlace puedan acceder al evento."  
                            isChecked={formData.isPrivate} 
                            onChange={handleToggleIsPrivateChange} 
                        />
                    </FormField>
                    <FormField>
                        <ToggleSwitch 
                            id='capacity'
                            label={'El evento tiene limite de entrada'}
                            subtitle={'Activa el botón para definir número de entradas.'}
                            onChange={handleToggleCapacityChange}
                            isChecked={selectedCapacity}
                        />
                        {selectedCapacity ? (
                            <TextInputWithSubtitle
                                id="capacity"
                                label="Límite de entradas"
                                subtitle="Ingrese solamente caracteres numéricos"
                                placeholder=""
                                minLength={0}
                                maxLength={500}
                                value={formData.capacity} 
                                onChange={handleInputChange}
                                isRequired={true}
                                type='number'
                            />
                        ): null }
                    </FormField>
                </SectionForm>
                <p style={{ color: 'red' }}>* Rellena todos los campos obligatorios para poder publicar tu evento.</p>

                <div className={styles.buttonSection}>
                    <ButtonSubmit label="Guardar"/>
                </div>

                <ProgressTracker
                    isSectionVisible={isSection1Visible}
                    title='INFORMACIÓN BÁSICA'
                />
                <ProgressTracker
                    isSectionVisible={isSection2Visible}
                    title='DETALLES'
                />
                <ProgressTracker
                    isSectionVisible={isSection3Visible}
                    title='INSCRIPCIONES Y ENTRADAS'
                />
            </form>
        </div>
    );
};

export default EventForm;
