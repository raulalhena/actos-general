export interface CardEventProps {
    eventData: {
        title: string;
        date: string;
        mode: string;
        type: string;
        image: string;
    };
    eventId: number;
}