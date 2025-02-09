# WORKSHOP-3.1 New Zealand Birds Collageoje
Link to Repository: https://github.com/adra086/WORKSHOP-3.1/

## Project Description

This project creates a collage of 10 images of New Zealand birds arranged dynamically around a centered title, "New Zealand Birds." 
Each time you click the mouse, a new random collage is generated with dynamic effects applied to the images, such as grayscale, blur, posterize, and overlays. 
The centered text is unaffected by any filters to maintain its clarity.

## Tasks Overview

1. Collect a Series of Images

    I collected 10 images of New Zealand birds and stored them in a folder named images within my p5.js project.

2. Make a p5.js Sketch That Generates a New Collage Each Time

    The setup() function initializes the canvas and loads the images.
    The images are arranged in a layout surrounding the centered text using a grid-like structure.
    A new collage layout is generated randomly on each mouse press, ensuring that each collage is unique.

3. Include Manipulations of the Images

    The images change with different computational effects such as grayscale, blur, posterize, and semi-transparent overlays.
    The effects are applied directly to individual images using createGraphics() which I refined using youtube tutorials and ChatGPT to prevent global filters from affecting
   other elements like the centered text. 

## Key Features

    Centered Text: The text "New Zealand Birds" is always centered on the canvas using textAlign(CENTER, CENTER). It remains unaffected by the effects applied to the images.
    Dynamic Image Effects: Each image has a random effect applied (none, grayscale, blur, or posterize) to ensure variety in every collage.
    Interactive Collage Generation: Each mouse click triggers a new random collage with different effects.
    Semi-transparent Overlays: The images have overlays and gradients applied to enhance the artistic look of the collage.

## Code Explanation
1. Loading Images

``` javascript
let images = [];
let numImages = 10;

function preload() {
  for (let i = 1; i <= numImages; i++) {
    images.push(loadImage(`images/bird${i}.jpg`));
  }
}
```

    The images are loaded using the preload() function to ensure they are ready before the canvas is created.

2. Centered Text

``` javascript
function drawCenteredText() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  textStyle(BOLD);
  noStroke();
  text("New Zealand Birds", width / 2, height / 2);
  pop();
}
```

    The title "New Zealand Birds" is centered using textAlign() and drawn without any filters.

3. Dynamic Collage with Random Effects

``` javascript
function generateCollage() {
  positions = [];
  effects = [];
  graphics = [];

  let gridPositions = [
    { x: 50, y: 50 }, { x: 225, y: 50 }, { x: 400, y: 50 }, { x: 575, y: 50 },
    { x: 50, y: 225 }, { x: 575, y: 225 },
    { x: 50, y: 400 }, { x: 225, y: 400 }, { x: 400, y: 400 }, { x: 575, y: 400 }
  ];

  for (let i = 0; i < numImages; i++) {
    let w = random(100, 150);
    let h = w * 0.75;
    let imgIndex = i;

    let pg = createGraphics(w, h);
    pg.image(images[imgIndex], 0, 0, w, h);

    let effect = int(random(4));
    effects.push(effect);

    if (effect === 1) {
      pg.filter(GRAY);
    } else if (effect === 2) {
      pg.filter(BLUR, 3);
    } else if (effect === 3) {
      pg.filter(POSTERIZE, 5);
    }

    graphics.push(pg);
    positions.push({ x: gridPositions[i].x - w / 2, y: gridPositions[i].y - h / 2, w: w, h: h });
  }
}
```

    This function arranges the images around the centered text and applies random effects to each image using createGraphics().

## 4. Interactive Collage Updates

``` javascript
function mousePressed() {
  generateCollage();  // Generate a new layout with random effects
  redraw();
}
```
    A new random collage with different effects is generated each time the mouse is clicked.

## Project Screenshots

    1. Inital Layout - first effect
    ![image](https://github.com/user-attachments/assets/5ddd32f9-18ef-4d04-a281-1c334ed7bbae)

    2. Dynamic Collage after applying effects like grayscale, blur, and posterize
    ![image](https://github.com/user-attachments/assets/55a37719-e266-4e4d-abbb-56d3a2ccb278)

## Problem-Solving and Feedback

### Issues Encountered

    I initially encountered an issue where filters applied to images were affecting the entire canvas, including the text.
    The text was constantly being filtered as well so I had to trouble shoot this. 
    I also had to organise the pictures around the heading which was positioned using the centre function. 

### Solution

    I resolved this by using createGraphics() to apply effects only to individual images, leaving the text unaffected.
    I specified postions for each image in a grid formation so it was like this: 
    ![image](https://github.com/user-attachments/assets/406be518-9501-4b6f-90cf-8daa136b8dd2)


### Feedback Implemented

    Based on feedback from my previous repository, I added more detailed documentation, images, and code extracts to this README.
    I also ensured that each image has a unique effect by using random assignments and avoiding global filters.

### Ideas for Further Development

    Allow users to choose specific effects for individual images through buttons or key presses.
    Experiment with additional effects such as threshold or invert filters.
    Animate the images so that they transition smoothly between different layouts.

## Helpful Resources

    p5.js Reference Documentation
    Workshop Tutorials & Canvas Lectures as well as Exemplar Repositories
    ChatGPT: Assisted in debugging and optimizing the application of filters to images without affecting the text.
    p5.js YouTube Tutorials: Provided insights into random positioning and dynamic layout generation.
