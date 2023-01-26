
/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Движок, регулирующий скорость анимации
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

var sliderActive = false;
var sliderStartMouseX = 0;
var sliderStartKnobX = 0;
var sliderKnob;
var sliderKnobY = 0;
var sliderKnobMaxX = 0;
var sliderKnobMinX = 0;
var sliderValue = 0.5;
var sliderCallback = null;

//====================== INIT SLIDER ==========================
function initializeSlider( callback ) {
  var svg = document.getElementById('slider');

  var sliderTrack = document.getElementById('sliderTrack');
  sliderKnobY = parseInt(sliderTrack.getAttribute('y1')) - 12;
  sliderKnobMinX = parseInt(sliderTrack.getAttribute('x1')) + 8;
  sliderKnobMaxX = parseInt(sliderTrack.getAttribute('x2')) - 8;

  var knobTarget = document.getElementById('knobTarget');
  var trackTarget = document.getElementById('trackTarget');

  knobTarget.addEventListener( 'mousedown', knobMouseDown, false );
  knobTarget.addEventListener( 'touchstart', knobMouseDown, false );
  trackTarget.addEventListener( 'mousedown', rectMouseDown, false );

  svg.addEventListener( 'mouseup', knobMouseUp, false ); 
  svg.addEventListener( 'touchend', knobMouseUp, false );
  svg.addEventListener( 'mousemove', knobMouseMove, false );
  svg.addEventListener( 'touchmove', knobMouseMove, false );
  document.addEventListener( 'mouseover', mouseOver, false );

  sliderCallback = callback;

  animationDelay = parseInt(window.sessionStorage[AnimationDelayKey]);
  if( ! animationDelay ) animationDelay = 100 * sliderScale / 500;
  var value = - Math.log( animationDelay / sliderScale ) / 3.2188; // 0.5 по умолчанию
  sliderSetValue( value );

}

//====================== SET VALUE ==========================
function sliderSetValue( value ) {   // valid value in [0; 1]
  sliderValue = Blockly.utils.math.clamp(value, 0, 1);
  var x = sliderKnobMinX +
          ( sliderKnobMaxX - sliderKnobMinX) * sliderValue;
  var sliderKnob = document.getElementById('sliderKnob');
  sliderKnob.setAttribute('transform', 'translate(' + x + ',' + sliderKnobY + ')');
  var knobTarget = document.getElementById('knobTarget');
  knobTarget.setAttribute( 'cx', x );
  sliderCallback( sliderValue );
};

function animateValue( value ) {
  var duration = 200; // Milliseconds to animate for.
  var steps = 10; // Number of steps to animate.
  var oldValue = sliderValue;
  var stepFunc = function(i) {
    return function() {
      var newVal = i * (value - oldValue) / (steps - 1) + oldValue;
      sliderSetValue( newVal );
    };
  };
  for( var i = 0; i < steps; i++ ) 
    setTimeout( stepFunc(i), i*duration/steps );
};

//====================== EVENT HANDLERS ==========================
function knobMouseDown( e ) {
  if (e.type == 'touchstart') {
    if (e.changedTouches.length != 1) 
      return;
    touchToMouse( e );
  }
  sliderActive = true;
  sliderstartMouseX = mouseToSvg( e ).x;
  sliderstartKnobX = 0;
  // Stop browser from attempting to drag the knob or
  // from scrolling/zooming the page.
  e.preventDefault();
};

function rectMouseDown( e ) {
  if (e.type == 'touchstart') {
    if (e.changedTouches.length != 1) 
      return;
    touchToMouse( e );
  }
  var x = mouseToSvg( e ).x;
  animateValue( (x - sliderKnobMinX) / (sliderKnobMaxX - sliderKnobMinX) );
  //sliderSetValue( (x - sliderKnobMinX) / (sliderKnobMaxX - sliderKnobMinX) );
};

function knobMouseUp ( e ) {
  sliderActive = false;
};

function knobMouseMove( e ) {
  if( ! sliderActive ) return;
  if (e.type == 'touchmove') {
    if (e.changedTouches.length != 1) return;
    touchToMouse( e );
  }
  var x = mouseToSvg( e ).x - sliderStartMouseX + sliderStartKnobX;
  sliderSetValue( (x - sliderKnobMinX) / (sliderKnobMaxX - sliderKnobMinX) );
};

function mouseOver( e ) {
  if ( ! sliderActive ) return;
  knobMouseUp( e );
};

//====================== HELPER FUNCTIONS ==========================
function mouseToSvg( e ) {
  var svg = document.getElementById('slider');
  var svgPoint = svg.createSVGPoint();
  svgPoint.x = e.clientX;
  svgPoint.y = e.clientY;
  var matrix = svg.getScreenCTM().inverse();
  return svgPoint.matrixTransform( matrix );
};

function touchToMouse( e ) {
  var touchPoint = e.changedTouches[0];
  e.clientX = touchPoint.clientX;
  e.clientY = touchPoint.clientY;
};

