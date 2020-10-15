var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,ground,score=0,survivalTime=0;
var score,survivalTime,area,areaImage,monkeyJump;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  areaImage=loadImage("Screenshot.png");
  monkeyJump=loadImage("sprite_4.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
 
  //window's width=669
  //window's width=521
  
  area=createSprite(windowWidth/2,windowHeight-200,windowWidth,windowHeight-100);
  area.shapeColor="lightblue";
  area.scale=1.7;
  
  
  
  ground=createSprite(windowWidth/2,windowHeight-50,windowWidth+300,20);
  
  
  monkey=createSprite(windowWidth/8,windowHeight-85,20,70);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  
FoodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
  background(0,0,0);
   console.log(survivalTime)

  if (gameState === PLAY){
    
    ground.velocityX=-8;
  survivalTime = survivalTime + Math.round(frameCount/600);
    if (ground.x<windowWidth){
    ground.x=windowWidth/2
    
  }
 
    
    
    
  bananas();
  obstacles();
    
    
    if (monkey.isTouching(FoodGroup))
  {
    score=score+2;
    banana.destroy();
  }
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY+1;
    
  if (monkey.collide(obstacleGroup)){
    gameState = END;
    
    
  }
  }
  
  else if (gameState === END){
    area.destroy();
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    ground.destroy();
 textSize(50)
 fill(200,100,230)       
 text("Score:"+score,windowWidth-604.5,windowHeight-160.5)
    
 textSize(50)
 fill(200,100,230)       
 text("Survival Time:"+survivalTime,windowWidth-389.5,windowHeight-160.5)  
    
    textSize(100)
    
 fill(200,10,20)       
 text("Game Over",windowWidth-579.5,windowHeight-350) 
  }
  
  console.log(gameState);
  
  if (keyDown("space") && (monkey.y>430) &&(gameState === PLAY)){
    monkey.velocityY=-18;
  }
  
  drawSprites();
}

function bananas(){
  if(frameCount % 300 === 0){
    
    banana=createSprite(200,200,40,40);
    banana.x=windowWidth;
    banana.y=windowHeight/2;
    banana.velocityX=-8;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime=800;
    FoodGroup.add(banana);
    
  }
}

function obstacles(){
  if(frameCount % 200    === 0){
    
    obstacle=createSprite(200,200,240,40);
    obstacle.x=windowWidth;
    obstacle.y=windowHeight-100;
    obstacle.velocityX=-8;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25;
    obstacle.lifetime=800;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,10,300,400);
    obstacle.debug = true;
  }
}




