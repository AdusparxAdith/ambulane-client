import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/Auth.jsx';
import { LocationProvider } from '../context/Location.jsx';
import PrivateRoutes from '../components/PrivateRoutes/index.jsx';
import Home from '../components/Home/index.jsx';
import Login from '../components/Login/index.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocationProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </LocationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
