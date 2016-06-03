/**
 * Created with Just the way the world burns.
 * User: Escharo
 * Date: 2015-04-21
 * Time: 04:13 PM
 * To change this template use Tools | Templates.
 */
var tileScale;
var tileOffset;
var screenHeight = screen.height;
var screenWidth = screen.width;
var screenScale = Math.min(screenHeight, screenWidth);
//Graphics Options
//Text Size
var largeTextScale = screenScale * 0.08;
var mediumTextScale = screenScale * 0.04;
var smallTextScale = screenScale * 0.025;
//Background Colors
var BGC = "rgb(80,0,0)"; //background color
var screenBGC = "rgb(80,80,100)"; //screen background color
var elevatorBGC = "silver";
var lettersBGC = "#D2B48C"
//tileImgsv
var imageMap = [];
var levelData = [];
var availableMoves = [];
var level = 1;
var unlocked = 99;
var menu;
function initiateMenu(){
    document.body.innerHTML = "";
    document.body.style.backgroundColor = BGC;
    document.body.style.overflow = "hidden";
    createFire("-20%", "0px", "140%", "100%", "transparent", 40);
    menu = document.createElement("DIV");
    menu.width = "100%";
    menu.height = "100%";
    menu.id = "menu"
    document.body.appendChild(menu);
    loadMain();
}

function loadMain() {
    menu.innerHTML = "";
    var banner = document.createElement("DIV");
    banner.innerHTML = "JUST THE WAY THE WORLD BURNS";
    banner.style.color = BGC;
    banner.style.fontSize = largeTextScale + "px";
    banner.style.textAlign = "center";
    banner.style.backgroundColor = "transparent";
    banner.style.width = "100%";
    banner.style.height = screenHeight * 0.1 + "px";
    banner.style.position = "absolute";
    banner.style.top = "82%";
    document.getElementById("menu").appendChild(banner);
    var newGame = document.createElement("DIV");
    newGame.style.cursor = "pointer";
    newGame.innerHTML = "New Game";
    newGame.style.color = BGC;
    newGame.style.fontSize = mediumTextScale + "px";
    newGame.style.textAlign = "center";
    newGame.style.backgroundColor = "transparent";
    newGame.style.width = screenWidth * 0.1 + "px";
    newGame.style.height = screenHeight * 0.1 + "px";
    newGame.style.position = "absolute";
    newGame.style.top = "40%";
    newGame.style.left = "45%";
    newGame.setAttribute("onclick", "loadElevator()");
    document.getElementById("menu").appendChild(newGame);
    var options = document.createElement("DIV");
    options.style.cursor = "pointer";
    options.innerHTML = "Options";
    options.style.color = BGC;
    options.style.fontSize = mediumTextScale + "px";
    options.style.textAlign = "center";
    options.style.backgroundColor = "transparent";
    options.style.width = screenWidth * 0.1 + "px";
    options.style.height = screenHeight * 0.1 + "px";
    options.style.position = "absolute";
    options.style.top = "40%";
    options.style.left = "15%";
    options.setAttribute("onclick", "loadOptions()");
    document.getElementById("menu").appendChild(options);
    var credits = document.createElement("DIV");
    credits.style.cursor = "pointer";
    credits.innerHTML = "Credits";
    credits.style.color = BGC;
    credits.style.fontSize = mediumTextScale + "px";
    credits.style.textAlign = "center";
    credits.style.backgroundColor = "transparent";
    credits.style.width = screenWidth * 0.1 + "px";
    credits.style.height = screenHeight * 0.1 + "px";
    credits.style.position = "absolute";
    credits.style.top = "40%";
    credits.style.left = "75%";
    credits.setAttribute("onclick", "loadCredits()");
    document.getElementById("menu").appendChild(credits);
}

function loadOptions() {
    menu.innerHTML = "";
    var musicVol = document.createElement("DIV");
    musicVol.style.cursor = "pointer";
    musicVol.innerHTML = "Music Volume";
    musicVol.style.color = BGC;
    musicVol.style.fontSize = mediumTextScale + "px";
    musicVol.style.textAlign = "center";
    musicVol.style.backgroundColor = "transparent";
    musicVol.style.width = screenWidth * 0.1 + "px";
    musicVol.style.height = screenHeight * 0.1 + "px";
    musicVol.style.position = "absolute";
    musicVol.style.top = "40%";
    musicVol.style.left = "45%";
    musicVol.setAttribute("onclick", "loadElevator()");
    document.getElementById("menu").appendChild(musicVol);
}

function loadCredits() {
    menu.innerHTML = "";
    var credits = [];
    var topDis = 0-largeTextScale;

    function makeCredit(content, type) {
        var credit = document.createElement("DIV");
        credit.innerHTML = content;
        credit.style.color = BGC;
        if(type == "name") credit.style.fontSize = mediumTextScale + "px";
        else if(type == "header") credit.style.fontSize = largeTextScale + "px";
        credit.style.textAlign = "center";
        credit.style.backgroundColor = "transparent";
        credit.style.width = "100%";
        credit.style.height = screenHeight * 0.1 + "px";
        credit.style.position = "absolute";
        credit.style.top = topDis + "px";
        credits.push(credit);
        if(type == "name") topDis += 50;
        else if(type == "header") topDis += 100;
    };
    var creditsDiv = document.createElement("MARQUEE");
    creditsDiv.style.width = "100%";
    creditsDiv.style.height = "0px";
    creditsDiv.style.position = "absolute";
    creditsDiv.direction = "up";
    creditsDiv.setAttribute("onclick", "loadMain()");
    var toBeCredits = [
        ["JUST THE WAY THE WORLD BURNS", "header"],
        ["a game by insert name here", "header"],
        ["Code by", "header"],
        ["Ethan", "name"],
        ["Art by", "header"],
        ["Ethan", "name"],
        ["Animations by","header"],
        ["Ethan","name"],
        ["Thanks to","header"],
        ["Ethan","name"],
        ["and Ethan","name"],
        ["and You!","name"],
    ];
    for(i = 0; i < toBeCredits.length; i++) makeCredit(toBeCredits[i][0], toBeCredits[i][1]);
    for(i = 0; i < credits.length; i++) {
        creditsDiv.appendChild(credits[i]);
        creditsDiv.style.height = parseInt(credits[i].style.top) + screenHeight + "px";
        creditsDiv.style.bottom = "10%";
    }
    document.getElementById("menu").appendChild(creditsDiv);
}

function loadElevator() {
    clearFires();
    document.body.innerHTML = "";
    document.body.style.backgroundColor = elevatorBGC;
    for(i = 1; i < 100; i++) {
        var levelButton = document.createElement("DIV");
        levelButton.style.cursor = "pointer";
        levelButton.style.fontSize = mediumTextScale + "px";
        levelButton.style.textAlign = "center";
        if(i <= unlocked) levelButton.style.color = "orange";
        else levelButton.style.color = "white";
        levelButton.style.backgroundColor = "black";
        levelButton.style.borderRadius = "100px";
        levelButton.style.width = (screenScale * 0.05) + "px";
        levelButton.style.height = (screenScale * 0.05) + "px";
        levelButton.style.position = "absolute";
        levelButton.innerHTML = 100 - i;
        levelButton.style.top = (screenScale * 0.05) + (screenScale * 0.05) * Math.floor((i - 1) / 8) + screenScale * 0.2 + "px";
        levelButton.style.left = (screenScale * 0.05) + (screenScale * 0.05) * ((i - 1) % 8) + "px";
        if(i <= unlocked) levelButton.setAttribute("onclick", "loadLevel(" + i + ")");
        else levelButton.setAttribute("onclick", "alert('Level Locked')");
        document.body.appendChild(levelButton);
    }
    var floorMarker = document.createElement("DIV");
    floorMarker.style.color = "orange";
    floorMarker.style.fontSize = largeTextScale + "px";
    floorMarker.style.textAlign = "center";
    floorMarker.style.backgroundColor = "black";
    floorMarker.style.border = "solid white 2px";
    floorMarker.style.width = (screenScale * 0.1) + "px";
    floorMarker.style.height = (screenScale * 0.1) + "px";
    floorMarker.style.position = "absolute";
    floorMarker.innerHTML = 100 - level;
    floorMarker.style.top = (screenHeight * 0.03) + "px";
    floorMarker.style.left = (screenWidth - (screenScale * 0.1)) / 2 + "px";
    document.body.appendChild(floorMarker);
    var elevatorDoorLeft = document.createElement("DIV");
    elevatorDoorLeft.style.backgroundColor = "lightgray";
    elevatorDoorLeft.style.border = "solid black 2px";
    elevatorDoorLeft.style.width = (screenScale * 0.35) + "px";
    elevatorDoorLeft.style.height = (screenScale * 0.7) + "px";
    elevatorDoorLeft.style.position = "absolute";
    elevatorDoorLeft.style.top = (screenHeight - (screenScale * 0.7)) / 2 + "px";
    elevatorDoorLeft.style.left = (screenWidth - (screenScale * 0.7)) / 2 + "px";
    document.body.appendChild(elevatorDoorLeft);
    var elevatorDoorRight = document.createElement("DIV");
    elevatorDoorRight.style.backgroundColor = "lightgray";
    elevatorDoorRight.style.border = "solid black 2px";
    elevatorDoorRight.style.width = (screenScale * 0.35) + "px";
    elevatorDoorRight.style.height = (screenScale * 0.7) + "px";
    elevatorDoorRight.style.position = "absolute";
    elevatorDoorRight.style.top = (screenHeight - (screenScale * 0.7)) / 2 + "px";;
    elevatorDoorRight.style.left = (screenWidth / 2) + "px";
    document.body.appendChild(elevatorDoorRight);
    var letters = document.createElement("DIV");
    letters.style.cursor = "pointer";
    letters.innerHTML = "Open Letters";
    letters.style.color = "orange";
    letters.style.backgroundColor="black";
    letters.style.border = "solid 2px orange";
    letters.style.fontSize = mediumTextScale + "px";
    letters.style.textAlign = "center";
    letters.style.width = screenWidth * 0.1 + "px";
    letters.style.height = screenHeight * 0.1 + "px";
    letters.style.position = "absolute";
    letters.style.top = "40%";
    letters.style.left = "75%";
    letters.setAttribute("onclick", "loadLetters()");
    document.body.appendChild(letters);
}


function findMoves(m) {
    console.log(m);
    var moves = [];
    var capPush;
    console.log(m.length);
    for(i = 0; i < m.length; i++) {
        console.log(m[i].length);
        for(e = 0; e < m[i].length; e++) {
            if(m[i][e] === 10 || m[i][e] === 11) {
                capPush = false;
                if(i < m.length - 2)
                    if(m[i + 2][e] === 1 || m[i + 2][e] === 14) capPush = true;
                switch(m[i + 1][e]) {
                    case 1:
                        moves.push(["move", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    case 4:
                        moves.push(["open", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    case 5:
                        moves.push(["flip", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    case 7:
                        if(m[i][e] === 10) moves.push(["exit", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    case 11:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i + 1],
                            [e, i + 2]
                        ]);
                        break;
                    case 10:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i + 1],
                            [e, i + 2]
                        ]);
                        break;
                    case 12:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i + 1],
                            [e, i + 2]
                        ]);
                        break;
                    case 13:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i + 1],
                            [e, i + 2]
                        ]);
                        break;
                    case 14:
                        moves.push(["move", [e, i],
                            [e, i + 1]
                        ]);
                        moves.push(["close", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    case 15:
                        moves.push(["flip", [e, i],
                            [e, i + 1]
                        ]);
                        break;
                    default:
                        break;
                }
                capPush = false;
                if(i > 2)
                    if(m[i - 2][e] === 1 || m[i - 2][e] === 14) capPush = true;
                switch(m[i - 1][e]) {
                    case 1:
                        moves.push(["move", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    case 4:
                        moves.push(["open", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    case 5:
                        moves.push(["flip", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    case 7:
                        if(m[i][e] === 10) moves.push(["exit", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    case 11:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i - 1],
                            [e, i - 2]
                        ]);
                        break;
                    case 10:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i - 1],
                            [e, i - 2]
                        ]);
                        break;
                    case 12:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i - 1],
                            [e, i - 2]
                        ]);
                        break;
                    case 13:
                        if(capPush) moves.push(["push", [e, i],
                            [e, i - 1],
                            [e, i - 2]
                        ]);
                        break;
                    case 14:
                        moves.push(["move", [e, i],
                            [e, i - 1]
                        ]);
                        moves.push(["close", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    case 15:
                        moves.push(["flip", [e, i],
                            [e, i - 1]
                        ]);
                        break;
                    default:
                        break;
                }
                capPush = false;
                if(e < m[i].length - 2)
                    if(m[i][e + 2] === 1 || m[i][e + 2] === 14) capPush = true;
                switch(m[i][e + 1]) {
                    case 1:
                        moves.push(["move", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    case 4:
                        moves.push(["open", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    case 5:
                        moves.push(["flip", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    case 7:
                        if(m[i][e] === 10) moves.push(["exit", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    case 11:
                        if(capPush) moves.push(["push", [e, i],
                            [e + 1, i],
                            [e + 2, i]
                        ]);
                        break;
                    case 10:
                        if(capPush) moves.push(["push", [e, i],
                            [e + 1, i],
                            [e + 2, i]
                        ]);
                        break;
                    case 12:
                        if(capPush) moves.push(["push", [e, i],
                            [e + 1, i],
                            [e + 2, i]
                        ]);
                        break;
                    case 13:
                        if(capPush) moves.push(["push", [e, i],
                            [e + 1, i],
                            [e + 2, i]
                        ]);
                        break;
                    case 14:
                        moves.push(["move", [e, i],
                            [e + 1, i]
                        ]);
                        moves.push(["close", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    case 15:
                        moves.push(["flip", [e, i],
                            [e + 1, i]
                        ]);
                        break;
                    default:
                        break;
                }
                capPush = false;
                if(e > 2)
                    if(m[i][e - 2] === 1 || m[i][e - 2] === 14) capPush = true;
                switch(m[i][e - 1]) {
                    case 1:
                        moves.push(["move", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    case 4:
                        moves.push(["open", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    case 5:
                        moves.push(["flip", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    case 7:
                        if(m[i][e] === 10) moves.push(["exit", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    case 11:
                        if(capPush) moves.push(["push", [e, i],
                            [e - 1, i],
                            [e - 2, i]
                        ]);
                        break;
                    case 10:
                        if(capPush) moves.push(["push", [e, i],
                            [e - 1, i],
                            [e - 2, i]
                        ]);
                        break;
                    case 12:
                        if(capPush) moves.push(["push", [e, i],
                            [e - 1, i],
                            [e - 2, i]
                        ]);
                        break;
                    case 13:
                        if(capPush) moves.push(["push", [e, i],
                            [e - 1, i],
                            [e - 2, i]
                        ]);
                        break;
                    case 14:
                        moves.push(["move", [e, i],
                            [e - 1, i]
                        ]);
                        moves.push(["close", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    case 15:
                        moves.push(["flip", [e, i],
                            [e - 1, i]
                        ]);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return moves;
}

function renderMap() {
    document.getElementById("map").innerHTML = "";
    var leftOffset = 0;
    var topOffset = 0;
    if(tileOffset[0] == "Left") leftOffset = tileOffset[1] / 2;
    else topOffset = tileOffset[1] / 2;
    for(i = 0; i < imageMap.length; i++) {
        for(e = 0; e < imageMap[i].length; e++) {
            console.log(imageMap[i][e]);
            var tile = document.createElement("DIV");
            tile.style.width = (tileScale * 0.9) + "px";
            tile.style.height = (tileScale * 0.9) + "px";
            var img = document.createElement("IMG");
            img.style.width = (tileScale * 0.9) + "px";
            img.style.height = (tileScale * 0.9) + "px";
            switch(imageMap[i][e]) {
                //wallSpace
                case 0:
                    img.src = "";
                    break;
                    //emptySpace
                case 1:
                    if(levelData[0][i][e] == 4 || levelData[0][i][e] == 14) {
                        imageMap[i][e] = 14;
                        img.src = "Tiles/doorOpen.png";
                    } else img.src = "Tiles/open.png";
                    break;
                    //Fire
                case 2:
                    img.src = "Tiles/fire.png";
                    break;
                    //Water
                case 3:
                    img.src = "Tiles/water.png";
                    break;
                    //Door
                case 4:
                    img.src = "Tiles/doorClosed.png";
                    break;
                    //Switch Off
                case 5:
                    img.src = "Tiles/switchOff.png";
                    break;
                    //Faucet
                case 6:
                    img.src = "Tiles/faucet.png";
                    break;
                    //Elevator
                case 7:
                    img.src = "Tiles/elevator.png";
                    break;
                    //Flammable Mat
                case 8:
                    img.src = "Tiles/wallBurnable.png";
                    break;
                    //Haz Mat
                case 9:
                    tile.style.backgroundColor = "purple";
                    break;
                    //Player Can Move
                case 10:
                    img.src = "Tiles/playerReady.png";
                    break;
                    //Extra Can Move
                case 11:
                    img.src = "Tiles/extraReady.png";
                    break;
                    //Player Can't Move
                case 12:
                    img.src = "Tiles/playerUsed.png";
                    break;
                    //Extra Can't Move
                case 13:
                    img.src = "Tiles/extraUsed.png";
                    break;
                    //Open Door
                case 14:
                    img.src = "Tiles/doorOpen.png";
                    break;
                    //Switch On
                case 15:
                    img.src = "Tiles/switchOn.png";
                    break;
                    //Drain
                case 16:
                    tile.style.backgroundColor = "rgb(100,100,100)";
                    break;
            }
            tile.style.position = "absolute";
            tile.style.zIndex = "0";
            tile.style.left = ((e + leftOffset) * tileScale) + (tileScale * 0.05) + "px";
            tile.style.top = ((i + topOffset) * tileScale) + (tileScale * 0.05) + "px";
            if(imageMap[i][e] != 0) tile.appendChild(img);
            document.getElementById("map").appendChild(tile);
        }
    }
    //noprotect
    var hazmatMarker;
    for(o = 0; o < imageMap.length; o++) {
        for(u = 0; u < imageMap[o].length; u++) {
            if(levelData[1][o][u] == 10 && imageMap[o][u] != 2 && imageMap[o][u] != 3) {
                console.log(imageMap[o][u]);
                hazmatMarker = document.createElement("DIV");
                hazmatMarker.style.width = tileScale * 0.2 + "px";
                hazmatMarker.style.height = tileScale * 0.2 + "px";
                hazmatMarker.innerHTML = "H";
                hazmatMarker.style.backgroundColor = "purple";
                hazmatMarker.style.color = "orange";
                hazmatMarker.style.position = "absolute";
                hazmatMarker.style.zIndex = "1";
                hazmatMarker.style.left = ((u + leftOffset) * tileScale) + (tileScale * 0.4) + "px";
                hazmatMarker.style.top = ((o + topOffset) * tileScale) + (tileScale * 0.4) + "px";
                document.getElementById("map").appendChild(hazmatMarker);
            }
        }
    }
    availableMoves = findMoves(imageMap);
    console.log(availableMoves);
    var left;
    var top;
    for(i = 0; i < availableMoves.length; i++) {
        var moveIcon = document.createElement("img");
        moveIcon.style.width = tileScale * 0.4 + "px";
        moveIcon.style.height = tileScale * 0.4 + "px";
        moveIcon.style.backgroundColor = "red";
        moveIcon.style.position = "absolute";
        left = ((availableMoves[i][1][0] + leftOffset) * tileScale) + (tileScale * 0.05);
        top = ((availableMoves[i][1][1] + topOffset) * tileScale) + (tileScale * 0.05);
        if(availableMoves[i][1][0] > availableMoves[i][2][0]) {
            moveIcon.src = "Tiles/arrowLeft.png";
            if(availableMoves[i][0] == "close") left += (tileScale * 0.9 - tileScale * 0.4) / 2 - tileScale * 0.65;
            else left += (tileScale * 0.9 - tileScale * 0.4) / 2 - tileScale * 0.25;
            top += (tileScale * 0.9 - tileScale * 0.4) / 2;
        }
        if(availableMoves[i][1][0] < availableMoves[i][2][0]) {
            moveIcon.src = "Tiles/arrowRight.png";
            if(availableMoves[i][0] == "close") left += (tileScale * 0.9 - tileScale * 0.4) / 2 + tileScale * 0.65;
            else left += (tileScale * 0.9 - tileScale * 0.4) / 2 + tileScale * 0.25;
            top += (tileScale * 0.9 - tileScale * 0.4) / 2;
        }
        if(availableMoves[i][1][1] > availableMoves[i][2][1]) {
            moveIcon.src = "Tiles/arrowUp.png";
            left += (tileScale * 0.9 - tileScale * 0.4) / 2;
            if(availableMoves[i][0] == "close") top += (tileScale * 0.9 - tileScale * 0.4) / 2 - tileScale * 0.65;
            else top += (tileScale * 0.9 - tileScale * 0.4) / 2 - tileScale * 0.25;
        }
        if(availableMoves[i][1][1] < availableMoves[i][2][1]) {
            moveIcon.src = "Tiles/arrowDown.png";
            left += (tileScale * 0.9 - tileScale * 0.4) / 2;
            if(availableMoves[i][0] == "close") top += (tileScale * 0.9 - tileScale * 0.4) / 2 + tileScale * 0.65;
            else top += (tileScale * 0.9 - tileScale * 0.4) / 2 + tileScale * 0.25;
        }
        moveIcon.style.left = left + "px";
        moveIcon.style.top = top + "px";
        moveIcon.style.zIndex = "1";
        moveIcon.setAttribute("onclick", "movePerformed('" + availableMoves[i][0] + "',[" + availableMoves[i][1] + "],[" + availableMoves[i][2] + "],[" + availableMoves[i][3] + "])");
        document.getElementById("map").appendChild(moveIcon);
    }
}

function movePerformed(type, index1, index2, index3) {
    switch(type) {
        case "move":
            if(imageMap[index1[1]][index1[0]] == 10) imageMap[index2[1]][index2[0]] = 12;
            else if(imageMap[index1[1]][index1[0]] == 11) imageMap[index2[1]][index2[0]] = 13;
            imageMap[index1[1]][index1[0]] = 1;
            break;
        case "open":
            if(imageMap[index1[1]][index1[0]] == 10) imageMap[index1[1]][index1[0]] = 12;
            else if(imageMap[index1[1]][index1[0]] == 11) imageMap[index1[1]][index1[0]] = 13;
            imageMap[index2[1]][index2[0]] = 14;
            break;
        case "close":
            if(imageMap[index1[1]][index1[0]] == 10) imageMap[index1[1]][index1[0]] = 12;
            else if(imageMap[index1[1]][index1[0]] == 11) imageMap[index1[1]][index1[0]] = 13;
            imageMap[index2[1]][index2[0]] = 4;
            break;
        case "push":
            if(imageMap[index1[1]][index1[0]] == 10) imageMap[index1[1]][index1[0]] = 12;
            else if(imageMap[index1[1]][index1[0]] == 11) imageMap[index1[1]][index1[0]] = 13;
            imageMap[index3[1]][index3[0]] = imageMap[index2[1]][index2[0]];
            imageMap[index2[1]][index2[0]] = 1;
            break;
        case "flip":
            if(imageMap[index1[1]][index1[0]] == 10) imageMap[index1[1]][index1[0]] = 12;
            else if(imageMap[index1[1]][index1[0]] == 11) imageMap[index1[1]][index1[0]] = 13;
            if(imageMap[index2[1]][index2[0]] == 5) imageMap[index2[1]][index2[0]] = 15;
            else if(imageMap[index2[1]][index2[0]] == 15) imageMap[index2[1]][index2[0]] = 5;
            break;
        case "exit":
            imageMap[index1[1]][index1[0]] = 12;
            unlocked = Math.max(unlocked, level + 1);
            loadElevator();
            break;
        default:
            break;
    }
    renderMap();
}

function getImageMap(path) {
    var result = [];
    var row;
    for(i = 0; i < path.length; i++) {
        row = [];
        for(e = 0; e < path[i].length; e++) {
            row.push(path[i][e]);
        }
        result.push(row);
    }
    console.log("test:" + result);
    return result;
}

function loadLevel(l) {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = BGC;
    level = l;
    //imageMap=getLevelData(levels[level-1][0]);
    levelData = getLevelData("LevelData/" + level + ".txt");
    imageMap = getImageMap(levelData[0]);
    var screen = document.createElement("DIV");
    screen.id = "map";
    screen.style.width = (screenScale * 0.7) + "px";
    screen.style.height = (screenScale * 0.7) + "px";
    screen.style.backgroundColor = screenBGC;
    screen.style.position = "absolute";
    screen.style.left = (screenWidth - screenScale * 0.7) / 2 + "px";
    screen.style.top = (screenHeight - screenScale * 0.7) / 2 + "px";
    document.body.appendChild(screen);
    var nextTurnButton = document.createElement("DIV");
    nextTurnButton.style.width = (screenScale * 0.15) + "px";
    nextTurnButton.style.fontSize = mediumTextScale + "px";
    nextTurnButton.style.textAlign = "center";
    nextTurnButton.innerHTML = "NEXT TURN";
    nextTurnButton.style.height = (screenScale * 0.1) + "px";
    nextTurnButton.style.backgroundColor = "yellow";
    nextTurnButton.style.color = "orange";
    nextTurnButton.style.border = "solid darkred 3px";
    nextTurnButton.style.position = "absolute";
    nextTurnButton.style.left = ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7)) + ((screenWidth) - ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7))) / 2 - ((screenScale * 0.15)) / 2 + "px";
    nextTurnButton.style.top = (screenHeight - screenScale * 0.5) / 2 + "px";
    nextTurnButton.setAttribute("onclick", "nextTurn()");
    document.body.appendChild(nextTurnButton);
    var reset = document.createElement("DIV");
    reset.style.width = (screenScale * 0.15) + "px";
    reset.style.fontSize = mediumTextScale + "px";
    reset.style.textAlign = "center";
    reset.innerHTML = "RESET LEVEL";
    reset.style.height = (screenScale * 0.1) + "px";
    reset.style.backgroundColor = "yellow";
    reset.style.color = "orange";
    reset.style.border = "solid darkred 3px";
    reset.style.position = "absolute";
    reset.style.left = ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7)) + ((screenWidth) - ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7))) / 2 - ((screenScale * 0.15)) / 2 + "px";
    reset.style.top = (screenHeight - screenScale * 0.2) / 2 + "px";
    reset.setAttribute("onclick", "resetLevel()");
    document.body.appendChild(reset);
    var exit = document.createElement("DIV");
    exit.style.width = (screenScale * 0.15) + "px";
    exit.style.fontSize = mediumTextScale + "px";
    exit.style.textAlign = "center";
    exit.innerHTML = "EXIT";
    exit.style.height = (screenScale * 0.1) + "px";
    exit.style.backgroundColor = "yellow";
    exit.style.color = "orange";
    exit.style.border = "solid darkred 3px";
    exit.style.position = "absolute";
    exit.style.left = ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7)) + ((screenWidth) - ((screenWidth - screenScale * 0.7) / 2 + (screenScale * 0.7))) / 2 - ((screenScale * 0.15)) / 2 + "px";
    exit.style.top = (screenHeight - screenScale * -0.1) / 2 + "px";
    exit.setAttribute("onclick", "exitLevel()");
    document.body.appendChild(exit);
    loadDialogue(0);
    tileScale = (screenScale * 0.7) / Math.max(imageMap.length, imageMap[0].length);
    tileOffset = [imageMap.length > imageMap[0].length ? "Left" : "Top", imageMap.length > imageMap[0].length ? imageMap.length - imageMap[0].length : imageMap[0].length - imageMap.length]
    renderMap();
}

function loadDialogue(i) {
    var dialogueBox = document.createElement("DIV");
    dialogueBox.class = "dialogueBox";
    dialogueBox.style.width = (screenScale * 0.7) + "px";
    dialogueBox.style.fontSize = smallTextScale + "px";
    dialogueBox.style.textAlign = "center";
    dialogueBox.innerHTML = levelData[2][i];
    dialogueBox.style.height = (screenScale * 0.1) + "px";
    dialogueBox.style.backgroundColor = "black";
    dialogueBox.style.color = "limegreen";
    dialogueBox.style.position = "absolute";
    dialogueBox.style.left = (screenWidth - screenScale * 0.7) / 2 + "px";
    dialogueBox.style.top = (screenHeight - screenScale * -0.7) / 2 + "px";
    if(levelData[2].length > i) {
        dialogueBox.setAttribute("onclick", "loadDialogue(" + (i + 1) + ")");
        document.body.appendChild(dialogueBox);
    } else {
        dialogueBox = document.createElement("DIV");
        dialogueBox.class = "dialogueBox";
        dialogueBox.style.width = (screenScale * 0.7) + "px";
        dialogueBox.style.fontSize = smallTextScale + "px";
        dialogueBox.style.textAlign = "center";
        dialogueBox.innerHTML = "";
        dialogueBox.style.height = (screenScale * 0.1) + "px";
        dialogueBox.style.backgroundColor = "black";
        dialogueBox.style.color = "limegreen";
        dialogueBox.style.position = "absolute";
        dialogueBox.style.left = (screenWidth - screenScale * 0.7) / 2 + "px";
        dialogueBox.style.top = (screenHeight - screenScale * -0.7) / 2 + "px";
        document.body.appendChild(dialogueBox);
        renderMap();
    }
}

function nextTurn() {
    for(i = 0; i < imageMap.length; i++) {
        console.log(imageMap[i].length);
        for(e = 0; e < imageMap[i].length; e++) {
            if(imageMap[i][e] == 12) imageMap[i][e] = 10;
            else if(imageMap[i][e] == 13) imageMap[i][e] = 11;
        }
    }
    spreadWater();
    spreadFire();
    checkHazMat();
    renderMap();
}

function spreadFire() {
    var toFire = [];
    var HazMatThisCheck = 1;
    for(i = 0; i < imageMap.length; i++) {
        for(e = 0; e < imageMap[i].length; e++) {
            if(imageMap[i][e] == 2) {
                switch(imageMap[i + 1][e]) {
                    case 1:
                        toFire.push([i + 1, e]);
                        break;
                    case 8:
                        toFire.push([i + 1, e]);
                        break;
                    case 14:
                        toFire.push([i + 1, e]);
                        break;
                    case 10:
                        toFire.push([i + 1, e]);
                        break;
                    case 11:
                        toFire.push([i + 1, e]);
                        break;
                    case 12:
                        toFire.push([i + 1, e]);
                        break;
                    case 13:
                        toFire.push([i + 1, e]);
                        break;
                    default:
                        break;
                }
                switch(imageMap[i - 1][e]) {
                    case 1:
                        toFire.push([i - 1, e]);
                        break;
                    case 8:
                        toFire.push([i - 1, e]);
                        break;
                    case 14:
                        toFire.push([i - 1, e]);
                        break;
                    case 10:
                        toFire.push([i - 1, e]);
                        break;
                    case 11:
                        toFire.push([i - 1, e]);
                        break;
                    case 12:
                        toFire.push([i - 1, e]);
                        break;
                    case 13:
                        toFire.push([i - 1, e]);
                        break;
                    default:
                        break;
                }
                switch(imageMap[i][e + 1]) {
                    case 1:
                        toFire.push([i, e + 1]);
                        break;
                    case 8:
                        toFire.push([i, e + 1]);
                        break;
                    case 14:
                        toFire.push([i, e + 1]);
                        break;
                    case 10:
                        toFire.push([i, e + 1]);
                        break;
                    case 11:
                        toFire.push([i, e + 1]);
                        break;
                    case 12:
                        toFire.push([i, e + 1]);
                        break;
                    case 13:
                        toFire.push([i, e + 1]);
                        break;
                    default:
                        break;
                }
                switch(imageMap[i][e - 1]) {
                    case 1:
                        toFire.push([i, e - 1]);
                        break;
                    case 8:
                        toFire.push([i, e - 1]);
                        break;
                    case 14:
                        toFire.push([i, e - 1]);
                        break;
                    case 10:
                        toFire.push([i, e - 1]);
                        break;
                    case 11:
                        toFire.push([i, e - 1]);
                        break;
                    case 12:
                        toFire.push([i, e - 1]);
                        break;
                    case 13:
                        toFire.push([i, e - 1]);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    for(i = 0; i < toFire.length; i++) {
        imageMap[toFire[i][0]][toFire[i][1]] = 2;
    }
}

function spreadWater() {
    var toWater = [];
    var checkTiles = [];
    var switchIds = [];
    var alreadyChecked;
    for(i = 0; i < imageMap.length; i++) {
        for(e = 0; e < imageMap[i].length; e++) {
            if(imageMap[i][e] == 15) {
                if(levelData[1][i][e] != 10) switchIds.push(levelData[1][i][e]);
            }
        }
    }
    for(i = 0; i < imageMap.length; i++) {
        for(e = 0; e < imageMap[i].length; e++) {
            if(imageMap[i][e] == 6) {
                if(switchIds.indexOf(levelData[1][i][e]) != -1) {
                    checkTiles.push([i, e]);
                }
            }
        }
    }
    for(i = 0; i < checkTiles.length; i++) {
        switch(imageMap[checkTiles[i][0]][checkTiles[i][1] + 1]) {
            case 3:
                alreadyChecked = false;
                for(a = 0; a < checkTiles.length; a++) {
                    if([checkTiles[i][0], checkTiles[i][1] + 1][0] == checkTiles[a][0] && [checkTiles[i][0], checkTiles[i][1] + 1][1] == checkTiles[a][1]) alreadyChecked = true;
                }
                if(!alreadyChecked) {
                    checkTiles.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                }
                break;
            case 1:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 2:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 14:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 10:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 11:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 12:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            case 13:
                toWater.push([checkTiles[i][0], checkTiles[i][1] + 1]);
                break;
            default:
                break;
        }
        switch(imageMap[checkTiles[i][0]][checkTiles[i][1] - 1]) {
            case 3:
                alreadyChecked = false;
                for(a = 0; a < checkTiles.length; a++) {
                    if([checkTiles[i][0], checkTiles[i][1] - 1][0] == checkTiles[a][0] && [checkTiles[i][0], checkTiles[i][1] - 1][1] == checkTiles[a][1]) alreadyChecked = true;
                }
                if(!alreadyChecked) {
                    checkTiles.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                }
                break;
            case 1:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 2:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 14:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 10:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 11:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 12:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            case 13:
                toWater.push([checkTiles[i][0], checkTiles[i][1] - 1]);
                break;
            default:
                break;
        }
        switch(imageMap[checkTiles[i][0] + 1][checkTiles[i][1]]) {
            case 3:
                alreadyChecked = false;
                for(a = 0; a < checkTiles.length; a++) {
                    if([checkTiles[i][0] + 1, checkTiles[i][1]][0] == checkTiles[a][0] && [checkTiles[i][0] + 1, checkTiles[i][1]][1] == checkTiles[a][1]) alreadyChecked = true;
                }
                if(!alreadyChecked) {
                    checkTiles.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                }
                break;
            case 1:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 2:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 14:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 10:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 11:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 12:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            case 13:
                toWater.push([checkTiles[i][0] + 1, checkTiles[i][1]]);
                break;
            default:
                break;
        }
        switch(imageMap[checkTiles[i][0] - 1][checkTiles[i][1]]) {
            case 3:
                alreadyChecked = false;
                for(a = 0; a < checkTiles.length; a++) {
                    if([checkTiles[i][0] - 1, checkTiles[i][1]][0] == checkTiles[a][0] && [checkTiles[i][0] - 1, checkTiles[i][1]][1] == checkTiles[a][1]) alreadyChecked = true;
                }
                if(!alreadyChecked) {
                    checkTiles.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                }
                break;
            case 1:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 2:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 14:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 10:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 11:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 12:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            case 13:
                toWater.push([checkTiles[i][0] - 1, checkTiles[i][1]]);
                break;
            default:
                break;
        }
        //checkTiles.splice(i,1);
    }
    for(e = 0; e < toWater.length; e++) {
        imageMap[toWater[e][0]][toWater[e][1]] = 3;
    }
}

function checkHazMat() {
    var continueHazMat = true;
    var toFire;
    while(continueHazMat === true) {
        toFire = [];
        continueHazMat = false;
        for(i = 0; i < imageMap.length; i++) {
            for(e = 0; e < imageMap[i].length; e++) {
                if(imageMap[i][e] == 2 && levelData[1][i][e] == 10) {
                    if(levelData[1][i + 1][e] == 10 && imageMap[i + 1][e] != 2 && imageMap[i + 1][e] != 3) {
                        toFire.push([i + 1, e]);
                        continueHazMat = true;
                    }
                    if(levelData[1][i - 1][e] == 10 && imageMap[i - 1][e] != 2 && imageMap[i - 1][e] != 3) {
                        toFire.push([i - 1, e]);
                        continueHazMat = true;
                    }
                    if(levelData[1][i][e + 1] == 10 && imageMap[i][e + 1] != 2 && imageMap[i][e + 1] != 3) {
                        toFire.push([i, e + 1]);
                        continueHazMat = true;
                    }
                    if(levelData[1][i][e - 1] == 10 && imageMap[i][e - 1] != 2 && imageMap[i][e - 1] != 3) {
                        toFire.push([i, e - 1]);
                        continueHazMat = true;
                    }
                }
            }
        }
        for(i = 0; i < toFire.length; i++) {
            imageMap[toFire[i][0]][toFire[i][1]] = 2;
        }
        console.log(continueHazMat);
    }
}

function resetLevel() {
    loadLevel(level);
}

function exitLevel() {
    loadElevator();
}

function getLevelData(file) {
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    var levelData = [];
    var partData = [];
    var section = 0;
    var curRow = [];
    var curItem = "";
    var i = 0;
    while(section < 3) {
        if(allText.charAt(i) == "%") {
            section++;
            levelData.push(partData);
            partData = [];
        } else {
            if(section == 0) {
                if(allText.charAt(i) == "|") {
                    partData.push(curRow);
                    curRow = [];
                } else if(parseInt(allText.charAt(i)) == allText.charAt(i)) {
                    curItem = curItem + allText.charAt(i);
                } else if(allText.charAt(i) == " ") {
                    if(curItem != "") curRow.push(parseInt(curItem));
                    curItem = "";
                }
            } else if(section == 1) {
                if(allText.charAt(i) == "|") {
                    partData.push(curRow);
                    curRow = [];
                } else if(parseInt(allText.charAt(i)) == allText.charAt(i)) {
                    curItem = curItem + allText.charAt(i);
                } else if(allText.charAt(i) == " ") {
                    if(curItem != "") curRow.push(parseInt(curItem));
                    curItem = "";
                }
            } else if(section == 2) {
                if(allText.charAt(i) == "|") {
                    partData.push(curRow);
                    curRow = "";
                } else if(allText.charAt(i) == "@") {
                    curRow = curRow + " ";
                } else if(allText.charAt(i) != " ") {
                    curRow = curRow + (allText.charAt(i));
                }
            }
        }
        i++;
    }
    return levelData;
}
initiateMenu();