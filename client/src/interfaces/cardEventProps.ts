export interface EventDataProps {
    name: string;
    date: string;
    mode: string;
    type: string;
    image: string;
    category: string;
    subcategory: string;
    _id: string;
    subcategoryLogo: string;
}

export interface CardEventProps {
    evenData: {
        name: string;
        date: string;
        mode: string;
        type: string;
        image: string;
        category: string;
        subcategory: string;
        _id: string;
        subcategoryLogo: string;
    };
    key: number;
    // eventData: EventDataProps;
}