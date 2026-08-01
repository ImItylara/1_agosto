window.GameLevels = window.GameLevels || {};

window.GameLevels.ending = {
  render() {
    return `
      <section class="screen">
        <div class="panel panel--letter">
          <p class="eyebrow">RECOMPENSA FINAL</p>
          <h2>Para usted mi vida hermosa</h2>

          <div class="letter-text">
          <p>
            Es curioso, ¿no, mi amor? En este mundo, con tantas personas de tantas maneras, nuestro encuentro fue una coincidencia, pero que con el paso del tiempo esa coincidencia se convirtió en el inicio de una historia tan hermosa. Pensar en aquel día en el que una señorita hermosa me pasó su número, confiando en un total desconocido, para pasar horas y horas en llamadas, madrugadas compartidas, actividades compartidas, tantos momentos únicos que formamos y vamos a formar.
          </p>

          <p>
            Desde entonces, no ha existido un solo día en el que usted no ocupe un lugar especial en mis pensamientos. Hay días en los que basta recordar su voz para sonreír; otros, simplemente imaginar cómo sería tenerla a mi lado me llena de besitos. Usted logró convertirse en mi lugar seguro, en esa persona con la que puedo ser completamente yo, y me alegra decir que yo también me volví el suyo.
          </p>

          <p>
            Cada momento que hemos compartido, por pequeño que parezca, tiene un significado inmenso para mí. Cada conversación hasta la madrugada, cada risa, cada broma, cada regaño, cada "buenos días, mi amor" y cada "buenas noches, mi corazón de melocotón" han ido formando recuerdos que guardo como algunos de los tesoros más valiosos de mi vida. Nuestra conexión es algo que todavía me cuesta explicar con palabras; simplemente se siente. Es esa tranquilidad de saber que, aunque la distancia exista, aprendimos a querernos sin un abrazo o sin un contacto que, la verdad, no me imagino cuando ya estemos cerca. Nadie ni nada nos va a separar.
          </p>

          <p>
            Y mientras más pasa el tiempo, más comprendo que el cariño que siento por usted no deja de crecer. No es un sentimiento pasajero ni algo que dependa de una acción, es algo que nace cada día al verla sonreír, al escucharla hablar de sus sueños, que se vuelven nuestros sueños, al admirar la persona tan maravillosa que es. Usted se ha convertido en una parte muy importante de mi vida, y agradezco profundamente aquella coincidencia o al destino que logró que pudiera conocerla, mi vida.
          </p>

          <p>
            Sé que en algunas ocasiones podemos pasar momentos malos, como buenos, pero quiero que siempre recuerde que en esta vida y en todas mis vidas, sin duda la volvería a elegir. La buscaría sin descanso para volverle a mostrar todo mi cariño y todo mi amor...
          </p>

          <p class="signature">
            Con amor,<br>
            Christopher ❤️
          </p>
          </div>

          <div class="empty-frame" aria-label="Marco reservado para nuestra primera foto juntos">
            <span>♡</span>
          </div>

          <h2>Nuestra primera foto juntos</h2>
          <p style="text-align:center">
            Todavía no existe, pero ya tiene un lugar reservado.
          </p>

          <div style="text-align:center">
            <button id="restart-game" class="secondary-button" type="button">
              Volver a empezar
            </button>
          </div>
        </div>
      </section>
    `;
  },

  mount({ goTo, updateSave, resetSave }) {
    updateSave({ finished: true });

    document
      .getElementById("restart-game")
      .addEventListener("click", () => {
        resetSave();
        goTo("intro");
      });
  }
};
