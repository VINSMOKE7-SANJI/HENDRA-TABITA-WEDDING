// 1. COUNTDOWN FIX (SOLUSI NO 5)
const weddingDate = new Date("April 26, 2026 13:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days < 10 ? "0"+days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0"+hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0"+minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0"+seconds : seconds;
    }

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "HARI BAHAGIA TELAH TIBA";
    }
}, 1000);

// 2. SLIDESHOW LOGIC
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";  
    }
    setTimeout(showSlides, 3000); 
}

// 3. BUKA UNDANGAN & MUSIK (SOLUSI NO 4 & 5)
const audio = document.getElementById('wedding-audio');

function openInvitation() {
    // Transisi Out Cover
    document.getElementById('cover-overlay').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('cover-overlay').style.display = 'none';
        document.getElementById('main-invitation').style.display = 'block';
        document.getElementById('music-control').style.display = 'flex';
        
        // Jalankan Slideshow Foto
        showSlides();

        // Putar Video Background
        const video = document.getElementById('bg-video');
        if (video) video.play();
    }, 1000);

    // Paksa Musik Jalan (Interaksi User Langsung)
    if (audio) {
        audio.play().catch(error => console.log("Autoplay blocked"));
    }
}

// 4. MUSIC TOGGLE
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.getElementById('music-icon').innerText = "🎵";
    } else {
        audio.pause();
        document.getElementById('music-icon').innerText = "🔇";
    }
}

// 5. COPY REK
function copyAccount() {
    const acc = "8620684253";
    navigator.clipboard.writeText(acc).then(() => {
        alert("Nomor rekening BCA berhasil disalin!");
    });
}

// URL Guest Name
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
if (guest && document.getElementById('guest-name')) {
    document.getElementById('guest-name').innerText = guest;
}
