import { useEffect, useState } from "react";
import "./App.css";
import myAvatar from "./assets/tushar.jpg"; // assets ফোল্ডারের ভেতরের ফাইলের নাম

// Use environment variable for API base URL with localhost fallback
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper to safely parse JSON and handle non-OK responses
async function parseResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || res.statusText || `Request failed (${res.status})`);
  }
  // Try to parse JSON, but return null if no JSON body
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return null;
}

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    // profile
    fetch(`${API_BASE}/api/profile`)
      .then((res) => parseResponse(res))
      .then((data) => setProfile(data))
      .catch((err) => console.error("Profile error:", err));

    // skills
    fetch(`${API_BASE}/api/skills`)
      .then((res) => parseResponse(res))
      .then((data) => setSkills(data || []))
      .catch((err) => console.error("Skills error:", err));

    // projects
    fetch(`${API_BASE}/api/projects`)
      .then((res) => parseResponse(res))
      .then((data) => {
        console.log("Projects from backend:", data);
        setProjects(data || []);
      })
      .catch((err) => console.error("Projects error:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => parseResponse(res))
      .then(() => {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("Contact error:", err);
        setStatus("Error sending message");
      });
  };

  return (
    <div className="app-root">
      {/* HERO / PROFILE */}
      {profile && (
        <header
          className="section-card"
          style={{ display: "flex", gap: "1.5rem" }}
        >
          {/* লোকাল ছবি – আর কোনো URL দরকার নেই */}
          <img
            src={myAvatar}
            alt={profile.name}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "999px",
              objectFit: "cover",
              border: "3px solid #38bdf8",
            }}
          />

          <div>
            <h1 className="hero-name">{profile.name}</h1>
            <h2 className="hero-title">{profile.title}</h2>
            <p className="hero-bio">{profile.bio}</p>
            <p className="hero-location">{profile.location}</p>

            <div className="social-links">
              {profile.social?.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              )}
              {profile.social?.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {profile.social?.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {profile.social?.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              )}
              {profile.social?.whatsapp && (
                <a
                  href={profile.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </header>
      )}
      {/* SKILLS */}
      <section className="section-card">
        <h2 className="section-title">Skills</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill._id}>{skill.name}</li>
          ))}
        </ul>
      </section>

      {/* PROJECTS */}
      <section className="section-card">
        <h2 className="section-title">Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <strong>{project.title}</strong> - {project.description}
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section className="section-card">
        <h2 className="section-title">Contact</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label>Message: </label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          </div>
          <button type="submit">Send</button>
        </form>
        {status && <p className="status-text">{status}</p>}
      </section>
    </div>
  );
}

export default App;