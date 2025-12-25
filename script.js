
// Menu mobile
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  // Ferme le menu quand on clique un lien
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

// Reveal au scroll (rejoue à chaque fois si tu remontes / redescends)
const revealEls = Array.from(document.querySelectorAll(".reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    const delay = el.dataset.revealDelay ? Number(el.dataset.revealDelay) : 0;

    if (entry.isIntersecting) {
      setTimeout(() => el.classList.add("is-in"), delay);
    } else {
      // pour rejouer l'anim à chaque passage
      el.classList.remove("is-in");
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => io.observe(el));

// Copier l'email
const copyBtn = document.getElementById("copyMail");
const hint = document.getElementById("copyHint");
const mail = "lysis.asso.gmail.com";

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mail);
      if (hint) hint.textContent = "Adresse copiée ✅";
      setTimeout(() => { if (hint) hint.textContent = ""; }, 1400);
    } catch (e) {
      if (hint) hint.textContent = "Impossible de copier automatiquement. Sélectionne et copie : " + mail;
    }
  });
}

// Parallax léger sur les blobs (super soft)
const blobs = document.querySelectorAll(".blob");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  blobs.forEach((b, i) => {
    const p = (i + 1) * 6;
    b.style.transform = `translate3d(${x * p}px, ${y * p}px, 0)`;
  });
}, { passive: true });
