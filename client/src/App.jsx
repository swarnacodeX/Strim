import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/customer/Home';
import Account from './pages/customer/homeSections/Account';
import Cart from './pages/customer/homeSections/Cart';
import Sell from './pages/customer/homeSections/Sell';
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}


// Protected route wrapper
function PrivateRoute({ children }) {
  const accesstoken = getCookie('access_token');
  return accesstoken ? children : <Navigate to="/login" replace />;
}

function App() {
  const accesstoken = getCookie('access_token');

  return (
    <Router>
      <Routes>
        {/* Root Route: Redirect based on token */}
        <Route path="/" element={<Navigate to={accesstoken ? "/home" : "/login"} replace />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={accesstoken ? <Navigate to="/home" replace /> : <Login />}
        />

        
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="account" element={<Account />} />
          <Route path="cart" element={<Cart />} />
          <Route path="sell" element={<Sell/>}/>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
