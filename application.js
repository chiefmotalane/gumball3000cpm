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

// Application form handling
// Initialize Supabase
const SUPABASE_URL = "https://ejynjytdplielykzcntv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeW5qeXRkcGxpZWx5a3pjbnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTU5NjMsImV4cCI6MjA3Mzg5MTk2M30.JcJSTSO4Cv53O7gpSLpOd3WsDuvANiLoVdBx1-dEuMY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("applicationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const instagram = document.getElementById("instagram").value.trim();
  const car = document.getElementById("car").value.trim();
  const color = document.getElementById("color").value.trim();
  const number = parseInt(document.getElementById("number").value.trim());
  const agreed = document.getElementById("agreement").checked;

  // Validation
  if (!agreed) {
    message.textContent = "Please agree to the terms before applying.";
    message.style.color = "red";
    return;
  }

  if (number === 1 || number === 63) {
    message.textContent = "Number 1 and 63 are not available. Choose another.";
    message.style.color = "red";
    return;
  }

  // Check if number already exists
  const { data: existing, error: checkError } = await supabase
    .from("applications")
    .select("car_number")
    .eq("car_number", number);

  if (existing && existing.length > 0) {
    message.textContent = "That number is already taken. Please choose another.";
    message.style.color = "red";
    return;
  }

  const confirmation_code = `TEAM#${number}`;

  // Insert new record
  const { data, error } = await supabase
    .from("applications")
    .insert([
      { instagram, car_name: car, color, car_number: number, confirmation_code, agreed }
    ]);

  if (error) {
    console.error(error);
    message.textContent = "Error submitting application. Try again.";
    message.style.color = "red";
  } else {
    message.style.color = "#00ff7f";
    message.innerHTML = `
      ✅ Application submitted successfully!<br>
      Your confirmation: <strong>${confirmation_code}</strong><br>
      Send your car picture with number to <strong>@cpmnews</strong>.
    `;
    form.reset();
  }
});
