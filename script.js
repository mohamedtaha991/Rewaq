const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

const heroFrames = document.querySelectorAll('.hero-frame');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');

if (heroFrames.length > 0) {
  let activeSlide = 0;

  const showSlide = (index) => {
    activeSlide = (index + heroFrames.length) % heroFrames.length;
    heroFrames.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === activeSlide);
    });
  };

  heroPrev?.addEventListener('click', () => showSlide(activeSlide - 1));
  heroNext?.addEventListener('click', () => showSlide(activeSlide + 1));

  setInterval(() => {
    showSlide(activeSlide + 1);
  }, 5200);
}

const revealElements = document.querySelectorAll('.reveal-on-scroll');

if ('IntersectionObserver' in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((item) => revealObserver.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add('is-visible'));
}

const chatbotTrigger = document.getElementById('chatbotTrigger');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotBody = document.getElementById('chatbotBody');

const replyMap = [
  {
    keys: ['خدمة', 'خدمات', 'services'],
    text: 'نقدم التصميم المعماري، الإنشائي، MEP، إدارة المشاريع، والإشراف الهندسي.'
  },
  {
    keys: ['عرض', 'سعر', 'تكلفة', 'quotation'],
    text: 'يمكنك إرسال نطاق المشروع عبر البريد info@rewaqalkhaleeji.sa وسيتواصل الفريق معك خلال 24 ساعة.'
  },
  {
    keys: ['موعد', 'اجتماع', 'زيارة', 'meeting'],
    text: 'ممتاز، اكتب اسم الجهة والمدينة وسننسق معك اجتماعًا تمهيديًا.'
  }
];

function addMessage(text, className) {
  if (!chatbotBody) {
    return;
  }

  const msg = document.createElement('p');
  msg.className = className;
  msg.textContent = text;
  chatbotBody.appendChild(msg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotReply(userText) {
  const normalized = userText.toLowerCase();
  const found = replyMap.find((entry) => entry.keys.some((k) => normalized.includes(k)));

  if (found) {
    return found.text;
  }

  return 'شكرًا لتواصلك. فضلا أرسل نوع المشروع والمدينة، وسنعود لك بتوصية هندسية أولية.';
}

if (chatbotTrigger && chatbot) {
  chatbotTrigger.addEventListener('click', () => {
    chatbot.hidden = false;
  });
}

if (chatbotClose && chatbot) {
  chatbotClose.addEventListener('click', () => {
    chatbot.hidden = true;
  });
}

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = chatbotInput.value.trim();

    if (!text) {
      return;
    }

    addMessage(text, 'user-msg');
    chatbotInput.value = '';

    setTimeout(() => {
      addMessage(getBotReply(text), 'bot-msg');
    }, 350);
  });
}
