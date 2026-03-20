// 1. Perbaikan Tanggal (April = Indeks 3)
const weddingDate = new Date("April 26, 2026 13:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0"+days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0"+hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0"+minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0"+seconds : seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "HARI H TELAH TIBA";
    }
}, 1000);

// 2. Logika Slideshow
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// 3. Buka Undangan & Musik
const audio = document.getElementById("wedding-audio");

function openInvitation() {
    document.getElementById("cover-overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        showSlides(); // Start slideshow setelah dibuka
        if (audio) audio.play();
        const v = document.getElementById("bg-video");
        if(v) v.play();
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
    alert("Nomor rekening berhasil disalin!");
}