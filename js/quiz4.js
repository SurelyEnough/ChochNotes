(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${currentQuestion.answers[letter]}
                </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "green";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Results: ${numCorrect} out of ${myQuestions.length}`;
  }
  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "1. How does Cole receive the message from Ashley?",
      answers: {
        a: "Through an email",
        b: "Through a text",
        c: "Ashley visits him",
        d: "He sees Ashley through a vision",
      },
      correctAnswer: "b",
    },
    {
      question: "2. Why does Cole have a panic attack in the hockey rink?",
      answers: {
        a: "The doctor tells him that he's not doing it right",
        b: "His friends tell him to stop",
        c: "People yell at him for trying to save the Chief",
        d: "He is reminded of the Wounded Sky fire",
      },
      correctAnswer: "c",
    },
    {
      question:
        "3. What does Cole do after he is accused of murder by Mark at Chief Crate's funeral?",
      answers: {
        a: "He talks to Elder Mariah",
        b: "He calls his grandmother",
        c: "He talks with his friends, who comfort him",
        d: "He walks Alex home",
      },
      correctAnswer: "b",
    },
    {
      question: "4. What makes Tristan and Maggie break up?",
      answers: {
        a: "Tristan overhears Maggie insulting him",
        b: "They get into a public argument",
        c: "Maggie spills beer on Tristan's pants",
        d: "Jayne spills beer on Tristan's pants",
      },
      correctAnswer: "d",
    },
    {
      question: "5. What causes Cole to be stabbed by Scott?",
      answers: {
        a: "He assumes that Scott is unconscious",
        b: "He lunges at Scott and he stabs Cole",
        c: "Scott tries to shoot Eva but Cole jumps to protect her",
        d: "Scott lunges at him and pins him to the ground",
      },
      correctAnswer: "a",
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  // Event listeners
  submitButton.addEventListener("click", showResults);
})();
