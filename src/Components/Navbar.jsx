import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const activeClass =
    "text-base bg-[#DCEEEF] text-[#43727A] font-semibold px-3 py-1 rounded";
  const normalClass =
    "text-base hover:bg-[#f0f7f8] px-3 py-1 rounded transition";

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
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire("Error", "Failed to logout. Please try again.", "error");
      }
    }
  };

  return (
    <nav className="bg-base-100 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-base-content"
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
          <div className="hidden md:flex gap-6 text-base-content font-medium">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {/* Right: Theme Toggle + Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 cursor-pointer rounded-full text-base-content hover:bg-base-200 transition"
            >
              {document.documentElement.getAttribute("data-theme") ===
              "dark" ? (
                <Sun size={26} className="text-yellow-400" />
              ) : (
                <Moon size={26} />
              )}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex gap-3 items-center">
              {user ? (
                <>
                  <img
                    id="user-avatar"
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/LDyv7RjM/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    }
                    alt="avatar"
                    className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                    onClick={() => navigate("/skillnest/my-profile")}
                  />
                  <Tooltip
                    anchorId="user-avatar"
                    place="bottom"
                    content={user.displayName || user.email || "My Profile"}
                    delayShow={300}
                    style={{
                      zIndex: 9999,
                      backgroundColor: "#63635c",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-base font-semibold px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/skillnest/login"
                    className="text-base font-semibold px-4 py-1.5 border border-[#F4C22C] text-[#F4C22C] hover:bg-[#efdfb1] rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/skillnest/register"
                    className="text-base font-semibold px-4 py-1.5 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: Avatar or Login only */}
            <div className="md:hidden">
              {user ? (
                <>
                  <img
                    id="mobile-avatar"
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/LDyv7RjM/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    }
                    alt="avatar"
                    className="h-9 w-9 rounded-full border-2 border-blue-500 cursor-pointer"
                    onClick={() => navigate("/skillnest/my-profile")}
                  />
                  <Tooltip
                    anchorId="mobile-avatar"
                    place="top"
                    content={user.displayName || "My Profile"}
                    delayShow={200}
                    style={{ zIndex: 9999 }}
                  />
                </>
              ) : (
                <Link
                  to="/skillnest/login"
                  className="text-base font-semibold px-3 py-1 border border-[#43727A] text-[#43727A] hover:bg-teal-100 hover:text-black rounded"
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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-base-100 px-4 pt-2 pb-4">
          <div className="flex flex-col gap-2 text-base-content">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {user && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="mt-3 w-full font-semibold bg-red-500 hover:bg-red-600 text-white text-base py-2 rounded"
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
