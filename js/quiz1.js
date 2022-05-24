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
        "1. Pick the best descriptor of Cole's initial feelings to return to Wounded Sky:",
      answers: {
        a: "Nervous",
        b: "Reluctant",
        c: "Confused",
      },
      correctAnswer: "b",
    },
    {
      question: "2. How does Brady react to seeing Cole in the hockey rink?",
      answers: {
        a: "He is disdainful",
        b: "He is confused, but acts happy",
        c: "He is welcoming",
      },
      correctAnswer: "c",
    },
    {
      question:
        "3. How do Cole's friends feel about him when Mark accuses him of murder at Chief Crate's funeral?",
      answers: {
        a: "They defend Cole",
        b: "They support Cole but secretly question him",
        c: "They agree with Mark and question Cole",
        d: "They say nothing",
      },
      correctAnswer: "a",
    },
    {
      question:
        "4. Pick the best descriptor of Cole and Eva's conversation in the Northern Lights Diner:",
      answers: {
        a: "It was awkward and Eva avoided Cole's questions",
        b: "Eva said that she never liked Michael and missed Cole",
        c: "They talk about their past but Eva says that they're both different now",
        d: "Cole reminscences about their childhood but says that it's not the same anymore",
      },
      correctAnswer: "c",
    },
    {
      question:
        "5. What are Cole's emotions when he responds to the gunman for the second time?",
      answers: {
        a: "He is calm because of Eva holding him at gunpoint",
        b: "He is extremely scared and has a panic attack",
        c: "He is angry and immediately attacks him",
        d: "He is calm but turns angry when Scott attacks him",
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
