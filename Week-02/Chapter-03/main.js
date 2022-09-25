// Create the questions and the correct answer
const quiz = new Map([
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonderwoman's real name?","Dianna Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
  ]);

 // Initialize the score at 0
let score = 0;

for(const [question,answer] of quiz.entries()){

  // get answer
  const response = prompt(question);
  // check if correct
  if(response === answer){
    alert('Correct!');
    // if correct increase score by 1
    score++;
  } else {
    alert(`Wrong! The correct answer was ${answer}`);
  }
}

// Inform the score
alert(`Game Over, you scored ${score} point${score > 1 ? 's' : ''}`);