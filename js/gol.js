//Guarda el estado del juego
var gameState = new Array();

var alive = 1;
var dead = 0;

function initBoard() {
	var cSize = 0;
	for(var i = 0; i < rows; i += 1) {
		
		var stRow = new Array();
		for(var j = 0; j < cols; j+= 1) {//una X puede significar que su contenido no ha cambiado y no se pinta	
			var temp = Math.random();//temporal, luego las dibujarᡥl usuario
			var cellState = dead;
			//if (temp > 0.5) cellState = Math.ceil(temp);
			var celda = new Cell(i, j, cellSize, cellState);
			celda.updateView();//poner un valor aleatorio o hacer que se pueda configurar con el método click
			stRow.push(celda);
			cSize = cellSize;
		}
		gameState.push(stRow);
	}
}


//Llamar al método update() de cada celda
function updateBoard() {
	
	var newState = new Array();
	
	var cSize = 0;
	for(var i = 0; i < gameState.length; i += 1) {
		var newStateRow = new Array();
		
		for(var j = 0; j < gameState[0].length; j+= 1) {//una X puede significar que su contenido no ha cambiado y no se pinta	
			var stActual = gameState[i][j].state;
			
			//Comprobar celdas vecinas
			var numAlives = 0;
			//Comprobamos las 8 esquinas
			if(i > 0 && j > 0 && gameState[i - 1][j - 1].state == alive) numAlives += 1;
			if(i > 0 && gameState[i - 1][j].state == alive) numAlives += 1;
			if(i > 0 && j < cols - 1 && gameState[i - 1][j + 1].state == alive) numAlives += 1;
			if(j > 0 && gameState[i][j - 1].state == alive) numAlives += 1;
			if(j < cols - 1 && gameState[i][j + 1].state == alive) numAlives += 1;
			if(i < rows - 1 && j > 0 && gameState[i + 1][j - 1].state == alive) numAlives += 1;
			if(i < rows - 1 && gameState[i + 1][j].state == alive) numAlives += 1;
			if(i < rows - 1 && j < cols - 1 && gameState[i + 1][j + 1].state == alive) numAlives += 1;
			
			//alert([i, j, numAlives]);
			
			//Una célula muerta con exactamente 3 células vecinas vivas "nace" (al turno siguiente estará viva).
			if(stActual == dead) {
				if(numAlives == 3)
					newStateRow.push(alive);
				else
					newStateRow.push(dead);
			}
			//Si estaba viva...
			else {
				if(numAlives == 2 || numAlives == 3)
					newStateRow.push(alive)
				else 
					newStateRow.push(dead);//soledad o superpoblación.
			}

			cSize = cellSize;
		}
		newState.push(newStateRow);
	}
	//Actualizamos los estados y repintamos
	for(var i = 0; i < gameState.length; i += 1) {
		for(var j = 0; j < gameState[0].length; j+= 1) {
			gameState[i][j].state = newState[i][j];
			gameState[i][j].updateView();
		}
	}
	
	delete newState;
}

function Cell (x, y, cellSz, cellSt, visible) {
	var parent = this;
	//Objeto que representa la vista de la celda
	Raphael.fn.CellView = function(drawX, drawY, size, state) {
		this.crect = paper.rect(drawX, drawY, size, size);
		
		this.crect.node.onclick = function() {
			//alert(parent.state);
			var st = alive;
			if(parent.state == dead) 
				st = alive;				
			else
				st = dead;
			parent.state = st;
			parent.updateView(st);
			
			var numAlives = 0;
			var i = parent.boardX;
			var j = parent.boardY;
		}
		
		this.update = function(state) {
			//si el estado de la vecina (x,y)
			this.crect.setColor(state);
				
		}
	}
	
	//Propiedades
	this.boardX = x;
	this.boardY = y;
	this.size = cellSz;
	this.state = cellSt;
	this.view = new paper.CellView(x * cellSz, y * cellSz, cellSz, cellSt, this);
	
	this.updateView = function() {
		this.view.update(this.state);
	}
}



//Por si acaso quieres pintar un tablero de ajedrez alg�n d�a
var chessBoard = function() {
	var cSize = 0;
	var last = 0;
	for(var i = 0; i < rows; i += 1) {
		for(var j = 0; j < cols; j+= 1) {//una X puede significar que su contenido no ha cambiado y no se pinta
			if(last == 1) {
				paper.cell(i * cSize, j * cSize, 0);
				last = 0;
			} else {
				paper.cell(i * cSize, j * cSize, 1);
				last = 1;
			}
			
			if(i == 0)
				cSize = cellSize;
		}
		if(last == 1) last = 0;
		else last = 1;
	}
}