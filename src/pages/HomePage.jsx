import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать в Game Store!</h1>
      {user ? (
        <p>Привет, {user.name}! Перейдите в <Link className="text-blue-600" to="/profile">профиль</Link>.</p>
      ) : (
        <p>Пожалуйста, <Link className="text-blue-600" to="/login">войдите</Link>.</p>
      )}
    </div>
  )
}
