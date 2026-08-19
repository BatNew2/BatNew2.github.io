/* ==========================================================================
   TEAM — data + renderer for team.html

   >>> TO EDIT THE TEAM, ONLY TOUCH THE `GROUPS` ARRAY BELOW. <<<

   The section renders one heading + one card grid per group, in array order.

   Every member is one object:

     {
       name:   "Ben B.",                              // card heading
       role:   "Co-Founder — Fundraising Supervisor", // main line under the name
       school: "Kolese Kanisius Jakarta",             // optional smaller line
       photo:  "ben-b",                               // optional image slug
       widths: [400, 600],                            // optional, see below
     }

   The `photo` slug maps to files in images/team/opt/, using `widths` as the
   two exported variants — <slug>-160.webp / <slug>-240.webp by default.
   The two presidents were exported larger, so they set widths: [400, 600].
   Leave `photo` empty ("") and the card falls back to the member's initials.

   Adding a member : add an object to that group's `members` array.
   Removing        : delete the object.
   Reordering      : move the object; each grid follows array order.
   New group       : add { title: "...", members: [...] } to GROUPS.
   Renaming a group: change its `title`.

   Cards use the member/team styles from GreenpactWeb/css/style.css.
   Everything lives inside the wrapper below so these names cannot collide
   with GreenpactWeb/js/main.js, which also loads on this page.
   ========================================================================== */

(function () {
"use strict";

/* --------------------------------------------------------------------------
   FULL_TEAM_BATCH2 — names shown in the "See full team →" popup next to the
   Batch 2 Team heading. This is just a flat list of strings.

   >>> TO EDIT THE POPUP NAMES, ONLY TOUCH THIS ARRAY. <<<
   Add a name  : add a new "Full Name" string to the list.
   Remove a name: delete the string.
   Reorder     : move the string; the popup lists them in array order.
   -------------------------------------------------------------------------- */
const FULL_TEAM_BATCH2 = [
  "Anselmus Kamael Sidharta",
  "Fathia Kayla Ismail",
  "Kenisha Djohan Young",
  "Margaretha Stephanie Martin",
  "Brafa Amadoputra Wibowo",
  "Daniel Joel Charles Sutanto",
  "Erlangga Andhika Adipratomo",
  "Andrea Nada Wiguna",
  "Donna Immanuella",
  "Evangeline Aurora Steffany Khoe",
  "Rosabelle Valerie Wijaya",
  "Giovanni Datuan Pong Mangatta",
  "Presley Cellito Panjaitan",
  "Joshua Christian Najogi Simanjuntak",
  "Andrew Satria Lestadi",
  "Bosco Sagrado Panjaitan",
  "Dominicus Anshillo Putra Prapanca",
  "Enzo Navarro Sulistio",
  "Gregorius Respati Wirosasmita",
  "Kenneth Jacky Hideyoshi",
  "Reuven Caleb Tan",
  "Caroline Anggraini Soegiharto",
  "Alexandra Suriato",
  "Katya Ryu Hendry",
  "Manuella Quinn Nathania Nikijuluw",
  "Mariel Cinara Adam",
  "Michella Alexie Cloca",
  "Rachel Helena Putri Sipahutar",
  "Gionaldi Hafendy",
  "Mikaela Banyu Kenya Kinanti",
  "Eden James Paterson",
  "Antonio Aldrich",
  "Brayden Nicholas Kwenandar",
  "Dave Alexander Jayadi",
  "Jaden Sutedja",
  "Jonathan Paul Setiawan",
  "Brandon Kusnadi",
  "Heidi Haruko",
  "Felisita Tiaruli Paramitha",
  "Gwyneth Patricia Hardi",
  "Maria Michelle Aurelia Mandhana",
  "Vivianne Jacqueline Liu",
  "Carissa Cynthia Cindrajaya",
  "Elisa Jean Walangitang",
  "Kimiko Hillary Tjahjadi",
  "Johannes Otniel Tonggo Saragih",
  "Samantha Alexandra",
  "Armadeo Bintang Puspanjono",
  "Benedictus Ethan Pandu Aleta",
  "Christopher Jacob Bangit Gunawan",
  "George Patrick Wang",
  "Louis Evantyo Prepasentaya Nurcahyo",
  "Paul Graham Haposan Sipahutar",
  "Ryland Pradhana Wibisono",
  "Alicia Clare Elizabeth Adam",
  "Tatiana Aurelia Fleming",
  "Tya Pricilla Atmadja",
  "Antonia Kirana Abinaya",
  "Archangel Annslee Stevan",
  "Francesca Victoria Charity Adhiguna",
  "Gisela Anindya Renata",
  "Leolla Leonard Siauw",
  "Lidwina Bianca Sumargo",
  "Rafael Carlo Sandyputra",
  "Mabel Susanto",
  "Dominick Darrent Wijaya",
  "Gerrard Darienver Lesmana",
  "Jordan Melvin Arto",
  "Michael Ritchie Nadeak",
  "Orlando Kenzie Suprijadi",
  "Rafael Leroy Juslian",
  "Raynan Hindradata Yoslim",
  "Giacinta Sabina Kurniatmoko",
  "Grace Paris Wang",
  "Audrey Danica Karo Karo",
  "Franzeska Raizel Wijaya",
];

/* --------------------------------------------------------------------------
   FULL_TEAM_BATCH1 — names shown in the "See full team →" popup next to the
   Batch 1 Team heading.

   >>> TO EDIT THE POPUP NAMES, ONLY TOUCH THIS ARRAY. <<<
   -------------------------------------------------------------------------- */
const FULL_TEAM_BATCH1 = [
  "Giovanni Datuan Pong Mangatta",
  "Andrew Satria Lestadi",
  "Anselmus Kamael Sidharta",
  "Joshua Christian Najogi Simanjuntak",
  "Mabel Susanto",
  "Samantha Alexandra",
  "Sean Michael Alden Gozali",
  "Gerard Darienver Lesmana",
  "Fathia Kayla Ismail",
  "Jordan Melvin Arto",
  "Michael Ritchie Nadeak",
  "I Gede Airlangga Sagarmatha",
  "Orlando Kenzie Suprijadi",
  "Antonio Aldrich",
  "Grace Paris Wang",
  "Andrea Nada Wiguna",
  "Darren Gudfried",
  "Daniel Joel Charles Sutanto",
  "Erlangga Andhika Adipratomo",
  "Francesca Victoria Charity Adhiguna",
  "Jaden Sutedja",
  "Margaretha Stephanie Martin",
  "Johannes Otniel Tonggo Saragih",
  "Paul Graham Haposan Sipahutar",
  "Tatiana Aurelia Fleming",
  "Given Ivander Octavio Simanjuntak",
  "Mikaela Banyu Kenya Kinanti",
  "Mikaela Keiza Budiharto",
  "Brayden Nicholas Kwenandar",
  "Armadeo Bintang Puspanjono",
  "Richard Huang",
  "Gionaldi Hafendy",
  "Dave Alexander Jayadi",
  "Alicia Clare Elizabeth Adam",
  "Chatrin Abraham",
  "Dominicus Anshillo Putra Prapanca",
  "Enzo Navarro Sulistio",
  "Gregorius Respati Wirosasmita",
  "Kenneth Jacky Hideyoshi",
  "Lidwina Bianca Sumargo",
  "Louis Evantyo Prepasentaya Nurcahyo",
  "Presley Cellito Panjaitan",
  "Rachel Helena Putri Sipahutar",
  "Rafael Leroy Juslian",
  "Reuven Caleb Tan",
];

// Maps a group's title to the popup shown by its "See full team →" button.
const FULL_TEAM_POPUPS = {
  "Batch 1 Team": { id: "fullTeamBatch1Modal", label: "Batch 1 — Full Team", names: FULL_TEAM_BATCH1 },
  "Batch 2 Team": { id: "fullTeamBatch2Modal", label: "Batch 2 — Full Team", names: FULL_TEAM_BATCH2 },
};

const GROUPS = [
  {
    title: "Founders",
    members: [
      {
        name: "Patrick Polana Kho",
        role: "Founder — President of Batch 1 & Batch 2",
        photo: "patrick-polana-kho",
        widths: [400, 600],
      },
      {
        name: "Ivana Natasya Quinn Ginting",
        role: "Co-Founder — President of Batch 1 & Batch 2",
        photo: "ivana-natasya-quinn-ginting",
        widths: [400, 600],
      },
      {
        name: "Ben B.",
        role: "Co-Founder — Fundraising & Bendahara Supervisor",
        photo: "screenshot-2026-08-07-194717",
      },
      {
        name: "Dawson T.",
        role: "Co-Founder — Sekretaris Supervisor",
        photo: "dawson-tanumihardja",
      },
      {
        name: "Dhifa F.",
        role: "Co-Founder — Community & Event Supervisor",
        photo: "maria-diva-putri-faesa",
      },
      {
        name: "Jonah S.",
        role: "Co-Founder — Research & Development Supervisor",
        photo: "jonah-ignatius-suharya-1",
      },
      {
        name: "Johannes Y.",
        role: "Co-Founder — Research & Development Supervisor",
        photo: "johannes-edward-yasa",
      },
      {
        name: "Keizo T.",
        role: "Co-Founder — Media & Design Supervisor",
        photo: "keizo-journey-amadeuzputra-theophilus",
      },
      {
        name: "Naveen D.",
        role: "Co-Founder — Creative Supervisor",
        photo: "naveen-xavier-dante",
      },
    ],
  },
  {
    title: "Batch 2 Team",
    members: [
      { name: "Anselmus S.", role: "Sekretaris", photo: "anselmus-kamael-sidharta-1" },
      { name: "Fathia I.", role: "Bendahara", photo: "fathia-kayla-ismail" },
      { name: "Kenisha Y.", role: "Koor. Media & Design", photo: "kenisha-djohan-young" },
      { name: "Margaretha M.", role: "Koor. Media & Design", photo: "margaretha-stephanie-martin" },
      { name: "Giovanni M.", role: "Koor. Community & Event", photo: "giovanni-datuan-pong-mangatta" },
      { name: "Presley P.", role: "Koor. Community & Event", photo: "presley-cellito-panjaitan-1" },
      { name: "Gionaldi H.", role: "Koor. Research & Development", photo: "gionaldi-hafendy-1-1" },
      { name: "Mikaela K.", role: "Koor. Research & Development", photo: "mikaela-banyu-kenya-kinanti" },
      { name: "Johannes S.", role: "Koor. Content Education Team", photo: "johannes-otniel-tonggo-saragih" },
      { name: "Samantha A.", role: "Koor. Content Education Team", photo: "samantha-alexandra" },
      { name: "Rafael S.", role: "Koor. Fundraising & Sponsorship", photo: "rafael-carlo-sandyputra" },
      { name: "Mabel S.", role: "Koor. Fundraising & Sponsorship", photo: "mabel-susanto" },
    ],
  },
  {
    title: "Batch 1 Team",
    members: [
      { name: "Sean G.", role: "Koor. Fundraising & Sponsorship", photo: "sean-michael-alden-gozali" },
      { name: "Gerrard L.", role: "Koor. Fundraising & Sponsorship", photo: "gerrard-darienver-lesmana" },
      { name: "Eden P.", role: "Koor. Research & Development", photo: "eden-james-paterson" },
      { name: "Judith B.", role: "Koor. Research & Development", photo: "" },
      { name: "Michella C.", role: "Koor. Volunteer Management", photo: "michella-alexie-cloca" },
      { name: "Kenisha Y.", role: "Koor. Public Relations", photo: "kenisha-djohan-young" },
      { name: "Rafael S.", role: "Koor. Event Organizer", photo: "rafael-carlo-sandyputra" },
    ],
  },
];

/* ==========================================================================
   Renderer — no need to edit below this line.
   ========================================================================== */

const PHOTO_DIR = "images/team/opt";
const DEFAULT_WIDTHS = [160, 240];
const PHOTO_SIZE = 220; // widest a card photo is rendered, in px

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[ch]);
}

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function memberPhoto(member, eager) {
  const [small, large] = member.widths || DEFAULT_WIDTHS;
  const src = `${PHOTO_DIR}/${member.photo}-${small}.webp`;
  const srcset = `${src} ${small}w, ${PHOTO_DIR}/${member.photo}-${large}.webp ${large}w`;
  const load = eager ? 'decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img src="${src}" srcset="${srcset}" sizes="${PHOTO_SIZE}px" alt="${escapeHtml(member.name)}" ${load} />`;
}

function memberCard(member, eager) {
  const media = member.photo
    ? memberPhoto(member, eager)
    : `<span class="member__initials" aria-hidden="true">${initials(member.name)}</span>`;

  const role = member.role ? `<p class="member__role">${escapeHtml(member.role)}</p>` : "";
  const school = member.school ? `<p class="member__meta">${escapeHtml(member.school)}</p>` : "";

  return `
    <article class="member member--sm">
      <div class="member__photo${member.photo ? "" : " member__photo--empty"}">${media}</div>
      <h4 class="member__name">${escapeHtml(member.name)}</h4>
      ${role}
      ${school}
    </article>`;
}

function groupHeading(group) {
  const popup = FULL_TEAM_POPUPS[group.title];
  if (!popup) {
    return `<h3 class="team__group">${escapeHtml(group.title)}</h3>`;
  }
  return `
    <div class="team__group-row">
      <h3 class="team__group">${escapeHtml(group.title)}</h3>
      <button type="button" class="team__see-all-btn" data-bs-toggle="modal" data-bs-target="#${popup.id}">
        See full team &rarr;
      </button>
    </div>`;
}

function renderTeam() {
  const host = document.getElementById("teamGroups");
  if (!host) return;

  host.innerHTML = GROUPS.map((group, groupIndex) => `
    ${groupHeading(group)}
    <div class="team__grid team__grid--div">
      ${group.members
        // Only the first group is above the fold, so load just those eagerly.
        .map((m, i) => memberCard(m, groupIndex === 0 && i < 4))
        .join("")}
    </div>`).join("");
}

// Popups listing FULL_TEAM_POPUPS entries, injected once and opened via
// Bootstrap's modal data attributes on each "See full team" button above.
function renderFullTeamModals() {
  Object.values(FULL_TEAM_POPUPS).forEach((popup) => {
    if (document.getElementById(popup.id)) return;

    const items = popup.names.map((name) => `<li>${escapeHtml(name)}</li>`).join("");
    const labelId = `${popup.id}Label`;
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = popup.id;
    modal.tabIndex = -1;
    modal.setAttribute("aria-labelledby", labelId);
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content full-team-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="${labelId}">${escapeHtml(popup.label)}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="full-team-list">${items}</ul>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderTeam();
    renderFullTeamModals();
  });
} else {
  renderTeam();
  renderFullTeamModals();
}

})();
