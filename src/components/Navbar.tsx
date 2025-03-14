import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  // Get authentication state and logout function from AuthContext
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo and home navigation */}
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>S3 Image Manager</h1>

      {/* Show user details and logout option if authenticated */}
      {user ? (
        <div className="relative">
          <motion.button
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {user.username}
            <span className="ml-2">▼</span>
          </motion.button>

          {/* Dropdown menu for user options */}
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48"
            >
              <div className="p-2">
                <p className="px-4 py-2 font-semibold">{user.email}</p>
                <hr />
                {/* Logout button */}
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-b-lg"
                  onClick={() => { logout(); navigate("/login"); }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        // Show login and signup links if not authenticated
        <div>
          <Link to="/login" className="mx-2 hover:underline">Login</Link>
          <Link to="/signup" className="mx-2 hover:underline">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
