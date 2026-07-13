(function applyInitialTheme() {
  var preference = localStorage.getItem("marc-portfolio-theme") || "system";
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = preference === "system" ? (prefersDark ? "dark" : "light") : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
