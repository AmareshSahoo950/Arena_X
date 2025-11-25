import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getMySubmission,
  saveSubmission,
  submitFinal,
} from "../api/submissionApi";
import Input from "../components/Input";
import Button from "../components/Button";
import CountdownTimer from "../components/CountdownTimer";

const SubmissionFormPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { endTime, isRunning } = useLoaderData();

  const [formData, setFormData] = useState({
    teamName: "",
    projectTitle: "",
    problem: "",
    solution: "",
    techStack: "",
    githubUrl: "",
    demoUrl: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [windowClosed, setWindowClosed] = useState(false);

  const initialClosed =
    !isRunning || !endTime || new Date(endTime).getTime() <= Date.now();

  useEffect(() => {
    setWindowClosed(initialClosed);
  }, [initialClosed]);

  useEffect(() => {
    if (!user) return;

    const loadSubmission = async () => {
      try {
        const existingSubmission = await getMySubmission();

        if (existingSubmission) {
          setIsSubmitted(existingSubmission.status === "submitted");
          setFormData({
            teamName: existingSubmission.teamName || "",
            projectTitle: existingSubmission.projectTitle || "",
            problem: existingSubmission.problem || "",
            solution: existingSubmission.solution || "",
            techStack: (existingSubmission.techStack || []).join(", "),
            githubUrl: existingSubmission.githubUrl || "",
            demoUrl: existingSubmission.demoUrl || "",
          });
        }
      } catch (err) {
        console.error("Error loading submission:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSubmission();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveDraft = async () => {
    if (windowClosed) {
      alert("Submission time is over.");
      return;
    }

    try {
      await saveSubmission({
        teamName: formData.teamName,
        projectTitle: formData.projectTitle,
        problem: formData.problem,
        solution: formData.solution,
        techStack: formData.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
      });
      alert("Draft saved!");
    } catch (err) {
      console.error("Error saving draft:", err);
      alert(err?.response?.data?.message || "Error saving draft.");
    }
  };

  const handleSubmitFinal = async () => {
    if (windowClosed) {
      alert("Submission time is over.");
      return;
    }

    if (
      !formData.teamName ||
      !formData.projectTitle ||
      !formData.problem ||
      !formData.solution ||
      !formData.techStack ||
      !formData.githubUrl
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await saveSubmission({
        teamName: formData.teamName,
        projectTitle: formData.projectTitle,
        problem: formData.problem,
        solution: formData.solution,
        techStack: formData.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
      });

      await submitFinal();

      setIsSubmitted(true);
      alert("Submission finalized! You can no longer edit.");
    } catch (err) {
      console.error("Error submitting final:", err);
      alert(err?.response?.data?.message || "Error finalizing submission.");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
        <div className="cyber-container">
          <h1 className="neon-title">SUBMISSION FORM</h1>
          <p className="text-cyber-cyan">Loading your submission...</p>
        </div>
      </div>
    );
  }

  const disableEdits = isSubmitted || windowClosed;

  return (
    <div className="flex-1 py-4 md:py-8 min-h-[calc(100vh-200px)]">
      <div className="cyber-container">
        <h1 className="neon-title">SUBMISSION FORM</h1>

        <div className="mt-4 mb-6">
          <p className="text-cyber-cyan mb-2 font-mono">
            Global Hackathon Timer:
          </p>
          <CountdownTimer
            endTime={endTime}
            onExpire={() => setWindowClosed(true)}
          />
          {windowClosed && (
            <p className="mt-3 text-cyber-magenta font-bold">
              Submission window closed
            </p>
          )}
        </div>

        {isSubmitted && (
          <div className="warning-message">
            This submission has been finalized and cannot be edited.
          </div>
        )}

         <form className="max-w-2xl mx-auto">
          <Input
            label="Team Name"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            placeholder="Enter team name"
            required
            disabled={disableEdits}
          />

          <Input
            label="Project Title"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="Enter project title"
            required
            disabled={disableEdits}
          />

          <div className="mb-6">
            <label className="block text-cyber-cyan mb-2 font-bold text-shadow-[0_0_5px_#00ffff]">
              Problem
            </label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Describe the problem you're solving"
              className="w-full px-3 py-3 bg-black/50 border-2 border-cyber-cyan text-cyber-cyan font-mono text-base transition-all duration-300 shadow-[0_0_5px_#00ffff] focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_15px_#ff00ff] focus:text-cyber-magenta placeholder:text-gray-600 resize-y min-h-[100px]"
              rows="4"
              required
              disabled={disableEdits}
            />
          </div>

          <div className="mb-6">
            <label className="block text-cyber-cyan mb-2 font-bold text-shadow-[0_0_5px_#00ffff]">
              Solution
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Describe your solution"
              className="w-full px-3 py-3 bg-black/50 border-2 border-cyber-cyan text-cyber-cyan font-mono text-base transition-all duration-300 shadow-[0_0_5px_#00ffff] focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_15px_#ff00ff] focus:text-cyber-magenta placeholder:text-gray-600 resize-y min-h-[100px]"
              rows="4"
              required
              disabled={disableEdits}
            />
          </div>

          <Input
            label="Tech Stack (comma separated)"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            disabled={disableEdits}
            required
          />

          <Input
            label="GitHub URL"
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            disabled={disableEdits}
            required
          />

          <Input
            label="Demo URL"
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="https://demo.example.com"
            disabled={disableEdits}
          />

          <div className="flex gap-4 justify-center flex-wrap mt-6 md:mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={disableEdits}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleSubmitFinal}
              disabled={disableEdits}
            >
              Submit Final
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionFormPage;
