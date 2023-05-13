const data = [
    {
      id: 1,
      question: "Which of these fish is actually a fish?",
      answers: [
        { answer: "swordfish", isCorrect: true },
        { answer: "jellyfish", isCorrect: false },
        { answer: "starfish", isCorrect: false },
        { answer: "crayfish", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: "A flutter is a group of:",
      answers: [
        { answer: "bees", isCorrect: false },
        { answer: "penguins", isCorrect: false },
        { answer: "butterflies", isCorrect: true },
        { answer: "camels", isCorrect: false },
      ],
    },
    {
      id: 1,
      question: "A group of which animals is referred to as a wake?",
      answers: [
        { answer: "bats", isCorrect: false },
        { answer: "vultures", isCorrect: true },
        { answer: "ants", isCorrect: false },
      ],
    },
  ];

  const gamescreen=document.querySelector(".game");
  const resultscreen=document.querySelector(".result");
  const answersContainer=document.querySelector(".answers")
  const question = document.querySelector(".question");
  const submit=document.querySelector(".submit")
  const play = document.querySelector(".play");

  let qIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let total = 0;
  let selectedAnswer;

  const showAgain=()=>{
        qIndex = 0;
        correctCount = 0;
        wrongCount = 0;
        total = 0;
        showQuestion(qIndex);
  }
  
  play.addEventListener("click",()=>{
    gamescreen.style.display="block";
    resultscreen.style.display="none";
    showAgain();

  })
  
  const showResult=()=>{
    gamescreen.style.display="none";
    resultscreen.style.display="block";

   
    resultscreen.querySelector(
    ".correct"
  ).textContent = `Correct Answers: ${correctCount}`;

  resultscreen.querySelector(".wrong").textContent=`Wrong Answers: ${wrongCount}`;
  resultscreen.querySelector(".score").textContent=`Score:${(correctCount - wrongCount) * 10}`
   
  }

  const showQuestion = (qNumber) => {
    if (qIndex === data.length) return showResult();
    selectedAnswer = null;
    question.textContent = data[qNumber].question;
    answersContainer.innerHTML = data[qNumber].answers
      .map(
        (item, index) =>
          `
    <div class="answer">
        <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
        <label for=${index}>${item.answer}</label>
    </div>
    `
      )
      .join("");
  
    selectAnswer();
  };
  

  const selectAnswer = () => {
    answersContainer.querySelectorAll("input").forEach((el) => {
      el.addEventListener("click", (e) => {
        selectedAnswer = e.target.value;
      });
    });
  };

  const submitAnswer = () => {
    submit.addEventListener("click", () => {
      if (selectedAnswer !== null) {
        selectedAnswer === "true" ? correctCount++ : wrongCount++;
        console.log(correctCount)
        console.log(wrongCount)
        qIndex++;
        showQuestion(qIndex);
      } else alert("Select an answer!");
    });
  };
  

  showQuestion(qIndex);
  submitAnswer();