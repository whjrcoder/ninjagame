var turtle;
var gamestate="play"
function preload(){
  ninjaimg=loadAnimation("ninja1.png","ninja2.png")
  ninjaimg2=loadAnimation("ninja3.png")
  ninjaimg3=loadAnimation("ninja4.png") 
  coinimg=loadImage("coins.png")
  //forest=loadImage("forest.jpg")
  trackimg=loadImage("forest.jpg")
  turtleimg=loadImage("turtle1.png")
  diedturtle=loadAnimation("turtle1die.png")
  ninjadie=loadImage("ninjadie.png")
  turtle2=loadImage("turtle2.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  
tracksprite=createSprite(displayWidth/2,displayHeight/2)
tracksprite.addImage("t", trackimg);
tracksprite.scale = 1.3
tracksprite.velocityX=-5


ninja=createSprite(0,displayHeight-180,20,20)
ninja.addAnimation("n",ninjaimg)
ninja.addAnimation("n2",ninjaimg2)
ninja.addAnimation("n3",ninjaimg3)
ninja.debug=true;
ninja.scale=1;
ninja.setCollider("rectangle",0,0,20,20)
ninja.addImage("n4",ninjadie)
inviground=createSprite(displayWidth/2,displayHeight-160,4*displayWidth,5)
inviground.visible=false
inviground.debug=true

turtlegroup=createGroup()
coinsGroup=createGroup()
}

function draw() {
  background("white"); 
  if(gamestate==="play"){
  tracksprite.velocityX=-5
 if(tracksprite.x<300){
   tracksprite.x=displayWidth/2
  }
 // ninja.x=ninja.x+5;
camera.position.x=ninja.x
camera.position.y=displayHeight/2

  if(keyDown("space")){
    ninja.velocityY=-20;
   // ninja.scale=0.5
    ninja.changeAnimation("n2",ninjaimg2)
    
}
ninja.velocityY=ninja.velocityY+3
if(ninja.isTouching(inviground)){
  ninja.changeAnimation("n",ninjaimg)
}

spawnturtles();
spawncoins();
  }
if(gamestate==="end"){
  ninja.changeImage("n4",ninjadie)
  ninja.scale=0.5
  tracksprite.velocityX=0;
  ninja.velocityY=ninja.velocityY+2;
  ninja.collide(inviground)
  coinsGroup.destroyEach()
//destroy turtle and add another winning image of turtle 
}
ninja.collide(inviground)
 // spawnturtles();
  drawSprites();
}
function spawnturtles(){
 
 
  var i=Math.round(random(10,400))
    if(frameCount%i===0){
    turtle=createSprite(random(displayWidth-10,displayWidth-100),displayHeight-220)
    var rand=Math.round(random(1,2))
    switch(rand){
      case 1:turtle.addImage("tur",turtleimg);
      break;
      case 2:turtle.addImage("tur",turtle2);
      break;
    }
    
    turtle.addAnimation("dt",diedturtle)
    turtle.velocityX=-8
    turtle.debug=true
    turtle.scale=0.29
    turtlegroup.add(turtle)
  }
  for(var j=0;j<turtlegroup.length;j++){
  if(keyDown("A")&& turtlegroup[j].isTouching(ninja)){
 
    ninja.changeAnimation("n3",ninjaimg3)
    ninja.scale=0.5
    turtlegroup[j].changeAnimation("dt",diedturtle)
    tracksprite.velocityX=0
    turtlegroup[j].lifetime=30
    
  }
  if(turtlegroup[j].isTouching(ninja)){
    gamestate="end"
  
  }
  }
}
function spawncoins(){
  var k=Math.round(random(10,400))
  if(frameCount%k===0){
  coinsprite=createSprite(displayWidth-10,random(displayHeight-400,displayHeight-600))
  coinsprite.addImage("coi",coinimg);
  coinsprite.velocityX=-3
  coinsprite.scale=0.2
  coinsGroup.add(coinsprite)
  //if coinsgroup is toching ninja,increase score, use for loop
}
}
  
