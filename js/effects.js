var dead = 0;
var alive = 1;

Raphael.el.setColor = function (state) {
	// Color 
	if(state == alive) 
		this.attr({fill: "#707cbc"});
	else 
		this.attr({fill: "#fff"});
	// Bordes
	
	this.attr({stroke: "#eee",
				strokeWidth: '2'});
}