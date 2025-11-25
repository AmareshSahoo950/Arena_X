import { useEffect, useState } from "react";


const CountdownTimer = ({ endTime, onExpire }) => {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!endTime) {
      setRemaining("No timer set");
      return;
    }

    const target = new Date(endTime).getTime();
    if (isNaN(target)) {
      setRemaining("Invalid timer");
      return;
    }

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setRemaining("Time’s up");
        if (onExpire) onExpire();
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, "0");
      setRemaining(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endTime, onExpire]);

  return (
    <div className="inline-block px-4 py-2 bg-black/60 rounded border border-cyan-400 shadow-[0_0_15px_#22d3ee]">
      <span className="neon-timer text-2xl md:text-3xl">
        {remaining}
      </span>
    </div>
  );
};

export default CountdownTimer;
