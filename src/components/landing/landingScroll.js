const HEADER_OFFSET = 64;

export function scrollToSection(href) {
  const id = href.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export function handleAnchorClick(href, onNavigate) {
  return (event) => {
    event.preventDefault();
    scrollToSection(href);
    onNavigate?.();
  };
}
