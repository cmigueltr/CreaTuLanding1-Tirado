import './css/App.css'
import Navbar from './components/navbar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart'
//importamos el provider
import { CartProvider } from './context/CartContext'
import { LoadingProvider } from './context/LoadingContext'
import LoadingSpinner from './components/LoadingSpinner'
import { useContext } from 'react'
import { LoadingContext } from './context/LoadingContext'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'

const AppContent = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className="app-container">
      <Navbar />
      {isLoading && <LoadingSpinner />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenidos a Bizzco Cakes and Cookies" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer/>} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <ItemListContainer greeting="Panel de administración de productos" />
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<ItemListContainer greeting="Bienvenidos a Bizzco Cakes and Cookies" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

