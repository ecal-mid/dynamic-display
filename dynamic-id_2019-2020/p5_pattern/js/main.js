let LAYER_1, LAYER_2;

function preload() {
    LAYER_1 = loadImage('rsrc/jinhua.png');
    LAYER_2 = loadImage('rsrc/grand-water.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    push();
    background('red');

    noFill();
    stroke(LAYER_2); //layer peut être p5Image ou p5Graphics 
    strokeWeight(40);
    rect(width - mouseX, height - mouseY, 300, 300);

    noStroke();
    // ADANCED layer transform
    fill(LAYER_1, 'repeat', function() { /* Répétition de la texture: "repeat", "no-repeat", "repeat-x", "repeat-y" */
        //accéder au dimensions de la texture avec this.width et this.height -> translate(this.width/2, 0)
        let zoom = map(mouseX, 0, width, .5, 3);
        scale(zoom, zoom);
    });

    ellipse(mouseX, mouseY, 300);

    pop();
}