function Fleet() {

	this.ships = [];
			
	for (var i=0; i<5; i++){
		
		this.ships[i] = new Ship(i+1);
	}
}
