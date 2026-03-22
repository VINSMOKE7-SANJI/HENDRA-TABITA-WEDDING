// --- CONFIG ---
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
        if (audio) audio.play().catch(() => console.log("Music play blocked"));
        
        startSlideshow();
        setInterval(updateCountdown, 1000); 
        fetchWishes(); 
    }, 1000);
}

async function fetchWishes() {
    try {
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const rawData = await response.text();
        const rows = rawData.split(/\r?\n/).filter(r => r.trim().length > 0).slice(1);

        if (rows.length === 0) return;

        let idx = 0;
        setInterval(() => {
            const currentRow = rows[idx];
            let cols = currentRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (cols.length < 3) cols = currentRow.split(';');

            if (cols.length >= 3) {
                // Kolom B (Index 1) = Pesan, Kolom C (Index 2) = Nama
                let wish = cols[1].replace(/"/g, '').trim();
                let name = cols[2].replace(/"/g, '').trim();
                if (name && wish) showToast(name, wish);
            }
            idx = (idx + 1) % rows.length;
        }, 8000); 
    } catch (e) { console.error("CSV Error", e); }
}

function showToast(n, p) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.innerHTML = `<strong>${n}</strong><br>${p}`;
    container.appendChild(div);
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 600);
    }, 6000);
}

function updateCountdown() {
    const target = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = target - now;
    if (gap > 0) {
        document.getElementById("days").innerText = Math.floor(gap / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((gap % (1000 * 60)) / 1000);
    }
}

let sIdx = 0;
function startSlideshow() {
    let s = document.getElementsByClassName("mySlides");
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIdx++;
    if (sIdx > s.length) sIdx = 1;
    if (s[sIdx-1]) s[sIdx-1].style.display = "block";
    setTimeout(startSlideshow, 3500);
}

function toggleMusic() {
    const icon = document.getElementById("music-icon");
    if (audio.paused) { audio.play(); icon.innerText = "🎵"; } 
    else { audio.pause(); icon.innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Nomor rekening BCA disalin!");
}

function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if (!name) return alert("Silakan isi nama Anda!");
    const msg = `Halo Hendra & Destanu, saya ${name} konfirmasi ${status} (${count} orang).`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add("active");
    });
});