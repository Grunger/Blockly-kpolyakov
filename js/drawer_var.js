/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, переменные
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 2
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 3
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 5
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [18, 20, 25],   // Level 1
    [18, 20, 25],   // Level 2
    [27, 30, 35],   // Level 3
    [36, 40, 50],   // Level 4
    [36, 45, 55],  // Level 5
    [41, 48, 55],  // Level 6
    [37, 45, 55],  // Level 7
    [36, 42, 50],  // Level 8
    [45, 52, 60],  // Level 9
    [46, 55, 65],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  var L = 7;
  penUp(); vector(-5, -5);
  for (var count = 0; count < 6; count++) {
    penDown(); vector(0, L); penUp(); vector(2, (-L));
    L = L - 1;
    }
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  var L = 3;
  penUp(); vector(-6, -5);
  for (var count = 0; count < 6; count++) {
    penDown(); vector(0, L); penUp(); vector(2, (-L));
    L = L + 1;
    }
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  var L = 7;
  penUp(); vector((-6), (-6));
  for (var count = 0; count < 6; count++) {
    penDown(); vector(0, L); vector(1, 0); vector(0, (-L)); vector((-1), 0);
    penUp(); L = L + 1; vector(2, 0);
    }
  },
// Level 4 
function() { drawGrid(200, 200, false); 
  var W = 10, C = 8;
  penUp(); vector(5, (-5));
  for (var count = 0; count < 6; count++) {
    penDown(); vector((-W), 0); vector(0, 2); vector(W, 0); vector(0, (-2));
    penUp(); vector((-1), 1); floodFillNo(C); vector(1, 1);
    C = C + 1;
    W = W - 1;
    }
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  var W = 14, C = 8;
  penUp(); vector(7, (-7));
  for (var count = 0; count < 6; count++) {
    penDown(); vector((-W), 0); vector(0, 2); vector(W, 0); vector(0, (-2));
    penUp(); vector((-1), 1); floodFillNo(C); vector(0, 1);
    C = C + 1;
    W = W - 2;
    }
  },
// Level 6 
function() { drawGrid(200, 200, false); 
  var A = 2, C = 8;
  penUp(); vector(10, 10);
  for (var count = 0; count < 5; count++) {
    penDown(); vector((-A), 0); vector(0, (-A)); vector(A, 0); vector(0, A);
    penUp(); vector((-1), (-1)); floodFillNo(C); vector((1 - A), (1 - A));
    C = C + 1;
    A = A + 1;
    }
  },
// Level 7 
function() { drawGrid(200, 200, false);
  var C = 12, A = 10;
  penUp(); vector((-5), (-5));
  for (var count = 0; count < 5; count++) {
    penDown(); vector(0, A); vector(A, 0); vector(0, (-A)); vector((-A), 0);
    penUp(); vector(1, 1); floodFillNo(C);  vector((-1), (-1));
    C = C - 1;
    A = A - 2;
    }
  },
// Level 8 
function() { drawGrid(200, 200, false);
  var C = 12, A = 10;
  penUp(); vector(-10, 0);
  for (var count = 0; count < 5; count++) {
    penDown(); vector(A, A); vector(A, -A); vector(-A, -A); vector(-A, A);
    penUp(); vector(2, 0); floodFillNo(C);
    C = C - 1;
    A = A - 2;
    }
  },
// Level 9 
function() { drawGrid(200, 230, false);
  var C = 8, L = 12;
  penUp(); vector(-6, -5);
  for (var count = 0; count < 5; count++) {
    penDown(); vector(0, L); vector(L, 0); vector(0, -1); vector((1 - L), 0);
    vector(0, 1 - L); vector(-1, 0);
    penUp(); vector(0.5, 0.5); floodFillNo(C); vector(0.5, -0.5);
    C = C + 1;
    L = L - 1;
    }
  },

// Level 10 
function() { drawGrid(200, 230, false);
  var B = 8, C = 8, L = 6;
  penUp(); vector((-4), (-4));
  for (var count = 0; count < 5; count++) {
    penDown(); vector(-L, 0); vector(L, 3); vector(B, 0);
    vector(L, -3); vector(-(L + B), 0);
    penUp(); vector(1, 1); floodFillNo(C); vector(0, 2);
    C = C + 1;
    L = L - 1;
    B = B - 2;
    }
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй пять столбиков разной длины.', 
// Level 2   
    'На этом рисунке длина столбиков увеличивается справа налево.', 
// Level 3   
    'Здесь вместо столбиков &mdash; прямоугольники.', 
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
    'Нарисуй ёлку из разноцветных треугольников.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );
   checkPictureMode = checkPictureModes.EXACT;
}

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Чертёжник" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="drawer_vector">' +
  '    <value name="DELTAX">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '    <value name="DELTAY">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_up"></block>' +
  '</category>' +
  '<category name="Цвет" colour="%{BKY_COLOUR_HUE}">' +
  '  <block type="drawer_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_fill_no">' + 
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
  '  <block type="math_negate"></block>' +
  '  <block type="math_arithmetic"></block>' +  
  '</category>' +
  '</xml>';
  return '';
}


