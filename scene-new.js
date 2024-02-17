"use strict";
const app = new PIXI.Application({
    width:1024,
    height:768,
    backgroundColor: 0xfabedc,
});
const screenWidth = app.screen.width;
const screenHeight = app.screen.height;
let gameWindow = document.querySelector("#game");
gameWindow.appendChild(app.view);
let title;
let game, fin;
let topRow, bottomRow;
let model;
let loader = new PIXI.Loader();
let logo;
let modelObject;
let hairText
let closet;
let musicText;    //to mute or play music

//for click on options
let itemVisible= false;
let counter=0;

//for storing music
let tops = [];
let topPosition =[];
let bottoms = []; 
let shoes=[];
let hair=[];

const backgroundMusic = new Howl({
  src: ['sounds/bg-music.wav'],
  loop: true, // Set to true if you want the music to loop
  volume: 0.5, 
});
const clickSound = new Howl({
  src: ['sounds/placeholder-click.flac'],
  loop: false, // Set to true if you want the music to loop
  volume: 0.25, // Adjust the volume as needed (0 to 1)
});

//let playText, finText, menuText;
let bottomPath = "images/bottom/";
let topPath ="images/top/";
let shoesPath= "images/shoes/";
let hairPath = "images/hair/";

loader.add("model", "images/model.png");
loader.add("closet", "images/closet.png");

//loads all the textures
for(let i =1; i < 6; i++){
  loader.add(`hair${i}`, `${hairPath}${i}.png`);
    loader.add(`bottom${i}`, `${bottomPath}${i}.png`);
    loader.add(`top${i}`, `${topPath}${i}.png`);
    if (i < 4) {
        loader.add(`shoe${i}`, `${shoesPath}${i}.png`);
    }
}
let modelX = 600;
let modelY= 50;
scenes();
loader.load((loader, resources) => {
  topRow = 290;
  bottomRow =360;

  model = resources.model.texture;
  closet = new Inanimate(10, topRow-230, resources.closet.texture,1,0.8, game);
  modelObject = new Inanimate(modelX,modelY, model,0.5, 0.5,game);

  //adding shoes
  let shoe1 = new Layering(modelX, modelY, resources.shoe1.texture, game, 0.5, 0.5);
  let shoe2 = new Layering(modelX, modelY, resources.shoe2.texture, game, 0.5, 0.5);
  let shoe3 = new Layering(modelX, modelY, resources.shoe3.texture, game, 0.5, 0.5);
  shoes = [shoe1, shoe2, shoe3];

  //adding bottoms
  let bottom1 = new Clothes(80, bottomRow-50, 0.5, 0.5, resources.bottom1.texture, game, 0.5,0.5);
  let bottom2 = new Clothes(200, bottomRow, 0.5, 0.5, resources.bottom2.texture, game, 0.5,0.5);
  let bottom3 = new Clothes(280, bottomRow-50, 0.5, 0.5, resources.bottom3.texture, game, 0.5,0.5);
  let bottom4 = new Clothes(350, bottomRow-50, 0.5, 0.5, resources.bottom4.texture, game, 0.5,0.5);
  let bottom5 = new Clothes(430, bottomRow, 0.5, 0.5, resources.bottom5.texture, game, 0.5,0.5);
  bottoms = [bottom1, bottom2, bottom3, bottom4, bottom5];
  
  let tops1 = new Clothes(120, topRow -100, 0.5, 0.5, resources.top1.texture,game,0.5,0.5);
  let tops2 = new Clothes(180, topRow-100, 0.5, 0.5, resources.top2.texture, game, 0.5,0.5);
  let tops3 = new Clothes(250, topRow-100, 0.5, 0.5, resources.top3.texture, game,0.5,0.5);
  let tops4 = new Clothes(330, topRow-100, 0.5, 0.5, resources.top4.texture, game, 0.5,0.5);
  let tops5 = new Clothes(400, topRow-100, 0.5, 0.5, resources.top5.texture, game, 0.5, 0.5);
  tops = [tops1, tops2, tops3, tops4, tops5];

  //storing hair
  let hair1= new Layering(modelX, modelY, resources.hair1.texture, game, 0.5,0.5);
  let hair2= new Layering(modelX, modelY, resources.hair2.texture, game, 0.5,0.5);
  let hair3= new Layering(modelX, modelY, resources.hair3.texture, game, 0.5,0.5);
  let hair4= new Layering(modelX, modelY, resources.hair4.texture, game, 0.5,0.5);
  let hair5= new Layering(modelX, modelY, resources.hair5.texture, game, 0.5,0.5);
  hair = [hair1, hair2, hair3, hair4, hair5];
})
//calls it afterwards so that the click on functions have values for their arrays
makeLabels();

//removes everything
//make this in class and call each classes reset function
function reset(){
  counter=0;      //resets the button looping
  for(let i=0; i < tops.length; i++){ 
    tops[i].originalPoint();
    bottoms[i].originalPoint();
    hair[i].setInvisible();
    if(i <shoes.length){
      shoes[i].setInvisible();
    }
  }
  clickSound.play();
}

//makes scenes
function scenes(){
  //backgroundMusic.play();
  title = new PIXI.Container();
  game = new PIXI.Container();
  fin = new PIXI.Container();

  app.stage.addChild(title);  
  app.stage.addChild(game);
  app.stage.addChild(fin);

  //Manage the scenes
  title.visible=true;
  game.visible=false;
  fin.visible=false;
}

//gives functions to text
function makeLabels(){
  //texts for scenes
let titleText = headerText("Sarah's Dress Up", 100, 'center', screenWidth/2, 200, false, 0.5);
let playText = headerText("Play", 80, 'center', screenWidth/2 - 200,screenHeight -200, true, 0.5);
let doneText = headerText("Done", 50, 'right', screenWidth - 100, 50, true, 0.5);
let resetText = headerText("Reset", 30, 'center', 500, screenHeight-100, true, 0);
hairText = headerText("Hairstyle", 30, 'center', 100, screenHeight -100, true, 0);
let shoeText = headerText("Shoes", 30, 'center', 300, screenHeight -100, true, 0);
let playAgain = headerText("Menu", 50, 'center', screenWidth/2 + 100, screenHeight/2 + 100, true, 0.5);
let finText = headerText("Yay! You did it", 100, 'center', screenWidth/2, 300,false, 0.5);
let musicText = headerText("Music", 50, 'center', screenWidth/2 -100, screenHeight/2 +100, true, 0.5);
let gameMusicText = headerText("Music", 30, 'center',700 ,screenHeight -100, true, 0, game);
let titleMusicText = headerText("Music", 80, 'center', screenWidth/2 + 100, screenHeight -200, true, 0.5);
let introText1 = headerText("Dress Sarah Up for her first day of class!", 32, 'center',
            screenWidth/2, screenHeight/2 , false, 0.5);
let introText2 = headerText("Also, press music button to play some music.", 32, 'center',
            screenWidth/2, screenHeight/2 +50, false, 0.5);

//connects these for click on and resets counter to 0 to avoid console erros
addFunction(resetText, 'click', reset);
//counter =0
hairText.on('click',()=> clickOnItems(hair));
//counter =0;
shoeText.on('click', ()=> clickOnItems(shoes));
musicText.on('click', ()=> playMusicScore());
gameMusicText.on('click', ()=> playMusicScore());
titleMusicText.on('click', ()=> playMusicScore());

//adding them
title.addChild(titleText);
title.addChild(playText);
title.addChild(introText1);
title.addChild(introText2);
game.addChild(doneText);
game.addChild(resetText);
game.addChild(hairText);
game.addChild(shoeText);
game.addChild(gameMusicText);
fin.addChild(playAgain);
fin.addChild(finText);
title.addChild(titleMusicText);
fin.addChild(musicText);


//transitions
sceneTransition(playText, title, game);
sceneTransition(doneText, game,fin);
sceneTransition(playAgain, fin, title);
}
counter =0;
let prevArray=[];

//clicks on current item
function clickOnItems(array){
  if (prevArray !== array) {
    //array[counter].setInvisible();
    counter = 0;
  }  
  //console.log("counter before: " + counter);
  if (array.length > 0) {
    array.forEach(item => item.setInvisible());
    array[counter].setVisible();
    counter = (counter + 1) % array.length;
  }
  if(counter== array.length){
    //not called can't be empty
    array[counter-1].setInvisible();
  }
  //console.log("counter after: " + counter);
  prevArray = array;
  clickSound.play();
}

//adds interactivity to text
function addFunction(text, effect, method){
  text.on(effect,method);
  //clickSound.play();
}

//does scene transitions
function sceneTransition(text, current, next){
  text.on("click", function(){
    if(next == fin){
      reset();          //sets the mannequin empty
      clickSound.play();
    }
    current.visible= false;
    next.visible =true;
    //clickSound.play();
  })
  
}

//makes text
function headerText(string,size, align, x, y, interactive, anchor){
  let text = new PIXI.Text(string,{
    fontFamily: 'Lilita One',
    fontSize:size,
    fill:0xbf194b,
    align: align,
    });
  text.x = x;
  text.y =y;
  text.anchor.set(anchor, anchor);
  text.interactive = interactive;
  text.buttonMode = interactive;
  return text;
}

//to ensure that once music is clicked it stops the next time
let pressedOnce = false;
function playMusicScore(){

  if(!pressedOnce){
    backgroundMusic.play();
    pressedOnce = true;
  }
  else{
    backgroundMusic.stop();
    pressedOnce = false;
  }
  clickSound.play();
}