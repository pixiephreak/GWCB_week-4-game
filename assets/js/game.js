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
	instructions4: 'Choose another enemy',
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
		var newCharacter = new Character(character.sprite, character.name, random(100,100), random(10,5));
		game.newCharacters.push(newCharacter)
		player.charImage = HTMLspritefig.replace('%imgdata%', newCharacter.sprite).replace('%altdata%', newCharacter.name).replace('%playername%', newCharacter.name).replace('%playerhealth%', newCharacter.health);
		$('#characters').append(player.charImage);
	})
}

//TO-DO finish removing hardcoded from html
game.displayEnemies = function(){
	$('#main').toggleClass( 'hidden' );
	$('#game-stage').toggleClass('hidden');
	$('#game-stage').prepend(`<h2 id='#instructions2'class='text-center'>${game.instructions2}<h2>`);
    player.charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite).replace('%altdata%', game.player.name).replace('%playername%', game.player.name).replace('%playerhealth%', game.player.health)
	$('#player').append(player.charImage);
	game.newCharacters.forEach(function(character){
		var enemy = new Character(character.sprite, character.name, character.health, character.attack);
		game.enemies.push(enemy);
		var enemyImage = HTMLenemyspritefig.replace('%imgdata%', character.sprite).replace('%altdata%', character.name).replace('%playername%', character.name).replace('%playerhealth%', character.health)
		$('#enemy-choices').append(enemyImage);
	})



}

game.displayBattle = function(){
	$('#game-stage').toggleClass('hidden');
	$('#fight-stage').toggleClass('hidden');
    $('#fight-button').toggleClass('hidden');
    $('#new-result').toggleClass('hidden');
    HTMLspritefig = '<figure class="figure" > <img src="%imgdata%" class="figure-img img-fluid rounded character-sprite" alt="%altdata%"><div id="unique-player-caption" class="figure-caption">Name: %playername% Health: %playerhealth% </div></figure>';
	player.charImage = HTMLspritefig.replace('%imgdata%', game.player.sprite).replace('%altdata%', game.player.name).replace('%playername%', game.player.name).replace('%playerhealth%', game.player.health);
    HTMLenemyspritefig = '<figure class="figure"> <img src="%imgdata%" class="figure-img img-fluid rounded enemy-sprite" alt="%altdata%"><div id="unique-enemy-id"class="figure-caption">Name: %playername% Health: %playerhealth% </div></figure>'
	game.enemy.charImage = HTMLenemyspritefig.replace('%imgdata%', game.enemy.sprite).replace('%altdata%', game.enemy.name).replace('%playername%', game.enemy.name).replace('%playerhealth%', game.enemy.health);
	$('#fight-player').append(player.charImage);
	$('#fight-enemy').append(game.enemy.charImage);
	var playerResult = `<h3 id="player-result">${game.player.health}</h3>`
	// var enemyResult =  `<h3 id="defender-result">${this.enemy.health}</h3>`
}

game.displayBattleAgain = function(){
    console.log("battling again", game.enemy);
    $('.next-opponent-sprite').remove();
    HTMLenemyspritefig = '<figure class="figure"> <img src="%imgdata%" class="figure-img img-fluid rounded enemy-sprite" alt="%altdata%"><div id="enemy-caption-2"class="figure-caption">Name: %playername% Health: %playerhealth% </div></figure>'
    game.enemy.charImage = HTMLenemyspritefig.replace('%imgdata%', game.enemy.sprite).replace('%altdata%', game.enemy.name).replace('%playername%', game.enemy.name).replace('%playerhealth%', game.enemy.health);
    $('#fight-enemy').append(game.enemy.charImage);
    var playerResult = `<h3 id="player-result">${game.player.health}</h3>`
    // var enemyResult =  `<h3 id="defender-result">${this.enemy.health}</h3>`
}

//TO-DO finish removing hardcoded from html


game.displayNext = function(){
    $('#fight-stage').prepend(`<h2 id='instructions4' class='text-center'>${game.instructions4}<h2>`);
    $('#instructions3').remove();
	//remove current enemy from model
	for (var i = 0; i < game.enemies.length; i++) {
           		if (game.enemies[i].name == name)
           			var index = game.enemies.indexOf(game.enemies[i].name);
            }
    game.enemies.splice(index,1);
    console.log(game.enemies);
    // TO-DO: remove current enemy from DOM
    $('#fight-enemy').empty();
    $('#fight-button').toggleClass('hidden');
    //repopulate DOM with remaining enemy choices
    game.enemies.forEach(function(character){
        // addClass and removeClass only work on first instance in group
        // $('.enemy-sprite').addClass('next-opponent-sprite');
        // $('.enemy-sprite').removeClass('enemy-sprite');
    	enemyImage = HTMLnextenemyspritefig.replace('%imgdata%', character.sprite).replace('%altdata%', character.name).replace('%playername%', character.name).replace('%playerhealth%', character.health);
        console.log("appending" + enemyImage);
        $('#fight-enemy').append(enemyImage);
    })
}

game.displayComplete = function(){
	$('#fight-stage').toggleClass('hidden');
	$('#game-complete').toggleClass('hidden')
	$('#game-complete').prepend(`<h1> ${game.title} </h1>`,`<h3>${game.result}</h3>`);
}

game.restart = function(){
 	$('#game-complete').toggleClass('hidden');
 	$('#main').toggleClass( 'hidden' );
 	game.newCharacters = [];
 	game.enemies = [];
 	game.displayMenu();
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
        console.log('firing enemy-choices click')
     	var name = $(this).attr("alt");
        for (var i = 0; i < game.enemies.length; i++) {
           if (game.enemies[i].name == name)
                game.enemy = game.enemies[i];
        }
        game.displayBattle();
    });

      $('#fight-enemy').on('click', '.next-opponent-sprite', function(event){
        console.log('firing fight-enemy click');
        console.log("this is",$(this),this);
        var name = $(this).attr('alt')
        //on second click "$this" is figure object, so wrong info displays
        console.log(name);
        for (var i = 0; i < game.enemies.length; i++) {
           if (game.enemies[i].name == name){
            game.enemy = game.enemies[i];
            //because name is undefined on click, it chooses twice?
            console.log(`choosing:`, game.enemy)
            }
        }
        console.log(`new enemy:`, game.enemy);
        game.displayBattleAgain();

    });


    $('#fight-button').on('click', function(event){

        var test = $('#unique-enemy-id');
        console.log(test);
    	game.player.health = game.player.health - game.enemy.attack;
    	game.enemy.health = game.enemy.health - game.player.attack;
    	game.player.attack = game.player.attack + game.player.counterAttack;
        console.log(`before:${game.player.health} now enemy${game.enemy.health}`)
        //created new div for caption info, BC I can't figure out how to select the <figcaption> by element or ID.
        //TO-DO: select by id and remove hardcoded '#player-caption div'
        $('#unique-player-caption').html(`Name:${game.player.name} Health:${game.player.health}`);

        //TO-DO: why doesn't this work at all?
        $('#unique-enemy-id').html(`Name:${game.enemy.name} Health:${game.enemy.health}`);
        $('#new-result').html(`You Attacked ${game.enemy.name} for ${game.player.attack} damage. S/he attacked you back for ${game.enemy.attack} damage.`);
    	console.log(`now player:${game.player.health} now enemy${game.enemy.health}`)
    	if(game.player.health <= 0){
    		game.result = "You lose";
    		game.displayComplete();
    	}else if(game.enemy.health <=0){
    		game.displayNext();
        }
    })

    $('#play-again').on('click', function(event){
    	console.log('click');
    	game.restart();
    })

});



game.displayMenu();













