// ============ تاریخ آخرین به‌روزرسانی ============
document.getElementById('lastUpdate').textContent =
  new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

// ============ تم تاریک/روشن ============
const root = document.documentElement;
const savedTheme = localStorage.getItem('doc-theme') || 'light';
root.setAttribute('data-theme', savedTheme);

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('doc-theme', next);
});

// ============ اسکرول نرم ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});

// ============ هایلایت منوی فعال با اسکرول ============
const sections = document.querySelectorAll('section[id], article[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));