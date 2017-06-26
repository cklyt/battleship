/*
 * ship class for battleships
 *
 * (c) 2016 Yutong Li, all rights reserved
 */


// VFS:  Objects?   Lots of global variables here, why not put them inside
// a game object?  It would be better if these were inside another "container" class


	//background music
var battlesound = new buzz.sound("./sounds/MUS_Battle_Loop.wav", {
	loop: true
});
	//miss shot sound
var misssound = new buzz.sound("./sounds/MUS_Missshot.wav", {
});
	//hit shot sound
var hitsound = new buzz.sound("./sounds/MUS_Shiphit.wav", {
});
	//game end music
var endmusic = new buzz.sound("./sounds/MUS_Menu_Loop.wav", {
	loop: true
});

//main function for gameboard
var gameBoard = new function(){
	this.ships = [];
	this.missileFired = 0;
	this.map = [];
//init the functions
	this.init = function init(){
		makeTable();
		this.makeMap();
		this.build();
		this.tableClick();
		checkWin();
		battlesound.play();
	}
	//grid sizes
	this.MAX_ROWS = 10;
	this.MAX_COLS = 10;
	//make 2nd array for storage
	this.makeMap = function makeMap()
	{
		for (var i = 0; i < 10; i++) {
			this.map[i] = [];
			  for (var j = 0; j < 10; j++) {
			    this.map[i][j] = new MapCell(i,j);//the mapcell with x and y

			  }

			}

	};


	//creates ships and places in array
	this.build = function buildShips(){

		//ship1
		var ship1 = new Ship(5,1);
		ship1.init();
		this.position(ship1);
		this.ships.push(ship1);
		//ship2
		var ship2 = new Ship(4,2);
		ship2.init();
		this.position(ship2);
		this.ships.push(ship2);
		//ship3
		var ship3 = new Ship(4,3);
		ship3.init();
		this.position(ship3);
		this.ships.push(ship3);
		//ship4
		var ship4 = new Ship(3,4);
		ship4.init();
		this.position(ship4);
		this.ships.push(ship4);
		//ship5
		var ship5 = new Ship(2,5);
		ship5.init();
		this.position(ship5);
		this.ships.push(ship5);

	}
	//give sihps position in the map array
	 this.position = function position(ship){


		   var pos = [];
		   var valid = false;

		   while(valid == false){
			//random x position 1- 10
		   var startPointX = Math.floor((Math.random() * gameBoard.MAX_ROWS-1) + 1);
		   //random yposition 1- 10
		   var startPointY = Math.floor((Math.random() * gameBoard.MAX_COLS-1) + 1);
		    //random direction 0,3,6,9
		   var direction = Math.floor((Math.random() * 4) ) * 3 ;

		   var cell = this.map[startPointX][startPointY];
		   cell.init();
		   valid = ship.place(cell, direction);
		   }
		   return ship;
	    }


	 //make game cells in the html
	 function makeTable()
	 	{

		$("#board").empty;
	    var gameboard = document.getElementById("board"); //. $('#board')

	    var table = document.createElement("TABLE");

	    for (var i = 0; i < gameBoard.MAX_ROWS; i++) {
	        var tr = document.createElement("TR");
	        table.appendChild(tr);

	        for (var j = 0; j < gameBoard.MAX_COLS; j++) {

	            var td = document.createElement("TD");
	            td.setAttribute("data-x" , i);
	            td.setAttribute("data-y" , j);
	            td.setAttribute("class" , 'cell');//give it a class 'cell'
	            tr.appendChild(td);
	        }
	    }
	    gameboard.appendChild(table);
	 	}




//click handler
this.tableClick = function tableClick() {

    $('#board').on('click','td',function() {
    	//when you clicked on the map
    	if( !$(this).hasClass("checked") ){ //if has been clicked before
    		var x = $(this).data("x");
    		var y = $(this).data("y");
    		$(this).addClass("checked"); // only click once
    		//condition1 : miss
    		if(gameBoard.map[x][y].ship==false){
    			$(this).addClass("miss");
    			var misssound = new buzz.sound("./sounds/MUS_Missshot.wav", {});
    			misssound.play();
    		}
    		//condition2 : hit
    		else
    		{
    			hitsound.play();//hit
    			$(this).addClass("hit");
    			gameBoard.map[x][y].ship.Hit();

    			//if you destroyed the ship
    			if(gameBoard.map[x][y].ship.isDestroyed() == true)
    			{
    				var id =  gameBoard.map[x][y].ship.id;
    				//remove the ship image on the html
    				$('#boat'+id).remove();
    				checkWin();
    		}


    		}
    	}
    });

} //end tableClick

//check if game has been won
 function checkWin(){

	 var shipsDestroyed = 0;

	 for(ship in gameBoard.ships){

		 if(gameBoard.ships[ship].isDestroyed() == true){
			 shipsDestroyed++;
		 }
		 //if all ships has been destroyed
		 if(shipsDestroyed == gameBoard.ships.length){ //gameWon
			 $("#board").remove();
			 $("#win").append(" " + gameBoard.missileFired);
			 $("#win").removeClass("hide");
				var endmusic = new buzz.sound("./sounds/MUS_Menu_Loop.wav", {

					loop: true
				});
				battlesound.stop();
				endmusic.play();
				alert("You have won!");
		 }

	 }


 }
}
/* I was trying to add a gif when you hit the ship, but i failed.
 * and i wanted to add start menu restart option, music controler, but there is not enough time,
 * so thats it.
 */

$(document).ready( function() {
	gameBoard.init();
});
