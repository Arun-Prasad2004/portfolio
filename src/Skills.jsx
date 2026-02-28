import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: 'python/python-original' },
      { name: 'Java', icon: 'java/java-original' },
      { name: 'SQL', icon: 'mysql/mysql-original' },
      { name: 'Git', icon: 'git/git-original' },
    ],
  },
  {
    title: 'AI / ML Frameworks',
    skills: [
      { name: 'PyTorch', icon: 'pytorch/pytorch-original' },
      { name: 'TensorFlow', icon: 'tensorflow/tensorflow-original' },
      {
        name: 'Scikit-learn',
        customIcon:
          'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
      },
      { name: 'LangChain', emoji: '🔗' },
      { name: 'LangGraph', emoji: '📊' },
      { name: 'Generative AI', emoji: '✨' },
      { name: 'Deep Learning', emoji: '🧠' },
      { name: 'NLP', emoji: '💬' },
      { name: 'Agentic AI', emoji: '🤖' },
      { name: 'MCP', emoji: '🔌' },
      { name: 'Data Science', emoji: '📈' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Docker', icon: 'docker/docker-original' },
      { name: 'MongoDB', icon: 'mongodb/mongodb-original' },
      { name: 'React.js', icon: 'react/react-original' },
      { name: 'VS Code', icon: 'vscode/vscode-original' },
      { name: 'Figma', icon: 'figma/figma-original' },
      { name: 'Jupyter', icon: 'jupyter/jupyter-original-wordmark' },
    ],
  },
];

function StaggeredGrid({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`skills-grid ${visible ? 'stagger-visible' : ''}`}>
      {children}
    </div>
  );
}

export const Skills = () => (
  <section className="skills-section" id="skills">
    <h2 className="section-title">
      Technical <span className="gradient-text">Skills</span>
    </h2>
    {skillCategories.map((cat) => (
      <div key={cat.title} className="skill-category">
        <h3 className="category-title">{cat.title}</h3>
        <StaggeredGrid>
          {cat.skills.map((skill, i) => (
            <div className="skill-card-3d" key={skill.name} style={{ '--i': i }}>
              <div className="skill-card-inner">
                <div className="skill-card-glow"></div>
                {skill.emoji ? (
                  <div className="skill-emoji-icon">{skill.emoji}</div>
                ) : (
                  <img
                    src={
                      skill.customIcon ||
                      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`
                    }
                    alt={skill.name}
                    className="skill-icon"
                  />
                )}
                <span className="skill-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </StaggeredGrid>
      </div>
    ))}

    {/* Soft Skills */}
    <div className="soft-skills">
      <h3 className="category-title">Interpersonal Skills</h3>
      <div className="soft-skills-row">
        <span className="soft-skill-tag">Leadership</span>
        <span className="soft-skill-tag">Communication</span>
        <span className="soft-skill-tag">Teamwork & Collaboration</span>
      </div>
    </div>
  </section>
);
