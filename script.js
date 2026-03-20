// Atur tanggal pernikahan di sini (Format: Tahun, Bulan-1, Tanggal, Jam, Menit)
// Contoh: 1 Februari 2027 pukul 13:00 WIB.
// PENTING: Bulan di JavaScript dimulai dari 0 (Januari = 0, Februari = 1)
const weddingDate = new Date(2027, 1, 1, 13, 0, 0).getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Memperbarui elemen HTML
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = formatNumber(days);
        document.getElementById("hours").innerHTML = formatNumber(hours);
        document.getElementById("minutes").innerHTML = formatNumber(minutes);
        document.getElementById("seconds").innerHTML = formatNumber(seconds);
    }

    // Jika waktu hitung mundur habis
    if (distance < 0) {
        clearInterval(x);
        if (document.getElementById("countdown")) {
            document.getElementById("countdown").innerHTML = "<div class='expired'>HARI H TELAH TIBA!</div>";
        }
    }
}, 1000);

// Fungsi pembantu agar angka < 10 ada '0' didepannya (misal: 09)
function formatNumber(num) {
    return num < 10 && num >= 0 ? "0" + num : num;
}