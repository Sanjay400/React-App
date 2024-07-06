// src/Products/Products.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ price: '', brand: '', color: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filtered = products;

    if (filters.price) {
      filtered = filtered.filter(product => product.price <= filters.price);
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.color) {
      filtered = filtered.filter(product => product.color.toLowerCase().includes(filters.color.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div className="product-page">
      <header className="header">
        <div className="header-buttons">
          <Link to="/cart">Cart</Link>
          <Link to="/order-history">Order History</Link>
          <button onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}>Logout</button>
        </div>
      </header>
      <div className="filters">
        <label>
          Price:
          <input type="number" name="price" value={filters.price} onChange={handleFilterChange} />
        </label>
        <label>
          Brand:
          <input type="text" name="brand" value={filters.brand} onChange={handleFilterChange} />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={filters.color} onChange={handleFilterChange} />
        </label>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={process.env.PUBLIC_URL + `/Image/${product.image}`} alt={product.name} className="product-image" />
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.rating} stars</div>
            <div>{product.color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
