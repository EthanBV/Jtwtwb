var lettersFound = 5;
var letters = ["All To Plan","TestLetter2"];
var letterLoc = [/*[level,status]*/[99,false]];
var newLetter = false;
//loads a menu of all the letters
function loadLetters(){
    newLetter = false;
    document.body.innerHTML = "";
    document.body.style.backgroundColor = lettersBGC;
    var letterZone = document.createElement("DIV");
    letterZone.id = "letterZone"
    letterZone.style.cursor = "pointer";
    letterZone.style.fontSize = mediumTextScale + "px";
    letterZone.style.color = "gray";
    letterZone.style.backgroundColor = "tan";
    letterZone.style.width = (screenWidth * 0.8) + "px";
    letterZone.style.height = screenHeight + "px";
    letterZone.style.position = "absolute";
    letterZone.innerHTML = "";
    letterZone.style.top = 0 + "px";
    letterZone.style.left = 0 + "px";
    document.body.appendChild(letterZone);
    var buttonZone = document.createElement("DIV");
    buttonZone.id = "buttonZone"
    buttonZone.style.cursor = "pointer";
    buttonZone.style.fontSize = mediumTextScale + "px";
    buttonZone.style.textAlign = "center";
    buttonZone.style.color = "green";
    buttonZone.style.backgroundColor = "rgb("+(30+10*(lettersFound+1))+",0,0)";
    buttonZone.style.width = (screenWidth * 0.2) + "px";
    buttonZone.style.height = screenHeight + "px";
    buttonZone.style.position = "absolute";
    buttonZone.innerHTML = "";
    buttonZone.style.top = 0 + "px";
    buttonZone.style.overflow="auto";
    buttonZone.style.left = (screenWidth*0.8) + "px";
    document.body.appendChild(buttonZone);
    for(i=0;i<lettersFound;i++){
    var letterButton = document.createElement("DIV");
        letterButton.id = i;
        letterButton.style.cursor = "pointer";
        letterButton.style.fontSize = mediumTextScale + "px";
        letterButton.style.textAlign = "center";
        letterButton.style.color = "gray";
        letterButton.style.backgroundColor = "rgb("+(30+i*10)+",0,0)";
        letterButton.style.width = (screenWidth * 0.2) + "px";
        letterButton.style.height = (screenHeight * 0.05) + "px";
        letterButton.style.position = "absolute";
        letterButton.innerHTML = letters[i];
        letterButton.style.top = (screenScale * 0.05) * i+ "px";
        letterButton.style.left = 0 + "px";
        letterButton.setAttribute("onclick", "loadLetter(" + i + ")");
        letterButton.setAttribute("onmouseover","document.getElementById("+i+").style.backgroundColor='rgb("+(60+i*10)+",0,0)'");
        letterButton.setAttribute("onmouseout","document.getElementById("+i+").style.backgroundColor='rgb("+(30+i*10)+",0,0)'");
        document.getElementById("buttonZone").appendChild(letterButton);
    }
    var back = document.createElement("DIV");
    back.style.cursor = "pointer";
    back.innerHTML = "Back";
    back.style.color = "orange";
    back.style.backgroundColor = "black";
    back.style.border = "solid 2px orange";
    back.style.fontSize = mediumTextScale + "px";
    back.style.textAlign = "center";
    back.style.width = screenWidth * 0.1 + "px";
    back.style.height = screenHeight * 0.1 + "px";
    back.style.position = "absolute";
    back.style.top = "2%";
    back.style.left = "68%";
    back.setAttribute("onclick", "loadElevator()");
    document.body.appendChild(back);
}
//loads a letter
function loadLetter(letter){
    letter = "Letters/"+letters[letter]+".txt";
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", letter, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    document.getElementById("letterZone").innerHTML="<pre>"+allText+"</pre>";
}

function checkLetters(level,pos){
    for(i=0;i<letterLoc.length;i++){
        if(level==letterLoc[i][0]&&false==letterLoc[i][1]){
            letterLoc[i][1]=true;
            newLetter=true;
        }
    }
}