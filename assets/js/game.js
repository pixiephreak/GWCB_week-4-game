//identify game states
// (if yourchar true , then )
//consolidate into state obj
//call render on state change
var random = function(x,y){
		return Math.floor(Math.random()*x)+y;
	}

var game = {
	title: 'This Game',
	introduction: 'Here, I give an overview of the game play and goal',
	instructions1:'Choose any player to begin',
	instructions2: 'Choose an opponent',
	instructions3: 'Click to attack your opponent',
	characters: [{sprite:'https://placehold.it/200/200', name:'thisone'},
				 {sprite:'https://placehold.it/200/200', name:'thistwo'},
				 {sprite:'https://placehold.it/200/200', name:'thisthree'},
				 {sprite:'https://placehold.it/200/200', name:'thisfour'}
				 ],
	newCharacters: [],
	enemies: [],
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
	$('#main').append(`<h2 class='text-center'>${game.instructions1}<h2>`);
	game.characters.forEach(function(character){
		var newCharacter = new Character(character.sprite, character.name, random(100,100), random(20,5));
		game.newCharacters.push(newCharacter)
		player.charImage = HTMLspritefig.replace('%imgdata%', newCharacter.sprite).replace('%altdata%', newCharacter.name).replace('%playername%', newCharacter.name).replace('%playerhealth%', newCharacter.health).replace('%playerattack%', newCharacter.attack);
		$('#characters').append(player.charImage);
	})
	console.log(game.newCharacters);
}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){
	$('#main').toggleClass( 'hidden' );
	$('#game-stage').toggleClass('hidden');
	$('#game-stage').prepend(`<h2 class='text-center'>${game.instructions2}<h2>`);
	console.log(game.player);
	player.charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite).replace('%altdata%', game.player.name).replace('%playername%', game.player.name).replace('%playerhealth%', game.player.health).replace('%playerattack%', game.player.attack);
	$('#player').append(player.charImage);
	game.newCharacters.forEach(function(character){
		var enemy = new Character(character.sprite, character.name, character.health, character.attack);
		game.enemies.push(enemy);
		enemyImage = HTMLenemyspritefig.replace('%imgdata%', character.sprite).replace('%altdata%', character.name).replace('%playername%', character.name).replace('%playerhealth%', character.health).replace('%playerattack%', character.attack);
		$('#enemy-choices').append(enemyImage);
	})



}

game.displayBattle = function(){
	$('#game-stage').toggleClass('hidden');
	$('#fight-stage').toggleClass('hidden');
	var HTMLenemyspritefig = '<figure class="figure"> <img src="%imgdata%" class="figure-img img-fluid rounded enemy-sprite" alt="%altdata%"><figcaption class="figure-caption">Name: %playername% Health: %playerhealth% Attack Potency: %playerattack%</figcaption></figure>'
	game.enemy.charImage = HTMLenemyspritefig.replace('%imgdata%', game.enemy.sprite).replace('%altdata%', game.enemy.name).replace('%playername%', game.enemy.name).replace('%playerhealth%', game.enemy.health).replace('%playerattack%', game.enemy.attack);
	$('#fight-stage').prepend(`<h2 class='text-center'>${game.instructions3}<h2>`);
	$('#fight-player').append(player.charImage);
	$('#fight-enemy').append(game.enemy.charImage);
	var playerResult = `<h3 id="player-result">${game.player.health}</h3>`
	// var enemyResult =  `<h3 id="defender-result">${this.enemy.health}</h3>`
}

game.displayComplete = function(){
	$('#fight-stage').toggleClass('hidden');
	$('#game-complete').toggleClass('hidden')
	$('#game-complete').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.result}</h3>`);
}

game.restart = function(){
	$('#fight-stage').toggleClass('hidden');
 	$('#game-complete').toggleClass('hidden');
 	$('#main').toggleClass( 'hidden' );
 	//TO-DO: use some sort of boolean switch to toggle classes instead of hard-coding
}

$(document).ready(function(){

    $('.character-sprite').on('click', function(event){
    	console.log($(this))
    	var name = $(this).attr("alt");
        var match;
        for (var i = 0; i < game.newCharacters.length; i++) {
           if (game.newCharacters[i].name == name)
                match = game.newCharacters[i];
        }
        // create Player subclass
        var Player = function(counter){
            'use strict';
            Character.call(this, match.sprite, match.name, match.health, match.attack );
            this.counterAttack = counter;
        };
        Player.prototype= Object.create(Character.prototype);
        Player.prototype.constructor = Player;
        var counter = match.attack;
        game.player = new Player(counter);
        // splice player from newCharacters
       	var index = game.newCharacters.indexOf(match);
       	game.newCharacters.splice(index,1);
        game.displayEnemies();

    });

     $('#enemy-choices').on('click', '.enemy-sprite', function(event){
     	var name = $(this).attr("alt");
        for (var i = 0; i < game.enemies.length; i++) {
           if (game.enemies[i].name == name)
                game.enemy = game.enemies[i];
        }
        game.displayBattle();
    });

    $('#fight-button').on('click', function(event){

    	console.log(`player attack:${game.player.attack}, playercoutner:${game.player.counterAttack}`)

    	game.player.health = game.player.health - game.enemy.attack;
    	game.enemy.health = game.enemy.health - game.player.attack;
    	game.player.attack = game.player.attack + game.player.counterAttack;
    	console.log(`now player:${game.player.health} now enemy${game.enemy.health}`)
    	if(game.player.health <= 0){
    		game.restart();
    	}else if(game.enemy.health <=0){
    		console.log(game.enemies);
    		for (var i = 0; i < game.enemies.length; i++) {
           		if (game.enemies[i].name == name)
           			var index = game.enemies.indexOf(game.enemies[i].name);
                	game.enemies.splice(index,1);
                	game.restart();
        }
    	}
    	// $('figcaption').htlm(`Name: ${game.player.name} Health: ${game.player.health}`)
    	// Whenever the player clicks attack, their character damages the defender.
    	// The opponent will lose HP (health points).
    	// These points are displayed at the bottom of the defender's picture.
    	// The opponent character will instantly counter the attack.
    	// When that happens, the player's character will lose some of their HP.
    	// These points are shown at the bottom of the player character's picture.
    	//store original count val in var increment
    	console.log(game.player.health);
    })

    $('#play-again').on('click', function(event){
    	console.log('click');
    	game.restart();
    })

});



game.displayMenu();













