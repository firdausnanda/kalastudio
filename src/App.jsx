import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TransactionPage from './pages/TransactionPage';
import AddTransactionPage from './pages/AddTransactionPage';
import ReportPage from './pages/ReportPage';
import FeaturesPage from './pages/FeaturesPage';
import PartnershipPage from './pages/PartnershipPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import PanduanPage from './pages/PanduanPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NProgressLoader from './components/NProgressLoader';

function App() {
  return (
    <Router>
      <NProgressLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaksi" element={<TransactionPage />} />
        <Route path="/transaksi/tambah" element={<AddTransactionPage />} />
        <Route path="/laporan" element={<ReportPage />} />
        <Route path="/fitur" element={<FeaturesPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/harga" element={<PricingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/panduan" element={<PanduanPage />} />
        <Route path="/syarat-ketentuan" element={<TermsPage />} />
        <Route path="/kebijakan-privasi" element={<PrivacyPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
        <Route path="/kontak" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
