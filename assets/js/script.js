const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

function isMobileMenu() {
  return window.matchMedia('(max-width: 980px)').matches;
}

function closeDropdowns(except = null) {
  dropdowns.forEach(dropdown => {
    if (dropdown !== except) {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.dropdown-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    }
  });
}

function closeMobileMenu() {
  if (!nav || !toggle) return;
  nav.classList.remove('active');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  closeDropdowns();
}

if (toggle && nav) {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = nav.classList.toggle('active');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (!isOpen) closeDropdowns();
  });
}

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-toggle');
  if (!button) return;

  button.addEventListener('click', (event) => {
    if (isMobileMenu()) {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }
  });
});

// Close mobile menu after clicking any actual menu link
document.addEventListener('click', (event) => {
  const link = event.target.closest('.nav-links a');
  if (link && !link.classList.contains('dropdown-toggle')) {
    closeMobileMenu();
    return;
  }

  if (!event.target.closest('.dropdown') && !event.target.closest('.menu-toggle')) {
    closeDropdowns();
  }

  if (isMobileMenu() && nav && nav.classList.contains('active')) {
    const clickedOutsideMenu = !event.target.closest('.nav-links') && !event.target.closest('.menu-toggle');
    if (clickedOutsideMenu) closeMobileMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
    closeDropdowns();
  }
});

window.addEventListener('resize', () => {
  if (!isMobileMenu()) {
    if (nav && toggle) {
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
    closeDropdowns();
  }
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('show'));
}

const slides = [
  {
    title: 'Buy Premium Chocolates, Bakes and Desserts',
    text: 'Our creations are shaped by professional expertise, premium ingredients, and true craftsmanship, we craft premium pastries, desserts, chocolates, and confections Handcrafted with precision. Created with purpose.',
    logo: 'assets/images/bumoniis-logo-clean.png',
    brand: 'bumoniis',
    tagTwo: 'In-House Brand',
    link: 'bumoniis.html'
  },
  {
    title: 'Expertise. Craftsmanship. Business Success.',
    text: 'From premium handcrafted products to complete business support, we provide the knowledge, resources, and guidance needed to turn food business ideas into successful ventures.',
    logo: 'assets/images/osunss-logo-clean.png',
    brand: 'osunss',
    tagTwo: 'Business Enablement Solutions',
    link: 'osunss.html'
  },
  {
    title: 'Where Skills Become Businesses',
    text: 'We bring together professional training, commercial facilities, and practical business support to help aspiring bakers move confidently from learning to launching. Learn. Create. Launch. Grow.',
    logo: 'assets/images/sarvathaa-logo-clean.png',
    brand: 'sarvathaa',
    tagTwo: 'Baking Enterpreneur Solutions',
    link: 'sarvathaa.html'
  }
];

const slideTitle = document.getElementById('slideTitle');
if (slideTitle) {
  let slideIndex = 0;
  const slideEyebrow = document.getElementById('slideEyebrow');
  const slideText = document.getElementById('slideText');
  const slideLogo = document.getElementById('slideLogo');
  const slideTagOne = document.getElementById('slideTagOne');
  const slideTagTwo = document.getElementById('slideTagTwo');
  const slidePrimary = document.getElementById('slidePrimary');
  const dots = document.querySelectorAll('.slider-dot');
  const prevArrow = document.querySelector('.slider-prev');
  const nextArrow = document.querySelector('.slider-next');
  let slideTimer;

  function showSlide(index) {
    slideIndex = index;
    const item = slides[index];
    if (slideEyebrow) slideEyebrow.textContent = item.eyebrow;
    slideTitle.textContent = item.title;
    if (slideText) slideText.textContent = item.text;
    if (slideLogo) {
      slideLogo.style.opacity = '0';
      setTimeout(() => {
        slideLogo.src = item.logo;
        slideLogo.alt = item.eyebrow;
        slideLogo.setAttribute('data-brand', item.brand || '');
        slideLogo.onload = () => { slideLogo.style.opacity = '1'; };
        // fallback in case image is cached
        requestAnimationFrame(() => { slideLogo.style.opacity = '1'; });
      }, 90);
    }
    if (slideTagOne) slideTagOne.textContent = item.tagOne;
    if (slideTagTwo) slideTagTwo.textContent = item.tagTwo;
    if (slidePrimary) {
      slidePrimary.href = item.link;
      slidePrimary.textContent = index === 0 ? 'View Full Information' : 'View Full Information';
    }
    dots.forEach(dot => dot.classList.toggle('active', Number(dot.dataset.slide) === index));
  }

  function startSlider() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide((slideIndex + 1) % slides.length), 5200);
  }

  function goNext() {
    showSlide((slideIndex + 1) % slides.length);
    startSlider();
  }

  function goPrev() {
    showSlide((slideIndex - 1 + slides.length) % slides.length);
    startSlider();
  }

  dots.forEach(dot => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  }));

  if (prevArrow) prevArrow.addEventListener('click', goPrev);
  if (nextArrow) nextArrow.addEventListener('click', goNext);

  showSlide(0);
  startSlider();
}

