// variáveis da bola
let xBola = 300;
let yBola = 200;
let diameter = 17;
let raio = diameter / 2;

// velocidade da bola
let velocidadexBola = 6;
let velocidadeyBola = 6;

// variáveis da raquete
let xRaquete = 5
let yRaquete = 150
let wRaquete = 10
let hRaquete = 90

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;
let chanceDeErrar = 0;

let colidiu = false 

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  moveBola();
  colisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  moveRaquete();
  //colisaoRaquete();
  colisaoRaquete(xRaquete,yRaquete);
  colisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  placar();
  marcaPonto();
  bolaPresa();
}

function mostraBola(){
  circle(xBola, yBola, diameter);
}

function moveBola(){
  xBola += velocidadexBola;
  yBola += velocidadeyBola;
}

function colisaoBorda(){
  if (xBola + raio > width || 
     xBola - raio < 0){
    velocidadexBola *= -1;
  }
  if (yBola + raio > height ||
     yBola - raio <0){
    velocidadeyBola *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, wRaquete, hRaquete)
}

function moveRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  //limite da borda
  yRaquete = constrain(yRaquete,10,310)
}

function colisaoRaquete(){
  if (xBola - raio < xRaquete + wRaquete && yBola - raio < yRaquete + hRaquete && yBola + raio > yRaquete){
    velocidadexBola *= -1
    raquetada.play();
  }
}

function colisaoRaquete(x,y){
  colidiu =
  hit = collideRectCircle(x, y, wRaquete, hRaquete, xBola, yBola, raio);
  if (colidiu){
    velocidadexBola *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeyOponente = yBola -yRaqueteOponente - wRaquete / 2 - 30;
  yRaqueteOponente += velocidadeyOponente + chanceDeErrar
  calculaChanceDeErrar();
  
  //limite da borda
  yRaqueteOponente = constrain(yRaqueteOponente,10,310)
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function placar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255,153,51))
  rect(150,10,40,20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255,153,51))
  rect(450,10,40,20)
  fill(255)
  text(pontosOponente, 470, 26)
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolaPresa(){
  if (xBola - raio < 0){
    xBola = 23
  }
}