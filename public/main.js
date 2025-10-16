// main.js (client)
const carsCatalog = {
  'tourbillon': {
    title: 'Tourbillon',
    hero: '/assets/cars/tourbillon.jpg',
    description: 'Tourbillon — an exclusive hypercar for CPM Gumball3000.',
    gallery: ['/assets/cars/tourbillon.jpg']
  }
  // add entries here or fetch from Supabase
};

function qs(name) {
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  const slug = qs('slug');
  if (slug && document.getElementById('carDetail')) {
    const car = carsCatalog[slug];
    if (!car) { document.getElementById('carDetail').innerHTML = '<h2>Not found</h2>'; return; }
    document.getElementById('carDetail').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 420px;gap:24px">
        <div>
          <img src="${car.hero}" style="width:100%;height:420px;object-fit:cover;border-radius:12px" alt="${car.title}">
          <h2 style="margin-top:12px">${car.title}</h2>
          <p class="small">${car.description}</p>
        </div>
        <aside class="panel">
          <h3>Quick actions</h3>
          <p class="small">Want this car for the event? <a href="/apply.html">Apply for a spot</a> and request this number/design.</p>
          <button class="btn primary" onclick="location.href='/apply.html?prefer=${encodeURIComponent(car.title)}'">Apply for this car</button>
        </aside>
      </div>
    `;
  }
});
