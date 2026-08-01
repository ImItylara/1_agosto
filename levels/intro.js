window.GameLevels = window.GameLevels || {};

window.GameLevels.intro = {
  render() {
    return `
      <section class="screen">
        <div class="panel">
          <p class="eyebrow">3,112.62 km</p>
          <h1>La Encontre</h1>
          <p>
            Para la persona que convirtió miles de kilómetros
            en algo que ya no se siente tan lejos.
          </p>
          <button id="start-game" class="primary-button" type="button">
            Comenzar misión
          </button>
          <p class="small-note">
            Puede activar la canción desde el botón ♪.
          </p>
        </div>
      </section>
    `;
  },

  mount({ goTo }) {
    document
      .getElementById("start-game")
      .addEventListener("click", () => goTo("quiz"));
  }
};
