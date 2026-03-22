const audio = document.getElementById("wedding-audio");
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbCobJ5VKCt2HEZCw2Xi7qaSgTTpFlszbrclTrVWkD1CAz3QVcWaFAl5nE_baQDTPC7hL72WaAnmj/pub?output=csv';

function openInvitation() {
    document.getElementById("cover-overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        
        if(audio) audio.play();
        
        showSlides();
        checkReveal();
        triggerFallingText();
        setInterval(updateCountdown, 1000); 
        
        // Panggil penarik ucapan di sini
        fetchWishes(); 
    }, 800);
}

function updateCountdown() {
    const weddingDate = new Date("April 26, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap > 0) {
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }
    }
}

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
            setTimeout(() => span.classList.add('rainbow-neon'), 800);
        }, i * 120);
    });
}

function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";
    if(!name) { alert("Nama jangan kosong kawan!"); return; }
    const msg = `Halo Hendra & Destanu, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    if(s.length === 0) return;
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

async function fetchWishes() {
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').slice(1); 
        if (rows.length === 0) return;

        let i = 0;
        setInterval(() => {
            const columns = rows[i].split(','); 
            if (columns[1] && columns[2]) {
                const cleanName = columns[1].replace(/"/g, "").trim();
                const cleanWish = columns[2].replace(/"/g, "").trim();
                showToast(cleanName, cleanWish);
            }
            i = (i + 1) % rows.length;
        }, 10000); // Muncul setiap 10 detik
    } catch (err) {
        console.log("Error loading wishes.");
    }
}

function showToast(name, wish) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<b>${name}</b> "${wish}"`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 6000);
}