import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-0 md:right-5 z-[1000] animate-[slideIn_0.3s_ease-out_forwards]">
      <div className="bg-black/95 border-l-[5px] border-cyber-green text-white px-6 py-6 md:px-8 md:py-6 rounded shadow-[0_0_20px_rgba(0,255,0,0.5),0_4px_6px_rgba(0,0,0,0.3)] text-lg md:text-xl font-bold font-sans min-w-[280px] md:min-w-[300px] text-center animate-[fadeOut_0.3s_ease-out_1.7s_forwards]">
        {message}
      </div>
    </div>
  );
};

export default Notification;

