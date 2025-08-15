function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}
(function () {
  "use strict";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  function initAll() {
    const sliders = document.querySelectorAll("[data-slider], [data-slider-root]");
    sliders.forEach(initSlider);
  }

  function initSlider(slider) {
    const track = slider.querySelector("[data-track]");
    const prev = slider.querySelector("[data-prev]") || slider.querySelector(".gs-arrow--left");
    const next = slider.querySelector("[data-next]") || slider.querySelector(".gs-arrow--right");
    if (!track) return;

    function getStep() {
      const first = track.querySelector(".gs-card");
      const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
      const w = first ? first.getBoundingClientRect().width : track.clientWidth;
      return Math.max(0, w + gap);
    }

    function updateArrows() {
      const max = track.scrollWidth - track.clientWidth;
      const hasOverflow = track.scrollWidth > track.clientWidth + 1;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= max - 1;

      if (prev) prev.classList.toggle("is-hidden", !hasOverflow || atStart);
      if (next) next.classList.toggle("is-hidden", !hasOverflow || atEnd);
    }

    function scrollByStep(dir) {
      const step = getStep();
      const target = Math.max(0, Math.min(track.scrollLeft + dir * step, track.scrollWidth));
      track.scrollTo({ left: target, behavior: "smooth" });
      requestAnimationFrame(() => setTimeout(updateArrows, 180));
    }

    prev && prev.addEventListener("click", () => scrollByStep(-1));
    next && next.addEventListener("click", () => scrollByStep(+1));

    track.addEventListener("scroll", updateArrows, { passive: true });

    let isDown = false, startX = 0, startLeft = 0;
    const onDown = x => { isDown = true; startX = x; startLeft = track.scrollLeft; track.classList.add("is-dragging"); };
    const onMove = x => { if (!isDown) return; track.scrollLeft = startLeft - (x - startX); };
    const onUp = () => { if (!isDown) return; isDown = false; track.classList.remove("is-dragging"); updateArrows(); };

    track.addEventListener("mousedown", e => { e.preventDefault(); onDown(e.clientX); });
    window.addEventListener("mousemove", e => onMove(e.clientX));
    window.addEventListener("mouseup", onUp);
    track.addEventListener("mouseleave", onUp);

    track.addEventListener("touchstart", e => onDown(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchmove", e => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", onUp, { passive: true });

    track.addEventListener("wheel", e => {
      const dx = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (!dx) return;
      e.preventDefault();
      track.scrollBy({ left: dx, behavior: "smooth" });
      requestAnimationFrame(updateArrows);
    }, { passive: false });

    const update = () => updateArrows();
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(update);
      ro.observe(track);
      Array.from(track.children).forEach(el => ro.observe(el));
    } else {
      window.addEventListener("resize", update);
    }

    requestAnimationFrame(updateArrows);
  }
})();

(() => {
  const header = document.querySelector('header.navbar');
  const topbar = document.querySelector('.top-bar');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!header) return;

  let lastY = window.scrollY || 0;
  let downAccum = 0;
  let upAccum = 0;
  const DOWN_THRESHOLD = 12;
  const UP_THRESHOLD = 8;
  const nearTop = () => (window.scrollY || 0) < 32;

  const setHidden = (hide) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) hide = false;

    [topbar, header].forEach(el => el && el.classList.toggle('nav-hidden', hide));
    document.documentElement.classList.toggle('header-hidden', hide);
  };

  const onScroll = () => {
    const y = window.scrollY || 0;
    const dy = y - lastY;
    lastY = y;

    document.documentElement.classList.toggle('header-scrolled', y > 4);

    if (nearTop()) { setHidden(false); downAccum = upAccum = 0; return; }

    if (dy > 0) {
      downAccum += dy; upAccum = 0;
      if (downAccum > DOWN_THRESHOLD) setHidden(true);
    } else if (dy < 0) {
      upAccum += -dy; downAccum = 0;
      if (upAccum > UP_THRESHOLD) setHidden(false);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
const MIN_LOAD_TIME = 4000;

const startTime = Date.now();

window.addEventListener('load', function () {
  const overlay = document.getElementById('loader-overlay');
  const elapsed = Date.now() - startTime;
  const delay = Math.max(0, MIN_LOAD_TIME - elapsed);

  setTimeout(() => {
    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 600);
  }, delay);
});
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}

(function () {
  "use strict";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  function initAll() {
    const sliders = document.querySelectorAll("[data-slider], [data-slider-root]");
    sliders.forEach(initSlider);
  }

  function initSlider(slider) {
    const track = slider.querySelector("[data-track]");
    const prev = slider.querySelector("[data-prev]") || slider.querySelector(".gs-arrow--left");
    const next = slider.querySelector("[data-next]") || slider.querySelector(".gs-arrow--right");
    if (!track) return;

    function getStep() {
      const first = track.querySelector(".gs-card");
      const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
      const w = first ? first.getBoundingClientRect().width : track.clientWidth;
      return Math.max(0, w + gap);
    }

    function updateArrows() {
      const max = track.scrollWidth - track.clientWidth;
      const hasOverflow = track.scrollWidth > track.clientWidth + 1;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= max - 1;

      if (prev) prev.classList.toggle("is-hidden", !hasOverflow || atStart);
      if (next) next.classList.toggle("is-hidden", !hasOverflow || atEnd);
    }

    function scrollByStep(dir) {
      const step = getStep();
      const target = Math.max(0, Math.min(track.scrollLeft + dir * step, track.scrollWidth));
      track.scrollTo({ left: target, behavior: "smooth" });
      requestAnimationFrame(() => setTimeout(updateArrows, 180));
    }

    prev && prev.addEventListener("click", () => scrollByStep(-1));
    next && next.addEventListener("click", () => scrollByStep(+1));
    track.addEventListener("scroll", updateArrows, { passive: true });

    let isDown = false, startX = 0, startLeft = 0;
    const onDown = x => { isDown = true; startX = x; startLeft = track.scrollLeft; track.classList.add("is-dragging"); };
    const onMove = x => { if (!isDown) return; track.scrollLeft = startLeft - (x - startX); };
    const onUp = () => { if (!isDown) return; isDown = false; track.classList.remove("is-dragging"); updateArrows(); };

    track.addEventListener("mousedown", e => { e.preventDefault(); onDown(e.clientX); });
    window.addEventListener("mousemove", e => onMove(e.clientX));
    window.addEventListener("mouseup", onUp);
    track.addEventListener("mouseleave", onUp);

    track.addEventListener("touchstart", e => onDown(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchmove", e => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", onUp, { passive: true });

    track.addEventListener("wheel", e => {
      const dx = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (!dx) return;
      e.preventDefault();
      track.scrollBy({ left: dx, behavior: "smooth" });
      requestAnimationFrame(updateArrows);
    }, { passive: false });

    const update = () => updateArrows();
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(update);
      ro.observe(track);
      Array.from(track.children).forEach(el => ro.observe(el));
    } else {
      window.addEventListener("resize", update);
    }

    requestAnimationFrame(updateArrows);
  }
})();
document.addEventListener('DOMContentLoaded', () => {
  initGlideTracks('.gs-track');
  initArrowControls();
});

/**
 * Enable smooth, momentum-based dragging on horizontal scrollers.
 * Accepts a selector (NodeList supported).
 */
function initGlideTracks(selector) {
  const tracks = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  tracks.forEach(track => enableGlide(track));
}

function enableGlide(track) {
  track.style.overflowX = track.style.overflowX || 'auto';
  track.style.scrollBehavior = 'auto';

  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let lastX = 0;
  let vel = 0;
  let rafId = null;

  const cancelMomentum = () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; };

  const momentum = () => {
    track.scrollLeft -= vel;
    vel *= 0.95;
    if (track.scrollLeft <= 0 || track.scrollLeft >= track.scrollWidth - track.clientWidth) {
      vel = 0;
    }
    if (Math.abs(vel) > 0.5) {
      rafId = requestAnimationFrame(momentum);
    } else {
      rafId = null;
    }
  };

  track.addEventListener('pointerdown', e => {
    isDown = true;
    track.classList.add('is-dragging');
    startX = e.clientX;
    startScroll = track.scrollLeft;
    lastX = e.clientX;
    vel = 0;
    cancelMomentum();
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', e => {
    if (!isDown) return;
    const x = e.clientX;
    const dx = x - lastX;
    vel = dx;
    track.scrollLeft = startScroll - (x - startX);
    lastX = x;
  });

  const endDrag = e => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    try { track.releasePointerCapture(e.pointerId); } catch { }
    momentum();
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('mouseleave', () => { if (isDown) endDrag(new PointerEvent('pointerup')); });

  track.addEventListener('wheel', e => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 0) {
      track.scrollLeft += delta;
      e.preventDefault();
    }
  }, { passive: false });

  track.addEventListener('click', e => {
    if (Math.abs(vel) > 2) e.preventDefault();
  }, true);
}

/**
 * Optional: if you have arrow buttons with .gs-arrow and data-next / data-prev
 * placed next to a .gs-track in the same .gs-slider container.
 */
function initArrowControls() {
  const arrows = document.querySelectorAll('.gs-arrow');
  arrows.forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = btn.closest('.gs-slider') || document;
      const track = slider.querySelector('.gs-track');
      if (!track) return;

      const card = track.querySelector('.gs-card');
      const step = card ? (card.getBoundingClientRect().width + getGap(track)) : track.clientWidth * 0.8;

      track.scrollTo({
        left: track.scrollLeft + (btn.dataset.next != null ? step : -step),
        behavior: 'smooth'
      });
    });
  });
}

function getGap(track) {
  const cs = getComputedStyle(track);
  const gap = parseFloat(cs.columnGap || cs.gap || '0');
  return isNaN(gap) ? 0 : gap;
}
(function () {
  const form = document.getElementById('heroSearchForm');
  const input = document.getElementById('heroSearchInput');
  const clear = document.getElementById('heroSearchClear');

  const cardEls = Array.from(document.querySelectorAll('.gs-card'));
  const cardData = cardEls.map(card => ({
    el: card,
    text: (card.querySelector('h3')?.textContent || '').toLowerCase()
  }));

  function applyFilter(q) {
    const term = q.trim().toLowerCase();
    cardData.forEach(({ el, text }) => {
      el.style.display = !term || text.includes(term) ? '' : 'none';
    });
  }

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    applyFilter(input.value);

    // scroll down to Featured
    const target = document.querySelector('#featured');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // put #featured in the URL without jumping
      history.replaceState(null, '', '#featured');
    }
  });

  input.addEventListener('input', () => applyFilter(input.value));

  // only if you actually have a clear button in the DOM
  clear?.addEventListener('click', () => {
    input.value = '';
    applyFilter('');
  });
}
}
)();
