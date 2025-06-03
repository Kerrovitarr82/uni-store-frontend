import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    secondName: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // api.signup ожидает объект с userData — подставь поля, которые нужны серверу
      await api.signup(form);
      // После успешной регистрации — редирект на страницу входа или на главную
      navigate("/login");
    } catch (err) {
      setError(err.message || "Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20">
        <div className="max-w-1/5 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Регистрация</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="secondName"
              placeholder="Фамилия"
              value={form.secondName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
