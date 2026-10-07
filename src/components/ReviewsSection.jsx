import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

const STORAGE_KEY = 'brasa-reviews'

function readReviews() {
  try {
    const savedReviews = window.localStorage.getItem(STORAGE_KEY)

    if (!savedReviews) {
      return { reviews: [], error: '' }
    }

    const parsedReviews = JSON.parse(savedReviews)

    if (!Array.isArray(parsedReviews)) {
      throw new Error('Los comentarios guardados tienen un formato inválido.')
    }

    return {
      reviews: parsedReviews.filter((review) =>
        typeof review.id === 'string'
        && typeof review.name === 'string'
        && typeof review.comment === 'string'
        && Number.isInteger(review.rating)
        && review.rating >= 1
        && review.rating <= 5
        && typeof review.date === 'string',
      ),
      error: '',
    }
  } catch {
    return {
      reviews: [],
      error: 'No se pudieron leer los comentarios guardados en este navegador.',
    }
  }
}

function formatDate(date) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function ReviewsSection() {
  const [saved] = useState(readReviews)
  const [reviews, setReviews] = useState(saved.reviews)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [storageError, setStorageError] = useState(saved.error)

  function handleSubmit(event) {
    event.preventDefault()

    const newReview = {
      id: window.crypto.randomUUID(),
      name: name.trim(),
      comment: comment.trim(),
      rating,
      date: new Date().toISOString(),
    }
    const updatedReviews = [newReview, ...reviews]

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews))
      setReviews(updatedReviews)
      setName('')
      setComment('')
      setRating(5)
      setStorageError('')
    } catch {
      setStorageError('No se pudo guardar tu comentario. Revisa el almacenamiento disponible en tu navegador.')
    }
  }

  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="reviews-layout">
        <div className="reviews-intro">
          <p className="eyebrow">De nuestra comunidad</p>
          <SectionHeading title="Tu mesa también tiene voz." titleId="reviews-title">
            <p>¿Ya probaste Brasa? Cuéntanos qué te pareció.</p>
          </SectionHeading>
          <form className="review-form" onSubmit={handleSubmit}>
            <label className="review-field">
              <span>Tu nombre</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="¿Cómo te llamas?"
                required
                maxLength={60}
              />
            </label>
            <fieldset className="review-rating">
              <legend>Tu puntuación</legend>
              <div className="rating-picker" role="group" aria-label={`Puntuación: ${rating} de 5 estrellas`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={star <= rating ? 'rating-star is-selected' : 'rating-star'}
                    type="button"
                    aria-label={`${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                    aria-pressed={rating === star}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="review-field">
              <span>Tu comentario</span>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Lo bueno, lo rico, lo que quieras compartir..."
                required
                minLength={5}
                maxLength={500}
                rows="4"
              />
              <small>{comment.length}/500</small>
            </label>
            {storageError && <p className="review-error" role="alert">{storageError}</p>}
            <button className="button button--primary" type="submit">
              Publicar comentario <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>

        <div className="reviews-list" aria-live="polite">
          <div className="reviews-list-heading">
            <h3>Lo que dicen en la mesa</h3>
            <span>{reviews.length} {reviews.length === 1 ? 'comentario' : 'comentarios'}</span>
          </div>
          {reviews.length === 0 ? (
            <div className="reviews-empty">
              <span aria-hidden="true">✳</span>
              <p>Aún no hay comentarios.<br />¡Sé el primero en compartir tu experiencia!</p>
            </div>
          ) : (
            <ul className="review-list">
              {reviews.map((review) => (
                <li className="review-card" key={review.id}>
                  <div className="review-card-top">
                    <span className="review-avatar" aria-hidden="true">{review.name.charAt(0).toUpperCase()}</span>
                    <div>
                      <h4>{review.name}</h4>
                      <time dateTime={review.date}>{formatDate(review.date)}</time>
                    </div>
                    <span className="review-stars" aria-label={`${review.rating} de 5 estrellas`}>
                      {'★'.repeat(review.rating)}<span>{'★'.repeat(5 - review.rating)}</span>
                    </span>
                  </div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
          <p className="reviews-storage-note">Los comentarios se guardan en este navegador.</p>
        </div>
      </div>
    </section>
  )
}
