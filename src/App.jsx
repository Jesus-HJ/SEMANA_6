import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CartDrawer } from './components/CartDrawer'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { OrderPage } from './pages/OrderPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/pedido" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <Link className="brand brand--footer" to="/" aria-label="Volver al inicio">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>brasa<span className="brand-dot">.</span></span>
        </Link>
        <p>Hecho con fuego lento y buenos ingredientes.</p>
        <span className="footer-note">© 2025 Brasa Cocina</span>
      </footer>
      <CartDrawer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
