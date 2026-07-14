 // Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger) ;
gsap.registerPlugin(SplitText);
let split = SplitText.create(".missionPara",{
  type: "lines"
});

gsap.from(split.lines, {
  scrollTrigger: {
    trigger: ".missionPara",
    toggleActions : "restart pause resume play"
  },
  y:100,
  autoAlpha:0,
  stagger:0.08
})

gsap.utils.toArray(".panel").forEach((panel, i)=>{
ScrollTrigger.create({
trigger: panel,
start: "left left",
end: "right left",
pin: true,
pinSpacing: false})


})





/* ====== NAV MOBILE ====== */
const nav = document.querySelector('.navbar');
document.querySelector('.nav-toggle').addEventListener('click', () => {
  nav.classList.toggle('open');
});

/* ====== COUNTDOWNS ====== */
// 1) Navbar F1 event (center)
const raceNameEl = document.getElementById('raceName');
const raceCountdownEl = document.getElementById('raceCountdown');

// Next race datetime:
const nextRace = {
  name: 'Gumball3000',
// countdown
  when: '2026-08-05T20:30:00'
};
raceNameEl.textContent = `${nextRace.name}|CPM`;
startCountdown(new Date(nextRace.when).getTime(), raceCountdownEl);

//Drop countdown
const dropDate = '2026-08-05T18:00'; // droping time
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


//cards scrolling
const scrollStrip = document.getElementById("scrollCard");

scrollStrip.innerHTML += scrollStrip.innerHTML;
let scrollSpeed = 3;
let animId;

function animate(){
  scrollStrip.scrollLeft += scrollSpeed;
  if(scrollStrip.scrollLeft > scrollStrip.scrollWidth/2 ){
    scrollStrip.scrollLeft =0;
  }
  animId = requestAnimationFrame(animate)

}

animate();

scrollStrip.addEventListener("mouseenter", () => {
  cancelAnimationFrame(animId);
});

scrollStrip.addEventListener("mouseleave", () =>{
  animate();
});











// Learn More button redirects
document.querySelectorAll('.learn-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.previousElementSibling.textContent.trim();

    if (title === 'Apply') {
      window.location.href = 'applications.html';
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


const overlay = document.getElementById("menuOverlay");

const openBtn = document.getElementById("menu-toggle");

const closeBtn = document.getElementById("close-btn");



openBtn.addEventListener("click", function(){

    overlay.classList.add("open");

    document.body.style.overflow = "hidden";

});



closeBtn.addEventListener("click", function(){

    overlay.classList.remove("open");

    document.body.style.overflow = "";

});



// Close when clicking blurred background

overlay.addEventListener("click", function(e){

    if(e.target === overlay){

        overlay.classList.remove("open");

        document.body.style.overflow = "";

    }

});


/*notification overlay*/

const notification = document.querySelector(".overlay-notification");

setTimeout(() => {
    notification.classList.add("show");
}, 3000);

document.querySelector(".close-notification")
.addEventListener("click", () => {

    notification.classList.remove("show");

});

document.querySelector(".close-notification")
.addEventListener("click", () => {

    notification.classList.remove("show");

});



/* Horizontal Scroll */

const section = document.querySelector(".pj");
const sticky = document.querySelector(".projects-container");
const track = document.querySelector(".project-inner");

function horizontalScroll() {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewport = window.innerHeight;
    const scroll = window.scrollY;

    const maxTranslate =
        track.scrollWidth - window.innerWidth;

    /* ---------------------------------------
       PHASE 1
       Before sticky
    ----------------------------------------*/

    const approachDistance = 300; // px before sticky begins

    let approach =
        (scroll - (sectionTop - approachDistance)) / approachDistance;

    approach = Math.max(0, Math.min(approach, 1));

    // Move only 10% before sticky
    const approachMove =
        approach * (maxTranslate * 0.10);

    /* ---------------------------------------
       PHASE 2
       Sticky Horizontal Scroll
    ----------------------------------------*/

    const progress =
        scroll - sectionTop;

    const maxScroll =
        sectionHeight - viewport;

    let percent =
        progress / maxScroll;

    percent = Math.max(0, Math.min(percent, 1));

    // Remaining 90%
    const horizontalMove =
        percent * (maxTranslate * 0.90);

    /* ---------------------------------------
       FINAL
    ----------------------------------------*/

    const move =
        approachMove + horizontalMove;

    track.style.transform =
        `translate3d(${-move}px,0,0)`;

}

window.addEventListener("scroll", horizontalScroll);
window.addEventListener("resize", horizontalScroll);

horizontalScroll();

