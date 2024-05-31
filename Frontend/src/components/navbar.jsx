import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-blue-500 p-4 flex items-center">
      <div className="text-white font-bold mr-auto">1xBid</div>
      <div className="w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md"
        />
      </div>
      <div className="ml-auto flex space-x-4">
        <Link to="/toko" className="text-white hover:text-gray-200 transition-colors duration-200">Toko</Link>
        <Link to="/login" className="text-white hover:text-gray-200 transition-colors duration-200">Login</Link>
        <Link to="/user-profile" className="text-white hover:text-gray-200 transition-colors duration-200">User Profile</Link>
      </div>
    </nav>
  );
}
