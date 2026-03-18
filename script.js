// Atur tanggal pernikahan di sini (Format: Tahun, Bulan-1, Tanggal, Jam, Menit)
// Bulan dimulai dari 0 (Januari = 0, Februari = 1, dst.)
const weddingDate = new Date(2027, 1, 1, 09, 0, 0).getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "HARI H TELAH TIBA!";
    }
}, 1000);