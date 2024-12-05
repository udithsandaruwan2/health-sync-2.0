import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Login from './components/Login'
import Register from './components/Register'



function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/contact' element={<Login/>} /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
