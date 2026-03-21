// 1. OPEN INVITATION
function openInvitation() {
    const audio = document.getElementById("wedding-audio");
    document.getElementById("cover-overlay").style.opacity = "0";
    
    setTimeout(() => {
        document.getElementById("cover-overlay").style.display = "none";
        document.getElementById("main-invitation").style.display = "block";
        document.getElementById("music-control").style.display = "flex";
        showSlides();
        checkReveal();
        if(audio) audio.play();
    }, 1000);
}

// 2. SLIDESHOW
let sIndex = 0;
function showSlides() {
    let s = document.getElementsByClassName("mySlides");
    for (let i = 0; i < s.length; i++) s[i].style.display = "none";
    sIndex++;
    if (sIndex > s.length) sIndex = 1;
    if(s[sIndex-1]) s[sIndex-1].style.display = "block";
    setTimeout(showSlides, 4000);
}

// 3. REVEAL ANIMATION
function checkReveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        let windowHeight = window.innerHeight;
        let elementTop = r.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) r.classList.add("active");
    });
}
window.addEventListener("scroll", checkReveal);

// 4. RSVP WHATSAPP
function sendRSVP() {
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value || "1";

    if(!name) { alert("Tolong isi nama kawan!"); return; }

    const message = `Halo Hendra & Destania, saya ${name}.\n\nKonfirmasi: *${status}*\nJumlah Tamu: ${count} orang.\n\nTerima kasih!`;
    window.open(`https://wa.me/6285743190790?text=${encodeURIComponent(message)}`, '_blank');
}

// 5. MUSIC CONTROL
function toggleMusic() {
    const audio = document.getElementById("wedding-audio");
    if (audio.paused) {
        audio.play();
        document.getElementById("music-icon").innerText = "🎵";
    } else {
        audio.pause();
        document.getElementById("music-icon").innerText = "🔇";
    }
}

function copyAccount() {
    navigator.clipboard.writeText("8620684253");
    alert("Nomor rekening BCA berhasil disalin!");
}