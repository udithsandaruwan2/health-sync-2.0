<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Lazy loaded components
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const DoctorScreen = lazy(() => import('./screens/DoctorScreen'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const FormA = lazy(() => import('./components/AppointmentForm'));
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
      <Router>
        <Header />
        <main
          className="py-3"
          style={{ backgroundColor: '#f8f8f8' }}
        >
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
>>>>>>> Stashed changes
}

export default App;
