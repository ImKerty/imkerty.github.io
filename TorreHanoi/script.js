var pole1 = [1,2,3,4];
var pole2 = [];
var pole3 = [];
var mano = 0;
var timer = null;
var seconds = 0;

drawScene();

function drawScene(){
	drawPoles();
	drawHand();
	checkButtons();
	updateTimer();
	checkWin();
}

function drawPoles(){
	for(let i=1;i<4;i++){
		drawPole(getPole(i), getDivPole(i));
	}
}

function getDivPole(n){
	return document.getElementById("pole"+n);
}

function drawPole(pole, div){
	div.innerHTML = "";
	for(let i=0; i<pole.length; i++){
		div.innerHTML+=drawDisk(pole[i]);
	}
}

function checkButtons(){
	for(let i=1;i<4;i++)
		checkButton(i);
}	

function getPole(n){
	switch(n){
		case 1: return pole1;
		case 2: return pole2;
		case 3: return pole3;
	}
}

function checkButton(n){
	let button = document.getElementById("btn" + n);
	let pole = getPole(n);
	if(mano==0){
		button.innerText = "Prendi";
		button.disabled = pole.length == 0;
	} else {
		button.innerText = "Metti";				
		button.disabled = pole.length > 0 ? pole[0] < mano : false;			
	}
}

function drawHand(){
	let handDiv = document.getElementById("myHand");
	handDiv.innerHTML = drawDisk(mano);
}

function actionPole(n){
	if(mano==0){
		mano = getPole(n).shift();
		startTimer();
	} else {
		getPole(n).unshift(mano);
		mano = 0;
	}
	drawScene();
}

function getColor(dimension){
	let color = "#FF0000";
	switch(dimension){
		case 1: color = "#000000"; break;
		case 2: color = "#0000FF"; break;		
		case 3: color = "#00FF00"; break;
	}
	return color;
}

function drawDisk(dimension){
	let color = getColor(dimension);
	return '<div class="disk" style="background-color:'+color+'; width:'+dimension*10+'%;"></div>';
}

function startTimer() {
	if (timer === null) {
		timer = setInterval(function() {
			seconds++;
			updateTimer();
		}, 1000);
	}
}

function updateTimer() {
	document.getElementById("timer").innerText = "Tempo: " + seconds + " secondi";
}

function checkWin() {
	if (pole3.length == 4) {
		clearInterval(timer);
		showWinPopup();
	}
}

function showWinPopup() {
	document.getElementById("winPopup").style.display = "block";
}

function resetGame() {
    pole1 = [1,2,3,4];
    pole2 = [];
    pole3 = [];
    mano = 0;
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
    seconds = 0;
    document.getElementById("winPopup").style.display = "none";
    document.body.style.backgroundImage = "url('sfondo3.png')"; 
    drawScene();
    
   
    document.getElementById("btnReset").removeEventListener("click", cambiaSfondo);
}


document.getElementById("btnReset").addEventListener("click", cambiaSfondo);


var sfondi = ["sfondo1.png", "sfondo2.png", "sfondo3.png", "sfondo4.png", "sfondo5.png", "sfondo6.png", "sfondo7.png"];


function cambiaSfondo() {
   
    var sfondo = sfondi[Math.floor(Math.random() * sfondi.length)];
    

    document.body.style.backgroundImage = "url('" + sfondo + "')";
}


document.getElementById("btnReset").addEventListener("click", cambiaSfondo);

function SitoSoluzioni() {
   
    window.open("http://www.comunedasa.it/torri_Hanoi/soluzione.html", "_blank");
}
