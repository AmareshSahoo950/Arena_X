import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 min-h-[calc(120vh-200px)] relative z-[1]">
      <div className="text-center max-w-4xl px-4 md:px-12 py-8 md:py-12 relative z-[2]">
        <h1 className="text-6xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-wider font-sans text-shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(255,255,255,0.6),0_0_30px_rgba(255,255,255,0.4)]">
          Arena_X
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-white mb-4 md:mb-6 leading-relaxed font-sans text-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Welcome to ArenaX — the command center built for hackathons where
          everything happens at once.
        </p>
        <div className="mt-8 md:mt-12 flex justify-center">
        {!user && (
          <Button
          className="bg-transparent border-2 border-white text-white   md:text-3xl px-6 py-4 cursor-pointer transition-all duration-300 font-bold text-base uppercase tracking-wider shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:text-left"
            variant="primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        )}
        {user && (
          <Button
           className="bg-transparent border-2 border-white text-white px-4 py-2 cursor-pointer transition-all duration-300 font-bold text-base uppercase tracking-wider shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:text-left"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
