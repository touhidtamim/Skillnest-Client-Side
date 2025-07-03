import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTheme } from "../../Contexts/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme, isInitialized } = useTheme();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const activeClass =
    "text-sm bg-[#DCEEEF] text-[#43727A] font-semibold px-3 py-1 rounded";
  const normalClass = "text-sm hover:bg-[#f0f7f8] px-3 py-1 rounded transition";

  const commonLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Home
      </NavLink>
      <NavLink
        to="/freelancers"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Hire Experts
      </NavLink>
      <NavLink
        to="/all-tasks"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Explore Jobs
      </NavLink>
    </>
  );

  const authLinks = (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Dashboard
      </NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        About Us
      </NavLink>
      <NavLink
        to="/faq"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        FAQ
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Contact
      </NavLink>
    </>
  );

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out.",
          icon: "success",
        });
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to logout. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Hamburger (mobile & tablet) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:block lg:hidden text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center flex-shrink-0 ml-1">
              <img
                src="/Images/Skillnest-nav-logo.png"
                alt="SkillNest Logo"
                className="w-[45px] md:w-[50px] lg:w-[60px]"
              />
              <h1 className="font-bold text-2xl md:text-2xl ml-1 text-[#43727A] dark:text-yellow-400 whitespace-nowrap">
                Skill
                <span className="text-yellow-400 dark:text-yellow-300">
                  Nest
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex gap-1 font-medium text-gray-900 dark:text-gray-100">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {/* Right: User controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle - New implementation */}
            <button
              onClick={toggleTheme}
              className="text-2xl text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
              disabled={!isInitialized}
            >
              {isInitialized ? (
                isDark ? (
                  <MdDarkMode />
                ) : (
                  <MdLightMode />
                )
              ) : (
                <span
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    display: "inline-block",
                  }}
                />
              )}
            </button>

            {/* User avatar and buttons */}
            <div className="hidden md:flex gap-3 items-center">
              {user ? (
                <>
                  <img
                    id="user-avatar"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/LDyv7RjM/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    }
                    alt="User profile"
                    className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                    onClick={() => navigate("/dashboard/my-profile")}
                  />
                  <Tooltip
                    anchorId="user-avatar"
                    place="bottom"
                    content={user.displayName || user.email || "My Profile"}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-base font-semibold cursor-pointer px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold px-4 py-1.5 border border-[#F4C22C] text-[#F4C22C] hover:bg-[#F4C22C] hover:text-white rounded transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold px-4 py-1.5 bg-[#43727A] text-white rounded hover:bg-[#365c63] transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile & tablet user avatar/login */}
            <div className="md:hidden flex items-center gap-3">
              {user ? (
                <>
                  <img
                    id="mobile-avatar"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/LDyv7RjM/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    }
                    alt="User profile"
                    className="h-9 w-9 rounded-full border-2 border-blue-500 cursor-pointer"
                    onClick={() => navigate("/dashboard/my-profile")}
                  />
                  <Tooltip
                    anchorId="mobile-avatar"
                    place="top"
                    content={user.displayName || "My Profile"}
                  />
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-base font-semibold px-3 py-1 border border-[#43727A] text-[#43727A] hover:bg-[#43727A] hover:text-white rounded transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet toggle menu */}
      {menuOpen && (
        <div className="md:block lg:hidden border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-4 pt-2 pb-4">
          <div className="flex flex-col gap-3 text-base text-gray-900 dark:text-gray-100">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {user && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full font-semibold bg-red-500 hover:bg-red-600 text-white py-2 rounded"
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
