class HelperFunctions {
  constructor(){
  }
  static lerp(start, end, amt){
    return (1-amt)*start+amt*end
  }
  static polygonPointsArr(polygon){
    var points = [];

    for(var i=0; i<polygon.points.numberOfItems; i++){
      points[i] = {};
      points[i].x = polygon.points[i].x;
      points[i].y = polygon.points[i].y;
    }
    return points;
  }
  static rgbJSON(rgb){
    return rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
  }
  static map(x, in_min, in_max, out_min, out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
}

class ShapeshifterSettings {
  constructor(options){
    this.options = {};
    var defaultSpeed;
    (options.defaultSpeed) ? defaultSpeed = options.defaultSpeed : defaultSpeed = 0.07;
    this.options.transformSpeed = {x: defaultSpeed, y: defaultSpeed}; //default value
    this.options.hideSpeed = {x: defaultSpeed, y: defaultSpeed}; //default value
    this.options.scale = 1;
    this.options.colorSpeed = defaultSpeed;
    this.options.opacitySpeed = defaultSpeed;


    if(options){
      for(var option in options){
        if(options[option]) this.options[option] =  options[option]
      }
    }
  }
}

class ShapeshifterCanvas extends ShapeshifterSettings {
  constructor(container, options){
    super(options);
    this.canvas;
    this.ctx;
    this.shapeshifters = [];
    this.container = container;
    this.init();
  }
  init(){
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.container.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    var that = this;
    window.addEventListener('resize', function(){
      that.canvas.width = that.container.offsetWidth;
      that.canvas.height = that.container.offsetHeight;
    });
  }
}

class Polygon {
  constructor(shapeshifter, x, y, svgPolygon){
    this.opacity = 1;
    this.color = HelperFunctions.rgbJSON("rgb(0,0,0)");
    if(svgPolygon.style.fill) this.color = HelperFunctions.rgbJSON(svgPolygon.style.fill);
    if(svgPolygon.style.opacity) this.opacity = svgPolygon.style.opacity;

    this.shapeshifter = shapeshifter;
    this.x = x;
    this.y = y;

    this.strokeOpts = {
      color: this.color,
      lineWidth: 0.3,
      opacity: 1
    }

    if(this.shapeshifter.options.strokeOnly) this.opacity = 0;

    this.hiding = false;

    this.points = [];
    this.newPoints = [];
    var points = HelperFunctions.polygonPointsArr(svgPolygon);
    this.init(points, true);
  }
  init(points, withAnimation){
    if(withAnimation){
      for(var i=0; i<points.length; i++){
        this.points[i] = {};
        this.points[i].x = points[0].x;
        this.points[i].y = points[0].y;
      }
      this.newPoints = points;

      this.updateTransformation = function(){
        for(var i=0; i<this.newPoints.length; i++){
          this.points[i].x = HelperFunctions.lerp(this.points[i].x, this.newPoints[i].x, this.shapeshifter.options.transformSpeed.x);
          this.points[i].y = HelperFunctions.lerp(this.points[i].y, this.newPoints[i].y, this.shapeshifter.options.transformSpeed.y);
        }
      }
    } else {
      this.points = points;
    }
  }
  hide(){
    this.hiding = true;
    this.updateHiding = function(){
      for(var i=0; i<this.points.length; i++){
        this.points[i].x = HelperFunctions.lerp(this.points[i].x, this.points[0].x, this.shapeshifter.options.hideSpeed.x);
        this.points[i].y = HelperFunctions.lerp(this.points[i].y, this.points[0].y, this.shapeshifter.options.hideSpeed.y);
      }
    }
  }
  transform(svgPolygon){
    this.hiding = false;

    var newOpacity = 1;
    var newColor = HelperFunctions.rgbJSON("rgb(0,0,0)");
    if(svgPolygon.style.fill) newColor = HelperFunctions.rgbJSON(svgPolygon.style.fill);
    if(svgPolygon.style.opacity) newOpacity = svgPolygon.style.opacity;

    this.updateColorChange = function(){
      if(this.shapeshifter.options.strokeOnly) return;
      for(var i=0; i<this.color.length; i++){
        this.color[i] = HelperFunctions.lerp(this.color[i], newColor[i], this.shapeshifter.options.colorSpeed);
      }
      this.opacity = HelperFunctions.lerp(this.opacity, newOpacity, this.shapeshifter.options.opacitySpeed);
    }

    this.newPoints = HelperFunctions.polygonPointsArr(svgPolygon);

    var hasMorePoints, hasLessPoints;
    if(this.newPoints.length>this.points.length){
      hasMorePoints = this.newPoints;
      hasLessPoints = this.points;
    } else {
      hasMorePoints = this.points;
      hasLessPoints = this.newPoints;
    }

    if(hasMorePoints==this.newPoints){
      var diff = hasMorePoints.length - hasLessPoints.length;
      for(var i=0; i<diff; i++){
        if(this.points.length>0){
          this.points.push(
            {x: this.points[0].x, y: this.points[0].y}
          )
        } else {
          this.points.push(
            {x:0, y:0}
          )
        }
      }
    }

    this.updateTransformation = function(){
      for(var i=0; i<hasMorePoints.length; i++){
        if(typeof this.newPoints[i] == 'undefined'){
          this.points[i].x = HelperFunctions.lerp(this.points[i].x, this.points[0].x, this.shapeshifter.options.transformSpeed.x*4);
          this.points[i].y = HelperFunctions.lerp(this.points[i].y, this.points[0].y, this.shapeshifter.options.transformSpeed.y*4);
        } else {
          this.points[i].x = HelperFunctions.lerp(this.points[i].x, this.newPoints[i].x, this.shapeshifter.options.transformSpeed.x);
          this.points[i].y = HelperFunctions.lerp(this.points[i].y, this.newPoints[i].y, this.shapeshifter.options.transformSpeed.y);
        }
      }
    }
  }
  updateHiding(){}
  updateTransformation(){}
  updateColorChange(){}
  update(){
    (this.hiding) ? this.updateHiding() : this.updateTransformation();
    this.updateColorChange();
  }
  draw(){
    shapeshifter.ctx.save();
    shapeshifter.ctx.beginPath();
    shapeshifter.ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.opacity + ')';
    //ctx.fillStyle = this.color;
    for(var i=0; i<this.points.length; i++){
      if(i==0){
        shapeshifter.ctx.moveTo(this.shapeshifter.x + this.x+this.points[i].x*this.shapeshifter.options.scale, this.shapeshifter.y+this.y+this.points[i].y*this.shapeshifter.options.scale);
      } else {
        shapeshifter.ctx.lineTo(this.shapeshifter.x+this.x+this.points[i].x*this.shapeshifter.options.scale, this.shapeshifter.y+this.y+this.points[i].y*this.shapeshifter.options.scale);
      }
    }
    shapeshifter.ctx.lineWidth = this.strokeOpts.lineWidth;
    shapeshifter.ctx.strokeStyle = 'rgba(' + this.strokeOpts.color[0] + ',' + this.strokeOpts.color[1] + ',' + this.strokeOpts.color[2] + ',' + this.strokeOpts.opacity + ')';
    shapeshifter.ctx.stroke();
    shapeshifter.ctx.fill();
    shapeshifter.ctx.restore();
  }
}

class Shapeshifter extends ShapeshifterCanvas {
  constructor(container, x, y, svgPolygons, options){
    super(container, options);
    this.x = x;
    this.y = y;

    this.svg = svgPolygons[0].parentNode;

    this.polygons = [];

    this.applyScale();
    this.createPolygons(svgPolygons);

    if(this.options.center){
      this.center();
      this.input();
    }
  }
  applyScale(){
    if(!this.cachedInitalScale) this.cachedInitalScale = this.options.scale;
    var w = this.svg.viewBox.baseVal.width/this.cachedInitalScale;
    this.options.scale = (this.canvas.width/w);
  }
  center(){
    var w = this.svg.viewBox.baseVal.width*this.options.scale;
    var h = this.svg.viewBox.baseVal.height*this.options.scale;
    if(this.centered){
      this.newX = this.canvas.width/2 - w/2;
      this.newY = this.canvas.height/2 - h/2;
    } else {
      this.x = this.canvas.width/2 - w/2;
      this.y = this.canvas.height/2 - h/2;
      this.centered = true;
    }
  }
  input(){
    var that = this;
    window.addEventListener('resize', function(){
      that.applyScale();
      that.center();
    });
  }
  createPolygons(svgPolygons){
    var that = this;

    svgPolygons.forEach(function(svgPolygon){
      that.polygons.push(
         new Polygon(that, 0, 0, svgPolygon)
      )
    });
  }
  createPolygon(svgPolygon){
    var polygon = new Polygon(this, 0, 0, svgPolygon);
    this.polygons.push(polygon);
    polygon.transform(svgPolygon);
  }
  transform(svgPolygons){
    this.svg = svgPolygons[0].parentNode;
    if(this.options.center) this.center();

    if(this.polygons.length==svgPolygons.length){
      for(var i=0; i<this.polygons.length; i++){
        this.polygons[i].transform(svgPolygons[i]);
      }
    }
    else if(this.polygons.length>svgPolygons.length){
      for(var i=0; i<this.polygons.length; i++){
        if(svgPolygons[i]){
          this.polygons[i].transform(svgPolygons[i]);
        } else {
          this.polygons[i].hide();
        }
      }
    }
    else if(this.polygons.length<svgPolygons.length){
      for(var i=0; i<svgPolygons.length; i++){
        if(this.polygons[i]){
          this.polygons[i].transform(svgPolygons[i]);
        } else {
          this.createPolygon(svgPolygons[i]);
        }
      }
    }
  }
  update(){
    for(var i=0; i<this.polygons.length; i++){
      this.polygons[i].update();
    }
    if(this.newX) this.x = HelperFunctions.lerp(this.x, this.newX, this.options.transformSpeed.x);
    if(this.newY) this.y = HelperFunctions.lerp(this.y, this.newY, this.options.transformSpeed.y);
  }
  draw(){
    for(var i=0; i<this.polygons.length; i++){
      this.polygons[i].draw();
    }
  }
  loop(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
  }
}
