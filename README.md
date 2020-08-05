# Shapeshifter.js

http://shapeshifterjs.com

Shapeshifter.js takes low poly SVGs and transforms them into each other. The shapes don't need to have the same number of polygons. The polygons don't need to have equal number of points. And the polygons can have different colors and opacity.


## SETTING UP THE DOM

1- First of all you'll need the SVG markup for the shapes you want to transform between. I personally use illustrator to draw the vectors and export the SVG code, but there are a lot of options obviously. This is the markup for two of the SVGs in the example.

    <svg id="retriever" viewBox="0 0 227.49 200.03">
      <polygon points="144.38 0 177.82 20 192.51 88.14 144.38 0" style="fill: #f79a4c"/>
      <polygon points="192.51 88.14 190.63 104.7 135.91 126.59 141.78 38.86 192.51 88.14" style="fill: #f37944"/>
      <polygon points="190.63 104.7 182.82 120.95 149.69 171.59 135.91 126.59 190.63 104.7" style="fill: #ef4f2b"/>
      <polygon points="144.38 0 113.75 5.15 141.78 38.86 156.51 22.23 144.38 0" style="fill: #f37944"/>
      <polygon points="83.12 0 49.67 20 34.98 88.14 83.12 0" style="fill: #db3627"/>
      <polygon points="34.98 88.14 36.86 104.7 70.3 82.04 83.12 0 34.98 88.14" style="fill: #ef4f2b"/>
      <polygon points="36.86 104.7 44.67 120.95 77.8 171.59 91.58 126.59 36.86 104.7" style="fill: #f37944"/>
      <polygon points="83.12 0 113.75 5.15 94.06 22.19 83.12 0" style="fill: #f79a4c"/>
      <polygon points="149.69 171.59 142.66 188.36 135.91 126.59 149.69 171.59" style="fill: #db3627"/>
      <polygon points="77.8 171.59 84.84 188.36 91.58 126.59 77.8 171.59" style="fill: #f79a4c"/>
      <polygon points="142.66 188.36 132.66 197.32 113.75 200.03 91.58 126.59 113.75 133.61 135.91 126.59 142.66 188.36" style="fill: #ef4f2b"/>
      <polygon points="113.75 200.03 94.84 197.32 84.84 188.36 91.58 126.59 113.75 200.03" style="fill: #f37944"/>
      <polygon points="70.3 82.04 91.58 126.59 36.86 104.7 70.3 82.04" style="fill: #f79a4c"/>
      <polygon points="94.06 22.19 141.78 38.86 113.75 5.15 94.06 22.19" style="fill: #f4b84d"/>
      <polygon points="94.06 22.19 70.3 82.04 83.12 0 94.06 22.19" style="fill: #f37944"/>
      <polygon points="141.78 38.86 156.51 22.23 192.51 88.14 141.78 38.86" style="fill: #ef4f2b"/>
      <polygon points="70.3 82.04 138.48 88.14 141.78 38.86 94.06 22.19 70.3 82.04" style="fill: #f79a4c"/>
      <polygon points="113.75 97.83 135.91 126.59 138.48 88.14 113.75 97.83" style="fill: #f79a4c"/>
      <polygon points="113.75 97.83 91.58 126.59 113.75 133.61 135.91 126.59 113.75 97.83" style="fill: #904645"/>
      <polygon points="70.3 82.04 138.48 88.14 113.75 97.83 91.58 126.59 70.3 82.04" style="fill: #f4b84d"/>
      <polygon points="155.94 6.92 172.34 19.13 183.39 3.41 165.21 3.41 155.94 6.92" style="fill: #904645"/>
      <polygon points="183.39 3.41 203.78 9.06 172.34 19.13 183.39 3.41" style="fill: #c97979"/>
      <polygon points="172.34 19.13 179.71 31.17 181.67 43.95 203.78 9.06 172.34 19.13" style="fill: #b26060"/>
      <polygon points="203.78 9.06 219.51 20.36 227.49 40.63 181.33 52.02 181.67 43.95 203.78 9.06" style="fill: #a55555"/>
      <polygon points="227.49 40.63 226.85 50.09 213.95 91.91 181.33 77.54 181.33 52.02 227.49 40.63" style="fill: #904645"/>
      <polygon points="181.33 77.54 188.06 96.89 213.21 103.15 213.95 91.91 181.33 77.54" style="fill: #512927"/>
      <polygon points="188.06 96.89 204.41 113.1 213.21 103.15 188.06 96.89" style="fill: #381b1a"/>
      <polygon points="204.41 113.1 216.9 121.58 213.21 111.26 213.21 103.15 204.41 113.1" style="fill: #904645"/>
      <polygon points="71.55 6.92 55.15 19.13 44.1 3.41 62.28 3.41 71.55 6.92" style="fill: #904645"/>
      <polygon points="44.1 3.41 23.71 9.06 55.15 19.13 44.1 3.41" style="fill: #c97979"/>
      <polygon points="55.15 19.13 47.78 31.17 45.82 43.95 23.71 9.06 55.15 19.13" style="fill: #b26060"/>
      <polygon points="23.71 9.06 7.98 20.36 0 40.63 46.16 52.02 45.82 43.95 23.71 9.06" style="fill: #a55555"/>
      <polygon points="0 40.63 0.65 50.09 13.54 91.91 46.16 77.54 46.16 52.02 0 40.63" style="fill: #904645"/>
      <polygon points="46.16 77.54 39.43 96.89 14.28 103.15 13.54 91.91 46.16 77.54" style="fill: #512927"/>
      <polygon points="39.43 96.89 23.08 113.1 14.28 103.15 39.43 96.89" style="fill: #381b1a"/>
      <polygon points="23.08 113.1 10.6 121.58 14.28 111.26 14.28 103.15 23.08 113.1" style="fill: #904645"/>
      <polygon points="141.82 65.69 146.06 73.65 155.03 74.33 160.78 70.01 154.18 67.39 141.82 65.69" style="fill: #fff"/>
      <polygon points="85.67 65.69 81.44 73.65 72.47 74.33 66.71 70.01 73.31 67.39 85.67 65.69" style="fill: #fff"/>
    </svg>
    
    <svg id="passerine" viewBox="0 0 279.94 199.6">
      <polygon points="69.98 30.7 101 73.11 82.76 35.19 102.25 26.45 69.98 30.7" style="fill: #891b29"/>
      <polygon points="102.25 26.45 151.01 6.94 129.01 24.45 82.76 35.19 102.25 26.45" style="fill: #891b29"/>
      <polygon points="129.01 24.45 150.01 31.14 123.75 41.27 82.76 35.19 129.01 24.45" style="fill: #99293f"/>
      <polygon points="124 41.27 145.14 53.65 125.5 58.27 82.76 35.19 124 41.27" style="fill: #bc2a42"/>
      <polygon points="125.5 58.27 138.95 70.59 121.07 70.59 82.76 35.19 125.5 58.27" style="fill: #d33d4f"/>
      <polygon points="82.76 35.19 121.07 70.59 137.82 90.77 101 73.11 82.76 35.19" style="fill: #f24653"/>
      <polygon points="151.01 6.94 207.58 2.02 247.26 6.94 225.25 41.27 129.01 24.45 151.01 6.94" style="fill: #f37944"/>
      <polygon points="129.01 24.45 150.01 31.14 124 41.27 145.14 53.65 125.5 58.27 175.9 80.38 225.25 41.27 129.01 24.45" style="fill: #f79a4c"/>
      <polygon points="137.82 90.77 178.73 95.72 175.9 80.38 125.5 58.27 138.95 70.59 121.07 70.59 137.82 90.77" style="fill: #f4bd4d"/>
      <polygon points="37.35 33.87 32.34 14.53 21.51 27.7 0 30.37 37.35 33.87" style="fill: #512927"/>
      <polygon points="0 30.37 28.68 36.87 41.02 50.21 54.35 53.71 58.52 42.04 37.35 33.87 0 30.37" style="fill: #904645"/>
      <polygon points="54.35 53.71 68.86 49.08 51.19 9.69 32.34 14.53 37.35 33.87 58.52 42.04 54.35 53.71" style="fill: #f79a4c"/>
      <polygon points="68.86 49.08 77.97 41.27 69.98 30.7 77.03 29.77 69.98 18.11 51.19 9.69 68.86 49.08" style="fill: #f37944"/>
      <polygon points="178.73 95.72 219.41 70.59 198.64 62.36 175.9 80.38 178.73 95.72" style="fill: #bc2a42"/>
      <polygon points="219.41 70.59 234.74 41.27 226.88 38.73 225.25 41.27 198.64 62.36 219.41 70.59" style="fill: #99293f"/>
      <polygon points="234.74 41.27 255.05 19.26 279.94 3.75 258.68 5.25 223.54 0 207.58 2.02 247.26 6.94 226.88 38.73 234.74 41.27" style="fill: #891b29"/>
      <polygon points="54.35 53.71 75.36 94.39 82.76 47.6 77.97 41.27 68.86 49.08 54.35 53.71" style="fill: #ee4648"/>
      <polygon points="75.36 94.39 113.95 129.99 111.35 78.07 101 73.11 82.76 47.6 75.36 94.39" style="fill: #cc3635"/>
      <polygon points="113.95 129.99 142.72 144.24 124.94 84.59 111.35 78.07 113.95 129.99" style="fill: #992e2e"/>
      <polygon points="142.72 144.24 203.58 143.41 179.82 107.39 168.53 94.49 137.82 90.77 124.94 84.59 142.72 144.24" style="fill: #7f2422"/>
      <polygon points="164.26 143.95 202.58 163.25 222.25 199.6 245.26 194.09 211.91 155.91 179.9 143.73 164.26 143.95" style="fill: #e2c534"/>
      <polygon points="203.58 143.41 219.41 150.52 259.1 179.25 243.82 192.45 211.91 155.91 179.9 143.73 203.58 143.41" style="fill: #ffd939"/>
      <polygon points="195.17 130.67 263.93 154.41 253.4 175.13 219.41 150.52 203.58 143.41 195.17 130.67" style="fill: #fffa3b"/>
      <polygon points="189.31 121.79 212.91 130.67 259.1 126.23 260.59 153.26 195.17 130.67 189.31 121.79" style="fill: #d0d82b"/>
    </svg>

Few notes:

- As of now, the SVGs need to consist of polygons. I'm planning to implement the ability for shapeshifter.js to take other SVGs that have paths, rects etc. But as of now, it only works with polygons.

- Make sure to set the display on the SVGs to none. We're not going to display them directly in the DOM. We're just taking the SVG and polygon attributes and displaying them on a JavaScript canvas.

- Notice how every polygon has a fill value. If it doesn't shapeshifter.js will default to black.

- If you'd like the polygons to have different opacity, add it as an inline css value just like fill. Otherwise, the polygons will have full opacity by default.

2- OK, next thing we need is a parent element for our canvas.

    <div id="container"></div>
    
3- Our canvas size is gonna be relative to the container, so make sure to give the container width and height (and it can be responsive or static) In this case I'll just make it fill the viewport.

    #container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }


## INSTALLATION

Just download the shapeshifter.js file and link it in your html.

    <script src="shapeshifter.js"></script>


## USAGE

OK, now we're ready to jump in to all the fun JavaScript stuff. First we'll add a reference for our svg shapes. Make sure to querySelectorAll the polygons. Not the SVG itself.

    var retrieverPolygons = document.querySelector('#retriever').querySelectorAll('polygon');
    var passerinePolygons = document.querySelector('#passerine').querySelectorAll('polygon');

We'll add a reference to the container div also

    var container = document.querySelector('#container');

Now let's initialzie Shapeshifter.

    var shapeshifter = new Shapeshifter(container, x, y, polygons, options);
     
**container | domElement**: The container element we created earlier.

**x | number**: Initial x value, I recommend setting it as 0 and changing the container's position instead.

**y | number**: Initial y value, I also recommend setting it as 0 and changing the container's position instead.

**polygons | domElements**: The initial SVG for Shapeshifter before any transformation happen. Pass the array of polygons from earlier (retrieverPolygons, passerinePolygons);

**options | object**: pass any options you wanna change. Here are all the options you can pass.

Here's how we'll initialize it in this example:

    var options = {
      /*transformSpeed: {x:0.05, y:0.05}, //transformation speed 
      hideSpeed: {x:0.05, y:0.05}, //the speed extra polygons get hidden
      opacitySpeed: 0.05, //the speed of opacity changes
      colorSpeed: 0.05, //the speed of color changes*/
      defaultSpeed: 0.03, //any speed property not defined will resort to defaultSpeed. If defaultSpeed is not set, it defaults to 0.07
      scale: 0.3, //1 makes the initial SVG 100% of the container's width
      center: true, //center the shapes inside the container. Otherwise, they'll stick to the top left corner
      strokeOnly: false //only show the outlines
    }

    var shapeshifter = new Shapeshifter(container, 0, 0, retrieverPolygons, options);
    
    
## OPTIONS OBJECT

These are the paramaters you can pass as options:

**transformSpeed | {x: number; y: number}**: Transformation speed. Default value is {x: 0.07, y: 0.07}

**hideSpeed | {x: number; y: number}**: The speed extra polygons get hidden. Default value is {x: 0.07, y: 0.07}

**opacitySpeed | number**: The speed polygons will change opacity. Default value is 0.07

**colorSpeed | number**: The speed polygons will change color. Default value is 0.07

**defaultSpeed | number**: The default speed all the other unset speed properties take. Default value is 0.07

**scale | number**: The size of the initial SVG. 1 == 100% of the container div width. The SVGs your transform to will just be sized relatively to the first. So make sure they're all similar size when you export them.

**center | boolean**: Center the SVG inside the container. Otherwise they stay on the top left of the container.

**strokeOnly | boolean**: Only show the outlines.


## RUNNING THE LOOP

Now before Shapeshifter.js animations work, we need to run its loop function every frame. So we'll create a recursive loop function to update Shapeshifter.

    function loop(){
      shapeshifter.loop();
      window.requestAnimationFrame(loop);
    }
    loop();
    
    
## TRANSFORMATION

Now the part we're doing all of this for. If you wanna transform the svg. Run this method.

    shapeshifter.transform(newPolygons);
    
In this example newPolygons being passerinePolygons.

And here's a quick example function to switch back and forth between passerinePolygons and retrieverPolygons on click. I'll just use a boolean since we're transforming between two SVGs only in this example, but we can can transform between any number of SVGs.

    (function(){
        var animationState = true;

        window.addEventListener('click', function(){
          if(animationState){
            shapeshifter.transform(passerinePolygons);
          } else {
            shapeshifter.transform(retrieverPolygons);
          }
          animationState = !animationState;
        });
    })();
