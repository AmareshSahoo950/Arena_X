const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function timerLoader() {
  const res = await fetch(`${API_BASE_URL}/timer`, {
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Response(text || "Failed to load timer", { status: res.status });
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response from /api/timer:", text.slice(0, 200));
    throw new Response("Server returned non-JSON for /api/timer", {
      status: 500,
    });
  }

  return res.json();
}
