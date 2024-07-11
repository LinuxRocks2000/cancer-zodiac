const c2lines = document.getElementById("c2-lines");
const c3crab = document.getElementById("c3-crab");
const spikyspacefriends = document.getElementById("spiky-space-friends");
const doc = document.documentElement;
const astroevent = document.getElementById("astroevent");
const astroconclusion = document.getElementById("astroconclusion");
const planets = document.getElementById("planets");
const planet_divs = Array.from(document.querySelectorAll("#planets > div > div"));
const tobetacanceri = document.getElementById("tobetacanceri");
const thebridge = document.getElementById("thebridge");
const c3crab_animation = [
    "res/cancer-crab.svg",
    "res/cancer-crabwalk.svg"
];
var c3crab_frame = 0;

var scrollDelta = 0; // total pixels scrolled
var scrollDt = 0; // total time spent scrolling

var lastScPos = 0;
var lTime = window.performance.now();

window.onscroll = () => {
    c2lines.style.setProperty("--linespoint", doc.scrollTop * 0.05 + "px");
    c3crab.style.setProperty("--crab-visibility", (doc.scrollTop - 600) * 0.1 + "%"); // this means that we need 1600 pixels of scroll to complete the animation
    // 600 + 100% / 0.1% = 1600
    if (doc.scrollTop >= 1600) {
        c3crab.classList.add("dropped");
    }
    else {
        c3crab.classList.remove("dropped");
    }

    var spikyrect = spikyspacefriends.getBoundingClientRect();
    if (spikyrect.top < window.innerHeight * 0.6) {
        c3crab.classList.add("scootleft");
    }
    else {
        c3crab.classList.remove("scootleft");
    }

    if (spikyrect.bottom < 0) {
        c3crab.classList.add("scootaway");
        c3crab.classList.remove("scootleft");
        c3crab.classList.remove("dropped");
    }
    else {
        c3crab.classList.remove("scootaway");
    }

    document.body.style.setProperty("--scroll-point", doc.scrollTop);
    var rect = planets.getBoundingClientRect();
    planets.style.setProperty("--scroll-point", rect.top);

    var considering = true;
    for (x in planet_divs) {
        var planet = planet_divs[x];
        var hider = planet.getElementsByClassName("planetinfo");
        if (hider.length) {
            hider = hider[0];
        }
        else {
            continue;
        }
        hider.style.display = "none";
        if (considering) {
            var z = rect.top * -3 - 2 * window.innerHeight + parseInt(planet.style.getPropertyValue("--transform-offset"));
            if (z < 0) {
                planet.getElementsByClassName("planetinfo")[0].style.display = "";
                considering = false;
            }
        }
    }
    tobetacanceri.style.setProperty("--scroll-point", 100 * tobetacanceri.getBoundingClientRect().top / window.innerHeight + "%");

    var cTime = window.performance.now()
    scrollDelta += Math.abs(lastScPos - doc.scrollTop);
    scrollDt += cTime - lTime;

    lTime = cTime;
    lastScPos = doc.scrollTop;

    var pixPSec = scrollDelta / scrollDt * 1000;
    var kmPHr = ((pixPSec / 3000) // solar system fields from earth to neptune per second
        / 3600) // per hour
        * 4_500_000_000; // the solar system field from earth to neptune is 4.5 billion kilometers

    var hrtoBC = 2.746e15 / kmPHr;
    var ytoBC = hrtoBC / 8760;
    
    document.getElementById("rawscroll").innerText = Math.round(pixPSec);
    document.getElementById("scrollkph").innerText = Math.round(kmPHr);
    document.getElementById("yearstobetacanceri").innerText = Math.round(ytoBC);

    var thebridge_scrollup = thebridge.parentNode.getBoundingClientRect().top * -1;
    if (thebridge_scrollup < 0) {
        thebridge_scrollup = 0;
    }
    thebridge.parentNode.style.backgroundColor = "rgba(0, 0, 0, " + (1 - thebridge_scrollup / window.innerHeight) + ")";
    thebridge.style.opacity = thebridge_scrollup / window.innerHeight * 100 + "%";
}

var c3crab_interval = -1;

c3crab.addEventListener("transitionrun", () => {
    if (c3crab_interval == -1) {
        c3crab_interval = setInterval(() => {
            c3crab_frame++;
            c3crab.src = c3crab_animation[c3crab_frame % c3crab_animation.length];
        }, 100);
    }
});

c3crab.addEventListener("transitionend", () => {
    clearInterval(c3crab_interval);
    c3crab_frame = 0;
    c3crab.src = c3crab_animation[0];
    c3crab_interval = -1;
});


let astrothings = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "The Moon", "Capricorn", "Aquarius",
    "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Ophiuchus", "Saggitarius"
];

const events = ["rising</b> in", "waning</b> in", "waxing</b> in", "converging</b> with"];

function arpick(array) {
    let index = Math.floor(Math.random() * array.length);
    return array.splice(index, 1)[0];
}

const things = [
    "you must <b>tread carefully</b> today.",
    "you will find a <b>pleasant surprise</b>!",
    "you will meet a ten-thousand-pound rhino named <b>Desmond</b> today.",
    "<b>great opportunities</b> are hiding around every corner.",
    "you must not be afraid to take a <b>leap of faith</b>."
];

astroevent.innerHTML = "Because <b>" + arpick(astrothings) + "</b> is <b>" + arpick(events) + " <b>" + arpick(astrothings) + "</b>,";
astroconclusion.innerHTML = arpick(things);

Array.from(document.getElementsByTagName("p")).forEach(a => {
    a.addEventListener("mouseover", (evt) => {
        //if (Math.random() < 0.15) {
            var shiny = document.createElement("div");
            shiny.classList.add("shiny-star");
            requestAnimationFrame(() => {
                shiny.classList.add("disjoint");
            });
            document.body.appendChild(shiny);
            shiny.style.left = evt.clientX + 20 * Math.random() - 30 + "px";
            shiny.style.top = evt.clientY + 20 * Math.random() - 50 + "px";
            shiny.style.animationDelay = -Math.random() * 2 + "s";
            setTimeout(() => {
                document.body.removeChild(shiny);
            }, 2000);
        //}
    });
});