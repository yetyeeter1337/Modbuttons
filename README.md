# Modbuttons
a simple and modular button system for p5js

Modbuttons provides the framework to quickly create a variety of custom buttons, sliders, and dials

see an example: https://editor.p5js.org/7vector/sketches/7DXk4U_iW

# Setup
to use Modbuttons, place the Modbuttons.js in your project and then add the following line of code to your index.html file before your sketch but after p5js:
```html
  <script src="modbuttons.js"></script>
```
the `updateButtons()` function must be placed in your draw function in order for Modbuttons to work, preferrably at the end
```js
  function draw() {
    // your code

    updateButtons()
  }
```
