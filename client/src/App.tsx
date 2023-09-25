import './styles/globals.css';
import EventPage from './pages/Event/EventPage';
import EventDashboardPage from './pages/EventDashboard/EventDashboardPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import HomePage from './pages/Home/HomePage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import EventDetailPage from './pages/EventDetail/EventDetail';

function App() {

    return (
        <>
            <NavBar />
            <Routes >
                <Route path="/" element={<HomePage/>} />
                <Route path="/event" element={<EventPage/>} />
                <Route path="/eventdashboard" element={<EventDashboardPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/events/:eventId" element={<EventDetailPage/>} />
            </Routes>
        </>
    );
}

export default App;
