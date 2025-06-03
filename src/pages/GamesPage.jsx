import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Gamepad2, Heart} from "lucide-react";

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
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-4">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">Каталог игр</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <Link to={`/games/${game.id}`}>
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Gamepad2 size={64} className="text-white opacity-50" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {game.description?.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">
                      ${game.price}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(game.id)}
                  disabled={addedToCart[game.id]}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                    addedToCart[game.id]
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  } text-white`}
                >
                  {addedToCart[game.id] ? "Добавлено в корзину" : "В корзину"}
                </button>
                <button
                  onClick={() => handleAddToFav(game.id)}
                  disabled={addedToFav[game.id]}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                    addedToFav[game.id]
                      ? "bg-red-500 text-white"
                      : "bg-black bg-opacity-50 text-white hover:bg-red-500"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={addedToFav[game.id] ? "В избранном" : "В избранное"}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
