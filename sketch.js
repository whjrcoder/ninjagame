var turtle;
function preload(){
  ninjaimg=loadAnimation("ninja1.png","ninja2.png")
  ninjaimg2=loadAnimation("ninja3.png")
  ninjaimg3=loadAnimation("ninja4.png") 
  forest=loadImage("forest.jpg")
  trackimg=loadImage("track.png")
  turtleimg=loadImage("turtle1.png")
  ninjadie=loadImage("ninjadie.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  
tracksprite=createSprite(displayWidth/2,displayHeight-120,displayWidth,displayHeight)
tracksprite.addImage("t", trackimg);
tracksprite.scale = 1.8
tracksprite.velocityX=-4


ninja=createSprite(50,displayHeight-280,20,20)
ninja.addAnimation("n",ninjaimg)
ninja.addAnimation("n2",ninjaimg2)
ninja.addAnimation("n3",ninjaimg3)
ninja.addImage("n4",ninjadie)
ninja.debug=true;
ninja.scale=2;

inviground=createSprite(displayWidth/2,displayHeight-140,displayWidth*2,5)
inviground.visible=false
inviground.debug=true

turtlegroup=createGroup()
}

function draw() {
  background(forest); 
  //ninja.velocityX=3;
 if(tracksprite.x<650){
   tracksprite.x=displayWidth/2
  }
// camera.position.x=ninja.x
  if(keyDown("space")){
    ninja.velocityY=-6;
    ninja.changeAnimation("n2",ninjaimg2)
}
ninja.velocityY=ninja.velocityY+3
if(ninja.isTouching(inviground)){
  ninja.changeAnimation("n",ninjaimg)
}
ninja.collide(inviground)
spawnturtles();

  drawSprites();
}
function spawnturtles(){
 
  //for(var i=100;i<1800;i=i+800){
  var i=Math.round(random(100,400))
    if(frameCount%i===0){
    turtle=createSprite(displayWidth-10,displayHeight-240)
    turtle.addImage("tur",turtleimg)
    turtle.velocityX=-8
    turtle.scale=0.4
    turtlegroup.add(turtle)
  }
  if(ninja.isTouching(turtlegroup)){
    ninja.changeAnimation("n3",ninjaimg3)
    turtle.velocityX=0;
    turtle.destroy()
  }
  //}
  
}