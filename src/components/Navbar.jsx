import { useAuth } from '../context/AuthContext'
import logo from '../../public/logo.webp';

export const Navbar = () => {
    const auth = useAuth();
    const handleLogout = () => {
        auth.logout()
    }
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={logo} height={75} width={75} alt="logo" />
                    <div className="text-xl font-semibold">Product Store</div>
                </div>
                <div>
                    {auth.isLoggedIn && (
                        <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-gray-900">Logout</button>
                    )}
                </div>
            </div>
        </nav >
    )
}
