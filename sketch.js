var PLAY = 1;
var END = 0;
var gameState = PLAY;

var nobita, nobita_running, nobita_collided;
var road, roadImage;

var obstaclesGroup, booksImage;
var pointsGroup, baseballImage;
 var score;
  var gameOverImg, restartImg;

function preload(){
    nobita_running = loadAnimation("nobita.png", "nobita 2.png");
    nobita_collided = loadAnimation("nobita crying.png")
     roadImage = loadImage("road.png")
      booksImage = loadImage("books.png")
      baseballImage = loadImage("ball.png")
       
      gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")
}

function setup() {
 createCanvas(600, 200)

 var message = "This is a message";
 console.log(message)
nobita = createSprite(50, 160, 20, 50);
nobita.addAnimation("running", nobita_running);
nobita.addAnimation("collided", nobita_collided);

nobita.scale = 0.5;

road = createSprite(200, 180, 400, 20);
road.addImage("road", roadImage);
road.x = road.width /2;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

obstaclesGroup = createGroup();
pointsGroup = createGroup();

nobita.setCollider("rectangle",0,0, nobita.width, nobita.height);
nobita.debug = false

score = 0

}

function draw() {
 background(180);
 text("Score: "+ score, 500,50)

 if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
 

    road.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60)
 }

    if (road.x < 0){
        road.x = road.width/2;
 }

 if(keyDown("space")&& nobita.y >= 100) {
    nobita.velocityY = -12;
 }

 nobita.velocityY = nobita.velocityY + 0.8

 spawnObstacles();
 spawnPoints();

 if(obstaclesGroup.isTouching(nobita)){
    nobita.velocityY = -12;
    gameState = END;
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
        nobita.changeAnimation("collided", nobita_collided);
      
        road.velocityX = 0;
        nobita.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      pointaGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       pointsGroup.setVelocityXEach(0);    

       if(mousePressedOver(restart)) {
        reset();
      }
      drawSprites();
     }
     
     function reset(){
        gameState = PLAY
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        pointsGroup.destroyEach();
        
        score = 0;
      
        nobita.changeAnimation("running", nobita_running);
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1));
       switch(rand) {
         case 1: obstacle.addImage(booksImage);
                 break;
         
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }
   function spawnPoints() {
    if (frameCount % 60 === 0){
        var baseball = createSprite(600,165,10,40);
        baseball.velocityX = -(6 + score/100);
        
         //generate random obstacles
         var rand = Math.round(random(1));
         switch(rand) {
           case 1: baseball.addImage(baseballImage);
                   break;
           
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         baseball.scale = 0.5;
         baseball.lifetime = 300;
        
        //add each obstacle to the group
         pointsGroup.add(baseball);
       nobita.depth = nobita.depth = 1;
    }
  }
  
}