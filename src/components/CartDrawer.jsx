import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

export function CartDrawer() {
  const { items, subtotal, updateQuantity, isCartOpen, setIsCartOpen } = useCart()

  return (
    <>
      {isCartOpen && (
        <div className="drawer-backdrop" role="presentation" onClick={() => setIsCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">Lo rico empieza aquí</p>
                <h2 id="cart-title">Tu pedido <span>({items.length})</span></h2>
              </div>
              <button className="icon-button" type="button" aria-label="Cerrar carrito" onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            {items.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-cart-icon" aria-hidden="true">✳</span>
                <h3>Tu mesa está esperando.</h3>
                <p>Agrega algo rico del menú y lo preparamos para ti.</p>
                <Link className="button button--dark" to="/menu" onClick={() => setIsCartOpen(false)}>Explorar menú</Link>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {items.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <span>S/ {item.price.toFixed(2)}</span>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" aria-label={`Agregar una unidad de ${item.name}`} onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <strong>S/ {(item.price * item.quantity).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>S/ {subtotal.toFixed(2)}</strong></div>
                  <p>Envío calculado al confirmar tu dirección.</p>
                  <Link className="button button--primary button--full" to="/pedido" onClick={() => setIsCartOpen(false)}>
                    Continuar con mi pedido <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
