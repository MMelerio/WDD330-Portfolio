// Create the questions and the correct answer
const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonderwoman's real name?","Dianna Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
  ];

function start(quiz){
 // Initialize the score at 0
   let score = 0;

  // main game loop
  for(const [question,answer] of quiz){
    const response = ask(question);
    check(response,answer);
  }
  // end of main game loop

  gameOver();

  // function declarations
  function ask(question){
    return prompt(question);
  }

  function check(response,answer){
    // check if correct
    if(response === answer){
      alert('Correct!');
      // if correct increase score by 1
      score++;
    } else {
      alert(`Wrong! The correct answer was ${answer}`);
    }
  }

  function gameOver(){
    // Inform the score
    alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
  }
}

start(quiz);