/**
 * RetroSpin - Theme & Direction Handler
 * Manages Dark/Light mode and RTL/LTR text direction with localStorage persistence.
 */

const THEME_KEY = "retrospin_theme";
const DIR_KEY = "retrospin_dir";

// Immediate execution to prevent flash of wrong theme/direction
(function initThemeAndDirection() {
  // Theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Direction
  const savedDir = localStorage.getItem(DIR_KEY) || "ltr";
  document.documentElement.setAttribute("dir", savedDir);
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  updateThemeIcons(isDark);
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute("dir") || "ltr";
  const newDir = currentDir === "ltr" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", newDir);
  localStorage.setItem(DIR_KEY, newDir);
  updateDirButtons(newDir);
}

function updateThemeIcons(isDark) {
  const moonIcons = document.querySelectorAll(".theme-icon-moon");
  const sunIcons = document.querySelectorAll(".theme-icon-sun");
  
  moonIcons.forEach(icon => {
    if (isDark) {
      icon.classList.add("hidden");
    } else {
      icon.classList.remove("hidden");
    }
  });

  sunIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove("hidden");
    } else {
      icon.classList.add("hidden");
    }
  });
}

function updateDirButtons(currentDir) {
  const dirLabels = document.querySelectorAll(".dir-toggle-label");
  dirLabels.forEach(label => {
    label.textContent = currentDir === "rtl" ? "LTR" : "RTL";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isDark = document.documentElement.classList.contains("dark");
  const currentDir = document.documentElement.getAttribute("dir") || "ltr";
  updateThemeIcons(isDark);
  updateDirButtons(currentDir);

  // Bind toggle clicks
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  document.querySelectorAll(".dir-toggle-btn").forEach(btn => {
    btn.addEventListener("click", toggleDirection);
  });
});
