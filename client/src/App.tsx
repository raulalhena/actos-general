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
const AllEvents =  React.lazy(() => import('./pages/AllEvents/AllEvents'));
const MyEvents =  React.lazy(() => import('./pages/MyEvents/MyEvents'));
const FAQ = React.lazy(() => import('./pages/FAQ/FAQ'));
const ConfigBoard = React.lazy(() => import('./pages/ConfigBoard/ConfigBoard'));
import Logout from './components/Logout/Logout';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AccessControl from './pages/AccessControl/AccessControl';
import AccessControlValidation from './pages/AccessControlValidation/AccessControlValidation';
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SignupAdmin from './pages/SignupAdmin/SignupAdmin';
import ConfigForm from './pages/ConfigForm/ConfigForm';
import SubmittedList from './pages/SubmittedList/SubmittedList';
import ConfigList from './components/Configuration/List/ConfigList';
import ConfigListSubcategories from './components/Configuration/ConfigListSubcategories/ConfigListSubcategories';

function Layout({ children }: any) {
    return (
        <>
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <NavBar />
                <div style={{
                    flexGrow: 1
                }}>
                    {children}
                </div>
                <ScrollTopButton/>
                <Footer />
            </div>
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
                                <ProtectedRoute role={ [ 'user', 'admin' ] }>
                                    <MyEvents />
                                </ProtectedRoute>
                            } />
                            <Route path='/config/configlist' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <ConfigList />
                                </ProtectedRoute>
                            } />
                            <Route path='/config/configlistsubcategories' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <ConfigListSubcategories />
                                </ProtectedRoute>
                            } />
                            <Route path='/config/configform' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <ConfigForm />
                                </ProtectedRoute>
                            } />
                            <Route path='/configboard' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <ConfigBoard />
                                </ProtectedRoute>
                            } />
                            <Route path='/submittedlist' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <SubmittedList />
                                </ProtectedRoute>
                            } />
                            <Route path='/signupadmin' element={
                                <ProtectedRoute role={ [ 'super' ] }>
                                    <SignupAdmin />
                                </ProtectedRoute>
                            } />
                            <Route path='/accesscontrol' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <AccessControl />
                                </ProtectedRoute>
                            } />
                            <Route path='/accessvalidation' element={
                                <ProtectedRoute role={ [ 'admin' ] }>
                                    <AccessControlValidation />
                                </ProtectedRoute>
                            } />
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