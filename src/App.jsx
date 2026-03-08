import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FeaturesPage from './pages/FeaturesPage';
import PartnershipPage from './pages/PartnershipPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import PanduanPage from './pages/PanduanPage';
import NProgressLoader from './components/NProgressLoader';

function App() {
  return (
    <Router>
      <NProgressLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fitur" element={<FeaturesPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/harga" element={<PricingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/panduan" element={<PanduanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
