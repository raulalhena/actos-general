// import { render } from '@testing-library/react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import LoginPage from '../pages/Login/LoginPage';
// import SignupPage from '../pages/Signup/SignupPage';
// import HomePage from '../pages/Home/HomePage';
// import EventPage from '../pages/Event/EventPage';

// describe('Router renders the correct pages', () => {
//     test('Snapshot test for Home page', () => {
//         const { asFragment } = render(
//             <Router>
//                 <Routes>
//                     <Route path="/home" element={<HomePage />} />
//                 </Routes>
//             </Router>
//         );
//         expect(asFragment()).toMatchSnapshot();
//     });

//     test('Snapshot test for Login page', () => {
//         const { asFragment } = render(
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<LoginPage />} />
//                 </Routes>
//             </Router>
//         );
//         expect(asFragment()).toMatchSnapshot();
//     });

//     test('Snapshot test for Signup page', () => {
//         const { asFragment } = render(
//             <Router>
//                 <Routes>
//                     <Route path="/signup" element={<SignupPage />} />
//                 </Routes>
//             </Router>
//         );
//         expect(asFragment()).toMatchSnapshot();
//     });

//     test('Snapshot test for Event page', () => {
//         const { asFragment } = render(
//             <Router>
//                 <Routes>
//                     <Route path="/event" element={<EventPage />} />
//                 </Routes>
//             </Router>
//         );
//         expect(asFragment()).toMatchSnapshot();
//     });
// });
