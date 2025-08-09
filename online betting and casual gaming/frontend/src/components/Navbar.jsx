import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();

  const linkClass = (path) =>
    `text-white hover:text-yellow-300 transition ${location.pathname === path ? 'underline font-bold' : ''}`;

  return (
    <nav className="bg-blue-600 text-white p-4 mb-1">
      

      <ul className="flex gap-4 list-none m-0 p-0 justify-center">
        <li className="inline-block h-10">
          <Link className={linkClass('/')} to="/"><img className="h-full justify-center rounded-full" src='../logo.png' alt="Logo" /></Link>
        </li>
        <li className="inline-block">
          <Link className={linkClass('/')} to="/">Home</Link>
        </li>
        
      
        
        <li className="inline-block justify-end">
          <Link className={linkClass('/games')} to="/games">Games</Link>
        </li>
        <li className="inline-block justify-end">
          <Link
            className={linkClass('/profile') + (!isLoggedIn ? ' opacity-50 pointer-events-none' : '')}
            to="/profile"
          >
            Profile
          </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li className="inline-block justify-end">
              <Link className={linkClass('/login')} to="/login">Login</Link>
            </li>
            <li className="inline-block justify-end">
              <Link className={linkClass('/register')} to="/register">Register</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li className="inline-block">
            <button
              className="text-white hover:text-yellow-300 transition bg-transparent border-none cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
     
    </nav>
  );
};

export default Navbar;