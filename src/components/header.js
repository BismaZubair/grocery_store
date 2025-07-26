import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logoImage from '../assets/logo.png';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Header() {
  const { user, setUser } = useAuth();
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [stock, setStock] = useState({});


  useEffect(() => {
    const storedStock = JSON.parse(localStorage.getItem('stock')) || {};
    setStock(storedStock);
    calculateTotal(cart);
  }, [cart]);

  
  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      document.body.style.paddingTop = header.offsetHeight + 'px';
    }
  }, []);

  const calculateTotal = (cartItems) => {
    const t = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setTotal(t);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/signin');
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    const item = cart[index];
    const availableStock = stock[item.id] || 10;

    if (newQty > availableStock) {
      alert(`❌ Only ${availableStock} items available in stock.`);
      return;
    }

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQty;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const updatedStock = { ...stock };
    for (let item of cart) {
      const currentStock = updatedStock[item.id] || 10;
      const remaining = currentStock - item.quantity;
      if (remaining < 0) {
        alert(`❌ Not enough stock for ${item.name}. Only ${currentStock} left.`);
        return;
      }
      updatedStock[item.id] = remaining;
    }

    localStorage.setItem('stock', JSON.stringify(updatedStock));
    localStorage.removeItem('cart');
    setCart([]);
    setTotal(0);
    alert('✅ Order placed successfully!');
    toggleSidebar();
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="BU Grocery Logo" className="logo-img" />
            </Link>
          </div>

          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <div className={`menu ${menuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>

            <div className="nav-actions">
              {user ? (
                <>
                  <div className="cart-icon-wrapper" onClick={toggleSidebar}>
                    <FaShoppingCart className="cart-icon" /> 
                    {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                  </div>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <FaUser /> Profile
                  </Link>
                  <button className="logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/signin" onClick={() => setMenuOpen(false)}><FaSignInAlt /> Sign In</Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className={`cart-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        <h3>My Cart</h3>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="sidebar-item" key={index}>
                <img src={item.image} alt={item.name} className="sidebar-item-img" />
                <div className="sidebar-item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price} x {item.quantity}</span>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="sidebar-total">
              <strong>Total: ${total}</strong>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
            <button
              className="view-cart-btn"
              onClick={() => {
                setSidebarOpen(false);
                navigate('/cart');
              }}
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
