function openInvitation() {
    const audio = document.getElementById('wedding-audio');
    const cover = document.getElementById('cover-overlay');
    const main = document.getElementById('main-invitation');
    const video = document.getElementById('bg-video');

    // 1. Hilangkan Cover
    cover.style.opacity = '0';
    setTimeout(() => {
        cover.style.display = 'none';
        main.style.display = 'block';
        document.getElementById('music-control').style.display = 'flex';
        
        // 2. Jalankan Slideshow FOTO
        showSlides(); 

        // 3. Matikan Video Background (Opsional, agar fokus ke Slide Foto)
        if (video) {
            video.pause(); 
            video.style.display = 'none'; 
        }
    }, 1000);

    // 4. Paksa Audio Berjalan (Harus di luar setTimeout agar terbaca interaksi user)
    if (audio) {
        audio.muted = false;
        audio.play().catch(e => console.log("Gagal putar musik:", e));
    }
}

// Pastikan showSlides tidak berjalan otomatis SEBELUM diklik
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Ganti tiap 3 detik
}
