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
        game.load.image('submit', 'assets/submit.png');
        game.load.image('manning', 'assets/manning.jpg');
    }

    var puzzleGroup;
    var square;
    var whichColor;

    var player1;
    var player1Group;

    var player2;
    var player2Group;

    var style;
    var text;
    var winText;

    var submit;
    var turn = true;

    var text3;
    var text4;
    var player1Wins = 0;
    var player2Wins = 0;

    var manning;
    function create() {

        manning = game.add.sprite(125, 0, 'manning');

        puzzleGroup = game.add.group();
        player1Group = game.add.group();
        player2Group = game.add.group();

        for (var i = 0; i < 9; i++) {
            square = puzzleGroup.create(0, 0, 'white');
            square.name = "white";
            square.inputEnabled = true;
            square.events.onInputDown.add(clickSquares, this);
            square.taken = false;
            square.xPos = i;
        }
        puzzleGroup.align(3, -1, 125, 125);
        puzzleGroup.x = 200;
        puzzleGroup.y = 125;
        puzzleGroup.setAll('input.useHandCursor', true);

        style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(15, 75, "Player 1's turn", style);

        winText = game.add.text(0, 50, "sd", style);
        winText.setTextBounds(0, 0, 800, 100);
        winText.visible = false;

        text3 = game.add.text(15, 15, 'Player 1 wins: ' + player1Wins, style);
        text4 = game.add.text(15, 45, 'Player 2 wins: ' + player1Wins, style);


        submit = game.add.button(240, 500, 'submit', reset, this, 2, 1, 0);
    }

    function update() {
    }

    function render() {
        //game.debug.text('Player 1 wins: ' + player1Wins, 32, 64);
        //game.debug.text('Player 2 wins: ' + player2Wins, 32, 64);
    }

    function reset() {
        player1Group.removeAll(true);
        player2Group.removeAll(true);
        text3.setText('Player 1 wins: ' + player1Wins);
        text4.setText('Player 2 wins: ' + player2Wins);
        winText.visible = false;
    }

    function clickSquares(square) {

        
        if (turn === true) {
            player1 = player1Group.create(square.x + 200, square.y + 125, 'blue');
            player1.xPos = square.xPos;
            checkForVictory();

            text.setText("Player 2's turn");
            turn = false;
        }
        else if (turn === false) {
            player2 = player2Group.create(square.x + 200, square.y + 125, 'red');
            player2.xPos = square.xPos;
            checkForVictory();

            text.setText("Player 1's turn");
            turn = true;
        }
        
    }
    
    function checkForVictory() {
        if (turn) {
            if (player1Group.children.length > 2) {
                var numbers = [];
                for (var i = 0, len = player1Group.children.length; i < len; i++) {
                    numbers.push(player1Group.children[i].xPos);
                }
                numbers.sort();
                if (numbers[0] === 0 && numbers[1] === 1 && numbers[2] === 2 || numbers[0] === 3 && numbers[1] === 4 && numbers[2] === 5 ||numbers[0] === 6 && numbers[1] ===7 && numbers[2] === 8) {
                    winText.visible = true;
                    winText.setText("Player 1 wins!");
                    player1Wins+=1;
                }
                else if (numbers[0] === 0 && numbers[1] === 3 && numbers[2] === 6 || numbers[0] === 1 && numbers[1] === 4 && numbers[2] === 7 || numbers[0] === 2 && numbers[1] === 5 && numbers[2] === 8) {
                    winText.visible = true;
                    winText.setText("Player 1 wins!");
                    player1Wins+=1;

                }
                else if (numbers[0] === 0 && numbers[1] === 4 && numbers[2] === 8 || numbers[0] === 2 && numbers[1] === 4 && numbers[2] === 6) {
                    winText.visible = true;
                    winText.setText("Player 1 wins!");
                    player1Wins+=1;
                }
            }
        }
        else {
            if (player2Group.children.length > 2) {
                var numbers = [];
                for (var i = 0, len = player2Group.children.length; i < len; i++) {
                    numbers.push(player2Group.children[i].xPos);
                }
                numbers.sort();
                if (numbers[0] === 0 && numbers[1] === 1 && numbers[2] === 2 || numbers[0] === 3 && numbers[1] === 4 && numbers[2] === 5 || numbers[0] === 6 && numbers[1] === 7 && numbers[2] === 8) {
                    winText.visible = true;
                    winText.setText("Player 2 wins!");
                    player2Wins += 1;
                }
                else if (numbers[0] === 0 && numbers[1] === 3 && numbers[2] === 6 || numbers[0] === 1 && numbers[1] === 4 && numbers[2] === 7 || numbers[0] === 2 && numbers[1] === 5 && numbers[2] === 8) {
                    winText.visible = true;
                    winText.setText("Player 2 wins!");
                    player2Wins += 1;

                }
                else if (numbers[0] === 0 && numbers[1] === 4 && numbers[2] === 8 || numbers[0] === 2 && numbers[1] === 4 && numbers[2] === 6) {
                    winText.visible = true;
                    winText.setText("Player 2 wins!");
                    player2Wins += 1;
                }
            }
        }
        
    }

    /*
            //selected = selectedGroup.create(square.x, square.y, "white"); 
        //square.loadTexture = ("white");

        //game.add.sprite(square.x + 220, square.y + 150, 'white');
        //if(square.name != selectedGroup)
        //selected = selectedGroup.create(square.x + 220, square.y + 150, 'white');
        //selected.name = square.name;

        //alert(square.name+ "+" +square.x + "+" + square.y);
        //square.tint = Math.random() * 0xffffff;
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
}*/
};
