import { FaRecycle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <FaRecycle className="h-8 w-8 text-primary-500" />
            <h1 className="ml-2 text-xl font-bold text-gray-800">Waste Classification</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 