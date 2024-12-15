const sitePreference = document.documentElement.getAttribute("data-default-appearance");

function getCSSValue(varName) {
  var cssValue = window.getComputedStyle(document.documentElement).getPropertyValue(varName);
  return "rgb(" + cssValue.replace(/\s+/g, "") + ")";
}

function setThemeColor(event) {
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (document.documentElement.classList.contains("dark")) {
    metaThemeColor.setAttribute("content", getCSSValue("--color-neutral-800"));
    if (window.REMARK42) {
      window.REMARK42.changeTheme("dark");
    }
  } else {
    metaThemeColor.setAttribute("content", getCSSValue("--color-neutral"));
    if (window.REMARK42) {
      window.REMARK42.changeTheme("light");
    }
  }
  return true;
}

if (sitePreference === "dark") {
  document.documentElement.classList.add("dark");
  setThemeColor();
}

if (document.documentElement.getAttribute("data-auto-appearance") === "true") {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark");
    setThemeColor();
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (event.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setThemeColor();
  });
}

window.addEventListener("DOMContentLoaded", setThemeColor);
