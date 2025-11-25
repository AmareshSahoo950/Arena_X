import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "participant",
    githubUsername: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.githubUsername.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      // AuthContext
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });


      localStorage.setItem("githubUser", formData.githubUsername.trim());

      showNotification?.("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
 
      const message =
        err?.response?.data?.message || err?.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 py-4 md:py-8 w-[45vw] mx-auto min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">REGISTER</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {error && <div className="error-message mb-4">{error}</div>}

          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <Input
            label="GitHub Username"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={handleChange}
            placeholder="Enter your GitHub username"
            required
          />

          <div className="mb-6">
            <label className="block text-cyber-cyan mb-2 font-bold text-shadow-[0_0_5px_#00ffff]">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-black/50 border-2 border-cyber-cyan text-white font-mono text-base transition-all duration-300 shadow-[0_0_5px_#00ffff] focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_15px_#ff00ff] bg-gray-950 focus:text-cyber-cyan"
              required
            >
              <option value="participant">Participant</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="text-center mt-8 text-cyber-cyan md:text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyber-magenta no-underline text-shadow-[0_0_5px_#ff00ff] hover:text-cyber-cyan hover:text-shadow-[0_0_10px_#00ffff]"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
