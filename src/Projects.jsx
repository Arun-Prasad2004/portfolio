import { useRef, useCallback } from 'react';
import './Projects.css';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Bail Reckoner',
    description:
      'AI-powered system to automate bail eligibility using IPC, CrPC, and BNS 2023. Engineered SVM models for bail prediction and integrated Phi-3 LLM for auto-generating investigation mind-maps and FIR summaries.',
    technologies: ['Python', 'Phi-3 LLM', 'Scikit-Learn', 'FastAPI', 'React.js'],
    github: 'https://github.com/Arun-Prasad2004/Bail-Reckoner25',
    logo: '/logo.png',
    gradient: 'linear-gradient(135deg, #00d4ff, #0066ff)',
  },
  {
    title: 'CyberGPT',
    description:
      'Built a 46M-parameter GPT-style transformer from scratch on a 250M-token cybersecurity corpus (CVE, CWE, OWASP). Custom BPE tokenizer, mixed-precision GPU training, and fault-tolerant checkpointing.',
    technologies: ['Python', 'PyTorch', 'CUDA', 'Transformers', 'NLP'],
    github: 'https://github.com/Arun-Prasad2004/Cyber-GPT',
    logo: '/logo-cybergpt.svg',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
  },
  {
    title: 'SR-MARE',
    description:
      'Self-Reflective Multi-Agent Research Engine with Planner, Analyst, Critic, Refiner agents. Custom Model Context Protocol (MCP) layer with FAISS-based vector retrieval for grounded response generation.',
    technologies: ['Python', 'Ollama', 'FAISS', 'Custom MCP', 'AsyncIO'],
    github: 'https://github.com/Arun-Prasad2004/Research-Agent',
    logo: '/logo-srmare.svg',
    gradient: 'linear-gradient(135deg, #f97316, #eab308)',
  },
  {
    title: 'ACA – Autonomous Cognitive Agent',
    description:
      'Modular autonomous AI system with continuous self-learning and self-evaluation. Vector-based knowledge retrieval and structured knowledge graph storage for multi-domain intelligence.',
    technologies: ['Python', 'FAISS', 'FastAPI', 'NetworkX', 'Ollama'],
    github: 'https://github.com/Arun-Prasad2004/Autonomous-Cognitive-Agent',
    logo: '/logo-aca.svg',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  );
}

export const Projects = () => (
  <div className="projects-section">
    <h2 className="section-title">
      Featured <span className="gradient-text">Projects</span>
    </h2>
    <div className="projects-timeline">
      {projects.map((project, index) => (
        <div className={`project-row ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
          <div className="project-number-col">
            <span className="project-number" style={{ background: project.gradient }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            {index < projects.length - 1 && <div className="project-connector" />}
          </div>
          <TiltCard className="project-card-3d">
            <div className="project-card-inner">
              <div className="project-card-accent" style={{ background: project.gradient }} />
              <div className="project-card-body">
                <div className="project-header-row">
                  {project.logo ? (
                    <img src={project.logo} alt={project.title} className="project-logo" />
                  ) : (
                    <div className="project-icon-placeholder" style={{ background: project.gradient }}>
                      {project.title
                        .split(/[\s–-]+/)
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
              </div>
            </div>
          </TiltCard>
        </div>
      ))}
    </div>
  </div>
);
