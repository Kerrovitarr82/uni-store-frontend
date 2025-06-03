import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Добро пожаловать в 
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block">
              GameStore
            </span>
          </h1>
          {user ? (
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Привет, {user.name}! Перейдите в <Link className="text-blue-600" to="/profile">профиль</Link>.</p>
      ) : (
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Пожалуйста, <Link className="text-blue-600" to="/login">войдите</Link>.</p>
      )}
        </div>
      </div>
      </div>
  )
}
