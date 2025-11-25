import { useEffect, useState } from "react";
import { getPublicSubmissions } from "../api/submissionApi";

const PublicSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const data = await getPublicSubmissions(); // GET /api/submissions/public
        setSubmissions(data || []);
      } catch (error) {
        console.error("Error loading submissions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubs();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
        <div className="cyber-container">
          <h1 className="neon-title">PUBLIC SUBMISSIONS</h1>
          <p className="text-cyber-cyan">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">PUBLIC SUBMISSIONS</h1>

        {submissions.length === 0 ? (
          <p className="no-data text-center mt-4">No public submissions yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="border-2 border-cyber-cyan shadow-[0_0_15px_#00ffff] p-4 md:p-6 bg-black/50 rounded transition-all duration-300 hover:border-cyber-magenta hover:shadow-[0_0_20px_#ff00ff] hover:-translate-y-1"
              >
                <h3 className="text-cyber-cyan text-xl md:text-2xl mb-4 text-shadow-[0_0_10px_#00ffff]">
                  {submission.projectTitle || "Untitled"}
                </h3>

                <p className="text-cyber-magenta mb-4 font-bold">
                  Team: {submission.teamName || "N/A"}
                </p>

                <p className="text-gray-300 mb-3 leading-relaxed">
                  <strong>Problem:</strong> {submission.problem || "N/A"}
                </p>

                <p className="text-gray-300 mb-3 leading-relaxed">
                  <strong>Solution:</strong> {submission.solution || "N/A"}
                </p>

                <p className="text-gray-300 mb-3 leading-relaxed">
                  <strong>Tech Stack:</strong>{" "}
                  {(submission.techStack || []).join(", ")}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {submission.githubUrl && (
                    <a
                      href={submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-cyber-green no-underline px-4 py-2 border border-cyber-green transition-all duration-300 hover:bg-cyber-green hover:text-black hover:shadow-[0_0_10px_#00ff00]"
                    >
                      GitHub
                    </a>
                  )}
                  {submission.demoUrl && (
                    <a
                      href={submission.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-cyber-green no-underline px-4 py-2 border border-cyber-green transition-all duration-300 hover:bg-cyber-green hover:text-black hover:shadow-[0_0_10px_#00ff00]"
                    >
                      Demo
                    </a>
                  )}
                </div>

                {submission.score !== null && (
                  <p className="text-cyber-magenta text-lg md:text-xl font-bold mt-4 text-shadow-[0_0_10px_#ff00ff]">
                    Score: {submission.score}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSubmissionsPage;
