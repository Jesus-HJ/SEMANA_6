import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useCart } from '../context/useCart'
import { useMenu } from '../hooks/useMenu'

const categories = ['Todo', 'Entradas', 'Principales', 'Desayuno', 'Bebidas', 'Postres']

function animateProductToCart(image) {
  const cartTarget = document.querySelector('[data-cart-target]')

  if (!cartTarget || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const imageBounds = image.getBoundingClientRect()
  const cartBounds = cartTarget.getBoundingClientRect()
  const imageClone = image.cloneNode()
  const deltaX = cartBounds.left + cartBounds.width / 2 - (imageBounds.left + imageBounds.width / 2)
  const deltaY = cartBounds.top + cartBounds.height / 2 - (imageBounds.top + imageBounds.height / 2)

  Object.assign(imageClone.style, {
    position: 'fixed',
    zIndex: '100',
    top: `${imageBounds.top}px`,
    left: `${imageBounds.left}px`,
    width: `${imageBounds.width}px`,
    height: `${imageBounds.height}px`,
    borderRadius: '4px',
    objectFit: 'cover',
    pointerEvents: 'none',
    transformOrigin: 'center',
  })
  imageClone.setAttribute('aria-hidden', 'true')
  document.body.append(imageClone)

  const flight = imageClone.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1, borderRadius: '4px' },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.12)`,
        opacity: 0.2,
        borderRadius: '50%',
      },
    ],
    { duration: 650, easing: 'cubic-bezier(0.45, 0, 0.85, 0.4)', fill: 'forwards' },
  )

  flight.onfinish = () => imageClone.remove()
  flight.oncancel = () => imageClone.remove()
}

export function MenuPage() {
  const { status, items, error, retry } = useMenu()
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState('Todo')

  const visibleItems = useMemo(
    () => activeCategory === 'Todo' ? items : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  )

  return (
    <div className="menu-page page-container">
      <section className="page-intro menu-intro">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Directo de nuestra cocina</p>
          <h1>El menú<span className="brand-dot">.</span></h1>
          <p>Platos sencillos, ingredientes honestos y todo hecho al momento.</p>
        </div>
        <div className="menu-note"><span aria-hidden="true">✳</span><p>Lo que está bueno<br />no necesita complicarse.</p></div>
      </section>

      <section className="menu-content" aria-labelledby="menu-title">
        <SectionHeading eyebrow="Cocina de temporada" title="Encuentra tu antojo" titleId="menu-title" />
        <div className="category-filter" role="group" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? 'category-chip is-selected' : 'category-chip'}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className="loading-state" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            <p>Buscando lo más fresco del día...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="error-state" role="alert">
            <span className="error-icon" aria-hidden="true">!</span>
            <h2>No pudimos traer el menú.</h2>
            <p>{error}</p>
            <button className="button button--dark" type="button" onClick={retry}>Volver a intentar</button>
          </div>
        )}

        {status === 'success' && visibleItems.length === 0 && (
          <div className="empty-filter"><p>No hay platos en esta categoría por ahora.</p></div>
        )}

        {status === 'success' && visibleItems.length > 0 && (
          <div className="menu-grid">
            {visibleItems.map((item) => (
              <article className="menu-card" key={item.id}>
                <div className="menu-card-image-wrap">
                  <img className="menu-card-image" src={item.image} alt={item.name} loading="lazy" />
                  {item.tag && <span className="menu-card-tag">{item.tag}</span>}
                  <span className="menu-card-category">{item.category}</span>
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-heading">
                    <h3>{item.name}</h3>
                    <strong>S/ {item.price.toFixed(2)}</strong>
                  </div>
                  <p>{item.description}</p>
                  <button
                    className="add-to-cart"
                    type="button"
                    onClick={(event) => {
                      const productImage = event.currentTarget.closest('.menu-card').querySelector('.menu-card-image')
                      animateProductToCart(productImage)
                      addItem(item)
                    }}
                  >
                    Agregar al pedido <span aria-hidden="true">+</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="menu-bottom-cta">
        <p>¿Ya sabes lo que quieres?</p>
        <Link to="/pedido">Revisa tu pedido <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  )
}
