import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Gamepad2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { user } = useAuth();
  const [cartGames, setCartGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPrice = cartGames.reduce((sum, game) => sum + game.price, 0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await api.getCart(user.id);
        setCartGames(data.games);
      } catch {
        setError("Ошибка при загрузке корзины");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [user.id]);

  async function handleRemove(gameId) {
    try {
      await api.removeFromCart(user.id, gameId);
      setCartGames(cartGames.filter((game) => game.id !== gameId));
    } catch {
      alert("Ошибка при удалении из корзины");
    }
  }

  async function handleCheckout() {
    try {
      await api.createOrder(user.id);
      navigate(0);
    } catch {
      alert("Ошибка при удалении из корзины");
    }
  }

  if (loading) return <div>Загрузка корзины...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-4">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">Корзина</h1>
        </div>
      </div>
      {cartGames.length === 0 ? (
        <h1 className="p-2 text-2xl font-bold text-white">
          Ваша корзина пуста.
        </h1>
      ) : (
        <div className="space-y-6">
          {cartGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Gamepad2 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{game.name}</h3>
                  <p className="text-gray-400">${game.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(game.id)}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <X size={20} />
              </button>
            </div>
          ))}

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-white">Итого:</span>
              <span className="text-2xl font-bold text-green-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => handleCheckout()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
