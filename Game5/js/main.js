window.onload = function() {

    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.spritesheet('diamonds', 'assets/diamonds.png', 32, 24);
    }

    function create() {
        var group = game.add.group();

        //  Creates 24 sprites FOR EACH FRAME
        group.createMultiple(4, 'diamonds', [0, 1, 2, 3, 4], true);

        // sprites.createMultiple(20, ['diamonds', 'balls'], [0, 1, 2], true);

        //  Align the sprites into rows of 12, by however many we need (the -1 argument)
        //  With 48x48 pixel spacing per sprite
        group.align(12, -1, 48, 48);

        group.x = 100;
        group.y = 64;

        
    }

    function update() {
      

    }

    function render() {

       // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
    }
};
