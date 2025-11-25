import { useEffect, useState } from "react";
import { getAllSubmissions, setScore } from "../api/submissionApi";
import { useAuth } from "../context/AuthContext";

const AdminSubmissionsPage = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const data = await getAllSubmissions(); 
        setSubmissions(data || []);

        const initialScores = {};
        (data || []).forEach((s) => {
          initialScores[s._id] = s.score ?? "";
        });
        setScores(initialScores);
      } catch (err) {
        console.error("Error loading admin submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const handleScoreChange = (id, value) => {
    setScores((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveScore = async (id) => {
    const val = Number(scores[id]);
    if (Number.isNaN(val)) {
      alert("Score must be a number");
      return;
    }
    try {
      await setScore(id, val); 
      alert("Score saved");
    } catch (err) {
      console.error("Error saving score:", err);
      alert("Error saving score");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
        <div className="cyber-container">
          <h1 className="neon-title">ADMIN SUBMISSIONS</h1>
          <p className="text-cyber-cyan">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">ADMIN SUBMISSIONS</h1>

        {submissions.length === 0 ? (
          <p className="no-data text-center mt-4">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm md:text-base border-collapse">
              <thead>
                <tr className="border-b border-cyber-cyan">
                  <th className="py-2 pr-2">Team</th>
                  <th className="py-2 pr-2">Project</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 pr-2">User</th>
                  <th className="py-2 pr-2">Score</th>
                  <th className="py-2 pr-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b border-gray-700 hover:bg-black/40"
                  >
                    <td className="py-2 pr-2">{s.teamName}</td>
                    <td className="py-2 pr-2">{s.projectTitle}</td>
                    <td className="py-2 pr-2">{s.status}</td>
                    <td className="py-2 pr-2">
                      {s.user?.name} ({s.user?.email || s.userEmail})
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        className="w-20 px-2 py-1 bg-black/50 border border-cyber-cyan text-cyber-cyan"
                        value={scores[s._id]}
                        onChange={(e) =>
                          handleScoreChange(s._id, e.target.value)
                        }
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <button
                        className="px-3 py-1 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all duration-300"
                        onClick={() => handleSaveScore(s._id)}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubmissionsPage;
