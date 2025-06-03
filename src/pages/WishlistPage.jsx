import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/api';

export default function WishlistPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchFavorites() {
    try {
      const data = await api.getFavorites(user.id);
      setGames(data.games);
    } catch (err) {
      setError("Не удалось загрузить список желаемого.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(gameId) {
    try {
      await api.removeFromFavorites(user.id, gameId);
      setGames((prev) => prev.filter((game) => game.id !== gameId));
    } catch (err) {
      alert("Ошибка при удалении из избранного");
    }
  }

  useEffect(() => {
    if (user?.id) fetchFavorites();
  }, [user]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Список желаемого</h1>
      {games.length === 0 ? (
        <p>Ваш список пуст.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <li key={game.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-semibold text-lg">{game.name}</h3>
              <p className="text-sm text-gray-600">
                {game.description?.slice(0, 80)}...
              </p>
              <button
                onClick={() => handleRemove(game.id)}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Удалить из списка
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
