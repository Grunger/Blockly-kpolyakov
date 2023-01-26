/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, процедуры
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': -60, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': -60, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': -20, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': -20, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': -60, 'y': 60, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': -60, 'y': 20, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -80, 'y': 75, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -35, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': -50, 'y': 60, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [20, 25, 35],  // Level 1
    [22, 27, 40], // Level 2
    [17, 21, 30], // Level 3
    [19, 24, 35], // Level 4
    [22, 27, 40],  // Level 5
    [30, 35, 50],  // Level 6
    [15, 20, 35],  // Level 7
    [34, 40, 55],  // Level 8
    [18, 25, 40],  // Level 9
    [32, 40, 50],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { 
  function Square() {
    penDown();
    for (var count = 0; count < 4; count++) { forward(40); right(90); }
  penUp(); right(45); forward(20); floodFill('#ffff00'); back(20); left(45);
  }
  Square(); forward(40); right(90); forward(40); left(90);
  Square(); right(90); forward(40); Square();
  },
// Level 2 
function() { 
  function Square() {
    penDown();
    for (var count = 0; count < 4; count++) { forward(40); right(90); }
  penUp(); right(45); forward(20); floodFill('#ffff00'); back(20); left(45);
  }
  Square(); forward(40); right(90); forward(40); left(90); back(60);
  Square(); right(90); forward(40); left(90); forward(20);
  Square();
  },
// Level 3 
function() { 
  function Square() {
    penDown();
    for (var count = 0; count < 4; count++) { forward(40); right(90); }
  penUp(); right(45); forward(20); floodFill('#ffff00'); back(20); left(45);
  }
  Square();
  for (var count = 0; count < 4; count++) {
    forward(40); left(90);
    Square();
    right(180);
    }
  },
// Level 4 
function() { 
  function Square() {
    penDown();
    for (var count = 0; count < 4; count++) { forward(40); right(90); }
  penUp(); right(45); forward(20); floodFill('#ffff00'); back(20); left(45);
  }
  Square();
  for (var count = 0; count < 4; count++) {
    forward(40); left(135); back(20); Square();
    forward(20); right(225);
    }
  },
// Level 5 
function() { 
  function Brick() {
    penDown();
    for (var count = 0; count < 2; count++) { forward(40); right(90); forward(120); right(90); }
    penUp(); right(45); forward(20); floodFill('#ffff00'); back(20); left(45);
  }
  Brick(); right(90);
  Brick(); forward(80);
  Brick(); forward(40); right(90); forward(120);
  Brick();
  },
// Level 6 
function() { 
// Определение процедуры
  function Brick() {
    penDown(); forward(40); right(90); forward(40); left(90); forward(40); right(90);
    forward(40); right(90); forward(40); left(90); forward(40); right(90); forward(40);
    right(90); forward(120); right(90); penUp(); right(45); forward(20); floodFill('#ffff00');
    back(20); left(45);
  }
  Brick(); back(40); right(90); forward(120); right(90);
  Brick();
  },
// Level 7 
function() {
  function Triang() {
    penDown();
    for (var count2 = 0; count2 < 3; count2++) { forward(40); right(120); }
    right(30); penUp(); forward(20); floodFill('#ffff00');
    back(20); left(30);
    }
  left(30);
  for (var count = 0; count < 3; count++) { Triang(); right(120); }
  },
// Level 8 
function() { 
  function Triang() {
    penDown();
    for (var count2 = 0; count2 < 3; count2++) { forward(40); right(120); }
    right(30); penUp(); forward(20); floodFill('#ffff00');
    back(20); left(30);
    }
  right(90);
  for (var count = 0; count < 4; count++) { Triang(); forward(40); }
  left(60); back(40); right(60); back(120);
  for (var count2 = 0; count2 < 3; count2++) { Triang(); forward(40); }
  left(60); back(40); right(60); back(80);
  for (var count3 = 0; count3 < 2; count3++) { Triang(); forward(40); }
  left(60); back(80); left(60); 
  Triang();  
  },
// Level 9 
function() { 
  function Pair() {
    forward(40);
    for (var count3 = 0; count3 < 2; count3++) {
      penDown();
      for (var count2 = 0; count2 < 3; count2++) { forward(40); left(120); }
      left(30); penUp(); forward(20); floodFill('#ffff00'); back(20); right(210);
      }
    }
left(30);
for (var count = 0; count < 3; count++) { Pair(); right(120); forward(40); }  
},
// Level 10 
function() { 
  function Triang() {
    penDown();
    for (var count = 0; count < 3; count++) { forward(40); right(120); }
    right(30); penUp(); forward(20); floodFill('#ffff00'); back(20); left(30);
  }
  function Triple() {
    right(90); Triang(); left(240); Triang(); forward(40); right(240); Triang();
    left(60); forward(40); left(30);
  }
  Triple(); right(90); forward(80); left(90); 
  Triple(); back(100); left(90); forward(40); left(90);
  Triple();
  },
];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй три одинаковых квадрата, стороны которых равны 40 Черепахи.', 
// Level 2   
    'Те же три квадрата, но иначе расположенные. В этом случае можно использовать ту же самую процедуру.', 
// Level 3   
    'Теперь квадрата стало больше. Чтобы сократить программу, попробуй использовать цикл. ', 
// Level 4   
    'Пять квадратов расположены чуть-чуть иначе. Предыдущую программу нужно немного ' +
    'поменять.', 
// Level 5   
    'Нарисуй фигуру, сложенную из четырёх одинаковых блоков.', 
// Level 6   
    'Нарисуй два одинаковых фигурных блока.', 
// Level 7   
    'Для решения этой задачи нужно написать новую процедуру, которая рисует и закрашивает ' +
    'равносторонний треугольник. Все его стороны равна 40 шагам Черепахи.', 
// Level 8   
    'Нарисуй узор из треугольников. Для сокращения программы используй циклы. ', 
// Level 9   
    'В этой задаче важно правильно выбрать, что будет рисовать процедура.', 
// Level 10   
    'Одна процедура может вызывать другую. Это может сократить программу и сделать её ' +
    'более понятной. Попробуй применить две процедуры, одна из которых вызывает другую.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );

}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Черепаха" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="turtle_pen_down"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_pen_up"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_forward_simple"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_back_simple"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_left_simple"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_right_simple"></block>' +
  '</category>' +
  '<category name="Цвет" colour="%{BKY_COLOUR_HUE}">' +
  '  <block type="turtle_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_fill"></block>' +
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


