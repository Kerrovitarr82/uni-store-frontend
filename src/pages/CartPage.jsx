import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/api';

export default function CartPage() {
  const { user } = useAuth()
  const [cartGames, setCartGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await api.getCart(user.id)
        setCartGames(data.games)
      } catch {
        setError('Ошибка при загрузке корзины')
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [user.id])

  async function handleRemove(gameId) {
    try {
      await api.removeFromCart(user.id, gameId)
      setCartGames((prev) => prev.filter((g) => g.id !== gameId))
    } catch {
      alert('Ошибка при удалении из корзины')
    }
  }

  function handleCheckout() {
    alert('Функция оформления заказа пока не реализована 😅')
  }

  if (loading) return <div>Загрузка корзины...</div>
  if (error) return <div className="text-red-500">{error}</div>

  if (cartGames.length === 0) return <div>Корзина пуста</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>
      <ul className="space-y-4">
        {cartGames.map((game) => (
          <li key={game.id} className="flex justify-between items-center border p-4 rounded shadow">
            <div>
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <p className="text-gray-600">{game.description?.slice(0, 100)}...</p>
            </div>
            <button
              onClick={() => handleRemove(game.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCheckout}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Оформить заказ
      </button>
    </div>
  )
}
