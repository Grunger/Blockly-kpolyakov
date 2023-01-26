/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, процедуры с параметрами
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': -40, 'y': -90, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': -85, 'y': -40, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': -40, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': -40, 'y': -160, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': -140, 'y': 40, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': -100, 'y': -80, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': -60, 'y': -90, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -140, 'y': -130, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -40, 'y': -150, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': 0, 'y': -80, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [13, 15, 20],  // Level 1
    [27, 35, 45], // Level 2
    [34, 40, 50], // Level 3
    [40, 50, 60], // Level 4
    [34, 40, 50],  // Level 5
    [31, 37, 50],  // Level 6
    [45, 50, 60],  // Level 7
    [39, 45, 55],  // Level 8
    [28, 35, 45],  // Level 9
    [38, 45, 55],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { 
  function Square(a) {
    for (var count = 0; count < 4; count++) { forward(a); right(90); }
    forward(a); 
    }
  Square(80); Square(60); Square(30);
  },
// Level 2 
function() { 
  function Square(a, c) {
    penDown();
    for (var count = 0; count < 4; count++) { forward(a); right(90); }
    penUp(); right(45); forward(10); floodFillNo(c); back(10); right(45); forward(a); left(90);
    }
  Square(80, 10); Square(60, 12); Square(30, 14);
  },
// Level 3 
function() { 
  function Square(a, c) {
    penDown();
    for (var count = 0; count < 4; count++) { forward(a); right(90); }
    penUp(); right(45); forward(10); floodFillNo(c); back(10); right(45); left(90);
    }
  Square(80, 10); left(180);
  for (var count = 0; count < 2; count++) { Square(30, 14); left(90); forward(80); }
  for (var count2 = 0; count2 < 2; count2++) { Square(60, 12); left(90); forward(80); }
  },
// Level 4 
function() { 
  function Square(a, c) {
    left(90); penDown();
    for (var count = 0; count < 5; count++) { forward(a); right(90); }
    penUp(); right(45); forward(10); floodFillNo(c); back(10); right(45); left(90);
    }
  right(90); Square(80, 10); forward(10); Square(60, 12); forward(10);
  Square(40, 14); back(10); Square(60, 12); back(10); Square(80, 10);
  },
// Level 5 
function() { 
  function Triang(a, c) {
    penDown();
    left(60);
    for (var count = 0; count < 3; count++) { forward(a); right(120); }
    penUp(); right(30); forward(10); floodFillNo(c); back(10);
    right(30); forward(a);
    }
  right(90); Triang(80, 10); Triang(120, 12); Triang(80, 10);
  right(180); forward(40); Triang(200, 14);
  },
// Level 6 
function() { 
  function Triang(a, c) {
    penDown();
    left(60);
    for (var count = 0; count < 3; count++) { forward(a); right(120); }
    penUp(); right(30); forward(10); floodFillNo(c); back(10); right(30); forward(20);
    }
  right(90); Triang(200, 10); Triang(160, 12); Triang(120, 14); Triang(80, 15);
  },
// Level 7 
function() { 
  function Rect(a, b, c) {
    penDown();
    for (var count = 0; count < 2; count++) { forward(a); right(90); forward(b); right(90); }
    penUp(); right(45); forward(20); floodFillNo(c); back(20); left(45);
    }
  right(90); Rect(120, 20, 10); left(90); Rect(150, 40, 12); right(90); forward(80);
  left(90); Rect(150, 40, 12); forward(150); left(90); back(80); Rect(200, 20, 14);
  },
// Level 8 
function() {
  function Rect(a, b, c) {
    penDown();
    for (var count = 0; count < 2; count++) { forward(a); right(90); forward(b); right(90); }
    penUp(); right(45); forward(20); floodFillNo(c); back(20); right(45); forward(40); left(90);
    forward(40); 
    }
  Rect(260, 280, 10); Rect(180, 200, 12); Rect(100, 120, 14); Rect(20, 40, 15);
  },
// Level 9 
function() { 
  function Hex(a, c) {
    penDown();
    for (var count = 0; count < 8; count++) { forward(a); right(60); }
    right(60); penUp(); forward(10); floodFillNo(c); back(10); left(60); forward(10);
    left(120);
    } 
  left(30); Hex(80, 10); Hex(60, 12); Hex(40, 14);
  },
// Level 10 
function() { 
  function Hex(a, c) {
    penDown();
    for (var count2 = 0; count2 < 6; count2++) { forward(a); right(60); }
    right(60); penUp(); forward(10); floodFillNo(c); back(10); left(60);
    }
  left(60); Hex(80, 10); right(180);
  for (var count = 0; count < 2; count++) {
    Hex(30, 12); left(60); forward(80); left(60);
    forward(10); Hex(60, 14); forward(70); left(60); forward(80);
    }
  },
];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй три квадрата, используя одну процедуру с параметром. ' + 
    'Длины сторон этих квадратов &mdash; 80, 60 и 30 шагов Черепахи.', 
// Level 2   
    'Добавь в процедуру еще один параметр, чтобы можно было менять цвет заливки квадратов. ' +
    'Длины сторон этих квадратов &mdash; 80, 60 и 30 шагов Черепахи.', 
// Level 3   
    'В этой задаче можно использовать ту же процедуру, что и в предыдущей.', 
// Level 4   
    'Нарисуй пять квадратов. Длины их сторон равны 80, 60 и 40 шагов Черепахи.', 
// Level 5   
    'Нарисуй фигуру из равносторонних треугольников. Длины их сторон равны 200, 120 и 80 шагов Черепахи.', 
// Level 6   
    'Нарисуй вложенные треугольники с длинами сторон, равными 200, 160, 120 и 80  шагов Черепахи.', 
// Level 7   
    'Построй рисунок из прямоугольников разного размера.', 
// Level 8   
    'Нарисуй вложенные прямоугольники. В каждым шагом длины сторон уменьшаются на 40 шагов Черепахи.', 
// Level 9   
    'Нарисуй три шестиугольника, стоящих один на другом. Их длины сторон равны 80, 60 и 40 шагам Черепахи.', 
// Level 10   
    'Нарисуй птичку из шестиугольников. Их длины сторон равны 80, 60 и 30 шагам Черепахи.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );
   checkPictureMode = checkPictureModes.EXACT;
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Черепаха" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="turtle_pen_down"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_pen_up"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_forward">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">40</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_back">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">40</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_left_simple"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_right_simple"></block>' +
  '</category>' +
  '<category name="Цвет" colour="%{BKY_COLOUR_HUE}">' +
  '  <block type="turtle_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_fill_no">' + 
  '    <value name="COLOUR">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_repeat_list"></block>' +
  '</category>' +
  '<category name="Переменные" custom="VARIABLE_MY" colour="%{BKY_VARIABLES_HUE}">'+
  '</category>'+
  '<category name="Математика" colour="%{BKY_MATH_HUE}">' +
  '  <block type="math_number">' +
  '    <field name="NUM">1</field>' +
  '  </block>' +
  '  <block type="math_arithmetic"></block>' +  
  '</category>' +
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  return '';
}


