/*
 * ship class for battleships
 * 
 * (c) 2016 Yutong Li, all rights reserved
 */
function Ship(shipSize, shipId) {

	this.size = 0;
	this.positions = []; // position of ships on grid , amount equal to size
	this.type = "";
	this.hits = 0;
	this.id = shipId; //id for 1+ position in array

	this.init = function() {

		this.size = shipSize;
		this.type = this.setType();

	};

	this.Hit = function() { // add value when ship hit
			this.hits++;

	}

	function occupied(mapCell) {

		for (var i = 0; i < this.size; i++) {

			if (position[i] == mapCell) {
				return true;
			}

		}

	}

	this.isDestroyed = function() {

		if (this.hits >= this.size) {
			return true;

		}

	}

	//places ship
	this.place = function(aMapCell, direction) {

		this.positions.length = 0 // clear array

		var x = aMapCell.x;
		var y = aMapCell.y

		for (var i = 1; i <= this.size; i++) {

			if(x < 0 || x > gameBoard.MAX_ROWS-1 || y <0 || y > gameBoard.MAX_COLS-1)
				break;							//break loop
			if(gameBoard.map[x][y].ship != false) //mapcell cant be in use
				break;

			this.positions.push(gameBoard.map[x][y]);			//pushes mapcell to positions
			switch (direction) {

			case (0): // place upward
				y -= 1;
				break;

			case (3): // right
				x += 1;
				break;

			case (6): // down
				y += 1;
				break;

			case (9): // left
				x -= 1;
				break;

			}

		} // end if
		if (this.positions.length == this.size) { //number of positions that need to be equal to the size if loop didnt have mistakes
			for (cell in this.positions){ //set all cells to this ship
				this.positions[cell].ship = this;

			}


			return true;

		} else
			return false; // failed to place all positions

	}
//give them different types
	this.setType = function setType() {

		switch (this.size) {
		case 5:
			this.type = "Carrier";
			break;
		case 4:
			this.type = "BattleShip";
			break;
		case 3:
			this.type = "Cruiser";
			break;
		case 2:
			this.type = "Destroyer";
			break;
		default:
			break;

		}

	}

}

