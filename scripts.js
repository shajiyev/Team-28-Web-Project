document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  setUpMenu();
  setUpReveal();
  setUpLightbox();
  setUpBackToTop();
});

function setUpMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");

  function setOpen(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("nav-open"));
  });

  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("nav-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
}

function setUpReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

  items.forEach(function (item) { observer.observe(item); });
}

function setUpLightbox() {
  const photos = Array.from(document.querySelectorAll(".photo"));
  if (photos.length === 0) return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Photo viewer");
  dialog.classList.toggle("single", photos.length === 1);
  dialog.innerHTML =
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="">' +
      '<figcaption class="lightbox-count"></figcaption>' +
    "</figure>" +
    '<button class="lightbox-btn lightbox-close" type="button" aria-label="Close photo">&times;</button>' +
    '<button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous photo">&lsaquo;</button>' +
    '<button class="lightbox-btn lightbox-next" type="button" aria-label="Next photo">&rsaquo;</button>';
  document.body.append(dialog);

  const image = dialog.querySelector(".lightbox-img");
  const count = dialog.querySelector(".lightbox-count");
  let current = 0;

  function show(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current].src;
    image.alt = photos[current].alt;
    count.textContent = (current + 1) + " / " + photos.length;
  }

  function open(index) {
    show(index);
    dialog.showModal();
  }

  photos.forEach(function (photo, index) {
    photo.tabIndex = 0;
    photo.setAttribute("role", "button");
    photo.setAttribute("aria-label", "Enlarge photo: " + photo.alt);
    photo.addEventListener("click", function () { open(index); });
    photo.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(index);
      }
    });
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector(".lightbox-prev").addEventListener("click", function () { show(current - 1); });
  dialog.querySelector(".lightbox-next").addEventListener("click", function () { show(current + 1); });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("lightbox-figure")) dialog.close();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  let touchStartX = null;
  dialog.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  dialog.addEventListener("touchend", function (event) {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
    touchStartX = null;
  });
}

function setUpBackToTop() {
  const button = document.createElement("button");
  button.className = "to-top";
  button.type = "button";
  button.setAttribute("aria-label", "Back to top");
  button.innerHTML = "&uarr;";
  document.body.append(button);

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
  });

  function update() {
    button.classList.toggle("is-visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}
