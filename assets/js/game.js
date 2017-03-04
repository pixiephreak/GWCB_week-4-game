//identify game states
// (if yourchar true , then )
//consolidate into state obj
//call render on state change
var game = {
	title: 'This Game',
	sprites: ['https://placehold.it/200/200','https://placehold.it/200/200','https://placehold.it/200/200','https://placehold.it/200/200'],
	introduction: 'Here, I give an overview of the game play and goal',
	instructions1:'Choose any player to begin',
	instructions2: 'Choose an opponent',
	instructions3: 'Click to attack your opponent',
	//on click, player will be added to game using the class constructor and parameters will be passed down from click function.
	//Also, the img/data for the sprite should be spliced from array, leaving only enemies
	//for now I'll jsut use this placeholder,
	player: {sprite:'https://placehold.it/200/200',name:'thisone',health:'0',attackPotency:'0'}
}

game.displayMenu = function(){
	$('#main').append(`<h1> ${game.title} </h1>`,`<h3>${game.introduction}</h3>`);
	var HTMLsprite = "<img alt='character' class= 'col-md-3 col-xs-6 img img-thumbnail img-responsive' src=%data% />";
	$('#characters').append(`<h2 class='text-center'>${game.instructions1}<h2>`)
	game.sprites.forEach(function(sprite){
		var charImage = HTMLsprite.replace('%data%', sprite);
		$('#characters').append(charImage);
	})

}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){
	$('#main').attr('visible', 'hidden');
	$('#game-stage').attr('hidden', 'visible')
	$('#characters').html(`<h2 class='text-center'>${game.instructions2}<h2>`);
	var charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite);
	var charFig = charImage.replace('%playername%', game.player.name);
		$('#characters').append(charFig);
	game.sprites.forEach(function(sprite){
		var charImage = HTMLsprite.replace('%data%', sprite);
		$('#characters').append(charImage);
	})


}

//display on load
game.displayMenu();
// call on second click or investigate target... do remaining ex form class
// game.displayEnemies()
//game.displayFight();
// game.gameOver();



// game.Character = function(sprite, name, health, attack, counterAttack){
// 	this.health = health;
// 	this.attack = attack;
// 	this.counterAttack = counterAttack;

// 	$(this).click(function() {
// 	  alert( "Handler for .click() called." );
// 	});
// }

// //create enemies subclass
// var Enemy = function() {
//     'use strict';
//     Character.call(this);
// };

// //link Enemy class to character prototype chain
// Enemy.prototype= Object.create(Character.prototype);
// Enemy.prototype.constructor = Enemy;

// var Player = function(x,y){
//     'use strict';
//     Character.call(this, 'images/char-horn-girl.png' );
//     this.x = x;
//     this.y = y;


// };

// Player.prototype= Object.create(Character.prototype);
// Player.prototype.constructor = Player;








