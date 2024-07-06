// src/Auth/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (username, email, password, phone) => {
    const newUser = { username, email, password, phone, cart: [] };
    axios.post('http://localhost:5000/users', newUser)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/products');
      });
  };

  const login = (email, password) => {
    axios.get(`http://localhost:5000/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          const loggedInUser = { ...response.data[0], cart: response.data[0].cart || [] };
          setUser(loggedInUser);
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          navigate('/products');
        } else {
          alert('Invalid email or password');
        }
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const addToCart = (product) => {
    if (!user) {
      alert('You need to log in to add products to the cart.');
      navigate('/login');
      return;
    }

    const updatedCart = [...user.cart, { ...product, quantity: 1 }];
    const updatedUser = { ...user, cart: updatedCart };

    axios.patch(`http://localhost:5000/users/${user.id}`, { cart: updatedCart })
      .then(() => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
