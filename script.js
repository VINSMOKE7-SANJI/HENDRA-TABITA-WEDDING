// --- KONFIGURASI ---
const audio = document.getElementById("wedding-audio");
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAI5nE_baQDTPC7hL72WaAnmj/pub?gid=618440573&single=true&output=csv';

// 1. FUNGSI BUKA UNDANGAN
function openInvitation() {
    const cover = document.getElementById("cover-overlay");
    const main = document.getElementById("main-invitation");
    const musicBtn = document.getElementById("music-control");

    if (cover) cover.style.opacity = "0";
    setTimeout(() => {
        if (cover) cover.style.display = "none";
        if (main) main.style.display = "block";
        if (musicBtn) musicBtn.style.display = "flex";
        if (audio) audio.play().catch(e => console.log("Playback blocked"));
        
        startSlideshow();
        setInterval(updateCountdown, 1000); 
        fetchWishes(); 
    }, 1000);
}

// 2. AMBIL DATA DARI GOOGLE SHEETS
async function fetchWishes() {
    try {
        console.log("Mencoba mengambil data...");
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const data = await response.text();
        
        // Pecah baris
        const rows = data.split(/\r?\n/).slice(1).filter(r => r.trim() !== "");
        
        if (rows.length === 0) {
            console.log("Data kosong di Sheets.");
            return;
        }

        let i = 0;
        setInterval(() => {
            const row = rows[i];
            
            // DETEKSI PEMISAH: Apakah pakai koma (,) atau titik koma (;)
            let columns = [];
            if (row.includes('","') || row.split(',').length >= 3) {
                columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            } else {
                columns = row.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            }

            if (columns && columns.length >= 3) {
                // Kolom 1: Pesan, Kolom 2: Nama
                let wish = columns[1].replace(/^"|"$/g, "").trim();
                let name = columns[2].replace(/^"|"$/g, "").trim();
                
                if (name && wish) {
                    console.log("Memunculkan ucapan dari:", name);
                    showToast(name, wish);
                }
            }
            i = (i + 1) % rows.length;
        }, 8000); 
    } catch (err) {
        console.error("Error Fetch:", err);
    }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.opacity = "0"; // Start invisible
    toast.innerHTML = `<strong>${name}</strong><br><small>"${wish}"</small>`;
    
    container.appendChild(toast);
    
    // Trigger animation via JS as fallback
    setTimeout(() => { toast.style.opacity = "1"; }, 100);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 6000);
}

// 3. COUNTDOWN & FITUR LAIN
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
    if (!name) return alert("Nama jangan kosong!");
    const msg = `Halo Hendra & Destanu, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add("active");
    });
});