import React, { Suspense } from 'react';
import './styles/globals.css';
import Preloader from './components/Preloader/Preloader';
const NavBar = React.lazy(() => import('./components/NavBar/NavBar'));
const CreateEvent = React.lazy(() => import('./pages/CreateEvent/CreateEvent'));
const EventDashboard = React.lazy(() => import('./pages/EventDashboard/EventDashboard'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Footer =  React.lazy(() => import('./components/Footer/Footer'));
const NotFound =  React.lazy(() => import('./pages/NotFound/NotFound'));
const EventDetail =  React.lazy(() => import('./pages/EventDetail/EventDetail'));
const EventsList =  React.lazy(() => import('./pages/EventsList/EventsList'));
const Logout =  React.lazy(() => import('./components/Logout/Logout'));
const AllEvents =  React.lazy(() => import('./pages/AllEvents/AllEvents'));
const MyEvents =  React.lazy(() => import('./pages/MyEvents/MyEvents'));
const FAQ = React.lazy(() => import('./pages/FAQ/FAQ'));
const ConfigBoard = React.lazy(() => import('./pages/ConfigBoard/ConfigBoard'));
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SignupAdmin from './pages/SignupAdmin/SignupAdmin';
import ConfigForm from './pages/ConfigForm/ConfigForm';

function Layout({ children }: any) {
    return (
        <>
            <NavBar />
            {children}
            <ScrollTopButton/>
            <Footer />
        </>
    );
}

function App() {
    const location = useLocation();
    const nonNavbar =
        location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/404';

    return (
        <>
            {nonNavbar ? (
                <Suspense fallback={ <Preloader /> }>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/404" element={<NotFound />} />
                    </Routes>
                </Suspense>
            ) : (
                <Layout>
                    <Suspense fallback={ <Preloader /> }>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/createevent' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <CreateEvent />
                                </ProtectedRoute>
                            } />
                            <Route path='/eventdashboard' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <EventDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path='/myevents' element={
                                <ProtectedRoute role={ [ 'user' ] }>
                                    <MyEvents />
                                </ProtectedRoute>
                            } />
                            <Route path='/config/configform' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <ConfigForm />
                                </ProtectedRoute>
                            } />
                            <Route path="/configboard" element={<ConfigBoard />} />
                            <Route path="/createadmin" element={<SignupAdmin />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/eventslist" element={<EventsList />} />
                            <Route path="/event/:_id" element={<EventDetail />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path="/allevents" element={<AllEvents />} />
                            <Route path="*" element={<Navigate to='/404' />} />
                        </Routes>
                    </Suspense>
                </Layout>
            )}
        </>
    );
}

export default App;