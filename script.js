// Get elements from the DOM
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions Array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress from session storage (if any)
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to display questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);

      // Restore previous selection if available
      if (savedProgress[index] === choice) {
        choiceElement.checked = true;
      }

      // Event listener to save progress when a choice is selected
      choiceElement.addEventListener("change", () => {
        savedProgress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionDiv.appendChild(choiceElement);
      questionDiv.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });

  // Store the score in local storage
  localStorage.setItem("score", score);

  // Display the score
  scoreElement.textContent = `Your score is ${score} out of 5.`;
}

// Event listener for the submit button
submitButton.addEventListener("click", calculateScore);

// Load last stored score (if any)
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.textContent = `Your score is ${lastScore} out of 5.`;
}

// Render the questions when the page loads
renderQuestions();
