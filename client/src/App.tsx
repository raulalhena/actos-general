import './styles/globals.css';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import EventDashboard from './pages/EventDashboard/EventDashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import EventDetail from './pages/EventDetail/EventDetail';
import EventsList from './pages/EventsList/EventsList';
import { AuthProvider } from './providers/AuthProvider';
import Footer from './components/Footer/Footer';
import FAQ from './pages/FAQ/FAQ';
import NotFound from './pages/NotFound/NotFound';
import Logout from './components/Logout/Logout';
import AllEvents from './pages/AllEvents/AllEvents';
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function Layout({ children }: any) {
    return (
        <>
            <AuthProvider>
                <NavBar />
                {children}
                <ScrollTopButton/>
                <Footer />
            </AuthProvider>
        </>
    );
}

function App() {
    const location = useLocation();
    const nonNavbar =
        location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/404';

    const { user, isLogged } = useAuth();

    return (
        <>
            {nonNavbar ? (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/404" element={<NotFound />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/createevent' element={
                            <ProtectedRoute isAllowed={ isLogged && user.role === 'admin' }>
                                <CreateEvent />
                            </ProtectedRoute>
                        } />
                        <Route path='/eventdashboard' element={
                            <ProtectedRoute isAllowed={ isLogged && user.role === 'admin' }>
                                <EventDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/eventslist" element={<EventsList />} />
                        <Route path="/event/:_id" element={<EventDetail />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path="/allevents" element={<AllEvents />} />
                        <Route path="*" element={<Navigate to='/404' />} />
                    </Routes>
                </Layout>
            )}
        </>
    );
}

export default App;