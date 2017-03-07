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
		var newCharacter = new Character(character.sprite, character.name, random(200,40), random(40,5));
		game.newCharacters.push(newCharacter)
		var charImage = HTMLspritefig.replace('%imgdata%', newCharacter.sprite).replace('%altdata%', newCharacter.name).replace('%playername%', newCharacter.name).replace('%playerhealth%', newCharacter.health);
		$('#characters').append(charImage);
	})
	console.log(game.newCharacters);
	// for(let i=0; i<game.characterData.length; i++){
	// 	game.characters.push(new Character(game.characterData[i].sprite,game.characterData[i].name, game.characterData[i].health, game.characterData[i].attack));
	// 	}


}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){
	$('#main').toggleClass( 'hidden' );
	$('#game-stage').toggleClass('hidden');
	$('#game-stage').prepend(`<h2 class='text-center'>${game.instructions2}<h2>`);
	var charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite);
	var charFig = charImage.replace('%playername%', game.player.name);
	$('#player').append(charFig);
	game.characters.forEach(function(character){
		var enemy = new Character(character.sprite, character.name, random(200,40), random(40,5));
		game.enemies.push(enemy);
		var charImageAlt = HTMLenemyspriteAlt.replace('%data%', character.name)
		var enemyImage = charImageAlt.replace('%data%', character.sprite);
		$('#enemy-choices').append(enemyImage);
	})



}

game.displayBattle = function(){
	$('#game-stage').toggleClass('hidden');
	$('#fight-stage').toggleClass('hidden');
	//TO-DO: find a more consice wat to replace string data
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
	$('#fight-stage').toggleClass('hidden');
	$('#game-complete').toggleClass('hidden')
	$('#game-complete').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.result}</h3>`);
}

game.restart = function(){
 	$('#game-complete').toggleClass('hidden');
 	//TO-DO: use some sort of boolean switch to toggle classes instead of hard-coding
}

$(document).ready(function(){

    $('.figure-img').on('click',function(event){
    	var name = $(this).attr("alt")
        var match;
        for (var i = 0; i < game.newCharacters.length; i++) {
           if (game.newCharacters[i].name == name)
                match = game.newCharacters[i];
        }

        // create Player subclass
        var Player = function(counterAttack){
            'use strict';
            Character.call(this, match.sprite, match,name, match.health, match.attack );
        };
        Player.prototype= Object.create(Character.prototype);
        Player.prototype.constructor = Player;
        var counterAttack = match.attack;
        game.player = new Player(counterAttack);
        console.log(match, game.player);
        // splice player from newCharacters
        console.log(game.newCharacters);
       	var index = game.newCharacters.indexOf(match);
       	game.newCharacters.splice(index,1);
       	console.log(game.newCharacters);
        // game.displayEnemies();

    });

     $('#enemy-choices').on('click', '.enemy-choice', function(event){
        imgSrc = $(this).attr("src");
        name = $(this).attr("alt")
        game.displayBattle();
    });

    $('#fight-button').on('click', function(event){
    	console.log('click')
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













