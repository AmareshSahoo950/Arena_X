
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMySubmission } from "../api/submissionApi"; 
import Button from "../components/Button";
import CountdownTimer from "../components/CountdownTimer";

const DashboardParticipant = () => {

  const loaderData = useLoaderData();
  const endTime = loaderData?.endTime ?? null;
  const isRunning = loaderData?.isRunning ?? false;

  const { user } = useAuth();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loadingSubmission, setLoadingSubmission] = useState(true);

  const [githubData, setGithubData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(false);

  useEffect(() => {
    if (!user) return;

    let mounted = true;
    const load = async () => {
      try {
        setLoadingSubmission(true);
        const data = await getMySubmission();
        if (!mounted) return;
        setSubmission(data || null);
      } catch (err) {
        console.error("Failed to load submission:", err);
        setSubmission(null);
      } finally {
        if (mounted) setLoadingSubmission(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user]);


  useEffect(() => {
    const githubUser = localStorage.getItem("githubUser");
    if (!githubUser) {
      setGithubData(null);
      return;
    }

    let mounted = true;
    const controller = new AbortController();
    const loadGithub = async () => {
      setLoadingGithub(true);
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(githubUser)}`, {
          signal: controller.signal,
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!res.ok) {
          console.warn("GitHub fetch failed:", res.status);
          if (!mounted) return;
          setGithubData(null);
          return;
        }

        const json = await res.json();
        if (!mounted) return;
        setGithubData(json);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching GitHub user:", err);
        if (mounted) setGithubData(null);
      } finally {
        if (mounted) setLoadingGithub(false);
      }
    };

    loadGithub();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const timerExpired =
    !isRunning || !endTime || new Date(endTime).getTime() <= Date.now();

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">DASHBOARD</h1>

        <div className="mt-4 mb-6">
          <p className="text-cyber-cyan mb-2 font-mono">Global Hackathon Timer:</p>
          <CountdownTimer endTime={endTime} />
          {timerExpired && (
            <p className="mt-3 text-cyber-magenta font-bold">Submission window closed</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
          <div className="border-2 border-cyber-cyan shadow-[0_0_15px_#00ffff] p-6 md:p-8 bg-black/50 rounded">
            <h2 className="text-cyber-magenta mb-4 text-shadow-[0_0_10px_#ff00ff] text-xl md:text-2xl">
              GitHub Profile
            </h2>

            {loadingGithub ? (
              <p className="text-gray-400">Loading GitHub profile...</p>
            ) : githubData ? (
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={githubData.avatar_url}
                  alt="GitHub Avatar"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-cyber-cyan shadow-[0_0_10px_#00ffff]"
                />
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-bold text-cyber-cyan mb-2">
                    {githubData.name || githubData.login}
                  </p>
                  <p className="text-gray-300 mb-2 text-sm md:text-base">
                    {githubData.bio || "No bio available"}
                  </p>
                  <p className="text-cyber-green font-bold text-sm md:text-base">
                    Followers: {githubData.followers}
                  </p>
                  <a
                    href={githubData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-green mt-1 inline-block"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No GitHub preview available. Set a GitHub username in localStorage with key <code>githubUser</code>.</p>
            )}
          </div>

          <div className="border-2 border-cyber-cyan shadow-[0_0_15px_#00ffff] p-6 md:p-8 bg-black/50 rounded">
            <h2 className="text-cyber-magenta mb-4 text-shadow-[0_0_10px_#ff00ff] text-xl md:text-2xl">
              Welcome, {user?.name || "participant"}!
            </h2>

            <div className="my-4 p-4 bg-cyber-cyan/10 border border-cyber-cyan">
              {loadingSubmission ? (
                <p className="text-lg">Loading submission...</p>
              ) : submission ? (
                <div>
                  <p className="text-lg mb-2">
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        submission.status === "draft"
                          ? "text-cyber-yellow text-shadow-[0_0_10px_#ffff00]"
                          : "text-cyber-green text-shadow-[0_0_10px_#00ff00]"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </p>
                  {submission.status === "submitted" && submission.score !== null && (
                    <p className="text-cyber-magenta text-xl md:text-2xl font-bold text-shadow-[0_0_10px_#ff00ff]">
                      Score: {submission.score}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-lg">No submission yet</p>
              )}
            </div>

            <Button variant="primary" onClick={() => navigate("/submission")}>
              {submission ? "Update Submission" : "Fill Submission"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default DashboardParticipant;
