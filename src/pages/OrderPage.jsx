import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

export function OrderPage() {
  const { items, subtotal, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    payment: 'card',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setOrderNumber(`BR-${Date.now().toString().slice(-6)}`)
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="order-success page-container" aria-live="polite">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Pedido confirmado</p>
        <h1>¡Gracias, {form.name.split(' ')[0]}!</h1>
        <p>Ya estamos preparando algo rico. Te escribiremos al <strong>{form.phone}</strong> cuando tu pedido esté en camino.</p>
        <div className="order-confirmation-number"><span>Número de pedido</span><strong>{orderNumber}</strong></div>
        <Link className="button button--dark" to="/">Volver al inicio</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="order-empty page-container">
        <span className="empty-cart-icon" aria-hidden="true">✳</span>
        <p className="eyebrow">Aún no hay nada en la mesa</p>
        <h1>Empecemos por algo rico.</h1>
        <p>Elige tus favoritos del menú y aquí podrás confirmar la entrega.</p>
        <Link className="button button--primary" to="/menu">Ir al menú <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  return (
    <div className="order-page page-container">
      <section className="page-intro order-intro">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Un último paso</p>
          <h1>Tu pedido<span className="brand-dot">.</span></h1>
          <p>Cuéntanos dónde lo llevamos y nos ponemos manos a la obra.</p>
        </div>
        <Link className="text-link" to="/menu">← Volver al menú</Link>
      </section>

      <div className="order-layout">
        <form className="order-form" onSubmit={handleSubmit}>
          <fieldset className="form-section">
            <legend><span>01</span> Datos de entrega</legend>
            <div className="form-grid">
              <label className="form-field form-field--full">
                <span>Nombre completo</span>
                <input name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="¿A nombre de quién?" required minLength={2} />
              </label>
              <label className="form-field form-field--full">
                <span>Teléfono</span>
                <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+51 999 000 000" required minLength={7} />
              </label>
              <label className="form-field form-field--full">
                <span>Dirección de entrega</span>
                <input name="address" autoComplete="street-address" value={form.address} onChange={handleChange} placeholder="Calle, número y distrito" required minLength={5} />
              </label>
              <label className="form-field form-field--full">
                <span>Indicaciones <small>Opcional</small></span>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Piso, referencia o algo que debamos saber" rows="3" />
              </label>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend><span>02</span> ¿Cómo prefieres pagar?</legend>
            <div className="payment-options">
              <label className={form.payment === 'card' ? 'payment-option is-chosen' : 'payment-option'}>
                <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
                <span className="payment-icon" aria-hidden="true">▣</span>
                <span><strong>Tarjeta</strong><small>Al recibir tu pedido</small></span>
                <span className="radio-indicator" />
              </label>
              <label className={form.payment === 'cash' ? 'payment-option is-chosen' : 'payment-option'}>
                <input type="radio" name="payment" value="cash" checked={form.payment === 'cash'} onChange={handleChange} />
                <span className="payment-icon" aria-hidden="true">S/</span>
                <span><strong>Efectivo</strong><small>Pago contra entrega</small></span>
                <span className="radio-indicator" />
              </label>
            </div>
          </fieldset>
          <button className="button button--primary button--full submit-order" type="submit">Confirmar pedido <span aria-hidden="true">↗</span></button>
          <p className="secure-note"><span aria-hidden="true">♡</span> Pedido de prueba: no se procesa ningún pago real.</p>
        </form>

        <aside className="order-summary">
          <div className="summary-heading"><p className="eyebrow">Hecho con cariño</p><h2>En tu pedido <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div>
          <ul className="summary-items">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt="" />
                <span><strong>{item.name}</strong><small>Cantidad: {item.quantity}</small></span>
                <b>S/ {(item.price * item.quantity).toFixed(2)}</b>
              </li>
            ))}
          </ul>
          <div className="summary-total"><span>Subtotal</span><strong>S/ {subtotal.toFixed(2)}</strong></div>
          <p className="summary-delivery">El costo de envío se confirma según tu dirección.</p>
        </aside>
      </div>
    </div>
  )
}
