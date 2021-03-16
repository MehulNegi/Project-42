var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, stone, stoneImage;
var jungle,jungleImg;
var bananaGroup, stoneGroup;
var score;

function preload(){
   
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameOverImg = loadImage("gameOver.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  jungleImg = loadImage("jungle.jpg");
 
}

function setup() {
  createCanvas(800,400);
  
  jungle = createSprite(250,150,800,800);
  jungle.addImage(jungleImg);
  jungle.velocityX = -2;
  
  monkey = createSprite(100,300,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("gameOver", gameOverImg);
  monkey.scale = 0.1;
    
  ground = createSprite(100,335,500,10);
  ground.visible = false;
  
  score = 0;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background("white");  

    if(gameState === PLAY){

      //jump when the space key is pressed
      if(keyDown("space") && monkey.y >=100) {
        monkey.velocityY = -12;
      }
      
      //creating infinite ground
      if (jungle.x < 300){
        jungle.x = jungle.width/2;
      }
      
      //add gravity
      monkey.velocityY = monkey.velocityY+0.8;
      
      //stop monkey from falling down  
      monkey.collide(ground);
      
     // playerSize();
      
      if (monkey.isTouching(bananaGroup)) {
        score = score+2;
        monkey.scale = monkey.scale+0.02;
        bananaGroup.destroyEach();
      }
      
      if (monkey.isTouching(obstaclesGroup)){
        gameState = END;
      }    
      
      Banana();
      Obstacle();
      
  } else if (gameState === END) {
      jungle.velocityX = 0;
      monkey.velocityY = 0;
    
      monkey.changeImage("gameOver", gameOverImg);
      monkey.scale = 1;
      monkey.x = 400;
      monkey.y = 200;
      
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
  }
    
  drawSprites();
    
    stroke("White");
    textSize(20);
    fill("White");
    text("Score: "+ score,650,50);
}

function Banana(){
  if (frameCount % 80 === 0) {
    banana = createSprite(810,30,10,10);
    banana.scale = 0.05;
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.y = Math.round(random(100,250));
    banana.setLifetime = 5;
    
    //added each banana to the group
    bananaGroup.add(banana);    
  }
}

function Obstacle(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(810,300,10,40);
   obstacle.scale = 0.19;
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;            
   obstacle.lifetime = 150;
   
   //add each obstacle to the group
   obstaclesGroup.add(obstacle);
 }
}