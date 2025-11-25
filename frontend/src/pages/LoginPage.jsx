import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "participant",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData); // calls backend /auth/login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container max-w-md mx-auto">
        <h1 className="neon-title">LOGIN</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
          <div className="mb-4">
            <label className="block text-cyber-cyan mb-2 font-bold">
              Login as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black/50 border-2 border-cyber-cyan text-cyber-cyan font-mono text-base focus:outline-none focus:border-cyber-magenta"
            >
              <option value="participant">Participant</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
