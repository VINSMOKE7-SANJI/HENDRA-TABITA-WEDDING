// --- KONFIGURASI ---
const audio = document.getElementById("wedding-audio");
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAl5nE_baQDTPC7hL72WaAnmj/pub?output=csv';

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
        
        if (audio) {
            audio.play().catch(e => console.log("Autoplay dicegah browser, musik menunggu interaksi."));
        }
        
        // Jalankan semua fitur pendukung
        showSlides();
        checkReveal();
        triggerFallingText();
        setInterval(updateCountdown, 1000); 
        
        // Jalankan pengambil ucapan melayang
        fetchWishes(); 
    }, 800);
}

// 2. FUNGSI COUNTDOWN
function updateCountdown() {
    const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap > 0) {
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        const ids = ["days", "hours", "minutes", "seconds"];
        const vals = [d, h, m, s];
        
        ids.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) el.innerText = vals[i] < 10 ? "0" + vals[i] : vals[i];
        });
    }
}

// 3. ANIMASI TEKS JATUH
function prepareFallingText() {
    const container = document.getElementById('glow-text-falling');
    const text = "THE WEDDING OF";
    if (!container) return;
    container.innerHTML = "";
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add('glow-rainbow-char');
        container.appendChild(span);
    });
}
prepareFallingText();

function triggerFallingText() {
    const chars = document.querySelectorAll('.glow-rainbow-char');
    chars.forEach((span, i) => {
        setTimeout(() => {
            span.classList.add('char-falling');
            setTimeout(() => span.classList.add('rainbow-neon'), 800);
        }, i * 120);
    });
}

// 4. AMBIL DATA DARI GOOGLE SHEETS (ANTI-GAGAL)
async function fetchWishes() {
    try {
        // Tambahkan timestamp agar browser tidak mengambil data lama (cache)
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const data = await response.text();
        
        // Memecah baris CSV dan membersihkan baris kosong
        const rows = data.split(/\r?\n/).slice(1).filter(r => r.trim() !== "");
        
        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            // Memecah kolom dengan memperhatikan tanda kutip
            const row = rows[i];
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (columns && columns.length >= 2) {
                // Kolom 1 biasanya Nama, Kolom 2 Pesan (Sesuai Form kamu)
                let rawName = columns[1] || "Tamu";
                let rawWish = columns[2] || "Selamat!";
                
                // Bersihkan tanda kutip dari teks
                let name = rawName.replace(/^"|"$/g, "").trim();
                let wish = rawWish.replace(/^"|"$/g, "").trim();
                
                showToast(name, wish);
            }
            i = (i + 1) % rows.length;
        }, 8000); // Muncul setiap 8 detik
    } catch (err) {
        console.error("Koneksi Sheets Bermasalah:", err);
    }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<b>${name}</b> "${wish}"`;
    
    container.appendChild(toast);
    
    // Hapus otomatis elemen agar tidak membebani memori
    setTimeout(() => {
        toast.remove();
    }, 6000);
}

// 5. FITUR PENDUKUNG LAINNYA
function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if (!name) { alert("Nama jangan kosong kawan!"); return; }
    const msg = `Halo Hendra & Destanu, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    if (s.length === 0) return;
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    s[sIndex-1].style.display = "block";
    setTimeout(showSlides, 3500);
}

function checkReveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) {
            r.classList.add("active");
        }
    });
}
window.addEventListener("scroll", checkReveal);

function toggleMusic() {
    if (!audio) return;
    const icon = document.getElementById("music-icon");
    if (audio.paused) { audio.play(); icon.innerText = "🎵"; } 
    else { audio.pause(); icon.innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening BCA disalin!");
}