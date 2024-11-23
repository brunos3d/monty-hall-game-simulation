function logMessage(message) {
  const consoleElement = document.getElementById('console');
  const newLog = document.createElement('div');
  newLog.textContent = message;
  consoleElement.appendChild(newLog);
  consoleElement.scrollTop = consoleElement.scrollHeight;
}

function montyHallSimulation(iterations) {
  let stayWins = 0;
  let switchWins = 0;

  for (let i = 0; i < iterations; i++) {
    const carDoor = Math.floor(Math.random() * 3);
    const contestantChoice = Math.floor(Math.random() * 3);

    let hostChoice;
    do {
      hostChoice = Math.floor(Math.random() * 3);
    } while (hostChoice === carDoor || hostChoice === contestantChoice);

    let remainingDoor;
    for (let j = 0; j < 3; j++) {
      if (j !== contestantChoice && j !== hostChoice) {
        remainingDoor = j;
        break;
      }
    }

    if (contestantChoice === carDoor) {
      stayWins++;
    } else if (remainingDoor === carDoor) {
      switchWins++;
    }
  }

  const stayWinRate = ((stayWins / iterations) * 100).toFixed(2) + '%';
  const switchWinRate = ((switchWins / iterations) * 100).toFixed(2) + '%';

  return {
    iterations,
    stayWinRate,
    switchWinRate,
  };
}

// Highlight the selected door
const doors = document.querySelectorAll('.door');
doors.forEach((door) => {
  door.addEventListener('click', () => {
    doors.forEach((d) => d.classList.remove('selected')); // Clear previous selection
    door.classList.add('selected'); // Highlight the current selection

    const selectedDoor = door.getAttribute('data-id');
    logMessage(`You selected Door ${parseInt(selectedDoor) + 1}. Play to see the result!`);
  });
});

document.getElementById('play-once').addEventListener('click', () => {
  const selectedDoorElement = document.querySelector('.door.selected');
  if (!selectedDoorElement) {
    logMessage('Please select a door first.');
    return;
  }

  const contestantChoice = parseInt(selectedDoorElement.getAttribute('data-id'));
  const carDoor = Math.floor(Math.random() * 3);

  let hostChoice;
  do {
    hostChoice = Math.floor(Math.random() * 3);
  } while (hostChoice === carDoor || hostChoice === contestantChoice);

  const result = contestantChoice === carDoor ? 'You won by staying!' : 'You would win by switching!';
  logMessage(`Car was behind Door ${carDoor + 1}, You chose Door ${contestantChoice + 1}. ${result}`);
});

document.getElementById('autoplay').addEventListener('click', () => {
  const iterations = parseInt(document.getElementById('iterations').value, 10);
  if (isNaN(iterations) || iterations <= 0) {
    logMessage('Please enter a valid number of iterations.');
    return;
  }

  const results = montyHallSimulation(iterations);
  logMessage(`Results after ${results.iterations} iterations:`);
  logMessage(`Stay Win Rate: ${results.stayWinRate}`);
  logMessage(`Switch Win Rate: ${results.switchWinRate}`);
});
