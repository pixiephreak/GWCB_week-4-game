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
	enemy: {sprite:'https://placehold.it/200/200',name:'thisone',health:'0',attack:'0'},
	//add a result to the game object upon win. for now, use this placeholder.
	result: 'You Won!'
}

Character = function(sprite, name, health, attack){
	this.sprite = sprite;
	this.name = name;
	this.health = health;
	this.attack = attack;
}

game.displayMenu = function(){
	$('#main').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.introduction}</h3>`);
	$('#main').append(`<h2 class='text-center'>${game.instructions1}<h2>`)
	game.sprites.forEach(function(sprite){
		var charImage = HTMLsprite.replace('%data%', sprite);
		$('#characters').append(charImage);
	})

}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){
	$('#main').toggleClass( "hidden" );
	$('#game-stage').toggleClass("hidden");
	$('#game-stage').prepend(`<h2 class='text-center'>${game.instructions2}<h2>`);
	var charFig = charImage.replace('%playername%', game.player.name);
		$('#player').append(charFig);
	game.sprites.forEach(function(sprite){
		var enemyImage = HTMLenemysprite.replace('%data%', game.enemy.sprite);
		$('#enemy-choices').append(enemyImage);
	})



}

game.displayBattle = function(){
	$('#game-stage').toggleClass("hidden");
	$('#fight-stage').toggleClass("hidden");
	$('#fight-stage').prepend(`<h2 class='text-center'>${game.instructions3}<h2>`);
	var playerImage = HTMLplayerfig.replace('%imgdata%', game.player.sprite);
	var playerName = playerImage.replace('%playername%', game.player.name);
	var playerHealth = playerName.replace('%health%', game.player.health);
	var playerAttack = playerHealth.replace('%attack%',game.player.attack)
		$('#fight-player').append(playerAttack);
	var enemyImage = HTMLplayerfig.replace('%imgdata%', game.enemy.sprite);
	var enemyName = enemyImage.replace('%playername%', game.enemy.name);
	var enemyHealth = enemyName.replace('%health%', game.enemy.health);
	var enemyAttack = enemyHealth.replace('%attack%',game.enemy.attack)
		$('#fight-enemy').append(enemyAttack);
	var playerResult = `<h3 id="player-result">${game.player.health}</h3>`
	var enemyResult =  `<h3 id="defender-result">${game.enemy.health}</h3>`



}

game.displayComplete = function(){
	$('#main').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.result}</h3>`);
}

$(document).ready(function(){
    $(".character-sprite").click(function(event){
        imgSrc = $(this).attr("src");
        name = $(this).attr("alt")
        game.player = new Character(imgSrc, name, 0, 0);
        game.displayEnemies();
    });

     $("#enemy-choices").click(function(event){
        game.displayBattle();
        console.log("click")
    });
});


game.displayMenu();














