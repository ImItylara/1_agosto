(() => {
  "use strict";

  const STORAGE_KEY = "project-december28-save";
  const app = document.getElementById("app");

  const defaultSave = {
    currentLevel: "intro",
    quizScore: 0,
    completedStars: [],
    calendarSolved: false,
    vaultSolved: false,
    finished: false
  };

  let save = loadSave();

  function loadSave() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...defaultSave, ...(saved || {}) };
    } catch (error) {
      console.warn("No se pudo leer el progreso guardado.", error);
      return { ...defaultSave };
    }
  }

  function storeSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  }

  function updateSave(changes) {
    save = { ...save, ...changes };
    storeSave();
  }

  function resetSave() {
    save = { ...defaultSave };
    storeSave();
  }

  function goTo(levelName) {
    const level = window.GameLevels[levelName];

    if (!level || typeof level.render !== "function") {
      app.innerHTML = `
        <section class="screen">
          <div class="panel">
            <h2>Nivel no disponible</h2>
            <p>Revisa que el archivo levels/${levelName}.js exista.</p>
          </div>
        </section>
      `;
      return;
    }

    updateSave({ currentLevel: levelName });
    app.innerHTML = level.render({ save });

    if (typeof level.mount === "function") {
      level.mount({
        save,
        goTo,
        updateSave,
        resetSave
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Música: iPhone/iPad exige que la usuaria pulse el botón.
  const music = document.getElementById("background-music");
  const musicButton = document.getElementById("music-button");

  musicButton.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicButton.textContent = "♫";
        musicButton.classList.add("is-playing");
      } else {
        music.pause();
        musicButton.textContent = "♪";
        musicButton.classList.remove("is-playing");
      }
    } catch (error) {
      alert(
        "Coloca un MP3 llamado nuestra-cancion.mp3 dentro de assets/music/."
      );
    }
  });

  // Fondo animado sin librerías externas.
  const canvas = document.getElementById("background-stars");
  const context = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = Array.from(
      { length: Math.max(65, Math.floor(window.innerWidth / 5)) },
      () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.4 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.012 + 0.003
      })
    );
  }

  function drawBackground() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const gradient = context.createRadialGradient(
      width * 0.5,
      height * 0.43,
      0,
      width * 0.5,
      height * 0.43,
      Math.max(width, height)
    );

    gradient.addColorStop(0, "#1a1832");
    gradient.addColorStop(1, "#060710");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.phase += particle.speed;
      const opacity = 0.25 + Math.abs(Math.sin(particle.phase)) * 0.75;

      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );
      context.fillStyle = `rgba(255,255,255,${opacity})`;
      context.fill();
    });

    requestAnimationFrame(drawBackground);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawBackground();

  // Exponer solo lo necesario para los niveles.
  window.Game = {
    goTo,
    updateSave,
    resetSave,
    getSave: () => ({ ...save })
  };

  goTo(save.currentLevel || "intro");
})();
