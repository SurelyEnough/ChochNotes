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
      question: "1. What does Alex say to Cole about Mark's accusations?",
      answers: {
        a: "That he saved Brady and Eva, and if he hadn't there would be two more graves",
        b: "That Mark is a whiny b**ch",
        c: "That it's time for Cole to face his past and free his guilt",
      },
      correctAnswer: "a",
    },
    {
      question: "2. Which one of these is NOT a contributor to Cole's trauma?",
      answers: {
        a: "Leaving his friends",
        b: "Guilt related to the fire",
        c: "Not saving Jayne",
      },
      correctAnswer: "a",
    },
    {
      question:
        "3. Pick the most (implied) important exhibition of heroism in Cole:",
      answers: {
        a: "Showing resilience when Mark accuses him of murder",
        b: "Comforting and talking with Alex",
        c: "Returning to Wounded Sky",
        d: "Being determined to find Ashley and Alex's killer",
      },
      correctAnswer: "d",
    },
    {
      question:
        "4. Pick the best description of Cole's responses to Mark's accusations",
      answers: {
        a: "He comments on how nobody else has done anything",
        b: "He fires back with angry statements",
        c: "He tries to unite his community by acknowledging his mistakes",
        d: "He argues back with the help of his friends",
      },
      correctAnswer: "b",
    },
    {
      question: "5. How does Cole show heroism confronting the gunman?",
      answers: {
        a: "He risks everything to warn Wayne of the danger Eva's in",
        b: "He disarms Scott by using Jayne's heat",
        c: "He protects Eva and his friends with his strength",
        d: "He lunges at him and pins him to the ground",
      },
      correctAnswer: "c",
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
