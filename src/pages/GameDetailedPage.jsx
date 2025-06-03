import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Gamepad2, Heart } from "lucide-react";

export default function GameDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToFav, setAddedToFav] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [gameData, reviewsData] = await Promise.all([
          api.getGame(id),
          api.getGameReviews(id),
        ]);
        setGame(gameData);
        setReviews(reviewsData);
      } catch (err) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  async function handleAddToCart() {
    try {
      await api.addToCart(user.id, game.id);
      setAddedToCart((prev) => ({ ...prev, [game.id]: true }));
    } catch {
      alert("Ошибка при добавлении в корзину.");
    }
  }

  async function handleAddToFavorites() {
    try {
      await api.addToFavorites(user.id, game.id);
      setAddedToFav((prev) => ({ ...prev, [game.id]: true }));
    } catch {
      alert("Ошибка при добавлении в избранное.");
    }
  }

  async function handleSubmitReview(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || rating <= 0 || rating > 5) {
      alert("Пожалуйста, заполните все поля и поставьте рейтинг от 1 до 5.");
      return;
    }

    try {
      await api.createReview({
        user_id: user.id,
        game_id: game.id,
        title,
        description,
        rating,
      });
      setReviews((prev) => [
        ...prev,
        { title, description, rating, user: user.name },
      ]);
      setTitle("");
      setDescription("");
      setRating(0);
    } catch {
      alert("Не удалось оставить отзыв.");
    }
  }

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto p-4 text-white">
        <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <Gamepad2 size={64} className="text-white opacity-50" />
        </div>
        <h1 className="text-3xl font-bold m-2">{game.name}</h1>
        <p className="mb-4">{game.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400 mb-4">
            ${game.price}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleAddToCart(game.id)}
            disabled={addedToCart[game.id]}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
              addedToCart[game.id]
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {addedToCart[game.id] ? "Добавлено в корзину" : "В корзину"}
          </button>
          <button
            onClick={() => handleAddToFavorites(game.id)}
            disabled={addedToFav[game.id]}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
              addedToFav[game.id]
                ? "bg-red-600 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-red-600 text-white hover:from-green-700 hover:to-red-700"
            }`}
          >
            {addedToFav[game.id] ? "Добавлено в желаемое" : "В желаемое"}
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
            placeholder="Текст отзыва"
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
    </div>
  );
}
