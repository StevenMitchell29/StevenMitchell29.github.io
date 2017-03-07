window.onload = function() {

    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image('red', 'assets/red.png');
        game.load.image('blue', 'assets/blue.png');
        game.load.image('green', 'assets/green.png');
        game.load.image('yellow', 'assets/yellow.png');
        game.load.image('orange', 'assets/orange.png');
        game.load.image('white', 'assets/white.png');
    }

    var puzzleGroup;
    var square;
    var whichColor;

    var selected;
    var selectedGroup;

    var style;
    var text;
    function create() {
        puzzleGroup = game.add.group();
        selectedGroup = game.add.group();
        //puzzleGroup.inputEnabled = true;
        for (var i = 0; i < 49; i++){
            whichColor = game.rnd.integerInRange(0, 4)
            if (whichColor === 0) {
                square = puzzleGroup.create(0, 0, 'red');
                square.name = "red";
                square.inputEnabled = true;
                square.events.onInputDown.add(clickSquares, this);
            }
            else if (whichColor === 1) {
                square = puzzleGroup.create(0, 0, 'blue');
                square.name = "blue";
                square.inputEnabled = true;
                square.events.onInputDown.add(clickSquares, this);

            }
            else if (whichColor === 2) {
                square = puzzleGroup.create(0, 0, 'green');
                square.name = "green";
                square.inputEnabled = true;
                square.events.onInputDown.add(clickSquares, this);
            }
            else if (whichColor === 3) {
                square = puzzleGroup.create(0, 0, 'yellow');
                square.name = "yellow";
                square.inputEnabled = true;
                square.events.onInputDown.add(clickSquares, this);

            }
            else if (whichColor === 4) {
                square = puzzleGroup.create(0, 0, 'orange');
                square.name = "orange";
                square.inputEnabled = true;
                square.events.onInputDown.add(clickSquares, this);
            }
        }
        puzzleGroup.align(7, -1, 48, 48);
        puzzleGroup.x = 220;
        puzzleGroup.y = 150;
        puzzleGroup.setAll('input.useHandCursor', true);

        style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "Select like colors that are touching to gain points", style);
        text.setTextBounds(0, 50, 800, 100);
        text.inputEnabled = true;
        text.events.onInputDown.add(clickSquares, this);
        
    }

    function update() {
        

    }

    function render() {
        game.debug.text('Score: ' + total, 32, 64);
    }
    
    function clickSquares(square) {
        //selected = selectedGroup.create(square.x, square.y, "white");
        square.scale.setTo(.5, .5);
        alert(square.x + "+" + square.y);

        //square.loadTexture = ("white", false);
        //square.tint = Math.random() * 0xffffff;
        
    }


};
