(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("#theme-toggle");
  const themeLabel = themeButton?.querySelector(".theme-label");
  const widthInput = document.querySelector("#page-width");
  const widthValue = document.querySelector("#page-width-value");
  const themeKey = "robotics-terms-simple-theme";
  const widthKey = "robotics-terms-simple-page-width";

  const readPreference = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const savePreference = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The controls still work for this visit if browser storage is unavailable.
    }
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";

    if (themeButton && themeLabel) {
      themeButton.setAttribute("aria-pressed", String(isDark));
      themeLabel.textContent = isDark ? "Light theme" : "Dark theme";
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  };

  const applyWidth = (value) => {
    const numericValue = Number.parseInt(value, 10);
    const safeValue = Number.isFinite(numericValue)
      ? Math.min(1600, Math.max(700, numericValue))
      : 980;

    root.style.setProperty("--page-width", `${safeValue}px`);

    if (widthInput) {
      widthInput.value = String(safeValue);
    }

    if (widthValue) {
      widthValue.value = `${safeValue} px`;
      widthValue.textContent = `${safeValue} px`;
    }

    return safeValue;
  };

  const savedTheme = readPreference(themeKey);
  const savedWidth = readPreference(widthKey);
  applyTheme(savedTheme === "dark" ? "dark" : "light");
  applyWidth(savedWidth ?? "980");

  themeButton?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    savePreference(themeKey, nextTheme);
  });

  widthInput?.addEventListener("input", (event) => {
    const value = applyWidth(event.currentTarget.value);
    savePreference(widthKey, String(value));
  });
})();
