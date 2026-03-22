// --- KONFIGURASI ---
const audio = document.getElementById("wedding-audio");

// LINK CSV TERBARU (Sesuai screenshot konfirmasi publish kamu)
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAI5nE_baQDTPC7hL72WaAnmj/pub?gid=618440573&single=true&output=csv';

// 1. FUNGSI BUKA UNDANGAN
function openInvitation() {
    const cover = document.getElementById("cover-overlay");
    const main = document.getElementById("main-invitation");
    const musicBtn = document.getElementById("music-control");

    cover.style.opacity = "0";
    setTimeout(() => {
        cover.style.display = "none";
        main.style.display = "block";
        musicBtn.style.display = "flex";
        if (audio) audio.play();
        
        // Jalankan fitur pendukung
        startSlideshow();
        setInterval(updateCountdown, 1000); 
        fetchWishes(); // Jalankan notifikasi ucapan
    }, 1000);
}

// 2. AMBIL DATA DARI GOOGLE SHEETS
async function fetchWishes() {
    try {
        // Tambahkan timestamp agar data selalu fresh (bukan cache)
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const data = await response.text();
        
        // Pecah baris CSV
        const rows = data.split(/\r?\n/).slice(1).filter(r => r.trim() !== "");
        
        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            const row = rows[i];
            // Split kolom dengan aman
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (columns && columns.length >= 3) {
                // Urutan kolom di Sheets kamu:
                // Index 1 (Kolom B) = Pesan & Doa
                // Index 2 (Kolom C) = Nama Anda
                let rawWish = columns[1] || "Selamat!";
                let rawName = columns[2] || "Tamu Undangan";
                
                // Bersihkan tanda kutip jika ada
                let wish = rawWish.replace(/^"|"$/g, "").trim();
                let name = rawName.replace(/^"|"$/g, "").trim();
                
                showToast(name, wish);
            }
            i = (i + 1) % rows.length;
        }, 8000); // Muncul setiap 8 detik
    } catch (err) {
        console.error("Gagal memuat ucapan:", err);
    }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<strong>${name}</strong><br><small>"${wish}"</small>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 6000);
}

// 3. COUNTDOWN TIMER (26 April 2026)
function updateCountdown() {
    const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap > 0) {
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }
}

// 4. FITUR LAIN (Slideshow, Music, Copy, RSVP)
let sIndex = 0;
function startSlideshow() {
    let s = document.getElementsByClassName("mySlides");
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    if (s[sIndex-1]) s[sIndex-1].style.display = "block";
    setTimeout(startSlideshow, 3500);
}

function toggleMusic() {
    const icon = document.getElementById("music-icon");
    if (audio.paused) { audio.play(); icon.innerText = "🎵"; } 
    else { audio.pause(); icon.innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening BCA disalin!");
}

function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if (!name) { alert("Nama tidak boleh kosong!"); return; }
    const msg = `Halo Hendra & Destanu, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add("active");
    });
});