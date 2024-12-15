let unlockedBlocks = [false, false, false];

function checkAnswer(questionNumber, correctAnswer) {
  const userAnswer = document.getElementById(`answer${questionNumber}`).value.trim().toLowerCase();
  if (userAnswer === correctAnswer) {
    document.getElementById(`block${questionNumber}`).textContent = `Block ${questionNumber}`;
    unlockedBlocks[questionNumber - 1] = true;
    alert(`Correct! Block ${questionNumber} is unlocked.`);
  } else {
    alert("Incorrect answer. Try again!");
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  if (!unlockedBlocks[event.target.id.slice(-1) - 1]) {
    alert("You need to unlock this block first!");
    return;
  }
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const blockId = event.dataTransfer.getData("text");
  const block = document.getElementById(blockId);
  if (!event.target.classList.contains("block")) {
    event.target.appendChild(block);
  }
  checkPuzzleCompletion();
}

function checkPuzzleCompletion() {
  const canvas = document.getElementById("canvas");
  if (canvas.children.length === 3) {
    const blocks = Array.from(canvas.children).map(block => block.textContent);
    if (blocks.includes("Block 1") && blocks.includes("Block 2") && blocks.includes("Block 3")) {
      document.getElementById("clue").classList.remove("hidden");
    }
  }
}
