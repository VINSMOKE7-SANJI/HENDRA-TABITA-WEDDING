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

function openInvitation() {
    // 1. Sembunyikan Cover dengan efek pudar
    const cover = document.getElementById('cover-overlay');
    cover.style.opacity = '0';
    setTimeout(() => {
        cover.style.display = 'none';
    }, 1000);

    // 2. Tampilkan Konten Utama
    const mainContent = document.getElementById('main-invitation');
    mainContent.style.display = 'block';

    // 3. Putar Video Otomatis
    const video = document.getElementById('bg-video');
    if (video) {
        video.play();
    }

    // 4. Jalankan Slideshow (Pastikan fungsi showSlides dipanggil di sini)
    showSlides();
}

// Fitur Tambahan: Ambil Nama Tamu dari URL (Misal: ?to=NamaTamu)
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
if (guest) {
    document.getElementById('guest-name').innerText = guest;
}