const audio = document.getElementById("wedding-audio");

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
    }, 800);
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
    const msg = `Halo Hendra & Destania, saya ${name}.\nKonfirmasi: *${status}*\nJumlah: ${count} orang.`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(msg)}`, '_blank');
}

let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    if(s[sIndex-1]) s[sIndex-1].style.display = "block";
    setTimeout(showSlides, 3500);
}

function checkReveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add("active");
    });
}
window.addEventListener("scroll", checkReveal);

function toggleMusic() {
    if (audio.paused) { audio.play(); document.getElementById("music-icon").innerText = "🎵"; }
    else { audio.pause(); document.getElementById("music-icon").innerText = "🔇"; }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Rekening BCA disalin!");
}