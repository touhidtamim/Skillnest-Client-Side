import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, googleSignIn, user, darkMode } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpper: false,
    hasLower: false,
    hasLength: false,
    hasNumber: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("freelancer");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validatePassword = (password) => {
    const validations = {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasLength: password.length >= 6,
      hasNumber: /[0-9]/.test(password),
    };
    setPasswordValidation(validations);
    return Object.values(validations).every(Boolean);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      return setError("Password must meet all requirements");
    }

    try {
      setIsLoading(true);
      setError("");
      await createUser(email, password);
      await updateUser({
        displayName: name,
        photoURL: photo,
        metadata: { userType }, // Store user type in metadata
      });

      await Swal.fire({
        title: "Registration Successful!",
        text: `Your ${userType} account has been created successfully`,
        icon: "success",
        confirmButtonColor: "#0d9488",
        background: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });

      navigate("/");
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      setError("");
      await googleSignIn();

      await Swal.fire({
        title: "Login Successful!",
        text: "You've been logged in with Google",
        icon: "success",
        confirmButtonColor: "#0d9488",
        background: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });

      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ValidationItem = ({ valid, text }) => (
    <div className="flex items-center mt-1">
      <div
        className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
          valid ? "bg-teal-100 text-teal-500" : "bg-gray-100 text-gray-400"
        } ${darkMode ? "dark:bg-gray-600" : ""}`}
      >
        {valid && (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className={`text-xs ${
          valid
            ? "text-gray-700 dark:text-gray-300"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } py-12 px-4 transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Common heading section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Join Our Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create your account and get started as a freelancer or client
          </p>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-8 rounded-xl shadow-sm border transition-colors duration-300`}
        >
          {error && (
            <div
              className={`mb-6 p-3 text-sm rounded-lg ${
                darkMode ? "bg-red-900 text-red-100" : "bg-red-50 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="photo"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Photo URL (optional)
                  </label>
                  <input
                    type="text"
                    id="photo"
                    name="photo"
                    placeholder="https://example.com/photo.jpg"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="userType"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I want to join as
                  </label>
                  <div className="relative">
                    <select
                      id="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="freelancer">Freelancer</option>
                      <option value="client">Client</option>
                    </select>
                    <div
                      className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password (full width) */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••"
                  required
                  onChange={(e) => validatePassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-600"
                  } cursor-pointer`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.88l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <ValidationItem
                  valid={passwordValidation.hasUpper}
                  text="Uppercase letter"
                />
                <ValidationItem
                  valid={passwordValidation.hasLower}
                  text="Lowercase letter"
                />
                <ValidationItem
                  valid={passwordValidation.hasNumber}
                  text="At least one number"
                />
                <ValidationItem
                  valid={passwordValidation.hasLength}
                  text="6+ characters"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center font-medium ${
                  isLoading ? "opacity-80" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  `Sign up as ${
                    userType === "freelancer" ? "a Freelancer" : "a Client"
                  }`
                )}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center">
            <div
              className={`flex-1 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            ></div>
            <span
              className={`px-3 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              or continue with
            </span>
            <div
              className={`flex-1 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            ></div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-2.5 px-4 border rounded-lg font-medium ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <div
            className={`mt-6 text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:underline dark:text-teal-400"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
