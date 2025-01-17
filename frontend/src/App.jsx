import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import DashboardScreen from './screens/DashboardScreen';
import DeleteConfirm from './components/DeleteConfirm';
import Profile from './components/Profile';
import AcceptConfirm from './components/AcceptConfirm';
import CancelConfirm from './components/CancelConfirm';
import PrescriptionForm from './components/PrescriptionForm';
import PrescriptionsScreen from './screens/PrescriptionsScreen';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const DoctorScreen = lazy(() => import('./screens/DoctorScreen'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const FormA = lazy(() => import('./components/AppointmentForm'));

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3" style={{ backgroundColor: '#f8f8f8' }}>
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/doctors/:id" element={<DoctorScreen />} />
              <Route path="/users/:id/dashboard" element={<DashboardScreen />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/doctors/:id/appointments" element={<FormA />} />
              <Route path="/appointments/:id/delete" element={<DeleteConfirm />} />
              <Route path="/appointments/:id/accept" element={<AcceptConfirm />} />
              <Route path="/appointments/:id/cancel" element={<CancelConfirm />} />
              <Route path="/prescriptions/:p_id/:app_id" element={<PrescriptionForm />} />
              <Route path="/users/:id/prescriptions" element={<PrescriptionsScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
