/****************
 *  QUIZ LOGIC  *
 ****************/

// ---------- 1.  DATA ----------
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

// ---------- 2.  DOM REFERENCES ----------
const questionsElement = document.getElementById("questions");
const submitBtn        = document.getElementById("submit");
const scoreDiv         = document.getElementById("score");

// ---------- 3.  RENDER QUESTIONS ----------
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear old markup

  // Pull any saved progress from sessionStorage
  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");

  questions.forEach((qObj, qi) => {
    const wrapper = document.createElement("div");

    // Question text
    wrapper.insertAdjacentHTML("beforeend", `<p>${qi + 1}. ${qObj.question}</p>`);

    // Choices -> radio buttons
    qObj.choices.forEach((choice, ci) => {
      const id = `q${qi}_c${ci}`;
      const checked = progress[qi] === choice ? "checked" : "";

      wrapper.insertAdjacentHTML(
        "beforeend",
        `
        <label>
          <input
            type="radio"
            name="q${qi}"
            value="${choice}"
            id="${id}"
            ${checked}
          />
          ${choice}
        </label><br/>
        `
      );
    });

    questionsElement.appendChild(wrapper);
  });
}

// ---------- 4.  SAVE EACH CLICK TO SESSION ----------
function handleChoiceClick(e) {
  if (!e.target.matches("input[type='radio']")) return;

  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");
  const qIndex   = Number(e.target.name.slice(1)); // "q3" -> 3
  progress[qIndex] = e.target.value;               // store chosen text
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// ---------- 5.  SUBMIT QUIZ ----------
function handleSubmit() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");
  let score = 0;

  questions.forEach(({ answer }, qi) => {
    if (progress[qi] === answer) score++;
  });

  // Show result
  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save to localStorage
  localStorage.setItem("score", score);
}

// ---------- 6.  INITIALISATION ----------
renderQuestions();

// Show last score if page re‑loaded after submission
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDiv.textContent = `Your last score was ${lastScore} out of 5.`;
}

// ---------- 7.  EVENT LISTENERS ----------
questionsElement.addEventListener("click", handleChoiceClick);
submitBtn.addEventListener("click", handleSubmit);

