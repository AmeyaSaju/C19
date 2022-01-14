var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,550);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
}



function draw() {
  background(200);
  if (gameState === "play"){
  if(keyDown("SPACE")){
    ghost.velocityY = -8;
  }
  ghost.velocityY = ghost.velocityY + 0.5;

  if(keyDown("LEFT")){
    ghost.x = ghost.x - 10
  }

  if(keyDown("RIGHT")){
    ghost.x = ghost.x + 10
  }

  if(tower.y > 400){
      tower.y = 300;
    }
  

  if(ghost.isTouching(invisibleBlockGroup)){
    gameState = "end";
  }

  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }

  if(ghost.y > 600){
    gameState = "end";
  }

  spawnDoors();
  drawSprites();
  }

  if(gameState === "end"){
    ghost.velocityY = 0;
    tower.velocityY = 0;
    background(15);
    text("Game Over!",250,300);

  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    doorsGroup.add(door);
    door.lifetime = 300;

    var climber = createSprite(200,10);
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climbersGroup.add(climber);

    door.x = Math.round(random(200,400));
    climber.x = door.x;

    var invisibleBlock = createSprite(200,15,60,5);
    invisibleBlock.visible = true;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.x = door.x;
    invisibleBlock.debug = true;

    ghost.depth = door.depth + 1;

  }
}
