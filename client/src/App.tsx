import './styles/globals.css';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import EventDashboard from './pages/EventDashboard/EventDashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import EventDetailPage from './pages/EventDetail/EventDetail';
import EventsList from './pages/EventsList/EventsList';
import { AuthProvider } from './providers/AuthProvider';
import Footer from './components/Footer/Footer';
import FAQ from './pages/FAQ/FAQ';

function Layout({ children }: any) {
    return (
        <>
            <AuthProvider>
                <NavBar />
                {children}
                <Footer />
            </AuthProvider>
        </>
    );
}

function App() {
    const location = useLocation();
    const nonNavbar =
    location.pathname === '/login' || location.pathname === '/signup';

    return (
        <>
            {nonNavbar ? (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createevent" element={<CreateEvent />} />
                        <Route path="/eventdashboard" element={<EventDashboard />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/eventslist" element={<EventsList />} />
                        <Route path="/event/:_id" element={<EventDetailPage />} />
                    </Routes>
                </Layout>
            )}
        </>
    );
}

export default App;
