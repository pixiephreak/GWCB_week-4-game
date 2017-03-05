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
	player: {sprite:'https://placehold.it/200/200',name:'thisone',health:'0',attack:'0'},
	enemy: {sprite:'https://placehold.it/200/200',name:'thisone',health:'0',attack:'0'}
}

game.displayMenu = function(){
	$('#main').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.introduction}</h3>`);
	$('#main').prepend(`<h2 class='text-center'>${game.instructions1}<h2>`)
	game.sprites.forEach(function(sprite){
		var charImage = HTMLsprite.replace('%data%', sprite);
		console.log(charImage);
		$('#characters').append(charImage);
	})

}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){

	$('#game-stage').prepend(`<h2 class='text-center'>${game.instructions2}<h2>`);
	var charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite);
	var charFig = charImage.replace('%playername%', game.player.name);
		$('#player').append(charFig);
	game.sprites.forEach(function(sprite){
		var charImage = HTMLsprite.replace('%data%', sprite);
		$('#enemy-choices').append(charImage);
	})



}

game.displayBattle = function(){
	$('#fight-stage').prepend(`<h2 class='text-center'>${game.instructions3}<h2>`);
	var playerImage = HTMLplayerfig.replace('%imgdata%', game.player.sprite);
	var playerName = playerImage.replace('%playername%', game.player.name);
	var playerHealth = playerName.replace('%health%', game.player.health);
	var playerAttack = playerHealth.replace('%attack%',game.player.attack)
		$('#player').append(playerAttack);
	var enemyImage = HTMLplayerfig.replace('%imgdata%', game.enemy.sprite);
	var enemyName = enemyImage.replace('%playername%', game.enemy.name);
	var enemyHealth = enemyName.replace('%health%', game.enemy.health);
	var enemyAttack = enemyHealth.replace('%attack%',game.enemy.attack)
		$('#opponent').append(enemyAttack);
	var playerResult = `<h3 id="player-result">${game.player.health}</h3>`
	var enemyResult =  `<h3 id="defender-result">${game.enemy.health}</h3>`



}

console.log($('.character-sprite'))

$( document ).ready(function() {

$('.character-sprite').click(function() {
	console.log('click');
  $('#main').toggleClass( "hidden" );
  $('#game-stage').toggleClass("hidden")
});
});

//display on load
game.displayMenu();
// call on second click or investigate target... do remaining ex form class
game.displayEnemies()
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








