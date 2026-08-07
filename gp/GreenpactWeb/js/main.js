/* =========================================================
   GREENPACT main.js  (vanilla, no dependencies)
   ---------------------------------------------------------
   All editable content lives in the DATA block below.
   Add/remove items freely; the UI scales automatically.
   ========================================================= */

/* ============ DATA: EDIT ME ============ */

const GREENFACTS = {
  // animated count-up stats
  stats: [
    { value: 2025, suffix: "", prefix: "", label: "Founded" },
    { value: 2, suffix: "", prefix: "", label: "Batches" },
    { value: 75, suffix: "", prefix: "", label: "active members" },
  ],
  // flip cards (front question -> back answer)
  cards: [
    { front: "A truck of plastic, every minute.", back: "The equivalent of one garbage truck of plastic is dumped into the ocean every single minute." },
    { front: "Trees are climate machines.", back: "A single mature tree can absorb roughly 22 kg of CO2 per year and release oxygen for two people." },
    { front: "Freshwater is rare.", back: "Less than 1% of the planet's water is accessible freshwater for nearly 8 billion people." },
    { front: "Recycling pays back.", back: "Recycling one tonne of paper saves about 17 trees and thousands of litres of water." },
  ],
};

const EVENTS = [
  {
    year: "2023",
    date: "March 2023",
    title: "Eco Talk: Plastic Waste",
    img: "assets/images/ecotalk.jpg",
    excerpt: "Our flagship discussion series confronting single-use plastic culture.",
    body: "Eco Talk gathered students, researchers and local leaders for an honest conversation about plastic dependency. The session paired hard data with practical, household-level action, and launched our ongoing waste-audit program.",
    tags: ["Education", "Campaign"],
    gallery: ["assets/images/ecotalk.jpg", "assets/images/event-1.jpg", "assets/images/event-2.jpg"],
  },
  {
    year: "2023",
    date: "August 2023",
    title: "Community River Cleanup",
    img: "assets/images/event-1.jpg",
    excerpt: "Volunteers restored a kilometre of riverbank in a single weekend.",
    body: "Working with neighbourhood groups, Greenpact volunteers removed waste, documented pollution sources and planted native riparian species to stabilise the bank.",
    tags: ["Community", "Restoration"],
    gallery: ["assets/images/event-1.jpg", "assets/images/event-3.jpg"],
  },
  {
    year: "2024",
    date: "January 2024",
    title: "Cultural Night for Nature",
    img: "assets/images/event-3.jpg",
    excerpt: "Tradition and ecology met under the forest canopy.",
    body: "A celebration that wove local dance and music with an environmental message, proving that conservation and culture grow from the same roots.",
    tags: ["Culture", "Awareness"],
    gallery: ["assets/images/event-3.jpg", "assets/images/event-hero.jpg", "assets/images/event-2.jpg"],
  },
  {
    year: "2024",
    date: "October 2024",
    title: "Youth Research Fellowship",
    img: "assets/images/event-2.jpg",
    excerpt: "Ten young researchers, ten field studies, one shared mission.",
    body: "Our fellowship pairs students with mentors to run real ecological field studies, turning curiosity into published, actionable findings.",
    tags: ["Research", "Innovation"],
    gallery: ["assets/images/event-2.jpg", "assets/images/event-1.jpg"],
  },
];

const PARTNERS = [
  { name: "EcoForum", abbr: "EF", role: "Knowledge partner", desc: "A regional sustainability forum.", body: "EcoForum co-hosts our Eco Talk series and shares research access, helping us ground campaigns in current science." },
  { name: "BlueWave", abbr: "BW", role: "Field partner", desc: "Marine conservation group.", body: "BlueWave supports our coastal and river cleanups with logistics, equipment and trained dive volunteers." },
  { name: "TerraEd", abbr: "TE", role: "Education partner", desc: "Environmental education network.", body: "TerraEd helps us bring sustainability curricula into schools and translate findings into classroom material." },
  { name: "GreenFund", abbr: "GF", role: "Funding partner", desc: "Impact micro-grants.", body: "GreenFund backs youth-led projects from our research fellowship with seed grants and mentorship." },
  { name: "CivicRoots", abbr: "CR", role: "Community partner", desc: "Neighbourhood coalition.", body: "CivicRoots mobilises local volunteers and connects Greenpact with the communities we serve." },
  { name: "SolarLeaf", abbr: "SL", role: "Innovation partner", desc: "Clean-tech studio.", body: "SolarLeaf prototypes low-cost clean-energy tools with our fellows for field deployment." },
];

const TEAM = {
  leadership: [
    { name: "Member Name", role: "Founder & President", photo: "" },
    { name: "Member Name", role: "Vice President", photo: "" },
    { name: "Member Name", role: "Secretary General", photo: "" },
    { name: "Member Name", role: "Treasurer", photo: "" },
  ],
  divisions: [
    { name: "Research & Innovation", members: [
      { name: "Member Name", role: "Lead", photo: "" },
      { name: "Member Name", role: "Researcher", photo: "" },
      { name: "Member Name", role: "Researcher", photo: "" },
    ]},
    { name: "Campaigns & Education", members: [
      { name: "Member Name", role: "Lead", photo: "" },
      { name: "Member Name", role: "Coordinator", photo: "" },
      { name: "Member Name", role: "Educator", photo: "" },
    ]},
    { name: "Media & Documentation", members: [
      { name: "Member Name", role: "Lead", photo: "" },
      { name: "Member Name", role: "Photographer", photo: "" },
    ]},
    { name: "Community & Partnerships", members: [
      { name: "Member Name", role: "Lead", photo: "" },
      { name: "Member Name", role: "Liaison", photo: "" },
    ]},
  ],
};

const MERCH = [
  { name: "Greenpact Tote", abbr: "Tote", price: "Rp 95.000", note: "Organic cotton, screen-printed horse mark.", badge: "", photo: "" },
  { name: "Field Tee", abbr: "Tee", price: "Rp 120.000", note: "Soft cotton tee with From Us, To Nature print.", badge: "", photo: "" },
  { name: "Enamel Pin Set", abbr: "Pins", price: "Rp 60.000", note: "Three pins: horse, leaf, boat.", badge: "", photo: "" },
  { name: "Steel Bottle", abbr: "Bottle", price: "Rp 150.000", note: "Insulated, refillable, plastic-free.", badge: "Bestseller", photo: "" },
  { name: "Sticker Pack", abbr: "Sticker", price: "Rp 35.000", note: "Weatherproof vinyl, ten designs.", badge: "", photo: "" },
  { name: "Tree Kit", abbr: "Kit", price: "Rp 80.000", note: "Seedling kit, every sale plants one tree.", badge: "Gives back", photo: "" },
];

/* ============ HELPERS ============ */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (str = "") => String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* ============ PRELOADER ============ */
function initPreloader() {
  const pl = $("#preloader");
  if (!pl) return;
  const done = () => pl.classList.add("is-done");
  if (reduceMotion) { done(); return; }
  window.addEventListener("load", () => setTimeout(done, 1700));
  // safety fallback
  setTimeout(done, 4000);
}

/* ============ NAV ============ */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const links = $("#navLinks");

  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // backdrop behind the mobile drawer (tap to close)
  const backdrop = document.createElement("div");
  backdrop.className = "nav__backdrop";
  nav.appendChild(backdrop);

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  };
  const closeMenu = () => setMenu(false);
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  backdrop.addEventListener("click", closeMenu);
  $$("a", links).forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

/* ============ SCROLL REVEALS ============ */
function initReveals() {
  const els = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

/* ============ GREENFACTS ============ */
function renderFacts() {
  const statsWrap = $("#factsStats");
  const cardsWrap = $("#factsCards");
  if (!statsWrap) return;

  statsWrap.innerHTML = GREENFACTS.stats.map((s) => `
    <div class="stat">
      <div class="stat__num" data-count="${s.value}" data-suffix="${s.suffix || ""}" data-prefix="${s.prefix || ""}">${s.prefix || ""}0${s.suffix ? `<small>${s.suffix}</small>` : ""}</div>
      <p class="stat__label">${esc(s.label)}</p>
    </div>`).join("");

  // a page may omit the flip-cards container, or request only the first N via data-limit
  if (cardsWrap) {
    const cardLimit = parseInt(cardsWrap.dataset.limit || "0", 10);
    const cards = cardLimit > 0 ? GREENFACTS.cards.slice(0, cardLimit) : GREENFACTS.cards;

    cardsWrap.innerHTML = cards.map((c) => `
      <div class="flip" tabindex="0" role="button" aria-label="${esc(c.front)} Tap to reveal.">
        <div class="flip__inner">
          <div class="flip__face flip__front">
            <span class="flip__eyebrow">Did you know</span>
            <h3>${esc(c.front)}</h3>
            <span class="flip__hint">Reveal &rarr;</span>
          </div>
          <div class="flip__face flip__back"><p>${esc(c.back)}</p></div>
        </div>
      </div>`).join("");

    // tap to flip (mobile / keyboard)
    $$(".flip", cardsWrap).forEach((card) => {
      const flip = () => card.classList.toggle("is-flipped");
      card.addEventListener("click", flip);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    });
  }

  initCounters();
}

function initCounters() {
  const nums = $$(".stat__num");
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    if (reduceMotion) { el.innerHTML = `${prefix}${target}${suffix ? `<small>${suffix}</small>` : ""}`; return; }
    const dur = 1500; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.innerHTML = `${prefix}${val}${suffix ? `<small>${suffix}</small>` : ""}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window)) { nums.forEach(animate); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}

/* ============ VISION & MISSION TABS ============ */
function initVM() {
  const sw = $(".vm__switch");
  if (!sw) return;
  const tabs = $$(".vm__tab", sw);
  const panels = { vision: $("#vm-vision"), mission: $("#vm-mission") };
  const select = (key) => {
    sw.dataset.active = key;
    tabs.forEach((t) => {
      const active = t.id === `tab-${key}`;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    Object.entries(panels).forEach(([k, p]) => {
      p.classList.toggle("is-active", k === key);
      p.hidden = k !== key;
    });
  };
  tabs.forEach((t) => t.addEventListener("click", () => select(t.id.replace("tab-", ""))));
  select("vision");
}

/* ============ VIDEO ============ */
function initVideo() {
  const frame = $(".video__frame");
  const video = $("#repVideo");
  const playBtn = $("#videoPlay");
  if (!video) return;
  playBtn.addEventListener("click", () => {
    frame.classList.add("is-playing");
    video.setAttribute("controls", "");
    video.play().catch(() => { /* no source yet; controls remain */ });
  });
  video.addEventListener("pause", () => { if (video.currentTime === 0) frame.classList.remove("is-playing"); });
}

/* ============ TIMELINE ============ */
function renderTimeline() {
  const track = $("#impactTrack");
  if (!track) return;
  track.innerHTML = EVENTS.map((ev, i) => `
    <li class="tl" tabindex="0" role="button" data-event="${i}" aria-label="${esc(ev.title)}, ${esc(ev.date)}. Open details.">
      <span class="tl__year">${esc(ev.year)}</span>
      <div class="tl__img"><img src="${ev.img}" alt="${esc(ev.title)}" loading="lazy" /></div>
      <h3 class="tl__title">${esc(ev.title)}</h3>
      <p class="tl__excerpt">${esc(ev.excerpt)}</p>
      <span class="tl__more">Read story &rarr;</span>
    </li>`).join("");

  $$(".tl", track).forEach((node) => {
    const open = () => openEvent(EVENTS[+node.dataset.event]);
    node.addEventListener("click", open);
    node.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

function openEvent(ev) {
  const gallery = (ev.gallery || []).map((g) => `<img src="${g}" alt="" loading="lazy" />`).join("");
  const tags = (ev.tags || []).map((t) => `<span class="modal__tag">${esc(t)}</span>`).join("");
  openModal(`
    <div class="modal__hero"><img src="${ev.img}" alt="${esc(ev.title)}" /></div>
    <div class="modal__content">
      <p class="modal__eyebrow">Impact</p>
      <h2 class="modal__title" id="modalTitle">${esc(ev.title)}</h2>
      <p class="modal__meta">${esc(ev.date)}</p>
      <p>${esc(ev.body)}</p>
      <div>${tags}</div>
      ${gallery ? `<div class="modal__gallery">${gallery}</div>` : ""}
    </div>`);
}

/* ============ PARTNERS (marquee + modal) ============ */
function renderPartners() {
  const track = $("#marqueeTrack");
  if (!track) return;
  const card = (p, i) => `
    <button class="partner" data-partner="${i}" aria-label="${esc(p.name)}, ${esc(p.role)}. Open details.">
      <span class="partner__logo">${esc(p.abbr)}</span>
      <span class="partner__name">${esc(p.name)}</span>
    </button>`;
  // duplicate the set for a seamless infinite loop
  const set = PARTNERS.map(card).join("");
  track.innerHTML = set + set;

  $$(".partner", track).forEach((btn) => {
    btn.addEventListener("click", () => openPartner(PARTNERS[+btn.dataset.partner]));
  });
}

function openPartner(p) {
  openModal(`
    <div class="modal__content" style="padding-top:2.6rem">
      <span class="partner__logo" style="width:72px;height:72px;font-size:2rem;border-radius:18px;margin-bottom:1rem">${esc(p.abbr)}</span>
      <p class="modal__eyebrow">${esc(p.role)}</p>
      <h2 class="modal__title" id="modalTitle">${esc(p.name)}</h2>
      <p class="modal__meta">${esc(p.desc)}</p>
      <p>${esc(p.body)}</p>
    </div>`);
}

/* ============ TEAM ============ */
function memberCard(m, small) {
  const photo = m.photo
    ? `<img src="${m.photo}" alt="${esc(m.name)}" loading="lazy" />`
    : `<span class="member__initials" aria-hidden="true">${initials(m.name)}</span>`;
  const socials = (m.socials || []).map((s) => `<a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.label)}</a>`).join("");
  return `
    <article class="member ${small ? "member--sm" : ""}">
      <div class="member__photo ${m.photo ? "" : "member__photo--empty"}">${photo}</div>
      <h4 class="member__name">${esc(m.name)}</h4>
      <p class="member__role">${esc(m.role)}</p>
      ${socials ? `<div class="member__socials">${socials}</div>` : ""}
    </article>`;
}

function renderTeam() {
  const lead = $("#teamLead");
  const divs = $("#teamDivisions");
  if (!lead || !divs) return;
  lead.innerHTML = TEAM.leadership.map((m) => memberCard(m, false)).join("");
  divs.innerHTML = TEAM.divisions.map((d) => `
    <h3 class="team__group">${esc(d.name)}</h3>
    <div class="team__grid team__grid--div">
      ${d.members.map((m) => memberCard(m, true)).join("")}
    </div>`).join("");
}

/* ============ MODAL (shared) ============ */
let lastFocused = null;
function openModal(html) {
  const modal = $("#modal");
  $("#modalBody").innerHTML = html;
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const dialog = $(".modal__dialog", modal);
  dialog.focus();
}
function closeModal() {
  const modal = $("#modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}
function initModal() {
  const modal = $("#modal");
  if (!modal) return;
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e, $(".modal__dialog", modal));
  });
}
function trapFocus(e, container) {
  const f = $$('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])', container)
    .filter((el) => !el.disabled && el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ============ CONTACT FORM ============ */
function initForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (!form) return;

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    subject: (v) => v.trim().length >= 2 || "Add a short subject.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  const validateField = (input) => {
    const field = input.closest(".field");
    const errEl = $("[data-err]", field);
    const result = validators[input.name](input.value);
    const ok = result === true;
    field.classList.toggle("is-invalid", !ok);
    errEl.textContent = ok ? "" : result;
    return ok;
  };

  $$("input, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => { if (input.closest(".field").classList.contains("is-invalid")) validateField(input); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status";
    status.textContent = "";
    const inputs = $$("input, textarea", form);
    const allOk = inputs.map(validateField).every(Boolean);
    if (!allOk) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-err"); return; }

    const submitBtn = $(".form__submit", form);
    submitBtn.disabled = true; submitBtn.textContent = "Sending…";

    // Formspree-ready: if the action still points at the placeholder, simulate success.
    const isPlaceholder = form.action.includes("your-id-here");
    try {
      if (isPlaceholder) {
        await new Promise((r) => setTimeout(r, 700)); // demo delay
      } else {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Network");
      }
      form.reset();
      form.classList.add("is-sent");
      status.textContent = isPlaceholder
        ? "Thanks! (Demo mode. Add your Formspree endpoint to go live.)"
        : "Thank you. Your message is on its way. We'll be in touch.";
      status.classList.add("is-ok");
    } catch (err) {
      status.textContent = "Something went wrong. Please try again or email us directly.";
      status.classList.add("is-err");
      submitBtn.disabled = false; submitBtn.textContent = "Send message";
    }
  });
}

/* ============ HOME: IMPACT PREVIEW ============ */
function renderImpactPreview() {
  const wrap = $("#impactPreview");
  if (!wrap) return;
  const count = parseInt(wrap.dataset.limit || "3", 10);
  wrap.innerHTML = EVENTS.slice(0, count).map((ev) => `
    <a class="preview-card" href="impact.html">
      <div class="preview-card__img"><img src="${ev.img}" alt="${esc(ev.title)}" loading="lazy" /></div>
      <span class="preview-card__year">${esc(ev.year)}</span>
      <h3 class="preview-card__title">${esc(ev.title)}</h3>
      <p class="preview-card__excerpt">${esc(ev.excerpt)}</p>
      <span class="preview-card__more">Read story &rarr;</span>
    </a>`).join("");
}

/* ============ MERCH ============ */
function renderMerch() {
  const wrap = $("#merchGrid");
  if (!wrap) return;
  wrap.innerHTML = MERCH.map((m) => {
    const media = m.photo
      ? `<img src="${m.photo}" alt="${esc(m.name)}" loading="lazy" />`
      : `<span class="merch-card__ph" aria-hidden="true">${esc(m.abbr)}</span>`;
    const badge = m.badge ? `<span class="merch-card__badge">${esc(m.badge)}</span>` : "";
    return `
    <article class="merch-card">
      <div class="merch-card__media ${m.photo ? "" : "merch-card__media--ph"}">${media}${badge}</div>
      <div class="merch-card__body">
        <h3 class="merch-card__name">${esc(m.name)}</h3>
        <p class="merch-card__note">${esc(m.note)}</p>
        <div class="merch-card__foot">
          <span class="merch-card__price">${esc(m.price)}</span>
          <!-- EDIT: link each product to your store / order form -->
          <a class="btn btn--amber merch-card__btn" href="contact.html">Order</a>
        </div>
      </div>
    </article>`;
  }).join("");
}

/* ============ NAV: ACTIVE LINK ============ */
function setActiveNav() {
  let page = location.pathname.split("/").pop() || "index.html";
  if (page === "") page = "index.html";
  $$(".nav__links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "index.html" && (href === "index.html" || href === "./"))) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
}

/* ============ DONATE FORM ============ */
function initDonateForm() {
  const form = $("#donateForm");
  if (!form) return;
  const status = $("#donateStatus");
  const amount = $("#d-amount");

  // quick-amount chips fill the input
  $$(".chip", form).forEach((chip) => {
    chip.addEventListener("click", () => {
      amount.value = chip.dataset.amount;
      $$(".chip", form).forEach((c) => c.classList.toggle("is-active", c === chip));
      validate(amount);
    });
  });
  amount.addEventListener("input", () => $$(".chip", form).forEach((c) => c.classList.toggle("is-active", c.dataset.amount === amount.value)));

  const validators = {
    amount: (v) => (Number(v) >= 1000) || "Enter an amount of at least Rp 1.000.",
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
  };
  const validate = (input) => {
    if (!validators[input.name]) return true;
    const field = input.closest(".field");
    const errEl = $("[data-err]", field);
    const result = validators[input.name](input.value);
    const ok = result === true;
    field.classList.toggle("is-invalid", !ok);
    if (errEl) errEl.textContent = ok ? "" : result;
    return ok;
  };

  $$("input, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validate(input));
    input.addEventListener("input", () => { if (input.closest(".field").classList.contains("is-invalid")) validate(input); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status";
    status.textContent = "";
    const allOk = $$("input, textarea", form).map(validate).every(Boolean);
    if (!allOk) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-err"); return; }

    const btn = $(".form__submit", form);
    btn.disabled = true; btn.textContent = "Processing…";
    const isPlaceholder = form.action.includes("your-id-here");
    try {
      if (isPlaceholder) {
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Network");
      }
      form.reset();
      $$(".chip", form).forEach((c) => c.classList.remove("is-active"));
      form.classList.add("is-sent");
      status.textContent = isPlaceholder
        ? "Thank you! (Demo mode. Connect a payment or Formspree endpoint to go live.)"
        : "Thank you for your gift. We will be in touch with the details.";
      status.classList.add("is-ok");
    } catch (err) {
      status.textContent = "Something went wrong. Please try again or email us directly.";
      status.classList.add("is-err");
      btn.disabled = false; btn.textContent = "Donate";
    }
  });
}

/* ============ MISC ============ */
function initMisc() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ============ BOOT ============ */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNav();
  setActiveNav();
  renderFacts();
  renderImpactPreview();
  renderMerch();
  renderTimeline();
  renderPartners();
  renderTeam();
  initVM();
  initVideo();
  initModal();
  initForm();
  initDonateForm();
  initMisc();
  initReveals(); // last, after dynamic content is in the DOM
});
