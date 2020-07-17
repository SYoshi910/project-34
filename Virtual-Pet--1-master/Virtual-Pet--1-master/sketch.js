//Create variables here
var doggo, dog, happy, database, foodS, foodStock;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  doggo = createSprite(250,300,10,10);
  doggo.addImage(dog);
  doggo.scale = 0.25;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(30,30,30);
  fill("white");
  textSize(16);
  text("Press the up arrow to feed your dog.",125,20);
  text("Remaining meals left: " + foodS,160,180);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    doggo.addImage(happy);
  }
  drawSprites();
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x -= 1;
  }
  database.ref('/').update({
    food:x
  })
}



