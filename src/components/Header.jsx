import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

export function Header() {
  const { count, isCartOpen, setIsCartOpen } = useCart()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Brasa, inicio">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>brasa<span className="brand-dot">.</span></span>
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>
            Inicio
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>
            Menú
          </NavLink>
          <NavLink to="/pedido" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>
            Mi pedido
          </NavLink>
        </nav>

        <button
          type="button"
          className="cart-trigger"
          aria-label={`Abrir carrito, ${count} productos`}
          aria-expanded={isCartOpen}
          onClick={() => setIsCartOpen(true)}
        >
          <span className="cart-trigger-label">Tu pedido</span>
          <span className="cart-trigger-icon" data-cart-target aria-hidden="true" key={count}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </span>
          {count > 0 && <span className="cart-count">{count}</span>}
        </button>
      </div>
    </header>
  )
}
