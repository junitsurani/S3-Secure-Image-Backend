import { useState } from "react";
import { registerUser } from "../api/auth";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSignup = async () => {
    try {
      const response = await registerUser(username, email, password);
      await login(response.data.access_token);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div 
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h2>
        <Input label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <motion.button 
          onClick={handleSignup} 
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 font-semibold shadow-md hover:bg-green-700 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Signup
        </motion.button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
