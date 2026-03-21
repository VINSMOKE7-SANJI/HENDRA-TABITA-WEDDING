// 1. COUNTDOWN
const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const d = weddingDate - now;
    document.getElementById("days").innerText = Math.floor(d / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((d % (1000 * 60)) / 1000);
}, 1000);

// 2. SLIDESHOW
let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    if(s[sIndex-1]) s[sIndex-1].style.display = "block";
    setTimeout(showSlides, 4000);
}

// 3. REVEAL ON SCROLL (ANIMASI PPT)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// 4. OPEN INVITATION
const audio = document.getElementById("wedding-audio");
function openInvitation() {
    document.getElementById("cover-overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        showSlides();
        reveal(); // Trigger animasi pertama
        if(audio) audio.play();
        
        // AUTO SCROLL SEDIKIT AGAR USER TAHU BISA DI SCROLL
        window.scrollBy(0, 100);
    }, 1000);
}

function toggleMusic() {
    if (audio.paused) { audio.play(); document.getElementById("music-icon").innerText = "🎵"; }
    else { audio.pause(); document.getElementById("music-icon").innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening disalin!");
}