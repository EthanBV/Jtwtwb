var screenHeight = screen.height;
var screenWidth = screen.width;
var screenScale = Math.min(screenHeight, screenWidth);
var gameArea = document.createElement("CANVAS");
var screenBGC="gray";
  gameArea.style.position="absolute";
  gameArea.width = (screenScale * 0.7);
  gameArea.height = (screenScale * 0.7);
  gameArea.style.position = "absolute";
  gameArea.style.left = (screenWidth - screenScale * 0.7) / 2 + "px";
  gameArea.style.top = (screenHeight - screenScale * 0.7) / 2 + "px";
  gameArea.style.backgroundColor = screenBGC;
  gameArea.elements=[];
  gameArea.animation = gameArea.getContext("2d");
  gameArea.createElement = function(type,data,x,y){
    gameArea.elements.push([type,data,x,y]);  
  };
  gameArea.render = function(){
    var img;
    for(i=0;i<gameArea.elements.length;i++){
      switch(gameArea.elements[i][0]){
        case "tile":
         img=document.createElement("IMG");
          switch(gameArea.elements[i][1]){
              case 1:
                  img.src = "/Engine/Tiles/open.png";
                  break;
              case 2:
                  img.src = "/Engine/Tiles/fire.png";
                  break;
              case 3:
                  img.src = "/Engine/Tiles/water.png";
                  break;
              case 4:
                  img.src = "/Engine/Tiles/doorClosed.png";
                  break;
              case 5:
                    img.src = "/Engine/Tiles/switchOff.png";
                    break;
              case 6:
                    img.src = "/Engine/Tiles/faucet.png";
                    break;
              case 7:
                    img.src = "/Engine/Tiles/elevator.png";
                    break;
              case 8:
                    img.src = "/Engine/Tiles/wallBurnable.png";
                    break;
              case 9:
                    tile.style.backgroundColor = "purple";
                    break;
              case 10:
                    img.src = "/Engine/Tiles/playerReady.png";
                    break;
              case 11:
                    img.src = "/Engine/Tiles/extraReady.png";
                    break;
              case 12:
                    img.src = "/Engine/Tiles/playerUsed.png";
                    break;
              case 13:
                    img.src = "/Engine/Tiles/extraUsed.png";
                    break;
              case 14:
                    img.src = "/Engine/Tiles/doorOpen.png";
                    break;
              case 15:
                    img.src = "/Engine/Tiles/switchOn.png";
                    break;
                  
          }
          gameArea.animation.drawImage(img,gameArea.elements[i][2],gameArea.elements[i][3],30,30);
          break;
        case "move":
              img=document.createElement("IMG");
              switch(gameArea.elements[i][1]){
                  case 0:
                      img.src = "/Engine/Tiles/arrowRight.png";
                      break;
                  case 1:
                      img.src = "/Engine/Tiles/arrowUp.png";
                      break;
                  case 2:
                      img.src = "/Engine/Tiles/arrowLeft.png";
                      break;
                  case 3:
                      img.src = "/Engine/Tiles/arrowDown.png";
                      break;
              }
              gameArea.animation.drawImage(img,gameArea.elements[i][2],gameArea.elements[i][3],15,15);
          break;
        case "hazmat":
              img=document.createElement("IMG"); 
              img.src = "/Engine/Tiles/hazMat.png"
              gameArea.animation.drawImage(img,gameArea.elements[i][2],gameArea.elements[i][3],15,15);
          break;
      }
    }
    window.requestAnimationFrame(gameArea.render);
  };
gameArea.createElement("tile",1,10,10);
gameArea.createElement("tile",7,100,10);
gameArea.createElement("move",2,200,10);
gameArea.createElement("hazmat","none",300,200);
gameArea.render();
  document.body.appendChild(gameArea);