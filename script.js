const audio = document.getElementById("wedding-audio");
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFIszbrcITrVWkD1CAz3QVcWaFAI5nE_baQDTPC7hL72WaAnmj/pub?gid=618440573&single=true&output=csv';

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
        
        startSlideshow();
        setInterval(updateCountdown, 1000);
        fetchWishes(); // Menjalankan sistem ucapan melayang
    }, 1000);
}

async function fetchWishes() {
    try {
        const response = await fetch(csvUrl + '&t=' + new Date().getTime());
        const data = await response.text();
        const rows = data.split(/\r?\n/).slice(1).filter(r => r.trim() !== "");
        
        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            const columns = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length >= 3) {
                // Kolom B (Index 1) = Pesan, Kolom C (Index 2) = Nama
                let wish = columns[1].replace(/^"|"$/g, "").trim();
                let name = columns[2].replace(/^"|"$/g, "").trim();
                showToast(name, wish);
            }
            i = (i + 1) % rows.length;
        }, 8000); 
    } catch (err) { console.error("Error fetching wishes:", err); }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<strong>${name}</strong><br><small>"${wish}"</small>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
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

let slideIdx = 0;
function startSlideshow() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIdx++;
    if (slideIdx > slides.length) slideIdx = 1;
    if (slides[slideIdx-1]) slides[slideIdx-1].style.display = "block";
    setTimeout(startSlideshow, 3000);
}

function toggleMusic() {
    const icon = document.getElementById("music-icon");
    if (audio.paused) { audio.play(); icon.innerText = "🎵"; }
    else { audio.pause(); icon.innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Nomor rekening berhasil disalin!");
}

function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if (!name) return alert("Harap isi nama Anda!");
    const msg = `Halo Hendra & Destanu, saya ${name} konfirmasi ${status} (${count} orang).`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
    });
});