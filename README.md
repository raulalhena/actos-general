# 📅 Actos Project

## Event Registration and Attendance Application

This application has been developed to address the needs of <a href='https://www.nouscims.com/' target='_blank'>🔗 **Nous Cims Foundation** </a> in managing registration and attendance for a variety of events organized or promoted by the foundation.

We hope this application will assist in hosting successful events and delivering meaningful experiences.

## 🗝️ Key Features
- Easy registration for attendees.
- Comprehensive event management, including various types of events.
- Attendance tracking.
- Collection of feedback and opinions on events.

## 🖼️ Mockup (Figma):

## 💻 Full-stack Developers:
Did you like our application? We'd love to hear your feedback. Please don't hesitate to get in touch with us to share your comments and suggestions. We're here to assist!

- Teresa Madridejos (Product Owner): teresamadridejosm@gmail.com
- Renata Yumi Namie (Scrum Master): rn.yumi@gmail.com
- Raúl Alhena: raul.alhena@gmail.com
- Diego Cruz: dacmdeco779@gmail.com
- Andreu Baltazar: andreubltzr11@gmail.com

### Entidad / Modelo / Modulo

#### Event:

```JSON
[
    {
        "id": 1,
        "name": "Event 1",
        "description": "A nice event for all",
        "tags": ["event", "online", "nice"],
        "category": ["Global", "Empleabilidad", "Bienestar Emocional"],
        "venue": "C/Llull 25, 08005, Barcelona",
        "date": "2023-09-12",
        "startTime": "17:30",
        "endTime": "19:00",
        "timeZone": ["Madrid +2:00 GMT", "GMT 00:00"],
        "showStartTime": 1, //mostrar=1 / ocultar=0
        "showEndTime": 1, //mostrar=1 / ocultar=0
        "confirmed": 1, //pendiente=0 / confirmado=1
        "type": ["Proyecto", "Formacion", "Taller", "Charla", "Otros"],
        "mode": ["Presencial", "Online"],
        "image": "URL a la imagen",
        "video": "URL al video",
        "qr": "URL a la imagen",
        "attendees": ["user2", "user3"],
        "submitted": ["user1", "user2", "user3"],
        "capacity": 100,
        "price": 0,
        "payment": ["Gratis", "Donación", "Pago"],
        "contact": "eventmanager@actos.com",
        "language": ["Castellano", "Catalán", "Inglés"],
        "web": "URL a la web",
        "visibility": 0, //draft=0 / public=1
        "active": 0 //si=1 / no=0 
    }
]
```

#### User:

```JSON
[
    {
        "id": 1,
        "name": "User 1",
        "email": "user@actos.com"
    }
]
```

## Tamaños de Pantalla

Breakpoints:
```CSS
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    xxl: 1400px
```
  