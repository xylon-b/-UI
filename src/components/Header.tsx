import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Import LogOut icon

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated'); // Clear auth state
    navigate('/login'); // Redirect to login
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/classroom" className="text-2xl font-bold text-primary-700">
          자세방 학습
        </Link>
        <nav className="flex items-center space-x-6">
           {/* Add other relevant links if needed, e.g., My Profile */}
           {/* <Link to="/profile" className="nav-link">내 정보</Link> */}
           <button
             onClick={handleLogout}
             className="flex items-center text-secondary-600 hover:text-red-600 transition-colors duration-200"
             aria-label="Logout"
           >
             <LogOut size={20} className="mr-1" />
             로그아웃
           </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
