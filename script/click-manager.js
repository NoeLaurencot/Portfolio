// cursor anim
let cursorCircle = document.getElementById("circle-decoration");

document.addEventListener('click', function() {
    cursorCircle.classList.remove("play-click-anim");

    void cursorCircle.offsetWidth;
    
    cursorCircle.classList.add("play-click-anim");
});