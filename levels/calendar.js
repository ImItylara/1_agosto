window.GameLevels = window.GameLevels || {};

window.GameLevels.calendar = {
  render() {
    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    return `
      <section class="screen">
        <div class="panel">
          <p class="eyebrow">MISIÓN 03</p>
          <h2>Encuentra el día</h2>
          <p>Solo una fecha abre el camino hacia el último regalo.</p>

          <div class="calendar">
            ${days
              .map(
                (day) => `
                  <button class="calendar-day" type="button" data-day="${day}">
                    ${day}
                  </button>
                `
              )
              .join("")}
          </div>

          <p id="calendar-feedback" class="feedback"></p>
        </div>
      </section>
    `;
  },

  mount({ goTo, updateSave }) {
    const feedback = document.getElementById("calendar-feedback");

    document.querySelectorAll("[data-day]").forEach((button) => {
      button.addEventListener("click", () => {
        const day = Number(button.dataset.day);

        if (day !== 28) {
          feedback.textContent =
            "Ese día no… busque la fecha en que la distancia dejará de ganar.";
          return;
        }

        button.classList.add("is-selected");
        feedback.textContent = "28 de diciembre: destino desbloqueado ❤️";
        updateSave({ calendarSolved: true });

        setTimeout(() => {
          goTo("vault");
        }, 1150);
      });
    });
  }
};
