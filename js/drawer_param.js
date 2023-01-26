/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, процедуры с параметрами
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
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [33, 38, 50],  // Level 1
    [44, 55, 60],  // Level 2
    [52, 60, 70],  // Level 3
    [62, 70, 80],  // Level 4
    [49, 60, 80],  // Level 5
    [42, 50, 70],  // Level 6
    [54, 65, 85],  // Level 7
    [46, 50, 80],  // Level 8
    [57, 65, 80],  // Level 9
    [76, 85, 100],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  function Square(a) {
    penDown(); vector(0, a); vector(a, 0); vector(0, -a); vector(-a, 0);
    penUp();
    }
  penUp(); vector(-4, -4); Square(5);
  vector(-2, 0); Square(2);
  vector(7, 4); Square(3);
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  function Square(a, c) {
    penDown(); vector(0, a); vector(a, 0); vector(0, -a); vector(-a, 0);
    penUp(); vector(1, 1); floodFillNo(c); vector(-1, -1);
    }
  penUp(); vector(-2, -2); Square(5, 8); vector(1, 5);
  Square(3, 9); vector(0, -4); Square(3, 10);
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  function Square(a, c) {
    penDown(); vector(0, a); vector(a, 0); vector(0, -a); vector(-a, 0);
    penUp(); vector(1, 1); floodFillNo(c); vector(-1, -1);
    }
  penUp(); vector(-2, -2); Square(5, 10); vector((-3), 4);
  for (var count = 0; count < 2; count++) {
    Square(3, 12); vector(8, 0);
    }
  vector((-15), (-6));
  for (var count2 = 0; count2 < 2; count2++) {
    Square(2, 14); vector(7, 0);
    }
  },
// Level 4 
function() { drawGrid(200, 200, false); 
  function Square(a, c) {
    penDown(); vector(0, a); vector(a, 0); vector(0, -a); vector(-a, 0);
    penUp(); vector(1, 1); floodFillNo(c); vector(-1, -1);
    }
  penUp(); vector((-8), 0); Square(4, 10); vector(4, 1);
  Square(3, 9); vector(3, 1); Square(2, 12); vector(2, -1);
  Square(3, 9); vector(3, (-1)); Square(4, 10);
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  function Treug(L, c) {
    penDown(); vector(-L, 0); vector(L, L); vector(L, -L); vector(-L, 0);
    penUp(); vector(0, L / 2); floodFillNo(c); vector(0, -L / 2);
    }
  Treug(-6, 14); Treug(4, 12);
  vector((-6), 0);
  Treug(2, 10); vector(12, 0);
  Treug(2, 10);
  },
// Level 6 
function() { drawGrid(200, 200, false); 
  function Treug(L, c) {
    penDown(); vector(-L, 0); vector(L, L); vector(L, -L); vector(-L, 0);
    penUp(); vector(0, L / 2); floodFillNo(c); vector(0, -L / 2);
    }
  penUp(); vector(0, -3); Treug(8, 14);
  Treug(6, 12); Treug(4, 9); Treug(2, 10);
  },
// Level 7 
function() { drawGrid(200, 200, false);
  function Block(W, H, c) {
    penDown(); vector(0, H); vector(W, 0); vector(0, -H); vector(-W, 0);
    penUp(); vector(1, 1); floodFillNo(c); vector(-1, -1);
    }
  penUp(); vector(-4, -5); Block(8, 2, 4);
  vector(0, 2); Block(2, 5, 14);
  vector(6, 0); Block(2, 5, 14);
  vector(-8, 5); Block(12, 4, 9);
  },
// Level 8 
function() { drawGrid(200, 200, false);
  function Block(W, H, c) {
    penDown(); vector(0, H); vector(W, 0); vector(0, -H); vector(-W, 0);
    penUp(); vector(1, 1); floodFillNo(c);
    }
  penUp(); vector(-8, -5);
  Block(16, 10, 4); Block(14, 8, 14);
  Block(12, 6, 12); Block(10, 4, 9);
  Block(8, 2, 10);
  },
// Level 9 
function() { drawGrid(200, 230, false);
  function Hex(L, D, c) {
    penDown(); vector(L, 0); vector(D, D); vector(-D, D);
    vector(-L, 0); vector(-D, -D); vector(D, -D);
    penUp(); vector(1, 1); floodFillNo(c); vector(-1, -1);
    }
  penUp(); vector(-3, -5); Hex(6, 3, 9);
  vector(1, 6); Hex(4, 2, 10);
  vector(1, 4); Hex(2, 1, 12);
  },
// Level 10 
function() { drawGrid(200, 230, false);
  function Hex(L, D, W, c) {
    penDown(); vector(0, L); vector(W, D); vector(W, -D); vector(0, -L);
    vector(-W, -D); vector(-W, D); 
    penUp(); vector(W, 0); floodFillNo(c); vector(-W, 0);
    }
  penUp(); vector(-4, 0); Hex(6, 3, 4, 9); vector(0, 1);
  Hex(4, 3, -4, 14); vector(8, 0);
  Hex(4, 3, 4, 14); vector(-6, -8);
  Hex(2, 2, 2, 12); vector(0, 17);
  Hex(2, 1, 2, 12);
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй три квадрата, используя одну процедуру с параметром.', 
// Level 2   
    'Добавь в процедуру еще один параметр, чтобы можно было менять цвет заливки квадратов. ', 
// Level 3   
    'В этой задаче можно использовать ту же процедуру, что и в предыдущей.', 
// Level 4   
    'Нарисуй пять квадратов.', 
// Level 5   
    'Нарисуй фигуру из треугольников. ', 
// Level 6   
    'Нарисуй вложенные треугольники разного цвета.', 
// Level 7   
    'Построй рисунок из прямоугольников разного размера.', 
// Level 8   
    'Нарисуй вложенные прямоугольники.', 
// Level 9   
    'Нарисуй три шестиугольника, стоящих один на другом.', 
// Level 10   
    'Нарисуй птичку из шестиугольников.', 
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
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  return '';
}


