document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loader = document.querySelector('.site-loader');
  const curtains = document.querySelector('.loader-curtains');
  const centerLine = document.querySelector('.loader-center-line');
  const topbar = document.querySelector('.topbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  window.addEventListener('load', () => {
    body.classList.add('loaded');
    setTimeout(() => loader?.classList.add('hidden'), 450);
    setTimeout(() => curtains?.classList.add('open'), 650);
    setTimeout(() => centerLine?.classList.add('fade'), 950);
  });

  window.addEventListener('scroll', () => {
    if (!topbar) return;
    topbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  mobileToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        nav?.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
});
