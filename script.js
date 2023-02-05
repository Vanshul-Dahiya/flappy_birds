document.addEventListener("DOMContentLoaded", () => {
  const birdEl = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  //   bring bird to the center of sky
  let birdLeft = 220;
  let birdBOttom = 100;
  let gravity = 2;
  let isGameOver = false;

  //   apply pixel changes to styling
  function startGame() {
    // bird will fall after game starts , in interval
    birdBOttom -= gravity;
    birdEl.style.bottom = birdBOttom + "px";
    birdEl.style.left = birdLeft + "px";
  }
  //   assign setInterval to a variable , so that we can stop that interval from running
  let gameTimerId = setInterval(startGame, 20);

  //   use 'spaceBar' only , to jump the bird
  function control(e) {
    if (e.keyCode == 32) {
      jump();
    }
  }

  function jump() {
    // jump the bird by 50 px

    if (birdBOttom < 500) {
      birdBOttom += 50;
    }
    birdEl.style.bottom = birdBOttom + "px";
  }

  //   when finger is raised from key, make the bird jump
  document.addEventListener("keyup", control);

  //   put obstacle in game container
  function generateObstacle() {
    let randomHeight = Math.random() * (100 - 80) + 80;
    let obstacleLeft = 500;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    gameDisplay.appendChild(obstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";

      //   move obstacle to left until it is fully out of window and remove it from display
      if (obstacleLeft === -60) {
        clearInterval(timerID);
        gameDisplay.removeChild(obstacle);
      }

      //   stop game if bird reaches bottom of sky
      if (birdBOttom === 0) {
        gameOver();
      }
    }
    let timerID = setInterval(moveObstacle, 20);

    // generate random obstacles at random height after a certain time
    setTimeout(generateObstacle, 2300);
  }
  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }
});
