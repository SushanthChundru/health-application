import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import HomePage from '@/pages/HomePage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import DashboardPage from '@/pages/DashboardPage';
import RecordsPage from '@/pages/RecordsPage';
import ProvidersPage from '@/pages/ProvidersPage';
import AccessControlPage from '@/pages/AccessControlPage';
import BlockchainPage from '@/pages/BlockchainPage';
import AboutPage from '@/pages/AboutPage';
import AuthPage from '@/pages/AuthPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-navy-800 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/access" element={<AccessControlPage />} />
              <Route path="/blockchain" element={<BlockchainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
