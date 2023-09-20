import { useContext } from 'react';
import { EventFormProps } from '../interfaces/eventFormProps';

const EventContext = () => {

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

}

export default EventContext;