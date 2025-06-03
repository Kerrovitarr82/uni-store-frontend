import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Gamepad2 } from "lucide-react";

export default function LibraryPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLibrary() {
      try {
        const data = await api.getLibrary(user.id);
        setGames(data.games);
      } catch (err) {
        setError("Ошибка при загрузке библиотеки");
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchLibrary();
  }, [user]);

  if (loading) return <div>Загрузка библиотеки...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-4">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">Моя библиотека</h1>
        </div>
      </div>
      {games.length === 0 ? (
        <h1 className="p-2 text-2xl font-bold text-white">
          Вы ещё не приобрели ни одной игры.
        </h1>
      ) : (
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
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
