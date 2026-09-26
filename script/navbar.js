window.addEventListener("scroll", function() {
    let navbar = document.getElementById("navbar");
    let scrollY = this.scrollY;

    if (scrollY > 50) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }
})