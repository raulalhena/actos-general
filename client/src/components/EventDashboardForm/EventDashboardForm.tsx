import { useState, ChangeEvent, useEffect } from 'react';
import { ButtonCardRadioProps } from '../../interfaces/buttonCardRadioProps';
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
import capacityRadioButtonsContainer from '../../data/capacityRadioButtons.json';
import styles from './EventDashboardForm.module.css';
import categories from '../../data/category.json';
import timeZone from '../../data/timeZone.json';
import languages from '../../data/languages.json';
import time from '../../data/time.json';
import ProgressTracker from '../ProgressTracker/ProgressTracker';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';

type Props = { eventData: EventDashboardFormProps };

// Form
const EventDashboardForm = ( { eventData }: Props ) => {

    const [ formData, setFormData ] = useState<EventDashboardFormProps>(eventData);

    useEffect(() => {
        setFormData(eventData);
        console.log('form data', formData);
    }, [ eventData ]);

    // Visibility
    const [ isSection1Visible, setIsSection1Visible ] = useState(false);
    const [ isSection2Visible, setIsSection2Visible ] = useState(false);
    const [ isSection3Visible, setIsSection3Visible ] = useState(false);

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
        setFormData({
            ...formData,
            [id]: value,
        });
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
        setFormData({
            ...formData,
            date: e.target.value,
        });
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

        const resp = await fetch(`http://localhost:8000/api/events/${formData._id}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await resp.json();
        console.log(result);
        // MOSTRAR MODAL SE HA GUARDADO CORRECTAMENTE?
    };

    // Button Radio
    const [ selectedMode, setSelectedMode ] = useState<string>('');
    const [ selectedCapacity, setSelectedCapacity ] = useState<boolean>(false);

    // Mode Radio Groug handler
    const handleModeChange = (value: string) => {
        setSelectedMode(value);
        setFormData({
            ...formData,
            mode: value,
        });
    };

    // Capacity Radio Groug handler
    const handleCapacityChange = (value: string) => {
        console.log('value', value);
        setSelectedCapacity(!selectedCapacity);
    };

    // Mode Radio Group
    const modeRadioButtons: ButtonCardRadioProps[] = modeRadioButtonsContainer.map((container) => ({
        ...container,
        checked: selectedMode === container.value,
        onChange: () => handleModeChange(container.value),
    }));

    // Capacity Radio Group
    const capacityRadioButtons: ButtonCardRadioProps[] = capacityRadioButtonsContainer.map((container) => ({
        ...container,
        checked: selectedMode === container.value,
        onChange: () => handleCapacityChange(container.value),
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

    const [ isSection1Complete, setIsSection1Complete ] = useState(false);
    const [ isSection2Complete, setIsSection2Complete ] = useState(false);

    const isSectionComplete = (sectionData: any) => {
        return (
            sectionData.name !== ''
        );
    };

    useEffect(() => {
        setIsSection1Complete(isSectionComplete(formData));
    }, [ formData ]);

    useEffect(() => {
        setIsSection2Complete(isSectionComplete(formData));
    }, [ formData ]);

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
                    </FormField>
                    <FormField>
                        <Select
                            id="category"
                            label="Categoría"
                            options={categories}
                            value={formData.category}
                            onChange={handleSelectChange}
                        />
                    </FormField>
                    <FormField>
                        <TagsInputComponent
                            id="tags"
                            value={formData.tags}
                            label="Etiquetas"
                            onChange={handleTagsChange}
                            placeHolder="Digite etiquetas y presione Enter"
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
                                placeholder="Escribe la dirección de tu evento."
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
                                id="onlineLink"
                                label="Añade un link de acceso"
                                placeholder="Escribe el link de acceso a tu evento."
                                minLength={3}
                                maxLength={75}
                                value={formData.webLink}
                                onChange={handleInputChange}
                            />
                        )}
                        {selectedMode === 'option3' && (
                            <>
                                <TextInput
                                    id="address"
                                    label="Añade una dirección"
                                    placeholder="Escribe la dirección de tu evento."
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    id="onlineLink"
                                    label="Añade un link de acceso"
                                    placeholder="Escribe el link de acceso a tu evento."
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.webLink}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                            </>
                        )}
                    </FormField>
                    <FormField>
                        <TextInput
                            id="webLink"
                            label="Añade un enlace"
                            placeholder="Escribe el enlace de tu evento."
                            minLength={3}
                            maxLength={75}
                            value={formData.webLink}
                            onChange={handleInputChange}
                            isRequired={false}
                        />
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
                        <Select
                            id="timeZone"
                            label="Zona Horaria"
                            options={timeZone}
                            value={formData.timeZone}
                            onChange={handleSelectChange}
                        />
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
                            onChange={handleInputChange}
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
                        />
                    </FormField>
                    <FormField>
                        <Select
                            id="language"
                            label="Idioma del evento"
                            options={languages}
                            value={formData.language}
                            onChange={handleSelectChange}
                        />
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
                            label="El evento es privado"
                            subtitle="Si activas el botón, el evento sera privado."  
                            isChecked={formData.isPrivate} 
                            onChange={handleToggleIsPrivateChange} 
                        />
                    </FormField>
                    <FormField>
                        <RadioGroupContainer
                            radioButtons={capacityRadioButtons}
                            selectedValue={selectedMode}
                            label="Límite de entradas"
                            onChange={handleCapacityChange}
                        />
                        {selectedCapacity && (
                            <TextInputWithSubtitle
                                id="capacity"
                                label="Límite de entradas"
                                subtitle="Escribe el número de entradas disponibles en caso de aforo limitado."
                                placeholder=""
                                minLength={0}
                                maxLength={500}
                                value={formData.capacity} 
                                onChange={handleInputChange}
                                isRequired={false}
                            />
                        )}
                    </FormField>
                </SectionForm>
                <p style={{ color: 'red' }}>* Rellena todos los campos obligatorios para poder publicar tu evento.</p>

                <div className={styles.buttonSection}>
                    <ButtonSubmit label="Guardar"/>
                </div>

                <ProgressTracker
                    isSection1Visible={isSection1Visible}
                    isSection2Visible={isSection2Visible}
                    isSection3Visible={isSection3Visible}
                    isSection1Complete={isSection1Complete}
                    isSection2Complete={isSection2Complete}
                    // isSection3Complete={isSection2Complete}
                />
            </form>
        </div>
    );
};

export default EventDashboardForm;
