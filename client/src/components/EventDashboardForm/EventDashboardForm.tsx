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
import  TextArea  from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import TextInputWithSubtitle from '../TextInputWithSubtitle/TextInputWithSubtitle';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import modeRadioButtonsContainer from '../../data/modeRadioButtons.json';
import styles from './EventDashboardForm.module.css';
import categories from '../../data/category.json';
import timeZone from '../../data/timeZone.json';
import languages from '../../data/languages.json';
import time from '../../data/time.json';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { ToastContainer } from 'react-toastify';
import types from '../../data/type.json';
import DropdownCheck from '../DropDownCheckbox/DropdownCheck';
import SelectStatus from '../SelectStatus/SelectStatus';

import { BsPatchCheckFill } from 'react-icons/bs';
import ModalDisplay from '../Modal/ModalDisplay';
import { useNavigate } from 'react-router-dom';

type Props = { eventData: EventDashboardFormProps };

// Form
const EventDashboardForm = ( { eventData }: Props ) => {

    const [ formData, setFormData ] = useState<EventDashboardFormProps>(eventData);

    useEffect(() => {
        setFormData(eventData);
        console.log('form data', formData);
    }, [ eventData, formData ]);

    // Visibility
    const [ isSection1Visible, setIsSection1Visible ] = useState(true);
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
    
        let selectedValue = false;
        let newStatus = formData.status;
    
        if (value === 'Borrador') {
            selectedValue = false;
            newStatus = 'Borrador';
            openModal(
                null,
                'Este evento estará en modo Borrador',
                'Guarde el cambio para que el evento solo sea visible para el organizador del evento.',
                'No, cancelar',
                'Sí, cambiar para Borrador',
                closeModal,
                true,
                () => {
                    setFormData({
                        ...formData,
                        visibility: true,
                    });
                    setIsModalOpen(false);
                },
                () => {
                    setFormData({
                        ...formData,
                        visibility: false,
                    });
                    setIsModalOpen(false);
                }
            );
        } else if (value === 'Público') {
            selectedValue = true;
            newStatus = 'Público';
            openModal(
                null,
                'Este evento estará en modo Público',
                'Guarde el cambio para que el evento sea visible para todos los usuarios.',
                'No, cancelar',
                'Sí, cambiar para Público',
                closeModal,
                true,
                () => {
                    setFormData({
                        ...formData,
                        visibility: false,
                    });
                    setIsModalOpen(false);
                },
                () => {
                    setFormData({
                        ...formData,
                        visibility: true,
                    });
                    setIsModalOpen(false);
                },
                
            );
        }
        setFormData({
            ...formData,
            visibility: selectedValue,
            status: newStatus,
            [id]: value
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
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.status) alert('Vas a cambiar el estado');

        const res = await fetch(`http://localhost:8000/api/events/${formData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        await res.json();

        const resp = await fetch(`http://localhost:8000/api/events/${formData._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await resp.json();

        setFormData(result);

        const closeModalAndNavigate = () => {
            closeModal(); // Feche o modal
            navigate(`/eventdashboard`, { state: { id: result._id } });
        };

        openModal(
            <BsPatchCheckFill className={styles.checkIcon} />,
            'Cambio Guardado',
            'Tus cambios han sido guardados con éxito',
            'Cerrar ventana',
            '',
            closeModal,
            true,
            closeModalAndNavigate,
            () => {}
        );

    };
    
    /* **************
START Modal
************** */
    
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const [ modalParams, setModalParams ] = useState<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    button1Text: string;
    button2Text: string;
    onClose: () => void;
    shouldShowCloseButton: boolean;
    onButton1Click: () => void;
    onButton2Click: () => void;
        }>({
            icon: null,
            title: '',
            subtitle: '',
            button1Text: '',
            button2Text: '',
            onClose: () => {},
            shouldShowCloseButton: false,
            onButton1Click: () => {},
            onButton2Click: () => {},
        });

    const openModal = (
        icon: React.ReactNode,
        title: string,
        subtitle: string,
        button1Text: string,
        button2Text: string,
        onClose: () => void,
        shouldShowCloseButton: boolean,
        onButton1Click: () => void,
        onButton2Click: () => void,
    ) => {
        setIsModalOpen(true);
        setModalParams({ 
            icon,
            title,
            subtitle,
            button1Text,
            button2Text,
            onClose,
            shouldShowCloseButton,
            onButton1Click,
            onButton2Click,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    /* **************
END Modal
************** */

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

    // Capacity Radio Groug handler

    // Mode Radio Group
    const modeRadioButtons: ButtonCardRadioProps[] = modeRadioButtonsContainer.map((container) => ({
        ...container,
        checked: selectedMode === container.value,
        onChange: () => handleModeChange(container.value),
    }));

    // Capacity Radio Group

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
        setFormData({
            ...formData,
            isLimited: checked,
        });
        setSelectedCapacity(!selectedCapacity);
    };

    const [ selectedCapacity, setSelectedCapacity ] = useState<boolean>(false);

    return (
        <div className={styles.form}>
            <p className={styles.status}>
                <span> <b>Visibilidad del evento:</b> </span>
                <span style={{ color: formData.visibility ? 'green' : '#e15a40' }}>
                    {formData.visibility ? 'Público' : 'Borrador'}
                </span>
            </p>
            <p className={styles.warning}>* Rellena todos los campos obligatorios para poder publicar tu evento.</p>
        
            <form data-testid="event-form" onSubmit={handleSubmit}>
                <ToastContainer position="top-right" autoClose={3000} />

                <SectionForm
                    title="1 INFORMACIÓN BÁSICA"
                    isVisible={isSection1Visible}
                    toggleVisibility={() => setIsSection1Visible(!isSection1Visible)}>

                    <FormField>
                        <Select
                            id="category"
                            label="Categoría *"
                            options={categories}
                            value={formData.category}
                            onChange={handleSelectChange}
                        />
                        <Select
                            id="subcategory"
                            label="Subcategoría *"
                            options={categories}
                            value={formData.subcategory}
                            onChange={handleSelectChange}
                        />
                        <Select
                            id="type"
                            label="Tipo *"
                            options={types}
                            value={formData.type}
                            onChange={handleSelectChange}
                        />
                    </FormField>
                    <FormField>
                        <TextInput
                            isRequired={true}
                            id="name" 
                            label="Nombre del evento *"
                            placeholder="Evento"
                            minLength={3}
                            maxLength={75}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
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
                        <DateInput 
                            id='date' 
                            name='date' 
                            value={formData.date} 
                            onChange={handleDateChange}
                            isRequired={true} />
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
                                    isRequired={true}
                                />
                            </div>
                            <div className={styles.selectTime}>
                                <Select
                                    id="endTime"
                                    label="Hora de fin"
                                    options={time}
                                    value={formData.endTime}
                                    onChange={handleSelectChange}
                                    isRequired={true}
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
                    <FormField>
                        <RadioGroupContainer
                            radioButtons={modeRadioButtons}
                            selectedValue={formData.mode}
                            label="Modalidad"
                            onChange={handleModeChange}
                            isRequired={true}
                        />
                        {formData.mode === 'option1' && (
                            <TextInput
                                id="address"
                                label="Añade una dirección"
                                placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                minLength={3}
                                maxLength={75}
                                value={formData.address}
                                onChange={handleInputChange}
                                isRequired={true}
                            />
                        )}
                        {formData.mode === 'option2' && (
                            <TextInput
                                isRequired={true}
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
                        {formData.mode === 'option3' && (
                            <>
                                <TextInput
                                    id="address"
                                    label="Añade una dirección"
                                    placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <TextInput
                                    id="webLink"
                                    label="Añade un link de acceso"
                                    placeholder="Escribe el link de acceso a tu evento."
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.webLink}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                    type="url"
                                />
                            </>
                        )}
                    </FormField>
                </SectionForm>

                <SectionForm
                    title="2 DETALLES"
                    isVisible={isSection2Visible}
                    toggleVisibility={() => setIsSection2Visible(!isSection2Visible)}>

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
                            id="contactEmail"
                            label="Información de contacto"
                            placeholder="email@email.com"
                            minLength={3}
                            maxLength={75}
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            subtitle='Contacto para mas informacion'
                            isRequired={false}
                            type="email"
                        />
                    
                    </FormField>
                    <FormField>
                        <DropdownCheck 
                            id="languages"
                            label="Idioma del Evento"
                            options={languages}/>

                    </FormField>
                    <FormField>
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
                
                <div className={ styles.finalSectionContainer }>
                    <div className={styles.finalSection}>
                        <div className={styles.selectStatus}>
                            <SelectStatus
                                id="status"
                                label=""
                                options={ [ 'Borrador', 'Público' ] }
                                value={formData.status}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className={styles.buttonSection}>
                            <ButtonSubmit label="Guardar"/>
                        </div>
                    </div>
                </div>
                
                <div>
                    {isModalOpen && (
                        <ModalDisplay
                            icon={modalParams.icon}
                            title={modalParams.title}
                            subtitle={modalParams.subtitle}
                            button1Text={modalParams.button1Text}
                            button2Text={modalParams.button2Text}
                            onClose={modalParams.onClose}
                            isOpen={isModalOpen}
                            onButton1Click={modalParams.onButton1Click}
                            onButton2Click={modalParams.onButton2Click}
                            showCloseButton={modalParams.shouldShowCloseButton}
                        />
                    )}
                </div>

            </form>
        </div>
    );
};

export default EventDashboardForm;
