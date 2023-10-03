import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import EventDashboard from '../pages/EventDashboard/EventDashboard';
import EventDetail from '../pages/EventDetail/EventDetail';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import NotFound from '../pages/NotFound/NotFound';
import FAQ from '../pages/FAQ/FAQ';
import EventsList from '../pages/EventsList/EventsList';
import AllEvents from '../pages/AllEvents/AllEvents';

/*               {CREATE EVENT Page}               */
test('Render Create Event Page', async () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={[ '/createevent' ]} initialIndex={0}>
            <Routes>
                <Route path="/createevent" element={<CreateEvent />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('event-form-component');
    expect(eventFormComponent).toBeInTheDocument();

    fireEvent.click(getByText('Guardar'));
});

/*               {DASHBOARD Page}               */
test('Render Dashboard Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/eventdashboard' ]} initialIndex={0}>
            <Routes>
                <Route path="/eventdashboard" element={<EventDashboard />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('dashboard-component');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {EVENT DETAIL Page}               */
test('Render EventDetail Page', async () => {
    const eventId = '123';
    render(
        <MemoryRouter initialEntries={[ `/event/${eventId}` ]} initialIndex={0}>
            <Routes>
                <Route path="/event/:_id" element={<EventDetail />} />
            </Routes>
        </MemoryRouter>
    );
    const eventDetailComponent = screen.getByTestId('event-detail');
    expect(eventDetailComponent).toBeInTheDocument();
});

/*               {HOME Page}               */
test('Render Home Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('home-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {LOGIN Page}               */
test('Render Login Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/login' ]} initialIndex={0}>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('login-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {SIGNUP Page}               */
test('Render Signup Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/signup' ]} initialIndex={0}>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('signup-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {404 NOT FOUND Page}               */
test('Render 404 not found Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/404' ]} initialIndex={0}>
            <Routes>
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('notFound-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*                  {FAQ Page}                   */
test('Render FAQ Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/faq' ]} initialIndex={0}>
            <Routes>
                <Route path="/faq" element={<FAQ />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('faq-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {EVENT LIST Page}               */
test('Render Event List Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/eventslist' ]} initialIndex={0}>
            <Routes>
                <Route path="/eventslist" element={<EventsList />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('eventsList-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {ALL EVENT Page}               */
test('Render All Events Page', async () => {
    render(
        <MemoryRouter initialEntries={[ '/allEvents' ]} initialIndex={0}>
            <Routes>
                <Route path="/allEvents" element={<AllEvents />} />
            </Routes>
        </MemoryRouter>
    );

    const eventFormComponent = screen.getByTestId('allEvents-page');
    expect(eventFormComponent).toBeInTheDocument();
    
});

/*               {Logout Page}               */