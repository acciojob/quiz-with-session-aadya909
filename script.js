/****************
 *  QUIZ LOGIC  *
 ****************/

/* ---------- 1.  DATA ---------- */
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest"
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia"
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa"
  }
];

/* ---------- 2.  DOM REFERENCES ---------- */
const questionsElement = document.getElementById("questions");
const submitBtn        = document.getElementById("submit");
const scoreDiv         = document.getElementById("score");

/* ---------- 3.  RENDER QUESTIONS ---------- */
function renderQuestions() {
  questionsElement.innerHTML = "";                             // clear any old markup
  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");

  questions.forEach((qObj, qi) => {
    const wrapper = document.createElement("div");

    // QUESTION TEXT (no numeric prefix to satisfy Cypress)
    wrapper.insertAdjacentHTML("beforeend", `<p>${qObj.question}</p>`);

    // RADIO BUTTONS
    qObj.choices.forEach((choice, ci) => {
      const id         = `q${qi}_c${ci}`;
      const isChecked  = progress[qi] === choice;              // Boolean
      const checkedAtt = isChecked ? 'checked="true"' : "";    // Cypress wants this

      wrapper.insertAdjacentHTML(
        "beforeend",
        `
        <label>
          <input
            type="radio"
            name="q${qi}"
            value="${choice}"
            id="${id}"
            ${checkedAtt}
          />
          ${choice}
        </label><br/>
        `
      );
    });

    questionsElement.appendChild(wrapper);
  });
}

/* ---------- 4.  SAVE EACH CLICK TO SESSION ---------- */
function handleChoiceClick(e) {
  if (!e.target.matches("input[type='radio']")) return;

  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");
  const qIndex   = Number(e.target.name.slice(1)); // "q3" → 3
  progress[qIndex] = e.target.value;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

/* ---------- 5.  SUBMIT QUIZ ---------- */
function handleSubmit() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");
  let score = 0;

  questions.forEach(({ answer }, qi) => {
    if (progress[qi] === answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
}

/* ---------- 6.  INITIALISATION ---------- */
renderQuestions();

const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDiv.textContent = `Your last score was ${lastScore} out of 5.`;
}

/* ---------- 7.  EVENT LISTENERS ---------- */
questionsElement.addEventListener("click", handleChoiceClick);
submitBtn.addEventListener("click", handleSubmit);


