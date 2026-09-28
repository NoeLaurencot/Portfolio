const themeToggleBtn = document.getElementById("theme-toggle");

let curTheme = localStorage.getItem("theme") || "dark";

themeToggleBtn.innerHTML = getThemeIcon()

themeToggleBtn.addEventListener('click', function() {
    let targetTheme = getOppositeTheme(curTheme);

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);

    curTheme = targetTheme;

    themeToggleBtn.innerHTML = getThemeIcon();
});

function getOppositeTheme(theme) {
    return theme === "light" ? "dark" : "light";
}

function getThemeIcon() {
    return curTheme === "light" ? "🌙" : "☀️";
}