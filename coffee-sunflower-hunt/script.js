const sunflowers = document.querySelectorAll(".sunflower");
const foundCountSpan = document.getElementById("found-count");
const overlay = document.getElementById("overlay");
const clickSound = document.getElementById("click-sound");

let foundCount = 0;
const totalSunflowers = sunflowers.length;

// Attach click listeners
sunflowers.forEach((sf) => {
  sf.addEventListener("click", () => {
    if (sf.classList.contains("found")) return;

    sf.classList.add("found");
    foundCount++;
    foundCountSpan.textContent = foundCount;

    // Play click sound
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }

    // Animate sunflower (spin + fade)
    sf.style.transform = "scale(1.4) rotate(360deg)";
    sf.style.opacity = "0";
    setTimeout(() => {
      sf.style.display = "none";
    }, 300);

    // Check if all found
    if (foundCount === totalSunflowers) {
      triggerCelebration();
    }
  });
});

function triggerCelebration() {
  overlay.classList.remove("hidden");

  // Confetti burst
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ffd86b", "#ff9f43", "#ffffff"]
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ffd86b", "#ff9f43", "#ffffff"]
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
document.body.addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  music.muted = false;
}, { once: true });
