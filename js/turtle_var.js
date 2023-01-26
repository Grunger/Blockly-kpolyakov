/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, переменные
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': -80, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': -80, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': -80, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': 60, 'y': -90, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': 60, 'y': -90, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': 0, 'y': -180, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': -100, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -100, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -100, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': -110, 'y': -140, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [15, 17, 25],  // Level 1
    [15, 17, 25], // Level 2
    [18, 22, 30], // Level 3
    [30, 35, 45], // Level 4
    [32, 37, 45],  // Level 5
    [23, 28, 40],  // Level 6
    [23, 28, 40],  // Level 7
    [28, 35, 45],  // Level 8
    [42, 48, 55],  // Level 9
    [25, 30, 45],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { 
  var L = 40;
  for (var count = 0; count < 5; count++) {
    penDown(); forward(L); back(L); penUp(); right(90); forward(40); left(90);
    L = L + 20;
    }
  },
// Level 2 
function() { 
  var L = 120;
  for (var count = 0; count < 5; count++) {
    penDown(); forward(L); back(L); penUp(); right(90); forward(40); left(90);
    L = L - 20;
    }
  },
// Level 3 
function() { 
  var L = 120;
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 2; count++) {
      forward(L); right(90); forward(10); right(90);
      }
    penUp(); right(90); forward(40); left(90);
    L = L -20;
    }
  },
// Level 4 
function() { 
  var L = 120;
  var c = 8;
  left(90);
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 2; count++) {
      forward(L); right(90); forward(40); right(90);
      }
    penUp(); right(45); forward(5); floodFillNo(c); back(5); right(45);
    forward(40); left(90);
    L = L - 20;
    c = c + 1;
    }
  },
// Level 5 
function() { 
  var L = 200;
  var c = 8;
  left(90);
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 2; count++) {
      forward(L); right(90); forward(40); right(90);
      }
    penUp(); right(45); forward(5); floodFillNo(c); back(5); right(45);
    forward(40); left(90); forward(20);
    L = L - 40;
    c = c + 1;
    }
  },
// Level 6 
function() { 
  var L = 70, c = 12;
  for (var count2 = 0; count2 < 5; count2++) {
    left(45);
    penDown();
    for (var count = 0; count < 6; count++) { forward(L); right(90); }
    penUp(); left(135); back(10); floodFillNo(c); forward(10);
    L = L - 10;
    c = c - 1;
  }
  },
// Level 7 
function() { 
  var L = 200, c = 12;
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 4; count++) { forward(L); right(90); }
    right(45); penUp(); forward(20); floodFillNo(c); back(20); left(45);
    c = c - 1;
    L = L - 40;
  }
  },
// Level 8 
function() {
  var L = 200, c = 12;
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 4; count++) { forward(L); right(90); }
    right(45); penUp(); forward(20); floodFillNo(c); back(20); right(45);
    forward(20); left(90); forward(20);
    c = c - 1;
    L = L - 40;
  }
  },
// Level 9 
function() { 
  var H = 200, c = 8;
  for (var count = 0; count < 5; count++) {
    penDown(); forward(H); right(90); forward(H); right(90); forward(20);
    right(90); forward((H - 20)); left(90); forward((H - 20)); right(90);
    forward(20); back(20); right(45); penUp(); forward(10); floodFillNo(c);
    back(10); right(45);
    H = H - 20;
    c = c + 1;
  }
  },
// Level 10 
function() { 
  var L = 120, c = 8;
  right(18);
  for (var count2 = 0; count2 < 5; count2++) {
    penDown();
    for (var count = 0; count < 5; count++) { forward(L); left(72); forward(L); right(144); }
    right(18); penUp(); forward(35); floodFillNo(c); left(18);
    L = L - 25;
    c = c + 1;
    }
  },
];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй пять столбиков разной длины (от 40 до 120 шагов Черепахи).', 
// Level 2   
    'На этом рисунке длина столбиков уменьшается слева направо.', 
// Level 3   
    'Здесь вместо столбиков &mdash; прямоугольники шириной 10 шагов Черепахи.', 
// Level 4   
    'Раскрась прямоугольники стандартными цветами. Для этого используй блок, который позволяет выбрать ' +
    'номер цвета заливки (от 0 до 15): ' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/fill2-block.gif"></p>' +
    'Нижний (самый широкий) прямоугольник должен иметь цвет 8, следующий &mdash; цвет 9 и т.д.' +
    '', 
// Level 5   
    'Нарисуй пирамидку. Цвета должны быть те жа самые, что в предыдущей задаче.', 
// Level 6   
    'Нарисуй цепочку разноцветных квадратов.', 
// Level 7   
    'Нарисуй пять вложенных квадратов. Самый маленький квадрат закрашен цветом 8, следующий &mdash; ' +
    'цветом 9, и т.д.', 
// Level 8   
    'Нарисуй пять закрашенных квадратов, центры которых совпадают.', 
// Level 9   
    'Нарисуй набор уголков, вложенных друг в друга.', 
// Level 10   
    'Нарисуй пятиконечную звёздочку. Самая большая звёздочка строится из отрезков, длина которых ' +
    'равна 120 шагам Черепахи, размер каждой следующей &mdash; на 25 шагов меньше, чем предыдущей.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
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
  '</xml>';
  return '';
}


