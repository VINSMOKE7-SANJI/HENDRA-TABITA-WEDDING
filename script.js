// CONFIG: Gunakan link CSV milikmu
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAI5nE_baQDTPC7hL72WaAnmj/pub?gid=618440573&single=true&output=csv';
const audio = document.getElementById("wedding-audio");

function openInvitation() {
    document.getElementById("cover-overlay").style.display = "none";
    document.getElementById("main-invitation").style.display = "block";
    if (audio) audio.play();
    
    // Jalankan fitur utama
    startCountdown();
    fetchWishes(); 
}

async function fetchWishes() {
    try {
        // Anti-cache: tambahkan timestamp unik di akhir URL
        const response = await fetch(csvUrl + '&cache=' + new Date().getTime());
        const text = await response.text();
        const rows = text.split(/\r?\n/).slice(1); // Potong header

        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            const columns = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length >= 3) {
                // Sesuai screenshot: Kolom 1 (Pesan), Kolom 2 (Nama)
                const msg = columns[1].replace(/"/g, '').trim();
                const sender = columns[2].replace(/"/g, '').trim();
                if (msg && sender) showToast(sender, msg);
            }
            i = (i + 1) % rows.length;
        }, 7000); // Muncul tiap 7 detik
    } catch (e) { console.log("Gagal ambil data"); }
}

function showToast(nama, teks) {
    const container = document.getElementById('toast-container');
    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.innerHTML = `<strong>${nama}</strong><br>${teks}`;
    container.appendChild(div);
    
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 1000);
    }, 5000);
}

function startCountdown() {
    const target = new Date("April 26, 2026 13:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff > 0) {
            document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000);
        }
    }, 1000);
}