window.GameLevels = window.GameLevels || {};

window.GameLevels.quiz = {
  questions: [
    {
      question: "¿Cuál es el apodo con el que más le digo?",
      options: ["Guapa", "Princesa", "Bebé", "Mi amor"],
      correct: 3
    },
    {
      question: "¿Cuál es nuestra canción?",
      options: ["Contigo", "Latch", "Ninguna", "No lo recuerdo"],
      correct: [0,1]
    },
    {
      question: "¿Cuál fue la primera película o serie que vimos juntos?",
      options: ["Raya y el ultimo dragon", "El dragón de la tetera", "Shuerk 2", "Suzume"],
      correct: [0,1]
    },
    {
      question: "¿Qué es lo que más ansiamos?",
      options: [
        "Vivir juntos",
        "Vernos en persona",
        "Darnos un abrazo",
        "Casarnos",
        "Vivir juntos",
        "Todas las anteriores"
      ],
      correct: 5
    },
    {
      question: "¿Cuánto la quiero?",
      options: [
        "Mucho",
        "Poquito",
        "Bastante",
        "La quiero un millón ochocientos mil trillones de infinitos, multiplicados por todas las estrellas del universo entero y devueltos a multiplicar por todos los granitos de arena de todas las playas del planeta"
      ],
      correct: 3
    }
  ],

  render({ save }) {
    return `
      <section class="screen">
        <div class="panel">
          <p class="eyebrow">MISIÓN 01</p>
          <h2>¿Cuánto sabe de nosotros?</h2>

            <div class="route">
            <span>🇵🇪 Yo</span>

            <div class="route-line">
              <span class="route-light"></span>
            </div>

            <span>🇭🇳 Mi vida</span>
          </div>

          <div id="quiz-stars" class="progress-stars">
            ${"★ ".repeat(save.quizScore || 0)}${"☆ ".repeat(5 - (save.quizScore || 0))}
          </div>

          <div id="question-container"></div>
          <p id="quiz-feedback" class="feedback"></p>
        </div>
      </section>
    `;
  },

  mount({ goTo, updateSave }) {
    const questions = this.questions;
    let questionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById("question-container");
    const feedback = document.getElementById("quiz-feedback");
    const progress = document.getElementById("quiz-stars");

    function renderQuestion() {
      const item = questions[questionIndex];

      questionContainer.innerHTML = `
        <h3>${item.question}</h3>
        <div class="answer-list">
          ${item.options
            .map(
              (option, index) => `
                <button class="answer-button" type="button" data-answer="${index}">
                  ${option}
                </button>
              `
            )
            .join("")}
        </div>
      `;

      questionContainer
        .querySelectorAll("[data-answer]")
        .forEach((button) => {
          button.addEventListener("click", () => {
            answerQuestion(Number(button.dataset.answer));
          });
        });
    }

    function answerQuestion(selectedIndex) {
      const item = questions[questionIndex];
      const isCorrect = Array.isArray(item.correct)
        ? item.correct.includes(selectedIndex)
        : selectedIndex === item.correct;

      if (isCorrect) {
        score += 1;
        feedback.textContent = "Correcto. Una estrella acaba de encenderse ✦";
      } else {
        feedback.textContent =
          "Casi… todavía nos quedan muchos recuerdos por aprender juntos.";
      }

      progress.textContent = `${"★ ".repeat(score)}${"☆ ".repeat(5 - score)}`;
      questionIndex += 1;

      setTimeout(() => {
        feedback.textContent = "";

        if (questionIndex < questions.length) {
          renderQuestion();
          return;
        }

        updateSave({ quizScore: score });
        goTo("stars");
      }, 950);
    }

    renderQuestion();
  }
};
