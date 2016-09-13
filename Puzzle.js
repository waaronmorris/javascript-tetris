/*
	This program was designed by using 
		Czarek Tomczak's JSTetris ;(http://www.gosu.pl/tetris/)
		ElbertF ;(http://elbertf.com/tetris/)
		Lutz Tautenhahn ;(http://www.lutanho.net/play/tetris.html)
*/

function Puzzle(tetris, area, score)
	{
		var puzzle = this;
		this.position = 0;
		this.table = document.getElementById('tetris');
		this.isMoving = false;
		
/*-----------------------------------------------------------------------
 *--------------------Initialize puzzle pieces. -------------------------
 *---------------The way to reference a piece is ------------------------
 *-------------puzzle.puzzles[shape][position of rotation][y][x] ------
 *-----------------------------------------------------------------------
*/	
		this.puzzles = [
			[
				[
				  [0,0,1],
				  [1,1,1],
				  [0,0,0]
				],
				[
				  [1,1,0],
				  [0,1,0],
				  [0,1,0]
				],
				[
				  [0,0,0],
				  [1,1,1],
				  [1,0,0]
				],
				[
				  [0,1,0],
				  [0,1,0],
				  [0,1,1]
				]
				
			],
			[
			 	[
				  [1,0,0],
				  [1,1,1],
				  [0,0,0] 
				],
				[
				  [0,1,0],
				  [0,1,0],
				  [1,1,0] 
				],
				[
				  [0,0,0],
				  [1,1,1],
				  [0,0,1] 
				],
				[
				  [0,1,1],
				  [0,1,0],
				  [0,1,0] 
				]
				
			],
			[
			 	[
				  [0,1,1],
				  [1,1,0],
				  [0,0,0]
				],
				[
				  [1,0,0],
				  [1,1,0],
				  [0,1,0]
				],
				[
				  [0,1,1],
				  [1,1,0],
				  [0,0,0]
				],
				[
				  [0,1,0],
				  [0,1,1],
				  [0,0,1]
				]
			],
			[
				[
				 [1,1,0],
				 [0,1,1],
				 [0,0,0]
				],
				[
				 [0,1,0],
				 [1,1,0],
				 [1,0,0]
				],
				[
				 [1,1,0],
				 [0,1,1],
				 [0,0,0]
				],
				[
				 [0,0,1],
				 [0,1,1],
				 [0,1,0]
				]
			],
			[
				[
				 [0,1,0],
				 [1,1,1],
				 [0,0,0]
				],
				[
				 [0,1,0],
				 [1,1,0],
				 [0,1,0]
				],
				[
				 [0,0,0],
				 [1,1,1],
				 [0,1,0]
				],
				[
				 [0,1,0],
				 [0,1,1],
				 [0,1,0]
				]
			],
			[
				[
				 [1,1],
				 [1,1]
				],
				[
				 [1,1],
				 [1,1]
				],
				[
				 [1,1],
				 [1,1]
				],
				[
				 [1,1],
				 [1,1]
				]
			],
			[
				[ 
				 [0,0,0,0],
				 [1,1,1,1],
				 [0,0,0,0],
				 [0,0,0,0]
				],
				[ 
				 [0,1,0,0],
				 [0,1,0,0],
				 [0,1,0,0],
				 [0,1,0,0]
				],
				[ 
				 [0,0,0,0],
				 [1,1,1,1],
				 [0,0,0,0],
				 [0,0,0,0]
				],
				[ 
				 [0,1,0,0],
				 [0,1,0,0],
				 [0,1,0,0],
				 [0,1,0,0]
				]
			]
		]; 
		
		this.type = Math.floor(Math.random() * puzzle.puzzles.length);
		this.areaStartX = parseInt((area.x - puzzle.puzzles[puzzle.type][puzzle.position].length) / 2) + 1;
		this.areaStartY = 1;
		this.pointerX = puzzle.areaStartX;
		this.pointerY = puzzle.areaStartY;

		this.nextType = Math.floor(Math.random() * puzzle.puzzles.length);
		
		this.puzzlePiece = this.puzzles[puzzle.type][0];
		this.newPuzzle = this.puzzlePiece;
		this.running = null;
		
		this.dropInterval = null;
		
		this.type = Math.floor(Math.random() * puzzle.puzzles.length);
		
/*-----------------------------------------------------------------------
 *----Check to see if a puzzle piece can be intialized on the board------
 *-----------------------------------------------------------------------
*/
  
		this.mayInitPuzzle = function(){
			area.mayRemoveLines();
			
			var puzzlePiece = puzzle.puzzles[puzzle.type][0];
			for (var y = puzzlePiece.length - 1; y >= 0; y--) {
				for (var x = 0; x < puzzlePiece[y].length; x++) {
					if (puzzlePiece[y][x]) {
						if (area.getArea(puzzle.areaStartY, puzzle.areaStartX + x)) { 
							return false; 
						}
					}
				}
			}
			return true;
		};
		
/*-----------------------------------------------------------------------
 *-------------Place the piece if it cn be placed------------------------
 *-----------------------------------------------------------------------
*/

		this.initPuzzle = function(){
			puzzle.puzzlePiece = puzzle.puzzles[puzzle.type][0];
			
			puzzle.x = this.areaStartX;
			puzzle.y = 1;
			puzzle.isMoving = true;
			var counterY = 0;
			var lineFound = false;
		
			for (var y = puzzle.puzzlePiece.length - 1; y >= 0 ; y--) {
				for (var x = 0; x < puzzle.puzzlePiece[y].length; x++) {
					if (puzzle.puzzlePiece[y][x] == 1) {
						puzzle.table.rows[puzzle.y - counterY].cells[puzzle.x+x].id = "block" + puzzle.type;
						puzzle.table.rows[puzzle.y - counterY].cells[puzzle.x+x].innerHTML = "1";
						lineFound = true;
					}
				}
				if(lineFound){
				counterY++;
				}
			}
			
			
			puzzle.dropInterval = setInterval(puzzle.moveDown, (2000 / score.level));
			
		};
		
/*-----------------------------------------------------------------------
 *--------Reset all the variable so that a new game can be played--------
 *-----------------------------------------------------------------------
*/
		this.reset = function()
		{
			
			if (puzzle.dropInterval) {
				clearInterval(puzzle.dropInterval);
			}
			
			this.type = this.nextType;
			this.nextType = Math.floor(Math.random() * this.puzzles.length);
			this.running = false;
			this.pointerX = puzzle.areaStartX;
			this.pointerY = puzzle.areaStartY;
			this.position = 0;
		};
		
		
/*-----------------------------------------------------------------------
 *-----------Keeps track of the current rotation and the next -----------
 *-----------------------------------------------------------------------
*/

		this.updatePosition = function(){
			switch (puzzle.position) {
				
				case 0:
					puzzle.position++;
				break;
				
				case 1:
					puzzle.position++;
				break;
				
				case 2:
					puzzle.position++;
				break;
				
				case 3:
					puzzle.position = 0;
				break;
								
				default:
					puzzle.position = 0;
		}
		};
		
/*-----------------------------------------------------------------------
 *------------Checks to see if the piece can rotate----------------------
 *-----------------------------------------------------------------------
*/
		
		this.mayRotate = function(){
			puzzle.newPuzzle = puzzle.puzzles[puzzle.type][puzzle.position];
			var lineFound = false;
			var returnString = '';
			
			var countY = puzzle.newPuzzle.length - 1;
			for (var y = 0; y <= puzzle.newPuzzle.length - 1; y++) {
				var numberOfCells = area.table.rows[puzzle.pointerY].cells;
				count = false;
				for (var x = 0; x < puzzle.newPuzzle.length; x++) {
					if (puzzle.newPuzzle[y][x]) {
						if(puzzle.pointerY - puzzle.newPuzzle.length <= 0)
						{
							returnString = "offUp";
							puzzle.position--;
							return returnString;
						}
						
						else if(puzzle.pointerY + 1 >= area.table.rows.length)
						{
							returnString = "offDown";
							puzzle.position--;
							return returnString;
						}
					
						else if(puzzle.pointerX - 1 < 0)
						{
							returnString = "offLeft";
							puzzle.position--;
							return returnString;		
						}
						
						else if(puzzle.pointerX + (puzzle.newPuzzle[y].length - 1) + 1 >= numberOfCells.length)
						{
							returnString = "offRight";
							puzzle.position--;
							return returnString;
						}
						
						else if(area.getArea(puzzle.pointerY + 1, puzzle.pointerX + x + 1)){
							returnString = "pieceRight";
							puzzle.position--;
							return returnString;
						}
						
						else if(area.getArea(puzzle.pointerY + 1, puzzle.pointerX - 1)){
							returnString = "pieceLeft";
							puzzle.position--;
							return returnString;
						}	
					}
				}
				countY = - 1;
			}
			puzzle.position--;
			return "allGood";	
		};
		
/*-----------------------------------------------------------------------
 *-Properly changes out the piece, then calls the move down function----- 
 -------------------to creat it a space down-----------------------------
 *-----------------------------------------------------------------------
*/
		this.rotate = function(){
			
			puzzle.updatePosition();
			var countY = 0;
			var lineFound = false;
			if(puzzle.mayRotate() == "allGood"){
				puzzle.updatePosition();
				for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) 
				{
					for (var x =  0; x <= puzzle.puzzlePiece[y].length; x++) 
					{
						if (puzzle.puzzlePiece[y][x] == 1)
						{
							puzzle.table.rows[puzzle.pointerY - countY].cells[puzzle.pointerX + x].id = "";
							puzzle.table.rows[puzzle.pointerY - countY].cells[puzzle.pointerX + x].innerHTML = "0";
							lineFound = true;
						}
					}
					if(lineFound){
						countY++;	
					}
					
				}
				
				puzzle.puzzlePiece = puzzle.newPuzzle;
				linefound = false;
			}
			else if(puzzle.mayRotate() == "offUp"){
				puzzle.moveDown();
				if(puzzle.puzzlePiece.length == 4){
					puzzle.moveDown();
				}
				for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) 
				{
					for (var x =  0; x <= puzzle.puzzlePiece[y].length; x++) 
					{
						if (puzzle.puzzlePiece[y][x] == 1)
						{
							puzzle.table.rows[puzzle.pointerY - countY].cells[puzzle.pointerX + x].id = "";
							puzzle.table.rows[puzzle.pointerY - countY].cells[puzzle.pointerX + x].innerHTML = "0";
							lineFound = true;
							
							
						}
					}
					if(lineFound){
						countY++;	
					}
					
				}
				
				puzzle.puzzlePiece = puzzle.newPuzzle;
				linefound = false;
			}
			
			puzzle.moveDown();
		};
		
		
/*-----------------------------------------------------------------------
 *----Check to see if a puzzle piece can be moved a space down-----------
 *-----------------------------------------------------------------------
*/
		this.mayMoveDown = function()
		{
			var counterY = 0;
			var count = false;
			var lineFound = false;
			for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
				count = false;
				for (var x = 0; x < this.puzzlePiece[y].length; x++) {
					if (puzzle.puzzlePiece[y][x]) {
						if(counterY >= 1){
							if(puzzle.puzzlePiece[y+1][x] == 0){
								if (puzzle.pointerY + 1 >= puzzle.table.rows.length) { return false; }
								if (area.getArea((puzzle.pointerY - counterY) + 1, puzzle.pointerX + x)) { return false; }
							}
						}
						
						else if(counterY == 0){
								if (puzzle.pointerY + 1 >= puzzle.table.rows.length) { return false; }
								if (area.getArea((puzzle.pointerY - counterY) + 1, puzzle.pointerX + x)) { return false; }
							}
					
					count = true;
					}
				
				}
				if(count){
					counterY++;
				}
			}
			return true;
		};
		
/*------------------------------------------------------------------------
 *----------------------Moves the piece down-----------------------------
 *-----------------------------------------------------------------------
*/
		this.moveDown = function()
		{
			var counterY = 0;
			var lineFound = false;

			if(puzzle.isMoving){
				if(puzzle.mayMoveDown()){
					score.addToScore(10);
					for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
						for (var x = 0; x < puzzle.puzzlePiece[y].length; x++) {
							
							if(puzzle.puzzlePiece[y][x]){
								puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].id = "";
								puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].innerHTML = "0";
								
								puzzle.table.rows[(puzzle.pointerY - counterY) + 1].cells[puzzle.pointerX + x].id = "block" + puzzle.type;
								puzzle.table.rows[(puzzle.pointerY - counterY) + 1].cells[puzzle.pointerX + x].innerHTML = "1";
								
								lineFound = true;
							}
							
							
						}
						if(lineFound){
							counterY++;
						}
				
					}
					puzzle.pointerY++;
				}
				else{
					puzzle.reset();
					if (puzzle.mayInitPuzzle()) 
						{
							puzzle.initPuzzle();
							score.addToScore(15)
							puzzle.isMoving = true;
						} 
					else {
						tetris.gameOver();	
					}
				}
			}
		};
		
/*-----------------------------------------------------------------------
 *----Check to see if a puzzle piece can be intialized on the board------
 *-----------------------------------------------------------------------
*/
		
		this.mayMoveRight = function()
		{
			var counterY = 0;
			var firstX = 0;
			var lineFound = false;
			
			for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
				//find last x value
				
				lineFound = false;
				
				for( var i = puzzle.puzzlePiece[y].length - 1 ; i >= 0  ; i--){
					if (puzzle.puzzlePiece[y][i]) {
						  	firstX = i;
							break;
					}
				}
				//see next to first value
					if (this.puzzlePiece[y][firstX]) {
						var numberOfCells = puzzle.table.rows[y].cells;
						if (puzzle.pointerX + firstX + 1 >= numberOfCells.length) { return false; }
						if (area.getArea(puzzle.pointerY - counterY, puzzle.pointerX + firstX + 1)) { return false; }
						lineFound = true;
					}
					
				if(lineFound){
					counterY++;
				}
				
			}
			
			return true;
		};

/*-----------------------------------------------------------------------
 *--------------------Move the piece to the right------------------------
 *-----------------------------------------------------------------------
*/
		this.moveRight = function()
		{
			var counterY = 0;
			var lineFound = false;
			
			if(puzzle.mayMoveRight()){
				for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
					for (var x = puzzle.puzzlePiece[y].length; x >= 0; x--) {
						if (this.puzzlePiece[y][x]){
							puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].id = "";
							puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].innerHTML = "0";
				
							puzzle.table.rows[(puzzle.pointerY - counterY)].cells[puzzle.pointerX + x  + 1].id = "block" + puzzle.type;
							puzzle.table.rows[(puzzle.pointerY - counterY)].cells[puzzle.pointerX + x  + 1].innerHTML = "1";
					
							lineFound = true;
						}
					
					}
				
				if(lineFound)
				{
					counterY++;
				}
			}
				
				puzzle.pointerX++;
			}
		};
		

/*-----------------------------------------------------------------------
 *-------------Check to see if a puzzle piece can be moved left----------
 *-----------------------------------------------------------------------
*/
		this.mayMoveLeft = function()
		{
			var counterY = 0;
			var firstX = 0;
			var lineFound = false;
			
			for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
				//find first x
				for( var i = 0 ; i <= puzzle.puzzlePiece[y].length - 1  ; i++){
					if (puzzle.puzzlePiece[y][i]) {
						  	firstX = i;
							break;
					}
				}
				
				if (puzzle.puzzlePiece[y][firstX]) {
					if (puzzle.pointerX + firstX - 1 < 0) { return false; }
					if (area.getArea(puzzle.pointerY - counterY, puzzle.pointerX + firstX - 1)) { return false; }
					lineFound = true;
				}
				if(lineFound){
				counterY++;
				}
			}
			return true;
		};
		
/*-----------------------------------------------------------------------
 *--------------------Moves the piece to the left------------------------
 *-----------------------------------------------------------------------
*/
		this.moveLeft = function()
		{
			var counterY = 0;
			var lineFound = false;
			if(puzzle.mayMoveLeft()){
			for (var y = puzzle.puzzlePiece.length - 1; y >= 0; y--) {
				for (var x =  0; x <= puzzle.puzzlePiece[y].length; x++) {
					if (this.puzzlePiece[y][x]){
					puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].id = "";
					puzzle.table.rows[puzzle.pointerY - counterY].cells[puzzle.pointerX + x].innerHTML = "0";
				
					puzzle.table.rows[(puzzle.pointerY - counterY)].cells[puzzle.pointerX + x  - 1].id = "block" + puzzle.type;
					puzzle.table.rows[(puzzle.pointerY - counterY)].cells[puzzle.pointerX + x  - 1].innerHTML = "1";
					
					lineFound = true;
					}
					
				}
				if(lineFound){
					counterY++;
				}
			}
		puzzle.pointerX--;
			}
		};
		
	}