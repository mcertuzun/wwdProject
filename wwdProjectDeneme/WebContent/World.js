function includeJs(jsFilePath) {
	var js = document.createElement("script");

	js.type = "text/javascript";
	js.src = jsFilePath;

	document.body.appendChild(js);
}

includeJs("worldwindlib.js");
var Coordinates = true;
var Compass = true;
var BingAerial = true;
var ath = true;
var clicker= false;
var	recognizer=null;
var wwd=null;
var path=true;
var clean =false;
var dist=false;
var selectedShape = null;
var count= [];
var  pathsArr = [];
var positionArr=[];
// Register an event listener to be called when the page is loaded.
window.addEventListener("load", layers, false);

// Define the event listener to initialize Web World Wind.
function layers() {
	// Create a World Window for the canvas.
	wwd = new WorldWind.WorldWindow("canvasOne");
	// Listen for mouse clicks.
	
	
	var clickRecognizer = new WorldWind.ClickRecognizer(wwd, handleClick);
	
	// Define layers to populate the WorldWindow
	var layers = [ {
		layer : new WorldWind.BMNGLayer(),
		enabled : true
	}, {
		layer : new WorldWind.BMNGLandsatLayer(),
		enabled : false
	}, {
		layer : new WorldWind.BingAerialLayer(null),
		enabled : true
	}, {
		layer : new WorldWind.ViewControlsLayer(wwd),
		enabled : true
	},

	];
	// Create those layers.
	for (var l = 0; l < layers.length; l++) {
		layers[l].layer.enabled = layers[l].enabled;
		wwd.addLayer(layers[l].layer);
	}
	if (Compass == true) { // For Hiding option
		wwd.addLayer(new WorldWind.CompassLayer());

	}
	if (BingAerial == true) { // For Hiding option
		wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));

	}
	if (Coordinates == true) { // For Hiding option
		wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
	}
}
function distan(){
	if(dist==false){
		dist=true;

	}
	else dist=false;
	
}

function cleaner(){
	if(clean==false){
		clean=true;

	}
	else clean=false;
}

function path(){
	if(path==false){
		path=true;
	}
	else path=false;
}

function cli(){
	if(clicker==false){
		clicker=true;
		handleClick();
	}
	else clicker=false;
}

// Hide compass
function hiderCompass() {
	wwd = new WorldWind.WorldWindow("canvasOne");
	if (Compass == false) {
		Compass = true;
	} else
		Compass = false;
	layers();
}// Hide BingAerial

function hiderBingAerial() {
	wwd = new WorldWind.WorldWindow("canvasOne");
	if (BingAerial == false) {
		BingAerial = true;
	} else
		BingAerial = false;
	layers();
}// Hide athmosphere

function hiderath() {
	wwd = new WorldWind.WorldWindow("canvasOne");
	if (ath == false) {
		ath = true;
	} else
		ath = false;
	layers();
}// Hide coordinates

function hiderCoordinates() {
	wwd = new WorldWind.WorldWindow("canvasOne");
	if (Coordinates == false) {
		Coordinates = true;
	} else
		Coordinates = false;
	layers();
}

var count=0;
function handleClick(recognizer) {
	
    var x = recognizer.clientX,
    y = recognizer.clientY;               				    //take x and y variables
    var pickList = wwd.pick(wwd.canvasCoordinates(x, y));  	// find the coordinates from wwd(world)
count=count+1;
    if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
        var position = pickList.objects[0].position;
		positionArr.push(position); 	
		console.log(positionArr);							// put positions in a position array
    }
    if( positionArr.length>=2&&dist==true){			//It controls arrays points for inputting distance function
    	
    	distance( positionArr[count].latitude, positionArr[count].longitude,positionArr[count+1].latitude, positionArr[count+1].longitude);
    }
    if (clicker==true){										//For drawing paths
		drawLayer();
    }
    

 function distance(lat1, lon1, lat2, lon2) {				//Distance function calculates distance of two points on world model.
	 dist=false;
	
	 var p = 0.017453292519943295; // Math.PI / 180
	 var c = Math.cos;
	 var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p)
	 * (1 - c((lon2 - lon1) * p)) / 2;
	 var returnvalue = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km;
	 alert(returnvalue);
	return returnvalue;

 }

    function drawLayer() {																		

		 var pathPositions = [];
			for (var i = 0; i < positionArr.length; i++) {

			pathPositions.push(new WorldWind.Position(positionArr[i].latitude,
					positionArr[i].longitude, 0));
			}

		var path = new WorldWind.Path(pathPositions, null);

		// Create and assign the path's attributes.
		var pathAttributes = new WorldWind.ShapeAttributes(null);
		pathAttributes.outlineColor = WorldWind.Color.RED;
		pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
		pathAttributes.drawVerticals = path.extrude; // draw verticals
		// only
		// when extruding
		path.attributes = pathAttributes;
		// Add the path to a layer and the layer to the World Window's layer
		// list.
		var polyLineLayer = new WorldWind.RenderableLayer();
		polyLineLayer.addRenderable(path);
		wwd.addLayer(polyLineLayer);
		pathsArr.push(polyLineLayer);
	}
}



// The common gesture-handling function.

var goTo = function (recognizer){
	
	var self = wwd;
	 self.geocoder = new WorldWind.NominatimGeocoder();
     self.goToAnimator = new WorldWind.GoToAnimator(wwd);
	debugger;
	var get= document.getElementById("searchText");
	var all=get.value.split(',');
		// Obtain the event location.
latitude = parseFloat(all[0]);
longitude = parseFloat(all[1]);
self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));

};



function getAtmosphere() {
	var lightLocation = new WorldWind.Position(19, 20, 0);
	var atmosphereLayer = new WorldWind.AtmosphereLayer();
	wwd.addLayer(atmosphereLayer);

	var sunSimulationCheckBox = document.getElementById('sun-simulation');
	var sunInterval = 0;
	sunSimulationCheckBox.addEventListener('change', onSunCheckBoxClick, false);

}
function onSunCheckBoxClick() {
	if (ath == true) {

		ath = false;
		getAtmosphere();
	} else {
		ath = true;
		layers();
	}
}







// //The common gesture-handling function.
// var handleClick = function(Recognizer) {
// var select = document.getElementById("shape");
// // Obtain the event location.
// var x = recognizer.clientY;
// var y = recognizer.clientX;
//
// count++;
//
// // Perform the pick. Must first convert from window coordinates to canvas
// // coordinates, which are
// // relative to the upper left corner of the canvas rather than the upper
// // left corner of the page.
// var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
//
// // If only one thing is picked and it is the terrain, tell the world window
// // to go to the picked location.
// if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
// var position = pickList.objects[0].position;
// // wwd.goTo(new WorldWind.Location(position.latitude,
// // position.longitude));
// console.log(selectedShape.value);
// positionArr.push(position);
// console.log(positionArr);
//
// drawLayer();
//
// }
// };
// function drawLayer() {
// var pathPositions = [];
//
// for (var i = 0; i < count; i++) {
// pathPositions.push(new WorldWind.Position(positionArr[i].latitude,
// positionArr[i].longitude, 1e4));
// }
// var path = new WorldWind.Path(pathPositions, null);
//
// // Create and assign the path's attributes.
// var pathAttributes = new WorldWind.ShapeAttributes(null);
// pathAttributes.outlineColor = WorldWind.Color.BLUE;
// pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
// pathAttributes.drawVerticals = path.extrude; // draw verticals only
// // when extruding
// path.attributes = pathAttributes;
//
// // Add the path to a layer and the layer to the World Window's layer
// // list.
// var polyLineLayer = new WorldWind.RenderableLayer();
// polyLineLayer.addRenderable(path);
// wwd.addLayer(polyLineLayer);
// pathsArr.push(polyLineLayer);
// }
