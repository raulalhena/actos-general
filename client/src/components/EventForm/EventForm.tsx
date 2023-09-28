import { useState, ChangeEvent, useEffect } from 'react';
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
import  TextArea  from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import TextInputWithSubtitle from '../TextInputWithSubtitle/TextInputWithSubtitle';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import modeRadioButtonsContainer from '../../data/modeRadioButtons.json';
import styles from './EventForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownCheck from '../DropDownCheckbox/DropdownCheck';
import { useNavigate } from 'react-router-dom';
import SelectCategories from '../SelectCategories/SelectCategories';
import SelectSubcategories from '../SelectSubcategories/SelectSubcategories';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';

// Form
const EventForm = () => {

    const navigate = useNavigate(); 

    const [ formData, setFormData ] = useState<EventFormProps>({
        name: '',
        category: '',
        subcategory: '',
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
        contactEmail: '',
        isPrivate: false,
        language: [], //Select con checkbox
        image: '', 
        video: '', 
        capacity: undefined,
        isLimited: false,
        // qrEvent: '',
        // qrAttendees: [],
        // attendees: [],
        // submitted: [],
        // price: 0, 
        // payment: '', 
        // visibility: false,
        // status: false
    });

    // Form fields auto filled state
    const [ categories, setCategories ] = useState<Array<EventDashboardFormProps>>([]);
    const [ subcategories, setSubcategories ] = useState<Array<string>>([]);
    const [ types, setTypes ] = useState<Array<string>>([]);
    const [ languages, setLanguages ] = useState<Array<string>>([]);
    const [ timeZone, setTimeZone ] = useState<Array<string>>([]);
    const [ time, setTime ] = useState<Array<string>>([]);

    // Get all data to fill fields
    useEffect(() => {
        const getCategories = async () => {
            const resp = await fetch('http://localhost:8000/api/misc/categories');
            const categoriesDb = await resp.json();

            setCategories(categoriesDb);
        };

        getCategories();
    }, []);

    // get types

    useEffect(() => {
        const getTypes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/types');
                const data = await response.json();
                const typeNames = data.map((type: { name: string; }) => type.name);
                console.log(typeNames);
                setTypes(typeNames);
            } catch (error) {
                console.error('Error al obtener los tipos:', error);
            }
        };
        getTypes();
    }, []);

    // get languages

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/languages');
                const data = await response.json();
                const language = data.map((language: { name: string; }) => language.name);
                setLanguages(language);
            } catch (error) {
                console.error('Error al obtener los idiomas:', error);
            }
        };
        getLanguages();
        
    }, []);

    // get time zone

    useEffect(() => {
        const getTimeZone = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/timezones');
                const data = await response.json();
                const timeZone = data.map((timeZone: { name: string; }) => timeZone.name);
                console.log(timeZone);
                setTimeZone(timeZone);
            } catch (error) {
                console.error('Error al obtener las zonas horarias:', error);
            }
        };
        getTimeZone();
    }, []);

    // get time

    useEffect(() => {
        const getTime = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/times');
                const data = await response.json();
                const time = data.map((time: { name: string; }) => time.name);
                setTime(time);
            } catch (error) {
                console.error('Error al obtener las horas:', error);
            }
        };
        getTime();
    }, []);

    // Visibility
    const [ isSection1Visible, setIsSection1Visible ] = useState(true);
    const [ isSection2Visible, setIsSection2Visible ] = useState(false);
    const [ isSection3Visible, setIsSection3Visible ] = useState(false);

    const [ selectedCategory, setSelectedCategory ] = useState('');

    // Categories Handle Change
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const selected = event.target.selectedOptions[0].text;

        setSelectedCategory(value);

        setFormData({
            ...formData,
            category: selected,
        });

        await getSubcategories(value);
    };

    // Get Subcategories
    const getSubcategories = async (categoryId: string) => {
        const resp = await fetch(`http://localhost:8000/api/misc/categories/${categoryId}/subcategories`);
        const categoriesDb = await resp.json();
        
        setSubcategories(categoriesDb.subcategories);
    };

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
        const value: string = event.target.value;

        if (id === 'capacity') {
            const numericValue = Number(value);
            if (numericValue >= 1) {
                setFormData({
                    ...formData,
                    [id]: numericValue,
                });
            } else {
                toast.error('Si hay limite de entradas, el número debe ser mayor o igual a 1', {
                    position: 'top-right',
                    autoClose: 2500,
                    pauseOnHover: true,
                });
            }
        } else if (id === 'webLink' || id === 'web') {

            let newValue = value;
            if (value.startsWith('www')) {
                newValue = 'http://' + value;
            }

            setFormData({
                ...formData,
                [id]: newValue,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };
    
    // Select
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;

        //EventTime: Start and End Time
        if (id === 'endTime' && value < formData.startTime) {
            
            toast.error('La hora de finalización no puede ser anterior a la hora de inicio.', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });

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
            toast.error('La fecha seleccionada es anterior a la fecha actual.', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
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
        toast.success('Imagen enviada correctamente', {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    // Submit Button
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);

        type EventFormPropsKey = keyof EventFormProps;

        const requiredFields: EventFormPropsKey[] = [ 'name', 'description', 'date', 'category', 'subcategory', 'type', 'mode', 'startTime', 'endTime' ];
        
        const missingFields = requiredFields.filter((field) => !formData[field]);
        if (missingFields.length > 0) {
            const errorMessage = `Por favor, complete los siguientes campos obligatorios: ${missingFields.join(', ')}.`;
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }
    
        const resp = await fetch('http://localhost:8000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await resp.json();
        navigate(`/eventdashboard`, { state: { id: result._id } });
        
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
        setFormData({ 
            ...formData,
            image: ''
        });
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

            <p className={styles.warning}>* Rellena todos los campos obligatorios para poder publicar tu evento.</p>
            <form data-testid="event-form" className={styles.formContainer} onSubmit={handleSubmit}>
                
                <div className={styles.formContent} >
                    <ToastContainer position="top-right" autoClose={2500} />
                    <SectionForm
                        title="1 INFORMACIÓN BÁSICA"
                        isVisible={isSection1Visible}
                        toggleVisibility={() => setIsSection1Visible(!isSection1Visible)}>

                        <FormField>
                            <SelectCategories
                                id="category"
                                label="Categoría *"
                                options={categories}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            />
                            <SelectSubcategories
                                id="subcategory"
                                label="Subcategoría *"
                                options={subcategories}
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
                                placeholder="ej.: Carrera Solidaria por la Educación (mínimo 3 caracteres)"
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
                                        label="Hora de Inicio *"
                                        options={time}
                                        value={formData.startTime}
                                        onChange={handleSelectChange}
                                        isRequired={true}
                                    />
                                </div>
                                <div className={styles.selectTime}>
                                    <Select
                                        id="endTime"
                                        label="Hora de fin *"
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
                                selectedValue={selectedMode}
                                label="Modalidad *"
                                onChange={handleModeChange}
                                isRequired={true}
                            />
                            {selectedMode === 'option1' && (
                                <TextInput
                                    id="address"
                                    label="Añade una dirección *"
                                    placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                            )}
                            {selectedMode === 'option2' && (
                                <TextInput
                                    isRequired={true}
                                    id="webLink"
                                    label="Añade un link de acceso *"
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
                                        label="Añade una dirección *"
                                        placeholder="Entrença, 332-334. 7ª planta 08029 Barcelona"
                                        minLength={3}
                                        maxLength={75}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <TextInput
                                        id="webLink"
                                        label="Añade un link de acceso *"
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
                                subtitle="Para añadir las entidades colaboradoras del evento, escribe el nombre y presiona Enter."
                                placeHolder=""
                                value={formData.organizedBy}
                                onChange={handleTagsOrganizadorChange}
                            />
                            <TextInputWithSubtitle
                                id="contactEmail"
                                label="Información de contacto"
                                placeholder="ej.: email@email.com"
                                minLength={3}
                                maxLength={75}
                                value={formData.contactEmail}
                                onChange={handleInputChange}
                                subtitle='Ingresa un correo electrónico para que puedan contactar para más informaciones sobre el evento.'
                                isRequired={false}
                                type="email"
                            />
                        
                        </FormField>
                        <FormField>
                            <DropdownCheck 
                                id="language"
                                label="Idioma del Evento"
                                options={languages}/>

                        </FormField>
                        <FormField>
                            <TextInputWithSubtitle
                                id="web"
                                label="Añade un enlace a un página web con más información"
                                subtitle='Comparte una URL relevante, como la página web del evento o recursos adicionales.'
                                placeholder="ej.: https://actos.com"
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
                                subtitle="Para añadir etiquetas claves del evento, escribe el nombre y presiona Enter"
                                onChange={handleTagsChange}
                                placeHolder=""
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
                                className={styles}
                            />
                            {selectedCapacity ? (
                                <TextInputWithSubtitle
                                    id="capacity"
                                    label="Límite de entradas"
                                    subtitle="Ingrese solamente caracteres numéricos mayores que 0."
                                    placeholder="ej.: 20"
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
                    
                    <div className={styles.buttonSection}>
                        <ButtonSubmit label="Guardar"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
