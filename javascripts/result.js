document.querySelectorAll('button').forEach((btn) => btn.addEventListener('mousedown', function(e) {
  gsap.to(btn, { duration: 0.1, scale: 0.9 });
}));

document.querySelectorAll('button').forEach((btn) => btn.addEventListener('mouseup', function(e) {
  gsap.to(btn, { duration: 0.5, scale: 1, ease: Elastic.easeOut.config(1, 0.2) });
}));
