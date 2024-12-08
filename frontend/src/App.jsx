import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Blog from './components/Blog';
import TermsOfUse from './pages/TermsOfUse';
// import PrivacyPolicy from './pages/PrivacyPolicy'; // Ensure this path is correct
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

        </Routes>
    </Router>
  );
}
