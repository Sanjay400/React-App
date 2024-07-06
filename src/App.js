import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Products from './Products/Products';
import PrivateRoute from './privateRoute'; // Ensure PrivateRoute is correctly imported
import ProductDetails from './ProductDetail/ProductPage';
import Cart from './Cart/Cart';
import Shipping from './Shipping/Shipping';
import OrderHistory from './OrderHistory/OrderHistory';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
                    <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
                    <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                    <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
                    <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
