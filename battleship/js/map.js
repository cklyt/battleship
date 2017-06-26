
//create default mapcell for ships
function MapCell(xcoords , ycoords){
	
	this.x = -1; //default
	this.y = -1; //default
	
	this.ship = false; // has ship
	//called by game.js
	this.init = function init(){
		
		this.x = xcoords;
		this.y = ycoords
		this.ship = false;
	}
	
	
}



