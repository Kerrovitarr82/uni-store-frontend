import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20">
        <div className="max-w-1/5 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4">Профиль</h2>
          <p className="text-white">
            <strong>ID:</strong> {user.ID}
          </p>
          <p className="text-white">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-white">
            <strong>Имя:</strong> {user.name} {user.secondName}
          </p>
          <p className="text-white">
            <strong>Роль:</strong> {user.Role?.type}
          </p>
          <Link
            to="/library"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Моя библиотека
          </Link>
        </div>
      </div>
    </div>
  );
}
