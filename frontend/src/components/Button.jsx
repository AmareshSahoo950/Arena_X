const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, ...props }) => {
  const baseClasses = "px-8 py-3 font-mono text-base font-bold cursor-pointer transition-all duration-300 border-2 uppercase tracking-wider";
  
  const variantClasses = {
    primary: "bg-transparent border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_#00ffff] hover:bg-cyber-cyan hover:text-black hover:shadow-[0_0_20px_#00ffff] hover:-translate-y-0.5",
    secondary: "bg-transparent border-cyber-magenta text-cyber-magenta shadow-[0_0_10px_#ff00ff] hover:bg-cyber-magenta hover:text-black hover:shadow-[0_0_20px_#ff00ff] hover:-translate-y-0.5",
    success: "bg-transparent border-cyber-green text-cyber-green shadow-[0_0_10px_#00ff00] hover:bg-cyber-green hover:text-black hover:shadow-[0_0_20px_#00ff00] hover:-translate-y-0.5",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

