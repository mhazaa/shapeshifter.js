var retrieverPolygons = document.querySelector('#retriever').querySelectorAll('polygon');
var flamengoPolygons = document.querySelector('#flamengo').querySelectorAll('polygon');
var passerinePolygons = document.querySelector('#passerine').querySelectorAll('polygon');

var all = [retrieverPolygons, flamengoPolygons, passerinePolygons];

var container = document.querySelector('#container');
var shapeshifter = new Shapeshifter(container, 0, 0, all[0], {
  /*transformSpeed: {x:0.05, y:0.05},
  hideSpeed: {x:0.05, y:0.05},
  opacitySpeed: 0.05,
  colorSpeed: 0.05,*/
  defaultSpeed: 0.03, //any speed properities not defined will resort to defaultSpeed
  scale: 0.3, //1 makes the initial SVG 100% of the container's width
  center: true,
  strokeOnly: false
});

var shapeshifterStroke = new Shapeshifter(container, 0, 0, all[0], {
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

var animationState = 0;
window.addEventListener('click', function(){
  animationState++;
  if(animationState>=all.length)animationState=0;
  shapeshifter.transform( all[animationState] );
  shapeshifterStroke.transform( all[animationState] );
});
