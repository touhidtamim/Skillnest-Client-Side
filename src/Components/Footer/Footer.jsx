import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & description */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-1">
            <img
              src="/Images/Skillnest-nav-logo.png"
              alt="SkillNest Logo"
              className="w-[40px] "
            />
            <h1 className="font-bold text-2xl text-[#43727A]">
              Skill<span className="text-yellow-400">Nest</span>
            </h1>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering freelancers and clients to connect, collaborate, and
            create impact through seamless task sharing.
          </p>
        </div>

        {/* Navigation links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-3 text-teal-400">Explore</h3>
          <div className="space-y-2">
            <Link
              to="/all-tasks"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              Explore Jobs
            </Link>
            <Link
              to="/about"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              FAQ
            </Link>
          </div>
        </div>

        {/* Legal links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-3 text-teal-400">Legal</h3>
          <div className="space-y-2">
            <Link
              to="/privacy-policy"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="block text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-1"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Newsletter signup & social links */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-teal-400">Stay Updated</h3>
            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 cursor-pointer bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-500 hover:to-teal-600 text-sm font-medium shadow-lg transition-all duration-300 whitespace-nowrap hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-teal-400">Connect With Us</h3>
            <div className="flex gap-5">
              <a
                href="https://web.facebook.com/touhidtamim01"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 text-blue-400 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/touhidtamim"
                className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 text-sky-400 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 text-gray-300 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:hello@skillnest.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-600 text-green-400 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pb-5 bg-gray-900/50">
        &copy; {new Date().getFullYear()} Skillnest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
