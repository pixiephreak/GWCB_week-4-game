
Character = function(sprite, name, health, attack, counterAttack){
	this.health = health;
	this.attack = attack;
	this.counterAttack = counterAttack;

	$(this).click(function() {
	  alert( "Handler for .click() called." );
	});
}