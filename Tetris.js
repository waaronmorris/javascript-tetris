function Tetris(){
	
	var main = this; 
	this.tetris = null;
	this.puzzle = null;
	this.score = null;
	this.area = null;
	this.isGameOver = false;
	this.isRunning = true; 
	
	// Default Width and Height used for later when user gets to input height and width
	this.unit  = 20; 
	this.areaX = 11; 
	this.areaY = 18; 
	
	
/*-----------------------------------------------------------------------
 *--------------------Resets the game -----------------------------------
 *-----------------------------------------------------------------------
*/
	this.reset = function(){
			main.area.resetTable();
			main.puzzle.reset();
	};
	
/*-----------------------------------------------------------------------
 *-------------------Starts the game-------------------------------------
 *-----------------------------------------------------------------------
*/
	this.start = function()
	{
		if (!confirm('Are you sure you want to start a new game ?')){
			return;
		}
		
		main.score = new Score();
		main.area = new Area(main.unit, main.areaX, main.areaY, "tetris", score);
		main.puzzle = new Puzzle(this, main.area, score);
		
		score.name = prompt("Enter your name : ", "");
		score.level = 1000;

		
		main.isRunning = true;
		if(!main.isGameOver){
			if(!main.puzzle.isMoving){
					main.puzzle.initPuzzle();
				}
		}
	};
/*-----------------------------------------------------------------------
 *--------------------Resets the game and instructs ---------------------
 *----------------------the user how to start new Game -------------------
 *-----------------------------------------------------------------------
*/
	
	this.gameOver = function (){
		score.reset();
		main.area.resetTable();
		main.puzzle.reset();
		
		alert('Game Over: Press \'n\' to start a new game.');
		
	};
	
	
}