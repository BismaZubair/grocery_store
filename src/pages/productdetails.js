import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import './productdetails.css';
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(product ? product.stock : 0);

  useEffect(() => {
    if (product) {
      const savedStock = JSON.parse(localStorage.getItem('stock')) || {};
      if (savedStock[product.id] !== undefined) {
        setStock(savedStock[product.id]);
      } else {
        setStock(product.stock);
      }
    }
  }, [product]);

  const increaseQty = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    } else {
      alert(`❌ Only ${stock} items available in stock.`);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (stock <= 0) {
      alert('❌ Out of Stock.');
      return;
    }
    if (quantity > stock) {
      alert(`❌ You can add a maximum of ${stock} items.`);
      return;
    }

    addToCart({ ...product, quantity });
    alert(`${product.name} added to cart!`);
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="details-container">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <p><strong>Available in stock:</strong> {stock}</p>

      <div className="quantity-selector">
        <button onClick={decreaseQty}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={increaseQty}>+</button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={stock <= 0}
        style={{ opacity: stock <= 0 ? 0.5 : 1 }}
      >
        Add to Cart
      </button>

      <button onClick={() => navigate('/cart')}>View Cart</button>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
}

export default ProductDetail;
