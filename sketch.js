var PLAY=1;
var END=0
var gameState=PLAY;
var plane,planeImg
var cloud,cloudImg
var droneImg
var birdImg
var trImg
var liImg
var boomImg
var obstacleGroup
var score=0;

function preload(){
 planeImg=loadImage("A1.png")
cloudImg=loadImage("cloud.jpg")
droneImg=loadImage("drone.png")
birdImg=loadImage("bird.png")
trImg=loadImage("tornadow.png")
liImg=loadImage("lightning.png")
boomImg=loadAnimation("boom.png")
}

function setup(){
 createCanvas(2000,1000)

 cloud=createSprite(1000,500,2000,1000)
 cloud.addImage(cloudImg)
 cloud.scale=4.5

 plane=createSprite(100,500,10,10)
 plane.addImage(planeImg)
 plane.addAnimation("boom",boomImg)
 plane.scale=0.5

 ground=createSprite(1000,989,2000,20)
 ground.shapeColor="green"

 obstacleGroup=createGroup()

 plane.debug=false;
 plane.setCollider("rectangle",0,0,500,100)
}

function draw(){
  background("black")
  if(gameState===PLAY)
  {
    plane.velocityX=0;

    if(keyDown("up_arrow")&& plane.y>=250){
      plane.velocityY=-10
    }
    if(keyDown("right_arrow")){
      plane.velocityX=2
    }
    plane.velocityY=plane.velocityY+0.5

    spawnObstacles()
  
    
  if(ground.collide(plane)){
  
    fill("red")
    textSize(100)
    text("Plane Crashed....!!!",500,500);
    gameState=End;
  }
  if(obstacleGroup.isTouching(plane)){
    gameState=END
  }
  }
  else if(gameState===END)
  {
obstacleGroup.destroyEach();
obstacleGroup.setVelocityXEach(0)
plane.velocityY=0;
plane.changeAnimation("boom",boomImg)
  }

plane.collide(ground)
drawSprites();
textSize(50)
fill("red");
text("Score: "+score,1700,70)
}

function spawnObstacles(){
  if(frameCount%150===0){
  var obstacle=createSprite(1000,random(300,700),20,20)
  obstacle.velocityX=-5
  obstacle.scale=0.3
  var rand=Math.round(random(1,4))
  switch(rand){
    case 1:obstacle.addImage(birdImg)
    break;
    case 2:obstacle.addImage(droneImg)
    break;
    case 3:obstacle.addImage(trImg)
    break;
    case 4:obstacle.addImage(liImg)
    break;
    default:break
  }
  obstacleGroup.add(obstacle)
}
}
