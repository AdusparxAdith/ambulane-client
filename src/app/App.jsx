import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/Auth.jsx';
import PrivateRoutes from '../components/PrivateRoutes/index.jsx';
import Home from '../components/Home/index.jsx';
import Login from '../components/Login/index.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
