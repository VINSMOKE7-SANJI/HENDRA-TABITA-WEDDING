const audio = document.getElementById("wedding-audio");

// 1. FUNGSI BUKA UNDANGAN (DIPERBAIKI)
function openInvitation() {
    document.getElementById("cover-overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        
        const audio = document.getElementById("wedding-audio");
        if(audio) audio.play();
        
        // Menjalankan semua fungsi animasi & timer
        showSlides();
        checkReveal();
        triggerFallingText();
        setInterval(updateCountdown, 1000); 

        // --- TAMBAHKAN INI AGAR NOTIFIKASI MUNCUL ---
        fetchWishes(); 
        // --------------------------------------------
        
    }, 800);
}

// 2. FUNGSI COUNTDOWN (TAMBAHKAN INI)
function updateCountdown() {
    // Target tanggal: 26 April 2026 jam 13:00 WIB
    const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap > 0) {
        // Menghitung hari, jam, menit, detik
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        // Update ke HTML (Pastikan ID di HTML cocok)
        if(document.getElementById("days")) {
            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }
    }
}

// 3. ANIMASI TEKS JATUH (THE WEDDING OF)
function prepareFallingText() {
    const container = document.getElementById('glow-text-falling');
    const text = "THE WEDDING OF";
    if(!container) return;
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
            // Efek pelangi muncul setelah jatuh selesai
            setTimeout(() => span.classList.add('rainbow-neon'), 800);
        }, i * 120);
    });
}

// 4. RSVP WHATSAPP (Nomor sudah benar)
function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    
    if(!name) { alert("Nama jangan kosong kawan!"); return; }
    
    const msg = `Halo Hendra & Destanu, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    // Mengarahkan ke nomor yang tertera di screenshot
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

// 5. SLIDESHOW HERO
let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    if(s.length === 0) return; // Proteksi jika elemen tidak ada
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    s[sIndex-1].style.display = "block";
    setTimeout(showSlides, 3500);
}

// 6. EFEK MUNCUL SAAT SCROLL (REVEAL)
function checkReveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) {
            r.classList.add("active");
        }
    });
}
window.addEventListener("scroll", checkReveal);

// 7. KONTROL MUSIK
function toggleMusic() {
    if (!audio) return;
    const icon = document.getElementById("music-icon");
    if (audio.paused) { 
        audio.play(); 
        if(icon) icon.innerText = "🎵"; 
    } else { 
        audio.pause(); 
        if(icon) icon.innerText = "🔇"; 
    }
}

// 8. SALIN REKENING
function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening BCA disalin!");
}

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAl5nE_baQDTPC7hL72WaAnmj/pub?output=csv';

async function fetchWishes() {
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Buang header
        
        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            const columns = rows[i].split(','); 
            // Pastikan kolom 1 (Nama) dan 2 (Ucapan) ada isinya
            if (columns[1] && columns[2]) {
                const cleanName = columns[1].replace(/"/g, "");
                const cleanWish = columns[2].replace(/"/g, "");
                showToast(cleanName, cleanWish);
            }
            i = (i + 1) % rows.length;
        }, 9000); // Muncul setiap 9 detik
    } catch (err) {
        console.log("Menunggu ucapan pertama masuk...");
    }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<b>${name}</b> "${wish}"`;
    container.appendChild(toast);
    
    setTimeout(() => { toast.remove(); }, 6000);
}

// JANGAN LUPA: Panggil fetchWishes() di dalam fungsi openInvitation() kamu!