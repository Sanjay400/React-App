import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import { AuthContext } from '../Auth/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      alert('Product added to cart!');
    } else {
      navigate('/login');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
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
      <div className="product-info">
        <img src={process.env.PUBLIC_URL + `/Image/${product.image}`} alt={product.name} className="product-image" />
        <div className="product-details-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div>Price: ${product.price}</div>
          <div>Rating: {product.rating} stars</div>
          <div>Color: {product.color}</div>
          <div>Gender: {product.gender}</div>
          <div>Brand: {product.brand}</div>
          <div>Offers: {product.offers}</div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
