var flamengoPolygons = document.querySelector('#flamengo').querySelectorAll('polygon');
var earthPolygons = document.querySelector('#earth').querySelectorAll('polygon');
var cocoonPolygons = document.querySelector('#cocoon').querySelectorAll('polygon');
var butterflyPolygons = document.querySelector('#butterfly').querySelectorAll('polygon');
var landscapePolygons = document.querySelector('#landscape').querySelectorAll('polygon');

var container = document.querySelector('#container');
var shapeshifter = new Shapeshifter(container, 0, 0, flamengoPolygons, {
  /*transformSpeed: {x:0.05, y:0.05},
  hideSpeed: {x:0.05, y:0.05},
  opacitySpeed: 0.05,
  colorSpeed: 0.05,*/
  defaultSpeed: 0.03, //any speed properities not defined will resort to defaultSpeed
  scale: 0.3, //1 makes the initial SVG 100% of the container's width
  center: true,
  strokeOnly: false
});

var shapeshifterStroke = new Shapeshifter(container, 0, 0, flamengoPolygons, {
  /*transformSpeed: {x:0.05, y:0.05},
  hideSpeed: {x:0.05, y:0.05},
  opacitySpeed: 0.05,
  colorSpeed: 0.05,*/
  defaultSpeed: 0.01,
  scale: 0.8,
  center: true,
  strokeOnly: true
});

function loop(){
  shapeshifter.loop();
  shapeshifterStroke.loop();
  window.requestAnimationFrame(loop);
}
loop();

var animationState = -1;
window.addEventListener('click', function(){
  animationState++;
  if(animationState>2)animationState=0;
  if(animationState==0){
    shapeshifter.transform(butterflyPolygons);
    shapeshifterStroke.transform(butterflyPolygons);
  }
  if(animationState==1){
    shapeshifter.transform(cocoonPolygons);
    shapeshifterStroke.transform(cocoonPolygons);
  }
  if(animationState==2){
    shapeshifter.transform(flamengoPolygons);
    shapeshifterStroke.transform(flamengoPolygons);
  }
});
