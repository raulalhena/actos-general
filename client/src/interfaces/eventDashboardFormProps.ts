export interface EventDashboardFormProps {
    _id: string;
    name: string;
    category: string;
    subcategory?: string;
    tags?: string[];
    mode: string;
    type: string;
    address?: string;
    webLink?: string;
    date: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    showTime: boolean;
    showDate: boolean;
    confirmed?: boolean;
    description: string;
    web?: string;
    organizedBy?: string[];
    contactEmail?: string;
    isPrivate: boolean;
    language: string[];
    image?: string;
    video?: string;
    capacity?: string;
    qrEvent?: string;
    qrAttendees?: string[];
    attendees?: string[];
    submitted?: string[];
    price?: number;
    payment?: string;
    visibility?: boolean;
    status?: string;
    isLimited: boolean;
}