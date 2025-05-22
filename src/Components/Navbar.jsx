import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const user = {
    name: "Touhid Tamim",
    avatar: "https://i.pravatar.cc/40",
    // null করলে login off হয়ে যাবে
  };

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const activeClass = "text-blue-600 dark:text-blue-400 font-semibold";
  const normalClass = "hover:text-blue-500 dark:hover:text-blue-400 transition";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/Images/Skillnest-nav-logo.png"
                alt="Logo"
                className="h-8"
              />
              <img
                src="/Images/skillnest-name.png"
                alt="Name"
                className="h-8 hidden sm:block"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex md:ml-10 gap-6 text-gray-700 dark:text-gray-200 font-medium">
              <NavLink
                to="/skillnest/all-tasks"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Browse Tasks
              </NavLink>

              {user && (
                <>
                  <NavLink
                    to="/skillnest/add-task"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    Add Task
                  </NavLink>
                  <NavLink
                    to="/skillnest/my-task"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    My Tasks
                  </NavLink>
                  <NavLink
                    to="/skillnest/my-profile"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    My Profile
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Toggle Theme"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* If User Logged In */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-9 w-9 rounded-full border-2 border-blue-500 cursor-pointer"
                  />
                  <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 text-sm px-3 py-1 rounded shadow-lg top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                    {user.name}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-sm px-4 py-1.5 border border-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/skillnest/all-tasks"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? activeClass : normalClass
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Browse Tasks
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/skillnest/add-task"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? activeClass : normalClass
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Add Task
                </NavLink>
                <NavLink
                  to="/skillnest/my-task"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? activeClass : normalClass
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  My Tasks
                </NavLink>
                <NavLink
                  to="/skillnest/my-profile"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? activeClass : normalClass
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </>
            )}
          </div>
          <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-3">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Link
                    to="/login"
                    className="w-1/2 px-4 py-2 text-sm font-medium text-center border border-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-1/2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-4 px-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {darkMode ? (
                  <>
                    <Sun size={18} className="text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            {user && (
              <div className="mt-4 px-3 flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
