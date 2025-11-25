import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showNotification("Logout successfully");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] bg-black/30 py-4 md:py-8 relative z-10 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-[5vw] flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold no-underline">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 md:w-[50px] md:h-[50px] flex items-center justify-center">
              <div className="absolute left-0 w-6 h-12 md:w-[25px] md:h-[50px] bg-[#87ceeb] logo-v-left rounded-l"></div>
              <div className="absolute right-0 w-6 h-12 md:w-[25px] md:h-[50px] bg-[#9370db] logo-v-right rounded-r"></div>
              <div className="absolute text-2xl md:text-[28px] text-[#ffd700] z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">
                ⚡
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white neon-text font-bold px-4 py-2  md:text-xl border-cyan-400 transition-all duration-75"
                : "text-white px-4 py-2 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 font-bold text-lg md:text-xl hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/submissions"
            className={({ isActive }) =>
              isActive
                ? "text-white neon-text font-bold px-4 py-2  md:text-xl border-cyan-400 transition-all duration-75"
                : "text-white px-4 py-2 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 font-bold text-lg md:text-xl hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            }
          >
            Submissions
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white neon-text font-bold px-4 py-2  md:text-xl border-cyan-400 transition-all duration-75"
                    : "text-white px-4 py-2 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 font-bold text-lg md:text-xl hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                }
              >
                Dashboard
              </NavLink>
              <span className="text-white font-bold text-lg md:text-xl text-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                {user.name.toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-transparent border-2 border-white text-white px-4 py-2 cursor-pointer transition-all duration-300 font-bold text-base uppercase tracking-wider shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white no-underline transition-all duration-300 px-4 py-2 border font-bold text-lg md:text-xl text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white no-underline transition-all duration-300 px-4 py-2 border  font-bold text-lg md:text-xl text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white no-underline transition-all duration-300 px-4 py-2 border border-transparent font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            Home
          </Link>
          <Link
            to="/submissions"
            onClick={() => setIsMenuOpen(false)}
            className="text-white no-underline transition-all duration-300 px-4 py-2 border border-transparent font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            Submissions
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-white no-underline transition-all duration-300 px-4 py-2 border border-transparent font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Dashboard
              </Link>
              <span className="text-white font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] px-4 py-2">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-transparent border-2 border-white text-white px-4 py-2 cursor-pointer transition-all duration-300 font-bold text-base uppercase tracking-wider shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-white no-underline transition-all duration-300 px-4 py-2 border border-transparent font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="text-white no-underline transition-all duration-300 px-4 py-2 border border-transparent font-bold text-lg text-shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
