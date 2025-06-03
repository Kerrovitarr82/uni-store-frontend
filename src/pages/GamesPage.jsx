import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'
import api from '../api/api';

export default function GamesPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToFav, setAddedToFav] = useState({});

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await api.getGames();
        setGames(data.data);
      } catch (err) {
        setError("Не удалось загрузить игры.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  async function handleAddToCart(gameId) {
    try {
      await api.addToCart(user.id, gameId);
      setAddedToCart((prev) => ({ ...prev, [gameId]: true }));
    } catch (err) {
      alert("Ошибка при добавлении в корзину.");
    }
  }

  async function handleAddToFav(gameId) {
    try {
      await api.addToFavorites(user.id, gameId);
      setAddedToFav((prev) => ({ ...prev, [gameId]: true }));
    } catch (err) {
      alert("Ошибка при добавлении в избранное.");
    }
  }

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Каталог игр</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <Link
              to={`/games/${game.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {game.name}
            </Link>
            <p className="text-sm text-gray-600 mb-2">
              {game.description?.slice(0, 100)}...
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => handleAddToCart(game.id)}
                disabled={addedToCart[game.id]}
                className={`px-4 py-2 rounded ${
                  addedToCart[game.id]
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {addedToCart[game.id] ? "Добавлено в корзину" : "В корзину"}
              </button>
              <button
                onClick={() => handleAddToFav(game.id)}
                disabled={addedToFav[game.id]}
                className={`px-4 py-2 rounded ${
                  addedToFav[game.id]
                    ? "bg-gray-400"
                    : "bg-pink-500 hover:bg-pink-600"
                } text-white`}
              >
                {addedToFav[game.id] ? "В избранном" : "В избранное"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
