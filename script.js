// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

function updateThemeButton(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Projects Data from GitHub API
const projects = [
  {
    name: 'CyberStrike Infinity',
    description: 'AAA-Quality Single-Player Cyberpunk Shooter mit Three.js. Open World, Story Mode, Multiplayer-Ready Architektur.',
    language: 'JavaScript',
    repo: 'CyberStrike-Infinity',
    link: 'https://github.com/HalilMese/CyberStrike-Infinity',
    icon: '🎮',
    tags: ['Game', 'Three.js', 'WebGL'],
    category: 'game'
  },
  {
    name: 'HIM Cyber Dashboard',
    description: 'Futuristisches Cybersecurity Dashboard mit Terminal-Design, Live-Statistiken und AI-Chat System.',
    language: 'JavaScript',
    repo: 'HIM-Cyber-Dashboard',
    link: 'https://github.com/HalilMese/HIM-Cyber-Dashboard',
    icon: '🛡️',
    tags: ['Dashboard', 'UI', 'Security'],
    category: 'web'
  },
  {
    name: 'Wetter Website',
    description: 'Echtzeit-Wetter-App mit OpenWeather API Integration. 50+ Städte, Vorhersage und Favoriten.',
    language: 'JavaScript',
    repo: 'Wetter-Website',
    link: 'https://github.com/HalilMese/Wetter-Website',
    icon: '🌦️',
    tags: ['Web App', 'API', 'Charts'],
    category: 'web'
  },
  {
    name: 'To-Do App',
    description: 'Moderne Task-Management App mit Kategorien, Prioritäten, Cloud-Sync und Export-Funktion.',
    language: 'JavaScript',
    repo: 'To-Do-App',
    link: 'https://github.com/HalilMese/To-Do-App',
    icon: '✅',
    tags: ['Productivity', 'LocalStorage', 'UI'],
    category: 'web'
  },
  {
    name: 'PC Builder',
    description: 'Gaming PC Konfigurator mit Real-Time Preisen, Kompatibilitäts-Checker und Benchmark-Vergleich.',
    language: 'JavaScript',
    repo: 'PC-BUILDER-HARDWARE-WEBSITE',
    link: 'https://github.com/HalilMese/PC-BUILDER-HARDWARE-WEBSITE',
    icon: '🖥️',
    tags: ['Tool', 'Hardware', 'Calculator'],
    category: 'tool'
  },
  {
    name: 'Passwort Generator',
    description: 'Advanced Security Tool mit Strength-Indicator, Passwort-Historie und Batch-Generation.',
    language: 'JavaScript',
    repo: 'Passwort-Generator',
    link: 'https://github.com/HalilMese/Passwort-Generator',
    icon: '🔐',
    tags: ['Security', 'Tool', 'Encryption'],
    category: 'tool'
  }
];

// Load Projects
function loadProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = '';

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  filtered.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="project-header">${project.icon}</div>
      <div class="project-content">
        <h3>${project.name}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-meta">
          <span class="project-lang">${project.language}</span>
          <span class="project-stars">⭐ Open Source</span>
        </div>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
            GitHub →
          </a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// Filter Projects
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadProjects(btn.dataset.filter);
  });
});

// Initial Load
loadProjects();

// Smooth Scroll Active Link
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Accessibility: Skip to content
const skipLink = document.createElement('a');
skipLink.href = '#projects';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.prepend(skipLink);

console.log('Portfolio Portfolio geladen - Willkommen! 👋');