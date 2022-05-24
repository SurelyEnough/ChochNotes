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
      question:
        "1. Pick the best descriptor of Cole and his friends' relationship at the beginning of the novel:",
      answers: {
        a: "Reunited",
        b: "Strained",
        c: "Broken",
      },
      correctAnswer: "b",
    },
    {
      question: "2. What event first forces Cole and his friends to reunite?",
      answers: {
        a: "Cole having a panic attack in the hockey rink",
        b: "Mark accusing Cole of murder",
        c: "Alex's death",
        d: "Ashley's death",
      },
      correctAnswer: "d",
    },
    {
      question:
        "3. Why does Eva say to Cole that they became 'all different' at the Northern Lights Diner?",
      answers: {
        a: "Years passed since they all were together",
        b: "Ashley and Alex died",
        c: "The fire traumatized them",
        d: "Cole left and abandoned his friends",
      },
      correctAnswer: "c",
    },
    {
      question:
        "4. Cole says at the end of the book, 'I'd like to come back [to Wounded Sky]'. Why did he have a change of heart from the beginning of the novel?",
      answers: {
        a: "He will miss his friends",
        b: "He wants Eva to feel better",
        c: "He knows his community trusts him",
        d: "He has reunited his community and friends",
      },
      correctAnswer: "d",
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
