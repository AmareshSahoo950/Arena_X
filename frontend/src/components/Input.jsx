const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, ...props }) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-cyber-cyan mb-2 font-bold text-shadow-[0_0_5px_#00ffff]">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-3 bg-black/50 border-2 border-cyber-cyan text-cyber-cyan font-mono text-base transition-all duration-300 shadow-[0_0_5px_#00ffff] focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_15px_#ff00ff] focus:text-cyber-magenta placeholder:text-gray-600"
        {...props}
      />
    </div>
  );
};

export default Input;

