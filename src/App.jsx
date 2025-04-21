import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalDirectoryPage from './pages/MedicalDirectoryPage';
import AppointmentsPage from './pages/AppointmentPage';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MedicalDirectoryPage />} />
            <Route path="/directory" element={<MedicalDirectoryPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App
