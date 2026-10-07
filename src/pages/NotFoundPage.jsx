import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found page-container">
      <span className="not-found-number">404</span>
      <p className="eyebrow">Nos perdimos entre mesas</p>
      <h1>Esta página no está en el menú.</h1>
      <p>Pero sí podemos ayudarte a encontrar algo bueno para comer.</p>
      <Link className="button button--dark" to="/">Volver al inicio <span aria-hidden="true">↗</span></Link>
    </section>
  )
}
