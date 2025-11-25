import { useLoaderData, useRevalidator } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import Button from "../components/Button";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const DashboardAdmin = () => {
 
  const loaderData = useLoaderData();
  const endTime = loaderData?.endTime ?? null;
  const isRunning = loaderData?.isRunning ?? false;
  const revalidator = useRevalidator();
  const callApi = async (path, body) => {
  const token = localStorage.getItem("token");  

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",   
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Request failed");
  }

  return res.json();
};


  const handleStart48 = async () => {
    try {
      await callApi("/timer/start", { durationMinutes: 48 * 60 });
      revalidator.revalidate();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStop = async () => {
    try {
      await callApi("/timer/stop");
      revalidator.revalidate();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReset = async () => {
    try {
      await callApi("/timer/set", { endTime: new Date().toISOString() });
      await callApi("/timer/stop");
      revalidator.revalidate();
    } catch (err) {
      alert(err.message);
    }
  };

  const timerExpired =
    !isRunning || !endTime || new Date(endTime).getTime() <= Date.now();

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">ADMIN DASHBOARD</h1>

        <div className="mt-4 mb-6 space-y-3">
          <p className="text-cyber-cyan font-mono">Global Hackathon Timer:</p>

          <div className="flex items-center gap-4">
            <CountdownTimer endTime={endTime} />
            <div>
              <p className="text-gray-300">
                Status:{" "}
                <span className="font-mono">
                  {isRunning && !timerExpired ? "Running" : "Stopped / Expired"}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {endTime ? `Ends: ${new Date(endTime).toLocaleString()}` : "No end time set"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <Button type="button" variant="primary" onClick={handleStart48}>
              Start 48 Hours
            </Button>
            <Button type="button" variant="secondary" onClick={handleStop}>
              Stop Timer
            </Button>
            <Button type="button" className="text-white border-2 px-4 py-2" variant="danger" onClick={handleReset}>
              Reset Timer
            </Button>
          </div>
        </div>


        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/50 p-4 rounded border border-cyber-cyan">
            <h2 className="text-cyber-cyan font-mono mb-2">Quick Actions</h2>
            <p className="text-gray-300 text-sm">Use these to control global event timer.</p>
            <div className="mt-3 flex gap-2">
              <Button type="button" variant="primary" onClick={handleStart48}>
                Start 48h
              </Button>
              <Button type="button" variant="secondary" onClick={handleStop}>
                Stop
              </Button>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded border border-cyber-cyan">
            <h2 className="text-cyber-cyan font-mono mb-2">Timer Status</h2>
            <p className="text-gray-300">
              Running: <span className="font-mono">{String(isRunning)}</span>
            </p>
            <p className="text-gray-300 mt-1">
              Expired: <span className="font-mono">{String(timerExpired)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
