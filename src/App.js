import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/productlist';
import ProductDetail from './pages/productdetails';
import SignIn from './pages/SignIn';
import Register from './pages/register';
import Profile from './pages/Profile';
import About from './pages/about';
import Contact from './pages/contact';
import Header from './components/header';
import Footer from './components/footer';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './pages/cart';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
      
    <Router>
         <ScrollToTop />
         <CartProvider>
      <Routes>
       
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <ProductList />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <ProductDetail />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <About />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
     

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
         <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Cart />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
      </CartProvider>
    </Router>
    
  );
}

export default App;
