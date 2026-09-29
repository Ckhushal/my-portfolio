import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name: letters and spaces only
    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) return;
    }

    // Phone: numbers only, maximum 10 digits
    if (name === "phone") {
      if (!/^[0-9]*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    if (!/^[A-Za-z ]{2,50}$/.test(formData.name.trim())) {
      setStatus("Please enter a valid name using letters only.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setStatus("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("Please enter a meaningful message.");
      return;
    }

    setStatus("Sending...");

    try {
      const formBody = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      if (response.ok) {
        setStatus("Message sent successfully! Thank you.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Unable to send message. Please try again later.");
    }
  };

  const projects = [
    {
      title: "Movie Rating Analysis",
      category: "Python • Data Analysis",
      description:
        "A Python-based project for analyzing movie ratings, identifying patterns, and generating useful insights from movie datasets.",
    },
    {
      title: "Fake News Detection",
      category: "Python • NLP • Machine Learning",
      description:
        "A machine learning project that analyzes news content and predicts whether a news article is likely to be fake or real.",
    },
    {
      title: "Raj Photography Website",
      category: "React • Web Development",
      description:
        "A responsive photography portfolio website designed to showcase photography services, gallery work, and contact information.",
    },
    {
      title: "Aqualime Website",
      category: "HTML • CSS • JavaScript",
      description:
        "A modern product website created for Aqualime with a clean interface, responsive design, and customer contact functionality.",
    },
  ];

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            CK<span>.</span>
          </a>

          <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>
              Skills
            </a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>
              Projects
            </a>
            <a href="#journey" onClick={() => setMenuOpen(false)}>
              Journey
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="nav-btn"
            onClick={() => setMenuOpen(false)}
          >
            Let's Talk
          </a>

          <button
            type="button"
            className={menuOpen ? "menu-toggle active" : "menu-toggle"}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">WELCOME TO MY PORTFOLIO</p>

              <h1>
                Hi, I'm <span>Chauhan Khushal</span>
              </h1>

              <h2>Computer Engineering Student & Developer</h2>

              <p className="hero-text">
                I believe in <strong>Build Dreams</strong> — learning
                technology, building practical projects, and continuously
                improving my skills to become a professional Computer Engineer.
              </p>

              <div className="hero-buttons">
                <a href="#projects" className="primary-btn">
                  View My Projects →
                </a>

                <a href="#contact" className="secondary-btn">
                  Contact Me
                </a>
              </div>

              <div className="hero-location">📍 Jamnagar, Gujarat, India</div>
            </div>

            <div className="hero-card">
              <div className="code-header">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="code-body">
                <p>
                  <span className="purple">const</span> developer = {"{"}
                </p>

                <p className="indent">
                  name: <span className="green">"Khushal"</span>,
                </p>

                <p className="indent">
                  field: <span className="green">"Computer Engineering"</span>,
                </p>

                <p className="indent">
                  passion: <span className="green">"Technology"</span>,
                </p>

                <p className="indent">
                  goal: <span className="green">"Build Dreams"</span>
                </p>

                <p>{"}"}</p>

                <p className="code-comment">// Learn • Build • Improve</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-heading">
              <span>01</span>
              <h2>About Me</h2>
              <p>
                A Computer Engineering student focused on practical development
                and continuous learning.
              </p>
            </div>

            <div className="about-grid">
              <div className="profile-placeholder">
                <div className="profile-circle">KC</div>
                <p>Photo Coming Soon</p>
              </div>

              <div className="about-content">
                <h3>Building skills today for the technology of tomorrow.</h3>

                <p>
                  I'm <strong>Chauhan Khushal</strong>, a Computer Engineering
                  student from Jamnagar. I enjoy working with programming, web
                  development, databases and Python-based projects.
                </p>

                <p>
                  My goal is to gain practical industry experience, create
                  useful projects and grow into a professional Computer
                  Engineer.
                </p>

                <div className="about-info">
                  <div>
                    <span>Education</span>
                    <strong>BE Computer Engineering</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>Jamnagar, Gujarat</strong>
                  </div>

                  <div>
                    <span>Focus</span>
                    <strong>Development & Technology</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>Open to Opportunities</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section dark-section">
          <div className="container">
            <div className="section-heading">
              <span>02</span>
              <h2>Technical Skills</h2>
              <p>
                Technologies and tools I use while learning and building
                projects.
              </p>
            </div>

            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">01</div>
                <h3>Programming</h3>
                <div className="tags">
                  <span>C</span>
                  <span>C++</span>
                  <span>Java</span>
                  <span>Python</span>
                  <span>JavaScript</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">02</div>
                <h3>Web Development</h3>
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>React</span>
                  <span>Vite</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">03</div>
                <h3>Database & Data</h3>
                <div className="tags">
                  <span>DBMS</span>
                  <span>SQL</span>
                  <span>Pandas</span>
                  <span>Data Analysis</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">04</div>
                <h3>Tools</h3>
                <div className="tags">
                  <span>VS Code</span>
                  <span>Git</span>
                  <span>GitHub</span>
                  <span>Netlify</span>
                  <span>Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-heading">
              <span>03</span>
              <h2>Featured Projects</h2>
              <p>Some of the academic and practical projects I've worked on.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={index}>
                  <div className="project-number">0{index + 1}</div>

                  <div className="project-visual">
                    <span>{project.title}</span>
                  </div>

                  <div className="project-content">
                    <small>{project.category}</small>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-links">
                      <a href="#contact">Discuss Project →</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="section dark-section">
          <div className="container">
            <div className="section-heading">
              <span>04</span>
              <h2>My Journey</h2>
              <p>My education and practical learning journey.</p>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>

                <div className="timeline-content">
                  <span>Current</span>
                  <h3>BE Computer Engineering</h3>
                  <p>
                    Currently pursuing Bachelor of Engineering in Computer
                    Engineering and developing practical technical skills.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>

                <div className="timeline-content">
                  <span>Completed</span>
                  <h3>Diploma in Computer Engineering</h3>
                  <p>
                    Completed Diploma in Computer Engineering with foundations
                    in programming, databases, web technologies and computer
                    systems.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>

                <div className="timeline-content">
                  <span>Practical Learning</span>
                  <h3>Computer Hardware & Software</h3>
                  <p>
                    Gaining practical understanding of computer hardware,
                    software and real-world technical environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-heading">
              <span>05</span>
              <h2>What I Can Do</h2>
              <p>Areas where I can use my current technical skills.</p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <span>01</span>
                <h3>Website Development</h3>
                <p>
                  Responsive and modern websites using HTML, CSS, JavaScript and
                  React.
                </p>
              </div>

              <div className="service-card">
                <span>02</span>
                <h3>React Development</h3>
                <p>
                  Component-based websites and interactive user interfaces using
                  React and Vite.
                </p>
              </div>

              <div className="service-card">
                <span>03</span>
                <h3>Python & Data Analysis</h3>
                <p>
                  Python-based data analysis, visualization and beginner-level
                  machine learning projects.
                </p>
              </div>

              <div className="service-card">
                <span>04</span>
                <h3>Database & SQL</h3>
                <p>
                  Basic database design, SQL queries and DBMS-related
                  development work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="section-heading">
              <span>06</span>
              <h2>Let's Build Something</h2>
              <p>Have a project, opportunity or idea? Send me a message.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <h3>Get in touch</h3>

                <p>
                  I'm open to internships, freelance projects, collaborations
                  and opportunities related to Computer Engineering and web
                  development.
                </p>

                <div className="contact-item">
                  <span>Email</span>
                  <a href="mailto:chauhankhushal026@gmail.com">
                    chauhankhushal026@gmail.com
                  </a>
                </div>

                <div className="contact-item">
                  <span>Phone</span>
                  <a href="tel:7567561342">+91 7567561342</a>
                </div>

                <div className="contact-item">
                  <span>Location</span>
                  <strong>Jamnagar, Gujarat, India</strong>
                </div>
              </div>

              <form
                className="contact-form"
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Required by Netlify */}
                <input type="hidden" name="form-name" value="contact" />

                <input type="hidden" name="bot-field" />

                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="numeric"
                      maxLength="10"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {status && (
                  <div
                    className={
                      status.includes("successfully")
                        ? "form-status success"
                        : "form-status"
                    }
                  >
                    {status}
                  </div>
                )}

                <button type="submit" className="submit-btn">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container cta-box">
            <div>
              <span>BUILD DREAMS.</span>
              <h2>Let's create something useful together.</h2>
            </div>

            <a href="#contact" className="primary-btn">
              Start a Conversation →
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a href="#home" className="logo">
              KC<span>.</span>
            </a>
            <p>Build Dreams • Learn • Create • Improve</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <p className="copyright">
            © {new Date().getFullYear()} Chauhan Khushal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
