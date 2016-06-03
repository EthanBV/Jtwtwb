// canvas = document.createElement("CANVAS");
// canvas.style.width = "100%";
// canvas.style.height = "100%";
// canvas.style.backgroundColor = "black";
// document.body.appendChild(canvas);
//var animation = canvas.getContext("2d");
var particles = [];
var density = 40;
var fires = [];
//createFire("0px","-100px","100%","100%","transparent",40);

function createParticle(){
  //this.xOrigin=fires[e].width/2;
  this.xOrigin=(fires[e].width*Math.random()*0.6+fires[e].width*0.2);
  this.yOrigin=fires[e].height*(Math.random()*0.1+0.85);
  this.x=this.xOrigin;
  this.y=this.yOrigin;
  this.radius = (fires[e].width/2)/(Math.random()*16+11);
  this.transparency = 0.05;
//   this.red = Math.floor(Math.random()*255);
//   this.green = Math.floor(Math.random()*255);
//   this.blue = Math.floor(Math.random()*255);
  this.red = 255;
  this.green = 255;
  this.blue = Math.floor(Math.random()*200);
  this.blueChange = Math.random()*0.1+0.2;
  this.greenChange = Math.random()*0.2;
  this.age = 0;
  this.wind = 0;
  this.velocity = Math.random()*1+2;
  this.angle = (Math.random()*Math.PI);
  this.xVelocity = Math.cos(this.angle)*this.velocity;
  this.yVelocity = Math.sin(this.angle)*this.velocity;
  this.draw = function(){
    fires[e].animation.beginPath();
    fires[e].animation.arc(this.x,this.y,this.radius,0,2*Math.PI, false);
    fires[e].animation.fillStyle = "rgba("+this.red+","+this.green+","+this.blue+","+this.transparency+")";
    fires[e].animation.fill();
  };
  this.update = function(){
//     if(this.x>this.xOrigin)this.xVelocity-=Math.random()*2;
//     else if(this.x<this.xOrigin) this.xVelocity+=Math.random()*2;
    this.tilt=0;
    
    this.tilt=Math.max(this.tilt,-1);
    this.tilt=Math.min(this.tilt, 1);
    this.xVelocity*=Math.random()*0.4+0.7;
    this.yVelocity+=0;
    this.x+=this.xVelocity;
    this.y-=this.yVelocity;
    this.radius*=0.98;
    this.transparency*=0.98;
    this.wind+=Math.random()*0.25-0.125;
    this.green=this.green-Math.floor(this.green*this.greenChange);
    this.blue=this.blue-Math.floor(this.blue*this.blueChange);
    this.age++;
  };
}


function createFire(left,top,width,height,BGC,density){
  var can = document.createElement("CANVAS");
  can.class="fire";
  can.style.position="absolute";
  can.style.left = left;
  can.style.top = top;
  can.style.width = width;
  can.style.height = height;
  can.style.backgroundColor = BGC;
  can.particles=[];
  can.animation = can.getContext("2d");
  can.density = density;
  can.update=function(){
    
  };
  fires.push(can);
  document.body.appendChild(can);
}

function clearFires(){
    fires = [];
}

function updateAnimation(){
  for(e=0;e<fires.length;e++){
    fires[e].animation.globalCompositeOperation = 'destination-out';
  fires[e].animation.fillStyle = 'hsla(0, 0%, 0%, .1)';
  fires[e].animation.fillRect(0, 0, fires[e].width, fires[e].height);
  fires[e].animation.globalCompositeOperation = 'lighter';
  for(i=0;i<fires[e].density;i++)fires[e].particles.unshift(new createParticle());
    for(i=fires[e].particles.length-1;i>=0;i--){
      fires[e].particles[i].update();
      fires[e].particles[i].draw();
        if(fires[e].particles[i].age>50)fires[e].particles.splice(i,1);
    }
  }
    
    window.requestAnimationFrame(updateAnimation);
}

window.requestAnimationFrame(updateAnimation);