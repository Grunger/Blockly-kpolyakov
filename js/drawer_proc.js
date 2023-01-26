/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, процедуры
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': 1, 'y': -3, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 2
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 3
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 5
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [14, 16, 20],     // Level 1
    [16, 18, 25],   // Level 2
    [20, 22, 28],   // Level 3
    [18, 20, 25],   // Level 4
    [17, 19, 25],  // Level 5
    [20, 22, 25],  // Level 6
    [16, 18, 25],  // Level 7
    [22, 25, 30],  // Level 8
    [22, 25, 30],  // Level 9
    [21, 23, 30],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  function Square() {
    penDown(); vector(0, 2); vector(2, 0); vector(0, -2); vector(-2, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  Square(); vector(-7, 0);
  Square(); vector(4, 4);
  Square();
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  function Square() {
    penDown(); vector(0, 4); vector(4, 0); vector(0, -4); vector(-4, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  penUp(); vector(-2, 1);
  Square(); vector(-4, -5);
  Square(); vector(5, -1);
  Square();
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  function Square() {
    penDown(); vector(0, 4); vector(4, 0); vector(0, -4); vector(-4, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  penUp(); vector(-2, -2); 
  Square(); vector(-5, -5);
  Square(); vector(7, -1);
  Square(); vector(-1, 7);
  Square(); vector(-9, -1);
  Square();	
  },
// Level 4 
function() { drawGrid(200, 200, false); 
  function Glass() {
    penDown(); vector(-1, 5); vector(5, 0); vector(-1, -5); vector(-3, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  penUp(); vector(-5, 1);
  Glass(); vector(-4, -8);
  Glass(); vector(8, 6);
  Glass(); vector(2, -8);
  Glass();
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  function Treug() {
    penDown(); vector(2, 4); vector(2, -4); vector(-4, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  penUp(); vector(-2, 0); 
  Treug(); vector(2, 1);
  Treug(); vector(-7, -1);
  Treug(); vector(2, -7);
  Treug();
  },
// Level 6 
function() { drawGrid(200, 200, false); 
  function Block() {
    penDown(); vector(0, 2); vector(2, 0); vector(0, 2); vector(2, 0);
    vector(0, -2); vector(2, 0); vector(0, -2); vector(-6, 0);
    penUp(); vector(1, 1); floodFill('#ffff00');
    }
  penUp(); vector(-3, 1);
  Block(); vector(-4, -5);
  Block(); vector(5, -1);
  Block();
  },
// Level 7 
function() { drawGrid(200, 200, false);
  function Treug() {
    penDown(); vector(1, 2); vector(1, -2); vector(-2, 0);
    penUp(); vector(1, 0.5); floodFill('#ffff00'); vector(1, -0.5);
    }
  penUp(); vector(-7, -1);
  for (var count = 0; count < 7; count++) 
    Treug();
  vector(-12, 2);
  for (var count2 = 0; count2 < 5; count2++) 
    Treug();
  },
// Level 8 
function() { drawGrid(200, 200, false);
// Определение процедуры
  function Square() {
    penDown(); vector(0, 2); vector(2, 0); vector(0, -2); vector(-2, 0);
    penUp(); vector(1, 1); floodFill('#33ff33');
    }
  penUp(); vector(-6, -7);
  for (var count = 0; count < 7; count++) {
    Square(); vector(-1, 1);
    }
  vector(2, -2);
  for (var count2 = 0; count2 < 4; count2++) {
    Square(); vector(1, -1);
    }
  vector(-2, -2);
  for (var count3 = 0; count3 < 6; count3++) {
    Square(); vector(-1, -3);
    }
  },
// Level 9 
function() { drawGrid(200, 230, false);
  function Square() {
    penDown(); vector(0, 2); vector(2, 0); vector(0, -2); vector(-2, 0);
    penUp(); vector(1, 1); floodFill('#33ff33');
    }
  function MSquare() {
    Square(); vector(-3, -3);
    Square(); vector(3, -1);
    Square();
    }
  penUp(); vector(-1, 5); MSquare(); vector(-7, -3);
  MSquare(); vector(5, 1); MSquare();
  },
// Level 10 
function() { drawGrid(200, 230, false);
  function Treug() {
    penDown(); vector(2, 0); vector(-1, -2); vector(-1, 2);
    penUp(); vector(1, -1); floodFill('#ffff00');
    }
  function MTreug() {
    Treug(); vector(1, 1);
    Treug(); vector(-2, -1);
    Treug();
    }
  penUp(); vector(0, 1); MTreug();
  vector(-6, 3); MTreug();
  vector(0, 7); MTreug();
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй три одинаковых квадрата, используя процедуру.', 
// Level 2   
    'Нарисуй фигуру из квадратов, используя процедуру.', 
// Level 3   
    'Нарисуй фигуру из квадратов, используя процедуру.', 
// Level 4   
    'Нарисуй четыре стакана, используя процедуру.', 
// Level 5   
    'Нарисуй четыре треугольника, используя процедуру.', 
// Level 6   
    'Нарисуй три одинаковых блока, используя процедуру.', 
// Level 7   
    'Нарисуй фигуру из треугольников, используя процедуру.', 
// Level 8   
    'Нарисуй букву П из квадратов, используя процедуру.', 
// Level 9   
    'Нарисуй рисунок из квадратов, используя процедуры.', 
// Level 10   
    'Нарисуй рисунок из треугольников, используя процедуры.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );

}

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Чертёжник" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_up"></block>' +
  '</category>' +
  '<category name="Цвет" colour="%{BKY_COLOUR_HUE}">' +
  '  <block type="drawer_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_fill"></block>' +
  '  <sep gap="5"></sep>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_repeat_list"></block>' +
  '</category>' +
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  return '';
}


