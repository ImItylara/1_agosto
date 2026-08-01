window.GameLevels = window.GameLevels || {};

window.GameLevels.stars = {
  correctStars: [1, 4, 6, 8],

  render() {
    const positions = [
      ["12%", "18%"],
      ["42%", "13%"],
      ["76%", "22%"],
      ["23%", "48%"],
      ["55%", "41%"],
      ["82%", "53%"],
      ["37%", "72%"],
      ["68%", "78%"],
      ["14%", "83%"],
      ["88%", "86%"]
    ];

    return `
      <section class="screen">
        <div class="panel">
          <p class="eyebrow">MISIÓN 02</p>
          <h2>El mensaje de las estrellas</h2>
          <p>Toca las cuatro estrellas que brillan con más fuerza.</p>

          <div class="star-field" id="star-field">
            ${positions
              .map(
                ([left, top], index) => `
                  <button
                    class="star-button"
                    type="button"
                    data-star="${index}"
                    style="left:${left}; top:${top};"
                    aria-label="Estrella ${index + 1}"
                  >
                    ✦
                  </button>
                `
              )
              .join("")}
          </div>

          <p id="star-progress" class="feedback">0 / 4 estrellas</p>
          <p id="star-message" class="star-message"></p>
        </div>
      </section>
    `;
  },

  mount({ goTo, updateSave }) {
    const correctStars = this.correctStars;
    const selected = new Set();
    const progress = document.getElementById("star-progress");
    const message = document.getElementById("star-message");

    document.querySelectorAll("[data-star]").forEach((button) => {
      button.addEventListener("click", () => {
        const starIndex = Number(button.dataset.star);

        if (!correctStars.includes(starIndex)) {
          message.textContent = "Esa no era… mira cuáles brillan distinto.";
          return;
        }

        selected.add(starIndex);
        button.classList.add("is-correct");
        progress.textContent = `${selected.size} / ${correctStars.length} estrellas`;
        message.textContent = "";

        if (selected.size === correctStars.length) {
          message.textContent = "Cada día estoy un poco más cerca de ti.";
          updateSave({ completedStars: [...selected] });

          setTimeout(() => {
            goTo("calendar");
          }, 1400);
        }
      });
    });
  }
};
