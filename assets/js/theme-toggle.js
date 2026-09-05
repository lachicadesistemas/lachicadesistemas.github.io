// Dark/light theme toggle. Dark is the default; the choice is remembered per-browser.
function toggleSiteTheme() {
  var isLight = document.documentElement.classList.contains('light');
  var next = isLight ? 'dark' : 'light';
  document.documentElement.classList.toggle('light', next === 'light');
  try { localStorage.setItem('site-theme', next); } catch (e) {}
  return false;
}
