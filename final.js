
let squares = [];//variale for the squares

// 2D array of colors that fill the changing grid
let colors =[[ '#ffffff', '#f58310' ], ['#2274A5', '#E7EB90'], ['#8C8F96', '#4A525A']];

var assignColor = colors[0];//variable to assign the color array

//code for var u, count and mods referenced from Pattern Generating Canvas by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
var u; //variable for the grid size
var count;//variable for the grid count
var mods = [];

var d = 1;//variable created to target dot ellipses on the top grid
var canvas;//variable for the canvas window to fit in HTML

function setup() {
    canvas = createCanvas(windowWidth/2, windowHeight);//canvas size
    canvas.style('z-index', '-1');//make canvas part of the background
    canvas.style('float', 'right');
    canvas.parent('header');//make canvas appear in the header HTML element
    background(0); //no background
  noStroke(); //no stroke on canvas
  frameRate(2); //frame rate number controls speed of changing grid
  
  // Create an array of squares to fill the screen
  // columns span the windowHeight
  for (let c =0; c<=windowHeight; c+=75)
  {
    // rows span the windowWidth
    for (let r =0; r<=windowWidth; r+=75)
    {
    squares.push([r, c, 75, 75]); //push the squares out into the grid array
    }
  }
 //code for top grid referenced from Pattern Generating Canvas by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
  u = 150; //variable for the grid size
  var highCount = (height/150)+2; //grid height
  var wideCount = (width/150)+2; //grid width
  count = int(highCount * wideCount);
  
  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) { //x column increases by integer until greater than the widthCount
    for (var yc = 0; yc < highCount; yc++) { //y column increases by integer until greater than the widthCount
      mods[index++] = new Module(int(xc)*u,int(yc)*u);//create a new module for shapes in a grid form
    }
   }
  
}

function draw() {
     //draw circles and give them color
  for (let c of squares) //let colour of squares
  {
    fill(assignColor[int(random(0,assignColor.length ))]);//choose random colours to fill grid, fill and assigncolor code referenced from circle grid written by julie lizardo https://editor.p5js.org/JLizardo019/sketches/rEFitN687 
    square(c[0], c[1], c[2]);//choose colour array
  }
  
  //change k value to add shape when mouse is pressed
  if (mouseIsPressed==true)
  {
   this.k = 2; //k value = 2
  }
  //background(200);
  noStroke();
    //code below referenced from "Pattern Generating Canvas" by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
  for (var i = 0; i <= count; i++) { //as long as i is less than or equal to the count keep performing functions
    mods[i].draw2(); //draws the top grid shapes
    mods[i].Over(); //function for mouse over
  } 
}

function mousePressed() { //if mouse pressed this.k = 2
    
  for (var i = 0; i <= count; i++) { //this code is also referenced from Purin Phanciphant
    mods[i].Pressed();//when mouse is pressed increase integer
  }
}

function Module(_x, _y) { //this code is part of the module code referenced from Purin Phanciphant "Pattern Generating Canvas" by Purin Phancipahant, 2020. https://purin.co/experiments-with-p5-js
  this.x = _x; //x value
  this.y = _y; //y value
  this.a = 0; 
  this.b = false;
  this.c = 200;
  this.isOverRectangle = false; //overRectangle variable
  this.s = 75; //size value
  this.r = 0; //radius value
  this.k = 0; //variable for adding shapes
  this.c1 = '#ffffff';//colour of dots
  this.c2 = '#1ec9e8';//second colour of shapes
}

//code below referenced from "Pattern Generating Canvas" by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
//if mouse pressed inside shape, that shape's k value increases
Module.prototype.Pressed = function() { 
    if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){
      this.k = this.k+1;//k value plus one
      if (this.k === 2) { //if k is 2 then k becomes 0
        this.k = 0;
      }
    }
}

//code below referenced from "Pattern Generating Canvas" by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
Module.prototype.Typed = function() {
    if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){
      this.r = this.r+HALF_PI;
    }
}

//code below referenced from "Pattern Generating Canvas" by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js

Module.prototype.Over = function() {
  if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){//if the mouse is inside a shape
    this.isOverRectangle = true;//this.isOverRectangle is true and activates code below
  } else {
    this.isOverRectangle = false;//if mouse is not over a grid area do nothing
  }
}

Module.prototype.draw2 = function() { //draw the top grid shapes function referenced from "Pattern Generating Canvas" by Purin Phancipahant, 2020, https://purin.co/experiments-with-p5-js
  push();
  translate(this.x, this.y);
  rectMode(CENTER);
  rotate(this.r);
  if (this.k === 0){
    fill('rgba(255, 242, 145, 0)');//fill with transparent colour if k is 0
    rect(0,0,this.s*2,this.s*2); //rectangle size
  }
  if (d === 1){//full four piece lego shape
    fill('rgba(255, 242, 145, 0)');// make rectangle transparent
    rect(0,0,this.s*2,this.s*2);
    fill(this.c1);//fill with colour 1 from the module
    ellipse(38, 38,this.s/1.9,this.s/1.9); //bottom right ellipse
    ellipse(38, -38,this.s/1.9,this.s/1.9); //top right ellipse
    ellipse(-38, 38,this.s/1.9,this.s/1.9); //bottom left ellipse
    ellipse(-38, -38,this.s/1.9,this.s/1.9); //top left ellipse
  }
    
    if (this.k === 1){//full four piece lego
    fill(this.c2); //fill rectangle with colour 2 from the module
    rect(0,0,this.s*2,this.s*2);//rectangle
    fill('rgba(255, 255, 255, 0.69)');//Fill the elipses with a slightly transparent white 
    ellipse(38, 38,this.s/1.9,this.s/1.9); //bottom right ellipse
    ellipse(38, -38,this.s/1.9,this.s/1.9); //top right ellipse
    ellipse(-38, 38,this.s/1.9,this.s/1.9); //bottom left ellipse
    ellipse(-38, -38,this.s/1.9,this.s/1.9); //top left ellipse
  } 
    
  if((this.isOverRectangle === true)&&(this.k==1))//if the mouse is hovering over
  {
      fill('rgba(255, 255, 255, 0.43)'); //light transparent hover appears over shapes that have been made
      this.k = 1;//k=1 when hovering
  } else if (this.isOverRectangle === true) {
	  fill('rgba(255, 255, 255, 0.43)'); //light hover appears over reectangles when hovering
  } else {
      noFill(); //if not hovering over, no fill
  }
  rectMode(CENTER);
  rect(0,0,this.s*2,this.s*2);
  
  pop();//update the grid
}

function windowResized() { //when the window width or height is resized, resize the canvas with it
  resizeCanvas(windowWidth, windowHeight);
}