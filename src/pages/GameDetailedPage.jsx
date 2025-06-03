import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/api';

export default function GameDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [gameData, reviewsData] = await Promise.all([
          api.getGame(id),
          api.getGameReviews(id),
        ])
        setGame(gameData)
        setReviews(reviewsData)
      } catch (err) {
        setError('Ошибка при загрузке данных.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  async function handleAddToCart() {
    try {
      await api.addToCart(user.id, game.id)
      alert('Добавлено в корзину!')
    } catch {
      alert('Ошибка при добавлении в корзину.')
    }
  }

  async function handleAddToFavorites() {
    try {
      await api.addToFavorites(user.id, game.id)
      alert('Добавлено в избранное!')
    } catch {
      alert('Ошибка при добавлении в избранное.')
    }
  }

  async function handleSubmitReview(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || rating <= 0 || rating > 5) {
      alert('Пожалуйста, заполните все поля и поставьте рейтинг от 1 до 5.')
      return
    }

    try {
      await api.createReview({
        user_id: user.id,
        game_id: game.id,
        title,
        description,
        rating,
      })
      setReviews((prev) => [...prev, { title, description, rating, user: user.name }])
      setTitle('')
      setDescription('')
      setRating(0)
    } catch {
      alert('Не удалось оставить отзыв.')
    }
  }

  if (loading) return <div>Загрузка...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
      <p className="text-gray-600 mb-4">{game.description}</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Купить
        </button>
        <button
          onClick={handleAddToFavorites}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
        >
          В избранное
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Отзывы</h2>
        {reviews.length === 0 ? (
          <p>Отзывов пока нет.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((review, i) => (
              <li key={i} className="bg-gray-100 p-3 rounded">
                <h3 className="font-semibold">{review.title}</h3>
                <p>Рейтинг: {review.rating} / 5</p>
                <p>{review.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmitReview} className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Заголовок"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание"
          className="w-full border p-2 rounded"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="block">
          Рейтинг (1–5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="ml-2 border rounded w-16 text-center"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Оставить отзыв
        </button>
      </form>
    </div>
  )
}
