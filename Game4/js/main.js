"use strict";

window.onload = function () {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render });

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('bg', 'assets/bg1.png');
        game.load.image('re', 'assets/Recycle.png');
        game.load.image('tree1', 'assets/tree1.png');
        game.load.image('tree2', 'assets/tree2.png');
        game.load.audio('treesong', 'assets/TreeSong.mp3');

    }

    var highscore = 0;
    var earthy;
    var button;
    var tree1;
    var tree2;

    var touched = 0;
    var whichTree = 0;
    var x = 0;
    var y = 0;
    var tempTree;

    var style;
    var style2;
    var text;
    var text2;
    var text3;
    var text4;
    var text5;
    var loopsWon = 0;

    var timer;
    var total = 0;

    var goalTrees = 5;

    var win = false;
    var redo = false;

    var music;
    function create() {
        earthy = game.add.sprite(0, 0, 'bg');
        earthy.scale.setTo(.40, .40);

        button = game.add.button(game.world.centerX-75, 650, 're', actionOnClick, this, 2, 1, 0);
        button.scale.setTo(.15, .15);

        game.add.sprite(0, 0, 'tree2');

        music = game.add.audio('treesong');
        music.play();



        style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        style2 = { font: "25px Verdana", fill: "#ffffff ", align: "center" };
        text = game.add.text(15, 45, "Trees planted: " + touched + "/" + goalTrees, style);
        text4 = game.add.text(15, 75, "Loops won: " + loopsWon, style);
        text5 = game.add.text(560, 15, "Highest Score: " + highscore, style);



        //  Create our Timer
        timer = game.time.events.add(Phaser.Timer.SECOND * 5, checkVictory, this);
        text2 = game.add.text(15, 15, "Time Left: " + Math.floor(game.time.events.duration/ 1000), style);

    }

    function update() {   
        text2.setText("Time Left: " + Math.floor(game.time.events.duration / 1000));
        
        if (touched > highscore) {
            highscore = touched;
            text5.setText("Highest Score: " + highscore);
        }

    }

    function checkVictory() {
        if (touched >= goalTrees) {
            text3 = game.add.text(game.world.centerX-200, game.world.centerY, "YOU WIN! Click the button to try again!", style2);
            redo = true;
            win = true;
            loopsWon++;
            text4.setText("Loops won: " + loopsWon);
        }
        else {
            text3 = game.add.text(game.world.centerX-200, game.world.centerY, "YOU LOSE! Click the button to try again!", style2);
            redo = true;
            win = false;
        }
    }

    function render() {

        //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        //game.debug.text('Loop Count: ' + total, 32, 64);

    }

    function actionOnClick() {

        whichTree = game.rnd.integerInRange(0, 1)
        x = game.rnd.integerInRange(0, 600)
        y = game.rnd.integerInRange(75, 600)
        if (whichTree === 1) {
            tempTree = game.add.sprite(x, y, 'tree1');
        }
        else if(whichTree ===0){
            tempTree = game.add.sprite(x, y, 'tree2');
        }
        tempTree.scale.setTo(.01, .01);

        touched++;

        text.setText("Trees planted: " + touched + "/" + goalTrees);

        if (redo == true) {
            game.world.remove(text3);
            game.world.remove(timer);
            timer = game.time.events.add(Phaser.Timer.SECOND * 5, checkVictory, this);
            if (win == true) {
                touched = 0;
                goalTrees *= 2;
                redo = false;
                win = false


            }
            else {
                touched = 0;
                redo = false;
            }
        }

    }
};
