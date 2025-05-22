import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const activeClass =
    "bg-[#DCEEEF] dark:bg-[#365c63] text-[#43727A] dark:text-blue-100 font-semibold px-3 py-1 rounded";
  const normalClass =
    "hover:bg-[#f0f7f8] dark:hover:bg-gray-800 px-3 py-1 rounded transition";

  const commonLinks = (
    <>
      <NavLink
        to="/skillnest/all-tasks"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Browse Tasks
      </NavLink>
      <NavLink
        to="/skillnest/add-task"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Add Task
      </NavLink>
    </>
  );

  const authLinks = (
    <>
      <NavLink
        to="/skillnest/my-task"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Tasks
      </NavLink>
      <NavLink
        to="/skillnest/my-profile"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Profile
      </NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink
        to="/skillnest/about"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        About Us
      </NavLink>
      <NavLink
        to="/skillnest/faq"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        FAQ
      </NavLink>
      <NavLink
        to="/skillnest/contact"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-500 dark:text-gray-400"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/Images/Skillnest-nav-logo.png"
                alt="Logo"
                className="h-7 md:h-8"
              />
              <img
                src="/Images/skillnest-name.png"
                alt="Name"
                className="h-6 md:h-8"
              />
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {/* Right: Theme Toggle + Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? (
                <Sun size={26} className="text-yellow-400" />
              ) : (
                <Moon size={26} />
              )}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    alt="avatar"
                    className="h-9 w-9 rounded-full border-2 border-blue-500"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/skillnest/login"
                    className="text-sm font-semibold px-4 py-1.5 border border-[#F4C22C] text-[#F4C22C]  text-black rounded hover:bg-[#efdfb1] dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/skillnest/register"
                    className="text-sm font-semibold px-4 py-1.5 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: Avatar or Login only */}
            <div className="md:hidden">
              {user ? (
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="h-9 w-9 rounded-full border-2 border-blue-500"
                />
              ) : (
                <Link
                  to="/skillnest/login"
                  className="text-sm font-semibold px-3 py-1 border border-[#43727A] text-[#43727A] dark:text-teal-400 hover:bg-teal-100 hover:text-black rounded"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 pt-2 pb-4">
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-200">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {user && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="mt-3 w-full font-semibold bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
