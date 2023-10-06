import { useState, ChangeEvent, useEffect } from 'react';
import { ButtonCardRadioProps } from '../../interfaces/buttonCardRadioProps';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import RadioGroupContainer from '../Button/ButtonContainer/RadioCardContainer';
import DateInput from '../DateInput/DateInput';
import FormField from '../FormField/FormField';
import { DashboardImageUploader } from '../DashboardImageUploader/DashboardImageUploader';
import SectionForm from '../SectionForm/SectionForm';
import Select from '../Select/Select';
import TagsInputComponent from '../TagsInput/TagsInput';
import  TextArea  from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import TextInputWithSubtitle from '../TextInputWithSubtitle/TextInputWithSubtitle';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './EventDashboardForm.module.css';
import { EventDashboardFormProps } from '../../interfaces/eventDashboardFormProps';
import { ToastContainer, toast } from 'react-toastify';
import DropdownCheck from '../DropDownCheckbox/DropdownCheck';
import SelectStatus from '../SelectStatus/SelectStatus';
import { BsPatchCheckFill } from 'react-icons/bs';
import { VscCircleFilled } from 'react-icons/vsc';
import ModalDisplay from '../Modal/ModalDisplay';
import SelectCategories from '../SelectCategories/SelectCategories';
import SelectSubcategories from '../SelectSubcategories/SelectSubcategories';
import TextInputNumber from '../TextInputNumber/TextInputNumber';

type Props = { eventData: EventDashboardFormProps };

// Form
const EventDashboardForm = ( { eventData }: Props ) => {

    const [ formData, setFormData ] = useState<EventDashboardFormProps>(eventData);

    useEffect(() => {
        setFormData(eventData);
    }, [ eventData ]);

    // VisibilitySection
    const [ isSection1Visible, setIsSection1Visible ] = useState(true);
    const [ isSection2Visible, setIsSection2Visible ] = useState(false);
    const [ isSection3Visible, setIsSection3Visible ] = useState(false);

    // Text area
    const handleTextChange = (text: string ) => {
        setFormData({
            ...formData,
            description: text,
        });
    };

    // Input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value: string = event.target.value;

        if (id === 'webLink' || id === 'web') {

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

    // Input
    const handleInputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value: string = event.target.value;

        if (id === 'capacity') {
            const numericValue = Number(value);

            if (!isNaN(numericValue) && numericValue >= 0) {

                setFormData({
                    ...formData,
                    [id]: value,
                });
            } else {
                toast.error('Ingrese un número mayor que cero', {
                    position: 'top-right',
                    autoClose: 2500,
                    pauseOnHover: true,
                });
            }
        }
    };

    // Select
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;

        // EventTime: Start and End Time
        if (id === 'endTime' && value < formData.startTime) {
            toast.error('La hora de finalización no puede ser anterior a la hora de inicio.', {
                position: 'top-right',
                autoClose: 2500,
                pauseOnHover: true,
            });
        } else  if(id === 'subcategory') {
            subcategories.forEach(subc => {

                if(subc.name === value){
                    setFormData({
                        ...formData,
                        [id]: value,
                        subcategoryLogo: subc.image
                    });
                }
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    // SelectVisibility(draft and public status)
    const handleVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
    
        if (value === 'Borrador') {
            setFormData({
                ...formData,
                visibility: false,
            });

        } else if (value === 'Público') {
            setFormData({
                ...formData,
                visibility: true,
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

    //language
    const handleLanguageChange = (languages: string[]) => {
        setFormData({
            ...formData,
            language: languages,
        });
    };

    // DateInput
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            date: e.target.value,
        });
    };

    //SUBMIT
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        type EventFormPropsKey = keyof EventDashboardFormProps;
        const requiredFields: EventFormPropsKey[] = [
            'name',
            'description',
            'date',
            'category',
            'subcategory',
            'type',
            'mode',
            'startTime',
            'endTime'
        ];

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
    
        if (visibility !== formData.visibility) {
            openModal(
                null,
                `Este evento estará en modo ${
                    formData.visibility ? 'Público' : 'Borrador'
                }`,
                '',
                'No, cancelar',
                `Sí, cambiar para ${formData.visibility ? 'público' : 'Borrador'}`,
                closeModal,
                true,
                () => {
                    setFormData({
                        ...formData,
                        visibility: !formData.visibility,
                    });
                    closeModal();
                },
                async () => {
                    const res = await fetch(
                        `http://localhost:8000/api/events/${formData._id}`,
                        {
                            method: 'PUT',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(formData),
                        }
                    );

                    if (res.ok) {
                        const res = await fetch(
                            `http://localhost:8000/api/events/${formData._id}`,
                            {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            }
                        );
    
                        if (res.ok) {
                            const result = await res.json();
                            setFormData(result);
                            setVisibility(result.visibility);
        
                            openModal(
                                <BsPatchCheckFill className={styles.checkIcon} />,
                                'Cambio Guardado',
                                'Tus cambios han sido guardados con éxito',
                                'Cerrar ventana',
                                '',
                                closeModal,
                                true,
                                closeModal,
                                () => {}
                            );
                        } 
                    } 
                }
            );

        } else {
            const res = await fetch(
                `http://localhost:8000/api/events/${formData._id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (res.ok) {
                const res = await fetch(
                    `http://localhost:8000/api/events/${formData._id}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (res.ok) {
                    const result = await res.json();
                    setFormData(result);
                    setVisibility(result.visibility);
    
                    openModal(
                        <BsPatchCheckFill className={styles.checkIcon} />,
                        'Cambio Guardado',
                        'Tus cambios han sido guardados con éxito',
                        'Cerrar ventana',
                        '',
                        closeModal,
                        true,
                        closeModal,
                        () => {}
                    );
                } 
            } 
        }
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

    /**************************************************
    ** Image Uploader
    ******************/

    //  States
    const [ previewURL, setPreviewURL ] = useState<string>('');
    const [ imgVisibility, setImgVisibility ] = useState<string>('block');
    const [ image, setImage ] = useState<string | undefined>(formData.image);
    const [ imageFile, setImageFile ] = useState<Blob>('');

    // Convert Image to Base64 to send in JSON
    const convertToBase64 = () => {

        if(imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: fileReader.result
                });
            };
        }
        return;
    };

    useEffect(() => {
        convertToBase64();
    }, [ imageFile ]);

    useEffect(() => {
        setImgVisibility('block');
        setImage(formData.image);
    }, []);

    // File Handler
    const handleFile = (file: any) => {
        setImageFile(() => file);
        setPreviewURL(URL.createObjectURL(file));
        setImgVisibility('block');

    };

    // Drop handler
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        e.dataTransfer.clearData();
        handleFile(file);
    };

    // Drag Over handler
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Image remover
    const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setImageFile('');
        setImage('');
        setPreviewURL('');
        setFormData({
            ...formData,
            image: ''
        });
        setImgVisibility('none');
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

    // Form fields auto filled state
    const [ categories, setCategories ] = useState<Array<EventDashboardFormProps>>([]);
    const [ subcategories, setSubcategories ] = useState<Array<string>>([]);
    const [ types, setTypes ] = useState<Array<string>>([]);
    const [ languages, setLanguages ] = useState<Array<string>>([]);
    const [ timeZone, setTimeZone ] = useState<Array<string>>([]);
    const [ time, setTime ] = useState<Array<string>>([]);
    const [ visibility, setVisibility ] = useState<boolean>(false);
    const [ selectedCategory, setSelectedCategory ] = useState(formData.category);
    const [ mode, setMode ] = useState<ButtonCardRadioProps[]>([]);

    // Get all data to fill fields
    // Get Categories
    useEffect(() => {
        const getCategories = async () => {
            let categoryId = '';
            const resp = await fetch('http://localhost:8000/api/misc/categories');
            const categoriesDb = await resp.json();

            setCategories(categoriesDb);
            categoriesDb.forEach(category => {
                if(category.name === formData.category) categoryId=category._id;

            });
            setSelectedCategory(categoryId);
            getSubcategories(categoryId);
        };
        getCategories();
    }, [ formData.category ]);

    // Get Subcategories
    const getSubcategories = async (selectedCategory: string) => {
        if(selectedCategory) {
            const resp = await fetch(`http://localhost:8000/api/misc/categories/${selectedCategory}/subcategories`);
            const subcategoriesDb = await resp.json();
            setSubcategories(Array.from(subcategoriesDb.subcategories));
        }
    };

    // get types
    useEffect(() => {
        const getTypes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/types');
                const data = await response.json();
                const typeNames = data.map((type: { name: string; }) => type.name);
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

    // get visibility
    useEffect(() => {
        setVisibility(formData.visibility ?? false);
    }, [ formData.visibility ]);

    //get MODE (online, hibrido, presencial)
    useEffect(() => {
        setImage(formData.image);
    }, [ formData ]);

    useEffect(() => {
        
        const getMode = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/misc/modes');
                const data = await response.json();
                const modeData = data.map((mode: {
                        _id : string; 
                        name: string; 
                }) => ({
                    ...mode,
                    checked: formData.mode === mode.name,
                    onChange: () => handleModeChange(mode.name),
                }));
                setMode(modeData);
    
                if (formData.mode === 'Presencial') {
                
                    setFormData((prevData) => ({
                        ...prevData,
                        webLink: '',
                    }));
                } else if (formData.mode === 'En línea') {

                    setFormData((prevData) => ({
                        ...prevData,
                        address: '',
                    }));
                }
            } catch (error) {
                console.error('Error al obtener el modo:', error);
            }
        };
        getMode();
    }, [ selectedMode ]);
    
    // Categories Handle Change

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const { value } = event.target;
    
        let categoryName = '';   
        categories.forEach(category => {
    
            if(category._id === value) 
                categoryName = category.name;
        });

        setFormData({
            ...formData,
            category: categoryName,
        });
        setSelectedCategory(value);

        await getSubcategories(value);
        
    };

    const [ selectedCapacity, setSelectedCapacity ] = useState<boolean>(false);

    return (
        <div data-testid='dashboard-component' className={styles.formDash}>
            <p className={styles.status}>
                <span>
                    <b>
                        <VscCircleFilled style={{ color: visibility ? 'green' : '#e15a40' }} />
                    </b>
                </span>
                <span style={{ color: visibility ? 'green' : '#e15a40' }}>
                    {visibility ? 'Público' : 'Borrador'}
                </span>
            </p>
        
            <form data-testid="event-form" onSubmit={handleSubmit}>
                <ToastContainer position="top-right" autoClose={3000} />

                <SectionForm
                    title="1 INFORMACIÓN BÁSICA"
                    isVisible={isSection1Visible}
                    toggleVisibility={() => setIsSection1Visible(!isSection1Visible)}>
                    {/* <p className={styles.warning}>* Rellena todos los campos obligatorios para poder publicar tu evento.</p> */}

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
                            radioButtons={mode}
                            selectedValue={formData.mode}
                            label="Modalidad *"
                            onChange={handleModeChange}
                            isRequired={true}
                        />
                        {formData.mode === 'Presencial' && (
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
                        {formData.mode === 'En Línea' && (
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
                        {formData.mode === 'Híbrido' && (
                            <>
                                <TextInput
                                    id="address"
                                    label="Añade una dirección"
                                    placeholder="ej.: Entrença, 332-334. 7ª planta 08029 Barcelona"
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isRequired={true}
                                />
                                <br />
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
                                <br />
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
                            id="languages"
                            label="Idioma del Evento"
                            options={languages}
                            values={formData.language}
                            onChange={handleLanguageChange}
                        />

                    </FormField>
                    <FormField>
                        <TextInputWithSubtitle
                            id="web"
                            label="Página web"
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
                            onChange={handleTagsChange}
                            placeHolder=''
                            subtitle='Para añadir etiquetas claves del evento, escribe el nombre y presiona Enter'
                        />
                    </FormField>
                    <FormField>
                        <DashboardImageUploader 
                            id="image"
                            removeImage={removeImage}
                            image={image}
                            previewURL={previewURL}
                            imgVisibility={imgVisibility}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            value={image}
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
                            isChecked={formData.isLimited}
                        />
                        {formData.isLimited ? (
                            <TextInputNumber
                                id="capacity"
                                label="Límite de entradas"
                                subtitle="Ingrese solamente caracteres numéricos mayores que 0."
                                placeholder="ej.: 20"
                                value={formData.capacity} 
                                onChange={handleInputNumberChange}
                                isRequired={true}
                            />
                        ): null }
                    </FormField>
                
                </SectionForm>
                
                <div className={ styles.finalSectionContainer }>
                    <div className={styles.finalSection}>
                        <div className={styles.selectStatus}>
                            <SelectStatus
                                id="visibility"
                                label=""
                                options={ [ 'Borrador', 'Público' ] }
                                value={formData.visibility ? 'Público' : 'Borrador'}
                                onChange={handleVisibilityChange}
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
