const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boat;
var boats = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

  //boat = new Boat(width, height - 100, 200, 200, -100);
  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  for(var i = 0; i< balls.length; i++){
    showCannonBalls(balls[i], i);
  }

  Engine.update(engine);
  ground.display();
  
  
  cannon.display();
  tower.display();
  showBoats();
  //cannonBall.display()
  //boat.display();
  /*Matter.Body.setVelocity(boat.body, {
    x: -0.9,
    y: 0
  });*/
 
}

function showCannonBalls(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    //cannonBall.shoot()
    balls[balls.length - 1].shoot();
  }
}

//función para mostrar el barco
function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );


      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate();
     
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}
-----------------------------------------------------------------------------------------------------------
class Boat {
    constructor(x, y, width, height, boatPos, boatAnimation) {
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
      }
      this.animation = boatAnimation;
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
  
      this.boatPosition = boatPos;
      this.image = loadImage("assets/boat.png");
      World.add(world, this.body);
    }

    animate() {
      this.speed += 0.05 % 1.1;
    }    

    display() {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height);
        noTint();
        pop();
      }
}
---------------------------------------------------------------------------------------------------------
  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
-------------------------------------------------------------------------------------------------------
  
