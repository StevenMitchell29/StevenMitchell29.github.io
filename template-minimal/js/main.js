window.onload = function() {

    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        //load the images for the sprites
        game.load.image('earth', 'assets/earth.png');
        game.load.image('asteroid', 'assets/asteroid.png');
    }
    
    var score = 0;
    var scoreText;

    var rocks;
    var earthy;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        earthy = game.add.sprite(0, 0, 'earth');
        earthy.scale.setTo(.45, .33);
   
        //make a group of stars
        rocks = game.add.group();

        //  Here we'll create 15 in random positions
        for (var i = 0; i < 15; i++) {
            //  Create rocks inside of the rocks group
            var x,y;
            x = game.rnd.integerInRange(0,760);
            y = game.rnd.integerInRange(0, 560);

            //make it so that it is scaled and touchable
            var rock = rocks.create(x, y, 'asteroid');
            rock.scale.setTo(.1, .1);
            rock.inputEnabled = true;
            rock.input.useHandCursor = true;
            rock.events.onInputDown.add(listener, this);
        }

        //  The score
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'white' });
    }
    
    //do something with this later
    function update() {
    }

    function listener(rock, pointer) {
        // Removes the rock from the screen
        rock.kill();

        //  Add and update the score
        score += 1;
        scoreText.text = 'Score: ' + score;
        if (score === 15) {//if you clicked them all you win!
            scoreText.text = 'YOU WIN!';
        }
    }
};
