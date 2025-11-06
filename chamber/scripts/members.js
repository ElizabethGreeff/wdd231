const membersArea = document.getElementById('membersArea');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const membershipSelect = document.getElementById('membershipSelect');

let members = [];
let currentView = 'grid';

// --- Get JSON data ---
async function loadMembers() {
    try {
        const res = await fetch('data/members.json');
        const data = await res.json();
        members = data.members || [];
        showMembers();
    } catch (err) {
        membersArea.innerHTML = '<p>Failed to load members.</p>';
        console.error(err);
    }
}

// --- Show members ---
function showMembers() {
    membersArea.innerHTML = '';

    // Filter by membership level
    const filterValue = membershipSelect.value;
    const filtered = filterValue === 'all'
        ? members
        : members.filter(m => m.membership == filterValue);

    // Change layout
    membersArea.className = currentView === 'grid' ? 'members-grid' : 'members-list';

    // If nothing matches
    if (filtered.length === 0) {
        membersArea.innerHTML = '<p>No members found.</p>';
        return;
    }

    // Build each member card
    filtered.forEach(m => {
        const card = document.createElement('article');
        card.className = 'member-card';

        card.innerHTML = `
      <img src="${m.image || 'images/placeholder.jpg'}" 
           alt="${m.name} logo" loading="lazy">
      <div class="member-info">
        <h3>${m.name}</h3>
        <p class="tag">${m.tagline || ''}</p>
        <p>${m.address || ''}</p>
        <p>${m.phone ? `<a href="tel:${m.phone}">${m.phone}</a>` : ''}</p>
        <p>${m.website ? `<a href="${m.website}" target="_blank">${m.website}</a>` : ''}</p>
        <span class="badge ${m.membership == 3 ? 'badge-gold' :
                m.membership == 2 ? 'badge-silver' : 'badge-basic'
            }">
          ${m.membership == 3 ? 'Gold' :
                m.membership == 2 ? 'Silver' : 'Member'
            }
        </span>
      </div>
    `;

        membersArea.appendChild(card);
    });
}

// --- Buttons ---
gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    showMembers();
});

listBtn.addEventListener('click', () => {
    currentView = 'list';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    showMembers();
});

membershipSelect.addEventListener('change', showMembers);

// --- Start ---
document.addEventListener('DOMContentLoaded', loadMembers);