import './styles/globals.css';
import EventPage from './pages/Event/EventPage';
import EventDashboardPage from './pages/EventDashboard/EventDashboardPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import HomePage from './pages/Home/HomePage';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import EventDetailPage from './pages/EventDetail/EventDetail';
import EventsList from './pages/EventsList/EventsList';
import { AuthProvider } from './providers/AuthProvider';
import Footer from './components/Footer/Footer';
import FAQPage from './pages/FAQ/FAQPage';

function Layout ({ children }: any) {
    return (
        <>
            <AuthProvider >
                <NavBar />
                {children}
                <Footer />
            </AuthProvider>
        </>
    );
}

function App() {

    const location = useLocation();
    const nonNavbar = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <>
            { nonNavbar 
                ? (
                    <Routes >
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                    </Routes>
                ) : (
                    <Layout>
                        <Routes >
                            <Route path="/" element={<HomePage/>} />
                            <Route path="/event" element={<EventPage/>} />
                            <Route path="/eventdashboard" element={<EventDashboardPage/>} />
                            <Route path="/faq" element={<FAQPage/>} />
                            <Route path='/eventslist' element={<EventsList />} />
                            <Route path="/event/:_id" element={<EventDetailPage/>} />
                        </Routes>
                    </Layout>
                )
            }
        </>
    );
}

export default App;
