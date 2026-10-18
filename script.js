const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('is-open');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const picker = document.querySelector('#whatsapp-picker');
let preparedMessage = '';
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const service = form.get('service');
  const details = form.get('message').trim();
  preparedMessage = `Hello N.P Pomboo! My name is ${name}. I'm interested in: ${service}.${details ? ` ${details}` : ''}`;
  picker.hidden = false;
  document.body.style.overflow = 'hidden';
  picker.querySelector('.picker-close').focus();
});

picker.querySelectorAll('[data-phone]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const phone = link.dataset.phone;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(preparedMessage)}`, '_blank', 'noopener,noreferrer');
  });
});

function closePicker() {
  picker.hidden = true;
  document.body.style.overflow = '';
}
picker.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', closePicker));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !picker.hidden) closePicker();
});
