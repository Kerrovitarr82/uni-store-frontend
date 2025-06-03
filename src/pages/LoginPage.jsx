import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20">
        <div className="max-w-1/5 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Вход</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
