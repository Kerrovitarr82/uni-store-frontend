import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          GameStore
        </Link>

        <nav className="flex space-x-6 items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "hover:text-indigo-300"
            }
          >
            Главная
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/games"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Каталог
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Библиотека
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Желаемое
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Корзина
              </NavLink>
            </>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <span>
                Привет, <strong>{user.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
              >
                Выйти
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Войти
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-400 font-semibold"
                    : "hover:text-indigo-300"
                }
              >
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
