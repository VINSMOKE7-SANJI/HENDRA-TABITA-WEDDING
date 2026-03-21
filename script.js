// TANGGAL HARI H (26 April 2026)
const weddingDate = new Date("April 26, 2026 13:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}, 1000);

// SLIDESHOW
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// BUKA UNDANGAN
const audio = document.getElementById("wedding-audio");

function openInvitation() {
    document.getElementById("cover-overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        showSlides();
        // Paksa Audio play
        if (audio) {
            audio.muted = false;
            audio.play().catch(e => console.log("Audio play error:", e));
        }
    }, 1000);
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.getElementById("music-icon").innerText = "🎵";
    } else {
        audio.pause();
        document.getElementById("music-icon").innerText = "🔇";
    }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Nomor rekening disalin!");
}