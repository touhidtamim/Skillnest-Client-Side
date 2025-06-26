import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Hamburger (mobile & tablet) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:block lg:hidden text-gray-700"
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
              <h1 className="font-bold text-2xl md:text-2xl  ml-1 text-[#43727A] whitespace-nowrap">
                Skill<span className="text-yellow-400">Nest</span>
              </h1>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex gap-1 font-medium">
            {commonLinks}
            {user ? authLinks : guestLinks}
          </div>

          {/* Right: User controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <div className="flex items-center gap-2">
              <label className="swap swap-rotate cursor-pointer">
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="dark"
                  aria-label="Toggle theme"
                />
                <svg
                  className="swap-on fill-current w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-off fill-current w-6 h-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>

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
        <div className="md:block lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4">
          <div className="flex flex-col gap-3 text-base">
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
