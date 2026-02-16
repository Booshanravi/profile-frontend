import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";

function ProfilePage() {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [editBasic, setEditBasic] = useState(false);

  // NEW STATES (only additions)
  const [editCareer, setEditCareer] = useState(false);
  const [editExpId, setEditExpId] = useState(null);
  const [editEduId, setEditEduId] = useState(null);
  const [editCertId, setEditCertId] = useState(null);
  const [editSocialId, setEditSocialId] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

 const fetchProfile = async () => {
    console.log(import.meta.env.VITE_API_BASE_URL);
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/profile/full/1`
  );
  setData(res.data);
  setTheme(res.data.profile.theme);
};

  const endorseSkill = async (id) => {
    await axios.post(
      `http://localhost:5000/api/profile/skills/${id}/endorse`
    );
    fetchProfile();
  };

  const saveBasic = async () => {
    await axios.put(
      "http://localhost:5000/api/profile/1",
      data.profile
    );
    setEditBasic(false);
    fetchProfile();
  };

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="wrapper">

      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">Gidy</div>

          <div className="nav-links">
            <span>Jobs</span>
            <span>Hackathons</span>
            <span>Projects</span>
            <span>Tasks</span>
            <span>Organization</span>
          </div>
        </div>

        <div className="nav-right">

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="profile-button">
            <img
              src={
                data?.profile?.profilepic ||
                "https://i.pravatar.cc/100"
              }
              alt="profile"
            />
            <span className="arrow">▼</span>
          </div>

        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="hero-card">
        <div className="hero-left">
          <img
  src={
    data.profile.profilepic?.startsWith("/uploads")
      ? "http://localhost:5000" + data.profile.profilepic
      : data.profile.profilepic
  }
  alt="profile"
  className="profile-img"
/>

<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilepic", file);

   await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/profile/upload/1`,
  formData
);

    fetchProfile(); // reload profile after upload
  }}
/>


          <div>
            {editBasic ? (
              <>
                <input
                  value={data.profile.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, name: e.target.value }
                    })
                  }
                />
                <input
                  value={data.profile.role}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, role: e.target.value }
                    })
                  }
                />
                <input
                  value={data.profile.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, location: e.target.value }
                    })
                  }
                />
                <textarea
                  value={data.profile.bio}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, bio: e.target.value }
                    })
                  }
                />
                <input
                  value={data.profile.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, email: e.target.value }
                    })
                  }
                />
                <button onClick={saveBasic}>Save</button>
              </>
            ) : (
              <>
                <h2>{data.profile.name}</h2>
                <p className="role">{data.profile.role}</p>
                <p className="location">{data.profile.location}</p>
                <p className="bio">{data.profile.bio}</p>
                <p className="email">{data.profile.email}</p>
                <button onClick={() => setEditBasic(true)}>✏️ Edit</button>
              </>
            )}
          </div>
        </div>

        <div className="league-box">
          <h4>League</h4>
          <p>{data.profile.league}</p>
          <h4>Rank</h4>
          <p>{data.profile.rank}</p>
          <h4>Points</h4>
          <p>{data.profile.points}</p>
        </div>
      </div>

      {/* ================= CAREER VISION ================= */}
      <div className="career-card">
        {editCareer ? (
          <>
            <input
              value={data.careerVision.career_title}
              onChange={(e) =>
                setData({
                  ...data,
                  careerVision: {
                    ...data.careerVision,
                    career_title: e.target.value
                  }
                })
              }
            />
            <button onClick={() => setEditCareer(false)}>Save</button>
          </>
        ) : (
          <>
            <h3 className="career-subtitle">You're Career Vision</h3>
            <h2 className="career-title">
              {data.careerVision?.career_title}
            </h2>
            <div className="vision-grid">
              <div>
                <h4>What you're growing into right now</h4>
                <p>{data.careerVision?.growth_stage}</p>
              </div>
              <div>
                <h4>The space you want to grow in</h4>
                <p>{data.careerVision?.growth_space}</p>
              </div>
              <div>
                <h4>Inspired by</h4>
                <p>{data.careerVision?.inspired_by}</p>
              </div>
            </div>
            <button onClick={() => setEditCareer(true)}>✏️ Edit</button>
          </>
        )}
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="main-grid">

        <div className="left-column">

          <div className="card">
            <h3>Skills</h3>
            {data.skills.map((skill) => (
              <button
                key={skill.id}
                className="skill-btn"
                onClick={() => endorseSkill(skill.id)}
              >
                {skill.skill_name} ⭐ {skill.endorsement_count}
              </button>
            ))}
          </div>

          <div className="card">
            <h3>Social Links</h3>
            {data.socialLinks.map((link) => (
              <div key={link.id}>
                {editSocialId === link.id ? (
                  <>
                    <input
                      value={link.url}
                      onChange={(e) =>
                        setData({
                          ...data,
                          socialLinks: data.socialLinks.map((l) =>
                            l.id === link.id
                              ? { ...l, url: e.target.value }
                              : l
                          )
                        })
                      }
                    />
                    <button onClick={() => setEditSocialId(null)}>Save</button>
                  </>
                ) : (
                  <>
                    <a href={link.url}>{link.platform}</a>
                    <button onClick={() => setEditSocialId(link.id)}>✏️</button>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>

        <div className="right-column">

          <div className="card">
            <h3>Experience</h3>
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                {editExpId === exp.id ? (
                  <>
                    <input value={exp.title} />
                    <button onClick={() => setEditExpId(null)}>Save</button>
                  </>
                ) : (
                  <>
                    <h4>{exp.title}</h4>
                    <p>{exp.company}</p>
                    <p>{exp.description}</p>
                    <button onClick={() => setEditExpId(exp.id)}>✏️</button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Education</h3>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h4>{edu.degree}</h4>
                <p>{edu.institution}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Certifications</h3>
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;
