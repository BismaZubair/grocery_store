import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './cart.css';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    updateTotal(cart);
  }, [cart]);

  const updateTotal = (cartItems) => {
    const t = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(t);
  };

  const handleRemove = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    const stockData = JSON.parse(localStorage.getItem('stock')) || {};
    const availableStock = stockData[updatedCart[index].id] ?? updatedCart[index].stock;

    if (newQuantity > availableStock) {
      alert(`❌ Only ${availableStock} items available in stock.`);
      return;
    }

    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const stockData = JSON.parse(localStorage.getItem('stock')) || {};

    for (let item of cart) {
      const currentStock = stockData[item.id] ?? item.stock;
      if (currentStock < item.quantity) {
        alert(`❌ Not enough stock for ${item.name}. Only ${currentStock} left.`);
        return;
      }
    }

    cart.forEach(item => {
      const currentStock = stockData[item.id] ?? item.stock;
      stockData[item.id] = currentStock - item.quantity;
    });

    localStorage.setItem('stock', JSON.stringify(stockData));

    setCart([]);
    localStorage.removeItem('cart');
    alert('✅ Order placed!');
    navigate('/');
  };

  return (
    <div className="cart-container">
      <h2>Billing Summary</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">🛒 Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>Price: ${item.price}</span>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
              </div>
              <span>Total: ${item.price * item.quantity}</span>
              <button className="remove-btn" onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}
          <hr />
          <h3>Total Amount: ${total}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Menu</button>
     
    </div>
  );
}

export default Cart;
