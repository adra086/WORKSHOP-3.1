let images = [];
let numImages = 10;
let positions = [];
let effects = []; // Store current effect for each image
let graphics = []; // Store pre-rendered graphics to avoid affecting the text

function preload() {
  // Load all 10 bird images
  for (let i = 1; i <= numImages; i++) {
    images.push(loadImage(`images/bird${i}.jpg`));
  }
}

function setup() {
  createCanvas(600, 600); // Canvas size constraint
  generateCollage();
  noLoop();
}

function draw() {
  background(255); // Reset background
  drawCenteredText(); // Draw text first with no effects
  displayCollage(); // Apply effects only to images
}

// Generate positions and assign random initial effects and sizes
function generateCollage() {
  positions = [];
  effects = [];
  graphics = []; // Reset graphics

  let gridPositions = [
    { x: 50, y: 50 },   // 1
    { x: 225, y: 50 },  // 2
    { x: 400, y: 50 },  // 3
    { x: 575, y: 50 },  // 4
    { x: 50, y: 225 },  // 5
    { x: 575, y: 225 }, // 6
    { x: 50, y: 400 },  // 7
    { x: 225, y: 400 }, // 8
    { x: 400, y: 400 }, // 9
    { x: 575, y: 400 }  // 10
  ];

  for (let i = 0; i < numImages; i++) {
    let w = random(100, 150);
    let h = w * 0.75;
    let imgIndex = i; // Each position corresponds to an image index

    // Create a graphics object to apply the effect before drawing
    let pg = createGraphics(w, h);
    pg.image(images[imgIndex], 0, 0, w, h);

    // Apply random effects to the pre-rendered graphics
    let effect = int(random(4));
    effects.push(effect);

    if (effect === 1) {
      pg.filter(GRAY);
    } else if (effect === 2) {
      pg.filter(BLUR, 3);
    } else if (effect === 3) {
      pg.filter(POSTERIZE, 5);
    }

    graphics.push(pg); // Store the processed graphics object
    positions.push({ x: gridPositions[i].x - w / 2, y: gridPositions[i].y - h / 2, w: w, h: h });
  }
}

function displayCollage() {
  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];

    // Draw the processed graphics (image with effect applied)
    image(graphics[i], pos.x, pos.y, pos.w, pos.h);

    // Overlay semi-transparent shapes or gradients
    drawOverlay(pos.x, pos.y, pos.w, pos.h);
  }
}

function drawOverlay(x, y, w, h) {
  push();
  noStroke();
  
  // Semi-transparent rectangle overlay
  fill(random(50, 200), random(50, 200), random(150, 255), 50);
  rect(x, y, w, h);

  // Gradient overlay
  for (let i = 0; i < h; i++) {
    let inter = map(i, 0, h, 0, 1);
    let color1 = color(255, 0, 0, 50);
    let color2 = color(0, 0, 255, 50);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }
  pop();
}

function drawCenteredText() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255, 0, 0);
  textStyle(BOLD);
  noStroke();
  text("New Zealand Birds", width / 2, height / 2); // No effects applied to text
  pop();
}

function mousePressed() {
  generateCollage(); // Generate a new layout with new random effects
  redraw();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('collage', 'png'); // Save the current collage
  }
}
