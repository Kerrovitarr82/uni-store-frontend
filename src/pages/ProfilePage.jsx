import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Профиль</h2>
      <p><strong>ID:</strong> {user.ID}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Имя:</strong> {user.name} {user.secondName}</p>
      <p><strong>Роль:</strong> {user.Role?.type}</p>
      <Link to="/library" className="text-blue-500 hover:underline">Моя библиотека</Link>
    </div>
  )
}
