// Memastikan video terputar otomatis di perangkat mobile
window.addEventListener('load', function() {
    const video = document.getElementById('bg-video');
    if (video) {
        video.play().catch(error => {
            console.log("Autoplay dicegah oleh browser, memerlukan interaksi user.");
        });
    }
});

// ... (lanjutkan dengan kode countdown dan slideshow yang sudah ada)

// =========================================
// LOGIKA SLIDESHOW AUTO-PLAY
// =========================================
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    // Mengambil semua elemen dengan class "mySlides"
    let slides = document.getElementsByClassName("mySlides");
    
    // Sembunyikan semua slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Lanjut ke slide berikutnya
    slideIndex++;
    
    // Jika sudah di slide terakhir, kembali ke slide pertama
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }    
    
    // Tampilkan slide yang aktif
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";  
    }
    
    // Ganti foto setiap 5 detik (5000ms)
    setTimeout(showSlides, 5000); 
}