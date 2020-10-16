// Variable definitions
var PLAY = 1
var END = 0
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score = 0;
var end, endImage;

// Preloading all the images and resources
function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  endImage = loadImage("end.png");
}

// creating objects in setup()
function setup() {
  createCanvas(500, 500);

  monkey = createSprite(80, 445, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.18;

  ground = createSprite(250, 495, 600, 10);
  ground.shapeColor = ("brown");

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey.setCollider("circle", 0, -10, monkey.width / 1.7);
  monkey.debug = false;

}

function draw() {

  background("white");

  // Game state conditional execution
  if (gameState === PLAY) {

    // calling functtion to display bananas at random positions
    popBanana();

    //calling function to make monkey jump 
    jump();

    // calling functtion to randomly display obstacles.
    popObstacle();

    destroyBanana();

    // Score board
    textSize(36);
    fill("Green");
    score = score + Math.round(getFrameRate() / 50);
    text("Suvival time: " + score, 150, 50);

    // condition to end the game
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    // setting when game ends. 
    obstacle.lifetime = 0;
    banana.lifetime = 0;
    monkey.lifetime = 0;

    //Game end messaging
    endTheGame();

  }

  // seting up infinite scrolling ground
  ground.velocityX = -5;
  if (ground.x < 194) {
    ground.x = ground.width / 2;
  }

  // setting up gravity for monkey so that it falls down after it jumps up
  monkey.velocityY = monkey.velocityY + 0.2;


  // making sure that monkey does not fall off the ground
  monkey.collide(ground);

  drawSprites();
}

// Creating bananas
function popBanana() {
  if (frameCount % 80 === 0) {
    var bananaY = Math.round(random(120, 200));
    banana = createSprite(500, bananaY, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 50;
    banana.y = bananaY;
    FoodGroup.add(banana);
  }
}

// Creating obstacles
function popObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(550, 440, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.4;
    obstacle.velocityX = -10;
    obstacle.lifetime = 5.5;
    obstacleGroup.add(obstacle);
    obstacle.depth = ground.depth;
    ground.depth = ground.depth + 1;
  }
}

// Making monkey to jump up
function jump() {
  if (keyDown("space") && monkey.y >= 430) {
    monkey.velocityY = -10;
  }
}

// Display when game ends.
function endTheGame() {
  end = createSprite(250, 250);
  end.addImage(endImage);
  end.scale = 3;
}

function destroyBanana() {
  if (monkey.isTouching(FoodGroup))
    banana.destroy();
}