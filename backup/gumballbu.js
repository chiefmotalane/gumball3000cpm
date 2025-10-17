/* ====== NAV MOBILE ====== */
const nav = document.querySelector('.navbar');
document.querySelector('.nav-toggle').addEventListener('click', () => {
  nav.classList.toggle('open');
});

/* ====== COUNTDOWNS ====== */
// 1) Navbar F1 next race (center)
const raceNameEl = document.getElementById('raceName');
const raceCountdownEl = document.getElementById('raceCountdown');

// Next race datetime:
const nextRace = {
  name: 'Gumball3000',
// countdown
  when: '2025-10-26T20:30:00'
};
raceNameEl.textContent = `Next: ${nextRace.name}`;
startCountdown(new Date(nextRace.when).getTime(), raceCountdownEl);

//Drop countdown
const dropDate = '2025-09-12T18:00:00'; // droping time
startCountdown(new Date(dropDate).getTime(), document.getElementById('dropCountdown'));

function startCountdown(targetMs, el) {
  const tick = setInterval(() => {
    const now = Date.now();
    const diff = targetMs - now;
    if (diff <= 0) { clearInterval(tick); el.textContent = 'LAUNCHED'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

// Events cards
const strip = document.getElementById('eventStrip');
let autoScroll;
function startAutoScroll() {
  stopAutoScroll();
  autoScroll = setInterval(() => {
    strip.scrollBy({ left: 300, behavior: 'smooth' });
    // loop back when near end
    if (strip.scrollLeft + strip.clientWidth + 10 >= strip.scrollWidth) {
      strip.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 2000); // 2 sec
}
function stopAutoScroll(){ if (autoScroll) clearInterval(autoScroll); }
startAutoScroll();

// pause when user interacts
['pointerdown','wheel','touchstart','mouseenter','focusin'].forEach(evt => {
  strip.addEventListener(evt, stopAutoScroll, { passive: true });
});
['mouseleave','touchend','focusout'].forEach(evt => {
  strip.addEventListener(evt, startAutoScroll, { passive: true });
});


// Learn More button redirects
document.querySelectorAll('.learn-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.previousElementSibling.textContent.trim();

    if (title === 'Apply') {
      window.location.href = 'application.html';
    } else if (title === 'Collaboration') {
      window.location.href = 'collaboration.html';
    } else if (title === 'Meet the team') {
      window.location.href = 'team.html';
    } else {
      alert(`Details coming soon for ${title}`);
    }
  });
});


// Fade-in sections on scroll
const faders = document.querySelectorAll('.about-section');
const options = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(section => {
  section.classList.add('fade');
  appearOnScroll.observe(section);
});
//about gumball3000 cpm
document.addEventListener("DOMContentLoaded", () => {
  const aboutContent = document.querySelector(".about-content");
  aboutContent.style.opacity = "0";
  aboutContent.style.transform = "translateY(30px)";
  setTimeout(() => {
    aboutContent.style.transition = "all 0.8s ease";
    aboutContent.style.opacity = "1";
    aboutContent.style.transform = "translateY(0)";
  }, 200);
});

