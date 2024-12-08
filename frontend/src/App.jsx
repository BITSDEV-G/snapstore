import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Blog from './components/Blog';
import RoleSelection from './components/RoleSelection';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Ensure this path is correct

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/role-selection" element={<RoleSelectionWrapper />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

function RoleSelectionWrapper() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`);
    navigate('/login');
  };

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
}
