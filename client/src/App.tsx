import React, { Suspense } from 'react';
import './styles/globals.css';
import NavBar from './components/NavBar/NavBar';
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
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Subcategory } from './pages/Subcategory/Subcategory';
import Preloader from './components/Preloader/Preloader';

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
                            {/* <Route path='/createsubcategory' element={
                            <ProtectedRoute role={ [ 'admin' ] }>
                                <Subcategory />
                            </ProtectedRoute>
                        } /> */}
                            <Route path="/createsubcategory" element={<Subcategory />} />
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