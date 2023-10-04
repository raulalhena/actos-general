export interface EventDetailProps {
  _id: string;
  name: string;
  date: string;
  mode: string;
  address?: string;
  type: string;
  image: string;
  category: string;
  subcategory: string;
  description: string;
  web?: string;
  organizedBy?: string[];
  contactEmail?: string;
  language: string[];
  startTime: string;
  endTime: string;
  timeZone: string;
  tags?: string[];
  webLink?: string;
  subcategoryLogo?: string;
}
