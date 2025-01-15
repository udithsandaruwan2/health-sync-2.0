import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Lazy-loaded components
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
              <Route path="/doctors/:id/appointments" element={<FormA />} />
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
