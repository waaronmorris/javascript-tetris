/*
	This program was designed by using 
		Czarek Tomczak's JSTetris ;(http://www.gosu.pl/tetris/)
		ElbertF ;(http://elbertf.com/tetris/)
		Lutz Tautenhahn ;(http://www.lutanho.net/play/tetris.html)
*/

function Area(unit, areaX, areaY, id, score)
	{
		var area = this;
		
		this.table = document.getElementById('tetris');
		this.x = areaX;
		this.unit = unit;
		this.y = areaY;
		
/*-----------------------------------------------------------------------
 *--------------------reset the tetris table for new game ---------------
 *-----------------------------------------------------------------------
*/
		this.resetTable= function()
		{
			for (var y = 0; y <= area.table.rows.length - 1; y++)
		    {
				for ( var x = 0; x <= area.table.rows[y].cells.length - 1; x++)
				{
						area.table.rows[y].cells[x].id = "";
						area.table.rows[y].cells[x].innerHTML = "0";
				}
			}
		};

/*-----------------------------------------------------------------------
 *-----------------Get thewhat's in area of the coordinates ------------
 *-----------------Similar to Tomczak's code---------------------------
 *-----------------------------------------------------------------------
*/
		
		this.getArea = function(y, x)
		{
			if(x < 0 || x > area.table.rows[y].cells.length){return false;}
			var numberOfCells = area.table.rows[y].cells;
			if (y <= area.table.rows.length && x <= numberOfCells.length) 
			{
				var insideCell = numberOfCells[x].innerHTML;
				if(parseInt(insideCell) == 0)
				{
					return false;
				}
				return true;
			} 
		};

/*-----------------------------------------------------------------------
 *-----------------Checks to see if any lines can be removed-------------
 *-----------------------------------------------------------------------
*/		
		this.mayRemoveLines = function()
		{
			var solidLine = true;
			for(var y = 0; y <= area.table.rows.length - 1; y++)
			{
				solidLine = true;
				var numberOfCells = area.table.rows[y].cells;
				for ( var x = 0; x <= area.table.rows[y].cells.length - 1; x++)
				{
					var insideCell = numberOfCells[x].innerHTML;
					
					if(parseInt(insideCell) == 0)
					{
						 solidLine = false;
						 break;
					}
				}
				if(solidLine)
				{
					area.removeLines(y);	
				}
			}
		};

/*-----------------------------------------------------------------------
 *----------Takes out the line and moves the above lines down------------
 *-----------------------------------------------------------------------
*/		
		this.removeLines = function(oldy)
		{
			score.addToScore(25)
			var numberOfCells = area.table.rows[oldy].cells;
			
			for ( var x = 0; x <= area.table.rows[oldy].cells.length - 1; x++)
			{	
				area.table.rows[oldy].cells[x].id = "";
				area.table.rows[oldy].cells[x].innerHTML = "0";
			}
			
			var counterY = 0;
			var lineFound = false;	
			
			for(y = oldy; y >= 0; y--)
			{
				for ( var x = 0; x <= area.table.rows[y].cells.length - 1; x++)
				{
					if(parseInt(area.table.rows[y].cells[x].innerHTML) == 1){
						var oldID = area.table.rows[y].cells[x].id;
						var oldInner = area.table.rows[y].cells[x].innerHTML;
								
						area.table.rows[y].cells[x].id = "";
						area.table.rows[y].cells[x].innerHTML = "0";
						
						area.table.rows[y + 1].cells[x].id = oldID;
						area.table.rows[y + 1].cells[x].innerHTML = oldInner;
			
						lineFound = true;
					}
				}
				
				if(lineFound){
					counterY++;
				}
			}			
		};	
	}