import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/api';

export default function LibraryPage() {
  const { user } = useAuth()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLibrary() {
      try {
        const data = await api.getLibrary(user.id)
        setGames(data.games)
      } catch (err) {
        setError('Ошибка при загрузке библиотеки')
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchLibrary()
  }, [user])

  if (loading) return <div>Загрузка библиотеки...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Моя библиотека</h1>
      {games.length === 0 ? (
        <p>Вы ещё не приобрели ни одной игры.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <li key={game.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-semibold text-lg">{game.name}</h3>
              <p className="text-sm text-gray-600">{game.description?.slice(0, 80)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
