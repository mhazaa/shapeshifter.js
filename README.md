# SHAPESHIFTER.JS

Shapeshifter.js takes low poly shapes and transforms them into each other. The shapes don't need to have the same number of polygons. The polygons don't need to have equal number of points. And the polygons can have different colors and opacity.

The only requirement is the the svg you pass has polygons as the child elements. Paths, polylines, and rects won't work.

##GETTING STARTED

### SETTING UP THE SVGS

First of all you'll need the SVG markup for the shapes you want to transform. This is the markup for the cocoon from the example.

<svg id="cocoon" style="display:none" viewBox="0 0 118.02 367.5">
  <polygon points="116.3 212.97 90.33 259.74 45.69 249.76 72.16 200.78 100.75 200.78 116.3 212.97" style="fill: #f79a4c"/>
  <polygon points="90.33 259.74 91.6 303.88 45.92 282.3 45.69 249.76 90.33 259.74" style="fill: #f37944"/>
  <polygon points="91.6 303.88 70.81 339.37 39.84 316.95 45.92 282.3 91.6 303.88" style="fill: #ef4f2b"/>
  <polygon points="70.81 339.37 43.65 359.83 23.99 345.91 39.85 316.97 70.81 339.37" style="fill: #db3627"/>
  <polygon points="43.65 359.83 15.7 367.5 5.33 358.25 23.99 345.91 43.65 359.83" style="fill: #512927"/>
  <polygon points="72.16 200.78 43.65 197.84 7.29 209.68 9.28 221.87 45.69 249.76 72.16 200.78" style="fill: #ee4648"/>
  <polygon points="45.91 282.29 45.69 249.76 9.28 221.87 45.91 282.29" style="fill: #cc3635"/>
  <polygon points="9.43 222.01 4.98 267.7 39.85 316.97 45.92 282.3 9.43 222.01" style="fill: #992e2e"/>
  <polygon points="4.98 267.7 1.36 307.94 23.99 345.91 39.85 316.97 4.98 267.7" style="fill: #7f2422"/>
  <polygon points="23.99 345.91 5.33 358.25 0 326.01 1.36 307.94 23.99 345.91" style="fill: #512927"/>
  <polygon points="81.48 206.76 118.02 214.16 99.75 169.77 66.12 145.57 38.22 151.84 74.19 179.87 81.48 206.76" style="fill: #904645"/>
  <polygon points="81.48 206.76 43.65 207.66 4.98 214.16 15.34 177.89 38.22 151.84 74.19 179.87 81.48 206.76" style="fill: #512927"/>
  <polygon points="56.23 77.37 56.23 149 60.54 153.47 60.54 0 56.23 77.37"/>
</svg>

Few notes:
1- The SVG needs to consist of polygons. I'm planning to implement the ability for shapeshifter.js to take other svg shapes as well and path. But for now it only works with polygons.
2- Make sure to set the display on the svg to none. We're not going to display the SVG. We're just taking the svg and polygon attributes and transferring them to JavaScript canvas.
3- Notice how every polygon has a fill value. If it doesn't shapeshifter.js will default to black.
4- If you'd like the polygons to have different opacity, add it as a css value also, in addition to fill. Otherwise, it's full opacity by default

### JAVASCRIPT

OK, now we're ready to jump to javascript and start with all the fun stuff. First of all make sure to download the shapeshifter.js file and link it in your html.

    <script src="shapeshifter.js"></script>

Now we'll add a refrence for our svg shapes. Make sure to querySelectorAll the polygon. Not the SVG itself.

    var flamengoPolygons = document.querySelector('#flamengo').querySelectorAll('polygon');
    var earthPolygons = document.querySelector('#earth').querySelectorAll('polygon');
