import { Link } from 'react-router-dom'
import { ReviewsSection } from '../components/ReviewsSection'
import { SectionHeading } from '../components/SectionHeading'

const features = [
  { number: '01', title: 'Del mercado', text: 'Ingredientes frescos, elegidos cada mañana.' },
  { number: '02', title: 'Del fuego', text: 'Cocción lenta y sabor que se queda contigo.' },
  { number: '03', title: 'A tu mesa', text: 'Pide en minutos. Nosotros nos encargamos.' },
]

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Cocina honesta, hecha al momento</p>
          <h1>La mesa sabe<br />mejor <em>juntos.</em></h1>
          <p className="hero-description">
            Ingredientes de temporada, fuego lento y platos hechos para compartir. Lo bueno empieza con un buen bocado.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/menu">Pedir ahora <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/menu">Descubrir el menú <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-rating">
            <div className="avatar-stack" aria-hidden="true">
              <span>J</span><span>M</span><span>A</span><span>+</span>
            </div>
            <p><strong>4.9/5</strong> <span className="rating-stars" aria-label="5 de 5 estrellas">★★★★★</span><br /><span>Más de 1,200 mesas felices</span></p>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1300&q=90"
            alt="Plato fresco con vegetales de temporada preparado para compartir"
          />
          <div className="hero-stamp" aria-hidden="true"><span>BUENO</span><span>DE VERDAD</span><b>✳</b></div>
          <div className="hero-image-caption"><span>En la mesa, sin apuro.</span><span>Desde 2019</span></div>
          <div className="hero-float-card">
            <span className="float-card-icon" aria-hidden="true">✳</span>
            <span><strong>Del mercado a tu mesa</strong><small>Fresco. Local. De temporada.</small></span>
          </div>
        </div>
        <span className="hero-index" aria-hidden="true">01 — 03</span>
      </section>

      <section className="promise-section">
        <div className="promise-intro">
          <span className="section-index">01 / Nuestra forma</span>
          <h2>Menos vueltas.<br /><em>Más sabor.</em></h2>
        </div>
        <div className="promise-details">
          {features.map((feature) => (
            <article className="promise-item" key={feature.number}>
              <span>{feature.number}</span>
              <div><h3>{feature.title}</h3><p>{feature.text}</p></div>
              <span className="promise-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-menu-section">
        <SectionHeading eyebrow="Algo bueno te espera" title={<>Favoritos de la casa<span className="brand-dot">.</span></>}>
          <Link className="text-link" to="/menu">Ver todo el menú <span aria-hidden="true">→</span></Link>
        </SectionHeading>
        <div className="home-featured-grid">
          <article className="home-featured-card">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" alt="Bife a la parrilla con vegetales" loading="lazy" />
            <span>EL FAVORITO</span>
            <div><h3>Bife de la casa</h3><p>Parrilla, papas doradas, mantequilla de hierbas.</p></div>
          </article>
          <article className="home-featured-card">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" alt="Ensalada fresca de temporada" loading="lazy" />
            <span>VERDE Y FRESCO</span>
            <div><h3>Ensalada de estación</h3><p>Del mercado, con vinagreta de la casa.</p></div>
          </article>
          <article className="home-featured-card">
            <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85" alt="Helado artesanal servido en copa" loading="lazy" />
            <span>EL TOQUE DULCE</span>
            <div><h3>Helado artesanal</h3><p>Hecho en casa, cambia con la temporada.</p></div>
          </article>
        </div>
      </section>

      <ReviewsSection />

      <section className="home-cta">
        <p className="eyebrow">Tu próxima comida favorita</p>
        <h2>Nosotros ponemos<br />el fuego. <em>Tú, el antojo.</em></h2>
        <Link className="button button--light" to="/menu">Encuentra tu favorito <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  )
}
