/* Greenpact program page — preloader, sticky shell, entrances, and dialogs. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('gp-js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Dual dismissal keeps the preloader from ever stranding the page. */
  var pl = document.getElementById('gp-pl');
  var hero = document.getElementById('gp-program-hero');
  var opened = false;
  function openPage() {
    if (opened) return;
    opened = true;
    if (pl) {
      pl.classList.add('is-done');
      if (reduce) pl.setAttribute('hidden', '');
      else setTimeout(function () { pl.setAttribute('hidden', ''); }, 300);
    }
    if (hero) hero.classList.add('is-open');
  }
  if (reduce) {
    openPage();
  } else {
    window.addEventListener('load', function () { setTimeout(openPage, 400); });
    setTimeout(openPage, 2600);
  }

  /* Sticky nav matches the homepage threshold and state name. */
  var nav = document.getElementById('gp-nav');
  function markNav() {
    if (!nav) return;
    var height = hero ? hero.offsetHeight : window.innerHeight;
    nav.classList.toggle('is-stuck', window.scrollY > height - 120);
  }
  window.addEventListener('scroll', markNav, { passive: true });
  window.addEventListener('resize', markNav);
  markNav();

  /* One-shot entrances. Reduced motion receives the final state immediately. */
  var reveals = [].slice.call(document.querySelectorAll('.gp-reveal'));
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (element) { element.classList.add('is-in'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (element) { revealObserver.observe(element); });
    }
  }

  /* Accessible dialog lifecycle. All click handling is delegated. */
  var activeModal = null;
  var lastTrigger = null;
  var modalTimer = null;
  var backgroundNodes = [];
  var focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function setBackgroundInert(modal, inert) {
    if (inert) {
      backgroundNodes = [].slice.call(document.body.children).filter(function (element) {
        return element !== modal && element.tagName !== 'SCRIPT';
      });
      backgroundNodes.forEach(function (element) { element.inert = true; });
      return;
    }
    backgroundNodes.forEach(function (element) { element.inert = false; });
    backgroundNodes = [];
  }

  function getFocusable(modal) {
    return [].slice.call(modal.querySelectorAll(focusableSelector)).filter(function (element) {
      return !element.hidden && element.getAttribute('aria-hidden') !== 'true';
    });
  }

  function openModal(modal, trigger) {
    if (!modal || activeModal) return;
    if (modalTimer !== null) {
      clearTimeout(modalTimer);
      modalTimer = null;
    }
    activeModal = modal;
    lastTrigger = trigger;
    modal.removeAttribute('hidden');
    document.body.classList.add('gp-modal-open');
    setBackgroundInert(modal, true);

    function showAndFocus() {
      modal.classList.add('is-open');
      var focusable = getFocusable(modal);
      var target = focusable.length ? focusable[0] : modal.querySelector('.gp-modal__panel');
      if (target) target.focus();
    }
    if (reduce) showAndFocus();
    else window.requestAnimationFrame(showAndFocus);
  }

  function closeModal() {
    if (!activeModal) return;
    var modal = activeModal;
    var trigger = lastTrigger;
    activeModal = null;
    lastTrigger = null;
    modal.classList.remove('is-open');

    function finishClose() {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('gp-modal-open');
      setBackgroundInert(modal, false);
      if (trigger && document.contains(trigger)) trigger.focus();
      modalTimer = null;
    }
    if (reduce) finishClose();
    else modalTimer = setTimeout(finishClose, 200);
  }

  function selectThumb(button) {
    var group = button.closest('.gp-modal__thumbs');
    if (!group) return;
    [].slice.call(group.querySelectorAll('.gp-modal__thumb')).forEach(function (thumb) {
      thumb.classList.remove('is-active');
      thumb.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
  }

  function changePhoto(button) {
    var image = document.getElementById(button.getAttribute('data-gp-target'));
    if (!image) return;
    image.setAttribute('src', button.getAttribute('data-gp-src'));
    image.setAttribute('alt', button.getAttribute('data-gp-alt'));
    image.setAttribute('width', button.getAttribute('data-gp-width'));
    image.setAttribute('height', button.getAttribute('data-gp-height'));
    selectThumb(button);
  }

  function changeTypeComposition(button) {
    var media = button.closest('.gp-modal__media--type');
    var stage = media ? media.querySelector('[data-gp-type-stage]') : null;
    if (!stage) return;
    stage.setAttribute('data-variant', button.getAttribute('data-gp-type-thumb'));
    selectThumb(button);
  }

  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-gp-modal-open]');
    if (opener) {
      openModal(document.getElementById(opener.getAttribute('data-gp-modal-open')), opener);
      return;
    }

    if (event.target.closest('[data-gp-modal-close]')) {
      closeModal();
      return;
    }

    var photoThumb = event.target.closest('[data-gp-thumb]');
    if (photoThumb) {
      changePhoto(photoThumb);
      return;
    }

    var typeThumb = event.target.closest('[data-gp-type-thumb]');
    if (typeThumb) {
      changeTypeComposition(typeThumb);
      return;
    }

    if (activeModal && event.target === activeModal && event.target.hasAttribute('data-gp-modal-overlay')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!activeModal) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;

    var focusable = getFocusable(activeModal);
    if (!focusable.length) {
      event.preventDefault();
      activeModal.querySelector('.gp-modal__panel').focus();
      return;
    }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
