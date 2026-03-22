// --- KONFIGURASI ---
const audio = document.getElementById("wedding-audio");
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAI5nE_baQDTPC7hL72WaAnmj/pub?gid=618440573&single=true&output=csv';

function openInvitation() {
    const cover = document.getElementById("cover-overlay");
    const main = document.getElementById("main-invitation");
    const musicBtn = document.getElementById("music-control");

    if (cover) cover.style.opacity = "0";
    setTimeout(() => {
        if (cover) cover.style.display = "none";
        if (main) main.style.display = "block";
        if (musicBtn) musicBtn.style.display = "flex";
        if (audio) audio.play();
        
        startSlideshow();
        setInterval(updateCountdown, 1000); 
        fetchWishes(); // Jalankan pengambilan data
    }, 1000);
}

// FUNGSI AMBIL DATA - VERSI PALING KUAT
async function fetchWishes() {
    try {
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const rawData = await response.text();
        
        // Pecah baris dan bersihkan
        const rows = rawData.split(/\r?\n/).filter(row => row.trim().length > 0).slice(1);

        if (rows.length === 0) return;

        let currentIndex = 0;
        
        // Interval pemunculan ucapan
        setInterval(() => {
            const currentRow = rows[currentIndex];
            
            // Mencoba split dengan koma atau titik koma
            let cols = currentRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (cols.length < 3) cols = currentRow.split(';');

            if (cols.length >= 3) {
                // Bersihkan kutip dua (") yang sering muncul dari Google CSV
                let wish = cols[1].replace(/"/g, '').trim();
                let name = cols[2].replace(/"/g, '').trim();

                if (name && wish) {
                    showToast(name, wish);
                }
            }
            
            currentIndex = (currentIndex + 1) % rows.length;
        }, 7000); // Muncul setiap 7 detik

    } catch (error) {
        console.log("Gagal mengambil data:", error);
    }
}

function showToast(nama, pesan) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.innerHTML = `<strong>${nama}</strong><br>${pesan}`;
    
    container.appendChild(div);

    // Hapus pesan setelah 5 detik agar layar tidak penuh
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 500);
    }, 5000);
}

// --- FITUR LAINNYA ---
function updateCountdown() {
    const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;
    if (gap > 0) {
        document.getElementById("days").innerText = Math.floor(gap / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((gap % (1000 * 60)) / 1000);
    }
}

let sIdx = 0;
function startSlideshow() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    sIdx++;
    if (sIdx > slides.length) sIdx = 1;
    if (slides[sIdx-1]) slides[sIdx-1].style.display = "block";
    setTimeout(startSlideshow, 3500);
}

function toggleMusic() {
    const icon = document.getElementById("music-icon");
    if (audio.paused) { audio.play(); icon.innerText = "🎵"; } 
    else { audio.pause(); icon.innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening disalin!");
}

function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if (!name) return alert("Isi nama dulu kawan!");
    const msg = `Halo Hendra & Destanu, saya ${name} konfirmasi ${status} (${count} orang).`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add("active");
    });
});