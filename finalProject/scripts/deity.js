const deity_card = document.getElementById('deityCard');
const deity_name = document.getElementById('deityName');
const bio = document.getElementById('deityBio');
const pantheon = document.getElementById('deityPantheon');
const deity_bg = document.getElementById('deityBg');

export async function loadDeities() {
  try {
    const res = await fetch('data/deities.json');
    const list = await res.json();
    return list;
  } catch (err) {
    console.error('Failed to load deities', err);
    return [];
  }
}

export function pickDailyDeity(list) {
  if (!list.length) return null;

  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) { hash = (hash * 31 + today.charCodeAt(i)) & 0xffffffff; }
  return list[Math.abs(hash) % list.length];
}

export function renderDeity(d) {
  if (!d) {
    deity_name.textContent = 'No deity found';
    bio.textContent = 'Try refreshing or check data file.';
    pantheon.textContent = '';
    return;
  }

  deity_name.textContent = d.name;
  bio.textContent = d.short;
  pantheon.textContent = d.pantheon;

  if (d.img) {
    deity_bg.style.backgroundImage = `url(${d.img})`;
  }
}