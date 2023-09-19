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
import capacityRadioButtonsContainer from '../../data/capacityRadioButtons.json';
import styles from './EventForm.module.css';
import categories from '../../data/category.json';
import timeZone from '../../data/timeZone.json';
import languages from '../../data/languages.json';
import ProgressTracker from '../ProgressTracker/ProgressTracker';

// Form
const EventForm = () => {
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
        showTime: true,
        showDate: true,
        confirmed: false, 
        description: '',
        web: '', 
        organizedBy: [], 
        contact: '',
        isPrivate: false,
        language: '', //Select con checkbox
        image: '', 
        video: '', 
        capacity: 0, 
        qrEvent: '',
        qrAttendees: [],
        attendees: [],
        submitted: [],
        price: 0, 
        payment: '', 
        visibility: false,
        status: false
    });

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

    // DateInput
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            date: e.target.value,
        });
    };

    // Submit Button
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
        fetch('http://localhost:5000/api/events', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // redirección a "detalle del evento"
    };

    // Button Radio
    const [ selectedMode, setSelectedMode ] = useState<string>('');
    const [ selectedCapacity, setSelectedCapacity ] = useState<boolean>(false);

    const handleModeChange = (value: string) => {
        console.log(value);
        setSelectedMode(value);
        setFormData({
            ...formData,
            mode: value,
        });
    };

    const handleCapacityChange = (value: string) => {
        console.log(value);
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

    return (
        <div className={styles.form}>
            <form data-testid="event-form" onSubmit={handleSubmit}>

                <SectionForm
                    title="1 INFORMACIÓN BÁSICA"
                    isVisible={isSection1Visible}
                    toggleVisibility={() => setIsSection1Visible(!isSection1Visible)}>

                    <FormField>
                        <TextInput
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
                        />
                        <DateInput id='date' name='date' value={formData.date} onChange={handleDateChange} />
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
                            />
                        )}
                        {selectedMode === 'option2' && (
                            <TextInput
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
                                />
                                <TextInput
                                    id="onlineLink"
                                    label="Añade un link de acceso"
                                    placeholder="Escribe el link de acceso a tu evento."
                                    minLength={3}
                                    maxLength={75}
                                    value={formData.webLink}
                                    onChange={handleInputChange}
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
                        />
                    </FormField>
                    <FormField>
                        <Select
                            id="timeZone"
                            label="Zona Horaria"
                            options={timeZone}
                            value={formData.timeZone}
                            onChange={handleSelectChange}
                        />

                        <ToggleSwitch
                            id="mySwitch"
                            label="Cualquiera puede ver los horarios del evento"
                            subtitle="Si se desactiva, las horas quedarán ocultas"
                        />
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
                        <TextInputWithSubtitle
                            id="organizedBy"
                            label="Dinamizadores"
                            subtitle="Entidades que colaboran en el evento."
                            placeholder="Organizadores del evento."
                            minLength={3}
                            maxLength={500}
                            value={formData.organizedBy}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            id="contact"
                            label="Información de contacto de los dinamizadores"
                            placeholder="email@email.com"
                            minLength={3}
                            maxLength={75}
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                        <ToggleSwitch
                            id="contactInfo"
                            label="Mostrar públicamente la información de contacto."
                            subtitle="Si se desactiva, la información de contacto quedará oculta."
                        />
                    </FormField>
                    <FormField>
                        <Select
                            id="languageEvent"
                            label="Idioma del evento"
                            options={languages}
                            value={formData.language}
                            onChange={handleSelectChange}
                        />
                    </FormField>
                    <FormField>
                        <ImageUploader />
                    </FormField>

                </SectionForm>

                <SectionForm
                    title="3 INSCRIPCIONES Y ENTRADAS"
                    isVisible={isSection3Visible}
                    toggleVisibility={() => setIsSection3Visible(!isSection3Visible)}>
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
                />
            </form>
        </div>
    );
};

export default EventForm;
