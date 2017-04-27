window.onload = function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('bullet2', 'assets/bullet2.png');
        game.load.image('ship', 'assets/player.png');
        game.load.image('ship2', 'assets/player2.png');
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        game.load.image('starfield', 'assets/starfield.png');

    }

    var player1;
    var player1up;
    var player1down;
    var player1bullets;
    var bulletTime = 0;
    var fireButton1;
    var player1lives;


    var player2;
    var bulletTime2 = 0;
    var player2Movement;
    var fireButton2;
    var player2Lives;
    var player2Bullet;

    var explosions;
    var starfield;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  The scrolling starfield background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        //Player 1 bullets
        player1bullets = game.add.group();
        player1bullets.enableBody = true;
        player1bullets.physicsBodyType = Phaser.Physics.ARCADE;
        player1bullets.createMultiple(6, 'bullet');
        player1bullets.setAll('anchor.x', 0.5);
        player1bullets.setAll('anchor.y', 1);
        player1bullets.setAll('outOfBoundsKill', true);
        player1bullets.setAll('checkWorldBounds', true);
        

        // Player 2's bullets
        player2Bullet = game.add.group();
        player2Bullet.enableBody = true;
        player2Bullet.physicsBodyType = Phaser.Physics.ARCADE;
        player2Bullet.createMultiple(6, 'bullet2');
        player2Bullet.setAll('anchor.x', 0.5);
        player2Bullet.setAll('anchor.y', 1);
        player2Bullet.setAll('outOfBoundsKill', true);
        player2Bullet.setAll('checkWorldBounds', true);
        
        //player 1
        player1 = game.add.sprite(100, 100, 'ship');
        player1.anchor.setTo(0.5, 0.5);
        game.physics.enable(player1, Phaser.Physics.ARCADE);

        //player 2
        player2 = game.add.sprite(700, 500, 'ship2');
        player2.anchor.setTo(0.5, 0.5);
        game.physics.enable(player2, Phaser.Physics.ARCADE);

        //player 1 lives
        player1lives = game.add.group();
        game.add.text(10, 10, 'Player 1 Lives: ', { font: '34px Arial', fill: '#fff' });

        //player 2ives
        player2Lives = game.add.group();
        game.add.text(game.world.width - 250, 10, 'Player 2 Lives: ', { font: '34px Arial', fill: '#fff' });

        //setting up player 1 lives visual
        for (var i = 0; i < 3; i++) {
            var ship = player1lives.create(30 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

        //setting up player 2 lives visual
        for (var i = 0; i < 3; i++) {
            var ship2 = player2Lives.create(game.world.width - 100 + (30 * i), 60, 'ship2');
            ship2.anchor.setTo(0.5, 0.5);
            ship2.angle = 90;
            ship2.alpha = 0.4;
        }

        //Setting up explosion
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(setupPlayer1, this);
        explosions.forEach(setupPlayer2, this);

        //setting up movement and fire for player 1
        player1up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        player1down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        fireButton1 = game.input.keyboard.addKey(Phaser.Keyboard.C);

        //setting up movement and fire for player 2
        player2Movement = game.input.keyboard.createCursorKeys();
        fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    //next two methods for explosion set up
    function setupPlayer1(player1) {
        player1.anchor.x = 0.5;
        player1.anchor.y = 0.5;
        player1.animations.add('kaboom');
    }
    function setupPlayer2(player2) {

        player2.anchor.x = 0.5;
        player2.anchor.y = 0.5;
        player2.animations.add('kaboom');
    }

    //for movement of the ships and collision detection
    function update() {
        //  Scroll the background
        starfield.tilePosition.y += 2;

        if (player1.alive) {
            player1.body.velocity.setTo(0, 0);

            if (player1up.isDown) {
                player1.body.velocity.y = -200;
            }
            else if (player1down.isDown) {
                player1.body.velocity.y = 200;
            }
            if (fireButton1.isDown) {
                fireBullet();
            }
            game.physics.arcade.overlap(player2Bullet, player1, player2HitsPlayer1, null, this);
        }

        if (player2.alive) {
            player2.body.velocity.setTo(0, 0);

            if (player2Movement.up.isDown) {
                player2.body.velocity.y = -200;
            }
            else if (player2Movement.down.isDown) {
                player2.body.velocity.y = 200;
            }
            if (fireButton2.isDown) {
                fireBullet2();
            }
            game.physics.arcade.overlap(player1bullets, player2, player1HitsPlayer2, null, this);
        }

    }

    function render() {
        //if i wanted to check things
    }

    function player1HitsPlayer2(player2, bullet) {

        bullet.kill();

        //lose a life
        player2Live = player2Lives.getFirstAlive();
        if (player2Live) {
            player2Live.kill();
        }

        //Make it explode
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player2.body.x, player2.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (player2Lives.countLiving() < 1) {
            player2.kill();
            player2Bullet.callAll('kill');
        }
    }
    function player2HitsPlayer1(player1, player2Bullet) {
        player2Bullet.kill();

        player1live = player1lives.getFirstAlive();

        if (player1live) {
            player1live.kill();
        }

        var explosion = explosions.getFirstExists(false);
        explosion.reset(player1.body.x, player1.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (player1lives.countLiving() < 1) {
            player1.kill();
            player1bullets.callAll('kill');
        }
    }

    //fire for player 1
    function fireBullet() {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime) {
            //  Grab the first bullet we can from the pool
            bullet = player1bullets.getFirstExists(false);

            if (bullet) {
                //  And fire it
                bullet.reset(player1.x + 20, player1.y + 4);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
            }
        }

    }
    //for player 2
    function fireBullet2() {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime2) {
            //  Grab the first bullet we can from the pool
            bullet2 = player2Bullet.getFirstExists(false);

            if (bullet2) {
                //  And fire it
                bullet2.reset(player2.x - 20, player2.y + 4);
                bullet2.body.velocity.x = -400;
                bulletTime2 = game.time.now + 200;
            }
        }

    }

    //if bullets go off the screen
    function resetBullet(bullet) {
        bullet.kill();
    }
    function resetBullet2(player2Bullet) {
        player2Bullet.kill();
    }
};