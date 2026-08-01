window.GameLevels = window.GameLevels || {};

window.GameLevels.vault = {
  render() {
    return `
      <section class="screen">
        <div class="panel">
          <p class="eyebrow">MISIÓN 04</p>
          <h2>La caja fuerte</h2>
          <p>
            Escriba el codigo de la caja fuerte.
          </p>

          <input
            id="vault-code"
            class="vault-input"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            maxlength="4"
            placeholder="••••"
            aria-label="Código de la caja fuerte"
          >

          <button id="open-vault" class="primary-button" type="button">
            Abrir
          </button>

          <p id="vault-feedback" class="feedback"></p>
        </div>
      </section>
    `;
  },

  mount({ goTo, updateSave }) {
    const input = document.getElementById("vault-code");
    const feedback = document.getElementById("vault-feedback");

    function openVault() {
      const code = input.value.replace(/\D/g, "");

      if (code !== "2020") {
        feedback.textContent = "Pista: Año en el que todo empezo.";
        return;
      }

      feedback.textContent = "Caja abierta. Encontraste mi carta.";
      updateSave({ vaultSolved: true });

      setTimeout(() => {
        goTo("ending");
      }, 1000);
    }

    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 4);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        openVault();
      }
    });

    document
      .getElementById("open-vault")
      .addEventListener("click", openVault);
  }
};
