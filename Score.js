/*
	This program was designed by using 
		Czarek Tomczak's JSTetris ;(http://www.gosu.pl/tetris/)
		ElbertF ;(http://elbertf.com/tetris/)
		Lutz Tautenhahn ;(http://www.lutanho.net/play/tetris.html)
*/

function Score(){
	var score = this;
	var i = 1;
	this.name = null;
	this.currentScore = null;
	this.highScoreTable = document.getElementById('highScoreTable');
	this.level = 1000;
	this.currentScore = 0;
	
/*-----------------------------------------------------------------------
 *--------------------Adds points sent to currentScore ------------------
 *-------------------Calls changeLabel, and Change Level-----------------
 *-----------------------------------------------------------------------
*/
	
	this.addToScore = function(points){
			score.currentScore += points;	
			this.changeLabel();
			this.changeLevel();
	};
	
/*-----------------------------------------------------------------------
 *--------------------Changes the currentScore label  -------------------
 *-------------------so player can see currentScore  --------------------
 *-----------------------------------------------------------------------
*/
	this.changeLabel = function(){
		document.getElementById('currentScore').value = this.currentScore;	
	};
	
/*-----------------------------------------------------------------------
 *--------------------Changes the level  --------------------------------
 *-----------------------------------------------------------------------
*/	
	this.changeLevel = function(){
		if(score.currentScore % 200 == 0){
			score.level += 1;
		}
	};
	
/*-----------------------------------------------------------------------
 *--------------------Gets cookie then return splited array  ------------
 *-----------------------------------------------------------------------
*/
	this.getHighScore = function(){
		
		if(!document.cookie){
			document.cookie = "rank1= 1";
			document.cookie = "name1= Mike Leih";
			document.cookie = "score1= 1000";
			
			document.cookie = "rank2= 2";
			document.cookie = "name2= Frank Wheeler";
			document.cookie = "score2= 900";
			
			document.cookie = "rank3= 3";
			document.cookie = "name3= Matthew Grotheer";
			document.cookie = "score3= 600";
			
			document.cookie = "rank4= 4";
			document.cookie = "name4= Jon Cox";
			document.cookie = "score4= 500";
			
			document.cookie = "rank5= 5";
			document.cookie = "name5= Aaron Morris";
			document.cookie = "score5= 200";
			
			var CookieDate = new Date;
			CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
			document.cookie = 'expires=' + CookieDate.toGMTString( ) + ';';
		}
		
		var cookieString = decodeURIComponent(document.cookie);
		this.cookieArray = cookieString.split("; ");
		return this.cookieArray;		
	};	
	
/*-----------------------------------------------------------------------
 *--------------------Submits the high score to the cookie  -------------
 *--------------------then calls to update table-------------------------
 *-----------------------------------------------------------------------
*/
	this.submitHighScore = function(cookieArray){
		var count = 1;
		var cookie;
		for(var i = 0; i <= cookieArray.length - 1; i++){
			cookie = cookieArray[i];
			var string = cookie.substring(cookie.indexOf("=") + 1, cookie.length);
			if(cookie.substring(0, cookie.indexOf("=") - 1) == "rank"){
			   document.cookie = "rank"+count+"="+count;
			}
			else if(cookie.substring(0, cookie.indexOf("=") - 1) == "name"){
			   document.cookie = "name"+count+"="+string;
			}
			else if(cookie.substring(0, cookie.indexOf("=")- 1) == "score"){
			   document.cookie = "score"+count+ "=" + string;
			}
			if(i == 2 || i == 5 || i == 8 || i == 11){
				count++;   
			}
		}
		score.updateTable();	
	};

/*-----------------------------------------------------------------------
 *--------------------Submits the high score to the cookie  -------------
 *-----------------------------------------------------------------------
*/	
	this.updateTable = function(cookieArray){
		var cookieArray = this.getHighScore();		
		this.highScoreTable = document.getElementById('highScoreTable');
		var i = 0;
		for (var y = 0; y <= score.highScoreTable.rows.length - 1; y++)
		{
			for ( var x = 0; x <= score.highScoreTable.rows[y].cells.length - 1; x++)
			{
				cookie = cookieArray[i];	
				if(cookie.substring(0, cookie.indexOf("=") - 1) == "name"){
					this.highScoreTable.rows[y].cells[x].innerHTML = cookie.substring(cookie.indexOf("=") +1, cookie.length);
				}	
				else if(cookie.substring(0, cookie.indexOf("=") - 1) == "score"){
					this.highScoreTable.rows[y].cells[x].innerHTML = cookie.substring(cookie.indexOf("=") +1, cookie.length) ;
				}
				else if(cookie.substring(0, cookie.indexOf("=") - 1) == "rank"){
					this.highScoreTable.rows[y].cells[x].innerHTML = cookie.substring(cookie.indexOf("=") +1, cookie.length) ;
				}		
				i++;
			}
		}			
	};

/*-----------------------------------------------------------------------
 *--------------------If the players is a high score then --------------
 *--------------------put the user in the array to load into------------
 *--------------------cookie, and pop off the last one-------------------
 *-----------------------------------------------------------------------
*/
	this.addHighScore = function(){
		
		var cookieArray = score.getHighScore();
		var countY = 1;
		var alreadyDone = false;
						
		for(var i = 2; i <= cookieArray.length -1; i+3)
		{
			var cookie = cookieArray[i];
			if( cookie.substring(0, cookie.indexOf("=")) == "score"  + countY)
			{
				if(this.currentScore >= cookie.substring(cookie.indexOf("=") + 1, cookie.length))
				{
					if(!alreadyDone)
					{
						cookieArray.splice(i - 2, 0, "rank" + countY +"=" + countY);
						cookieArray.splice(i - 1, 0, "name" + countY +"=" + this.name);
						cookieArray.splice(i , 0, "score" + countY +"=" + this.currentScore);
						for(var x = 0; x <= 3; x++)
						{
							cookieArray.pop();
						}
						alreadyDone = true;
					}
				}
				countY++;
			}
			i+=3;
		}
		
		score.submitHighScore(cookieArray);
		
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
		document.cookie = 'expires=' + CookieDate.toGMTString( ) + ';';
	};
	
/*-----------------------------------------------------------------------
 *--------------------Reset the score to original for new game ----------
 *-----------------------------------------------------------------------
*/
	this.reset = function(){
		this.addHighScore();
		
		score.currentScore = 0;
		score.level = 0;
		this.changeLabel();
	};
}