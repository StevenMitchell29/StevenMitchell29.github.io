window.onload = function() {

    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {

        game.load.image('background', 'assets/bg1.png');
        game.load.image('player', 'assets/doc.png');
        game.load.image('bad', 'assets/bad.png', 32, 48);

        game.load.audio('scream', 'assets/Wilhelm-Scream.mp3');

    }

    var music;

    var player;
    var cursors;

    var bads;
    var bad;

    var kidneys;
    var KTotal = 0;
    var KLeft = 0;

    var score = 0;
    var scoreText;

    var kidney;

    function create() {

        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        music = game.add.audio('scream');


        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        player.scale.setTo(.05, .05);
        game.physics.arcade.enable(player);

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);


        bads = game.add.group();
        bads.enableBody = true;


        //  Here we'll create  in random positions
        for (var i = 0; i < 20; i++) {
            var x, y;
            x = game.rnd.integerInRange(0, 1920);
            y = game.rnd.integerInRange(0, 1920);

            //make it so that it is scaled and touchable
            var bad = bads.create(x, y, 'bad');
            bad.scale.setTo(.01, .01);
            
        }
    }

    function update() {
        game.physics.arcade.overlap(player, bads, takeKidney, null, this);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
        }
        else if (cursors.up.isDown) {
            player.body.velocity.y = -150;
        }
        else if (cursors.down.isDown) {
           player.body.velocity.y = 150;
        }

    }

    function takeKidney(player, bad) {

        bad.kill();
        music.play();


        //  Add and update the score
        score += 1;
    }
    function render() {

       // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);

        game.debug.text('Family left to find: ' + score + ' / ' + 20, 32, 32);

    }
};
