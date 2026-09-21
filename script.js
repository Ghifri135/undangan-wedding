// PASANG URL WEB APP DEPLOYMENT GOOGLE APPS SCRIPT KAMU DI SINI
const SCRIPT_URL = "GANTI_DENGAN_URL_DEPLOYMENT_GOOGLE_APPS_SCRIPT_KAMU";

// 1. MEMBACA NAMA TAMU DINAMIS DARI URL PARAMETER (?to=NamaTamu)
window.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to") || urlParams.get("n");

  if (guestParam) {
    // Merapikan tanda hubung / plus menjadi spasi
    const cleanGuestName = decodeURIComponent(guestParam.replace(/\+/g, " "));
    
    // Tampilkan di Halaman Cover
    const guestElement = document.getElementById("guestName");
    if (guestElement) {
      guestElement.innerText = cleanGuestName;
    }

    // Isikan otomatis ke form ucapan & doa
    const inputNama = document.getElementById("nama");
    if (inputNama) {
      inputNama.value = cleanGuestName;
    }
  }
});

// 2. FUNGSI BUKA UNDANGAN
function openInvitation() {
  document.getElementById("cover").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
  toggleMusic(true);
}

// 3. FUNGSI KEMBALI KE COVER
function showCover() {
  document.getElementById("cover").classList.remove("hidden");
  document.getElementById("mainContent").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. FUNGSI SCROLL KE SEKSI LOKASI
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// 5. COUNTDOWN TIMER (01 NOVEMBER 2026)
const targetDate = new Date("November 1, 2026 09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
      document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 6. CONTROLLER MUSIK
const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
let isPlaying = false;

function toggleMusic(forcePlay = false) {
  if (forcePlay || !isPlaying) {
    if (audio) {
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    }
    if (musicBtn) musicBtn.classList.add("rotating");
    isPlaying = true;
  } else {
    if (audio) audio.pause();
    if (musicBtn) musicBtn.classList.remove("rotating");
    isPlaying = false;
  }
}

// 7. FORM SUBMIT UCAPAN & DOA KE GOOGLE SHEETS
const rsvpForm = document.getElementById("rsvpForm");
if (rsvpForm) {
  rsvpForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerText = "Mengirim...";

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch(SCRIPT_URL, { 
      method: 'POST', 
      body: data,
      mode: 'no-cors' 
    })
    .then(() => {
      alert("Terima kasih, ucapan & doa Anda berhasil terkirim!");
      rsvpForm.reset();
      btn.disabled = false;
      btn.innerText = "Kirim Ucapan & Doa";
    })
    .catch(error => {
      alert("Gagal mengirim data.");
      btn.disabled = false;
      btn.innerText = "Kirim Ucapan & Doa";
    });
  });
}