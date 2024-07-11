// randomly generate a star field on page load
// it maintains an average of 1 shiny star per 10 square dekapixels and 1 regular star per 2 square dekapixels
// a square dekapixel is 10,000 pixels, 100 to a side

const WINDOW_DEKAPIXELS = window.innerWidth * window.innerHeight / 10_000;
const starfield = document.getElementById("starfield");

for (var x = 0; x < WINDOW_DEKAPIXELS / 10; x++) { // 1 shiny star per 10 dekapixels
    var shiny = document.createElement("div");
    shiny.classList.add("shiny-star");
    starfield.appendChild(shiny);
    shiny.style.left = window.innerWidth * Math.random() + "px";
    shiny.style.top = window.innerHeight * Math.random() + "px";
    shiny.style.animationDelay = -Math.random() * 2 + "s";
}

for (var x = 0; x < WINDOW_DEKAPIXELS / 2; x++) {
    var star = document.createElement("div");
    star.classList.add("star");
    starfield.append(star);
    star.style.left = window.innerWidth * Math.random() + "px";
    star.style.top = window.innerHeight * Math.random() + "px";
}