import api from "./http";


export async function getMySubmission() {
  const res = await api.get("/submissions/me");
  return res.data;
}

export async function saveSubmission(data) {
  const res = await api.post("/submissions", data);
  return res.data;
}


export async function submitFinal() {
  const res = await api.post("/submissions/submit", {});
  return res.data;
}


export async function getPublicSubmissions() {
  const res = await api.get("/submissions/public");
  return res.data;
}


export async function getAllSubmissions() {
  const res = await api.get("/admin/submissions");
  return res.data;
}


export async function setScore(id, score) {
  const res = await api.patch(`/admin/submissions/${id}/score`, { score });
  return res.data;
}
