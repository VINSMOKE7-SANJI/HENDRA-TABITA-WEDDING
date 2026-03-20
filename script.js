// 1. SET TANGGAL HARI H (26 April 2026)
// Ingat: Bulan Januari = 0, April = 3
const weddingDate = new Date(2026, 3, 26, 13, 0, 0).getTime();

// 2. LOGIKA COUNTDOWN
const countdownInterval = setInterval(function() {
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
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "HARI BAHAGIA TELAH TIBA!";
    }
}, 1000);

// 3. LOGIKA SLIDESHOW
let slideIndex = 0;
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";  
    }
    setTimeout(showSlides, 3000); // 3 detik ganti foto
}

// 4. FUNGSI BUKA UNDANGAN (Hanya satu fungsi, tidak boleh duplikat)
const audio = document.getElementById('wedding-audio');

function openInvitation() {
    // Sembunyikan Cover
    const cover = document.getElementById('cover-overlay');
    cover.style.opacity = '0';
    setTimeout(() => {
        cover.style.display = 'none';
        // Munculkan tombol musik
        document.getElementById('music-control').style.display = 'flex';
    }, 1000);

    // Tampilkan Konten
    document.getElementById('main-invitation').style.display = 'block';

    // Jalankan Video & Slideshow
    const video = document.getElementById('bg-video');
    if (video) video.play();
    showSlides();

    // Jalankan Musik
    if (audio) {
        audio.play();
    }
}

// 5. KONTROL MUSIK ON/OFF
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.getElementById('music-icon').innerText = "🎵";
    } else {
        audio.pause();
        document.getElementById('music-icon').innerText = "🔇";
    }
}

// 6. SALIN REKENING
function copyAccount() {
    navigator.clipboard.writeText("8620684253").then(() => {
        alert("Nomor rekening BCA disalin!");
    });
}

// Ambil nama tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
if (guest) {
    document.getElementById('guest-name').innerText = guest;
}