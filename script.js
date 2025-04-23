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

    // —

