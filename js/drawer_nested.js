/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, вложенные циклы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': 0, 'y': -3, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 2
  { 'x': 0, 'y': -4, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 3
  { 'x': 0, 'y': -5, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 5
  { 'x': 0, 'y': -6, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [9, 11, 15],     // Level 1
    [9, 11, 15],    // Level 2
    [11, 13, 18],   // Level 3
    [11, 13, 18],   // Level 4
    [12, 14, 19],  // Level 5
    [13, 15, 20],  // Level 6
    [14, 16, 21],  // Level 7
    [14, 16, 21],  // Level 8
    [25, 27, 30],  // Level 9
    [25, 27, 30],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-5, 8);
  for (var count2 = 0; count2 < 7; count2++) {
    for (var count = 0; count < 5; count++) {
      penDown(); vector(1, 0); penUp(); vector(1, 0);
      }
    vector(-10, -1);
    }
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-4, -8);
  for (var count2 = 0; count2 < 7; count2++) {
    for (var count = 0; count < 5; count++) {
      penDown(); vector(0, 1); penUp(); vector(0, 1);
      }
    vector(1, -9);
    }
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-8, 10);
  for (var count2 = 0; count2 < 6; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(1, -1); vector(1, 1);
      }
    penUp(); vector(-16, -2);
    }
},
// Level 4 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-8, 10);
  for (var count2 = 0; count2 < 5; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(1, 0); vector(0, -1); vector(-1, 0);
      penUp(); vector(2, 1);
      }
    vector(-16, -2);
    }
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-7, 7);
  for (var count2 = 0; count2 < 4; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(0, 2); vector(1, 0); vector(0, -1); vector(-1, 0);
      penUp(); vector(2, -2);
      }
    vector(-16, 5);
    }
  },
// Level 6 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-8, 12);
  for (var count2 = 0; count2 < 5; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(2, 0); vector(-1, -1); vector(-1, 1);
      penUp(); vector(1, -0.5); floodFill('#ffff00'); vector(1, 0.5);
      }
    vector(-16, -2);
    }
  },
// Level 7 
function() { drawGrid(200, 200, false);
  penUp(); vector(-8, 7);
  for (var count2 = 0; count2 < 8; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(1, 1); vector(1, -1); vector(-1, -1); vector(-1, 1);
      penUp(); vector(1, 0); floodFill('#33ff33'); vector(1, 0);
      }
    vector(-16, -2);
    }  
  },
// Level 8 
function() { drawGrid(200, 200, false);
  penUp(); vector(-8, 7);
  for (var count2 = 0; count2 < 8; count2++) {
    for (var count = 0; count < 8; count++) {
      penDown(); vector(1, 0); vector(0, -1); vector(-1, 0); vector(0, 1);
      penUp(); vector(0.5, -0.5); floodFill('#33ff33'); vector(1.5, 0.5);
      }
    vector(-16, -2);
    }  
  },
// Level 9 
function() { drawGrid(200, 230, false);
  penUp(); vector(2, 9);
  for (var count3 = 0; count3 < 2; count3++) {
    for (var count = 0; count < 4; count++) {
      penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
      penUp(); vector(-1, -1); floodFill('#33ff33'); vector(-1, -1);
      }
    vector(8, 6);
    for (var count2 = 0; count2 < 3; count2++) {
      penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
      penUp(); vector(-1, -1); floodFill('#33ff33'); vector(-1, -1);
      }
    vector(9, 3);
    }
  },
// Level 10 
function() { drawGrid(200, 230, false);
  //penUp('6mzA^~{{[Z~Ph=7:}5D?,#btb]^+8mV.dv#Fq/*3', 1, 13);
  penUp(); vector(1,13);
  for (var count3 = 0; count3 < 3; count3++) {
    for (var count = 0; count < 4; count++) {
      penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
      penUp(); vector(-1, -1); floodFill('#33ff33'); vector(-1, -1);
      }
    vector(8, 6);
    for (var count2 = 0; count2 < 3; count2++) {
      penDown(); vector(2, 0); vector(0, -2); vector(-2, 0); vector(0, 2);
      penUp(); vector(1, -1); floodFill('#33ff33'); vector(1, -1);
      }
    vector(-6, 2);
    }
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй горизонтальные отрезки, используя вложенный цикл.', 
// Level 2   
    'Нарисуй вертикальные отрезки, используя вложенный цикл.', 
// Level 3   
    'Нарисуй волны, использую вложенный цикл.', 
// Level 4   
    'Нарисуй скобы, используя вложенный цикл.', 
// Level 5   
    'Нарисуй флажки, используя вложенный цикл.', 
// Level 6   
    'Нарисуй треугольники и закрась их, используя вложенный цикл. Аргументы команды <b>вектор</b> ' +
    'могут быть дробными числами, например, "0.5". ', 
// Level 7   
    'Нарисуй узор из закрашенных квадратов, используя вложенный цикл.', 
// Level 8   
    'Нарисуй узор из закрашенных квадратов, используя вложенный цикл.', 
// Level 9   
    'Нарисуй две одинаковых фигурки, используя вложенные циклы.', 
// Level 10   
    'Нарисуй три одинаковых фигурки, используя вложенные циклы.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '</xml>';
  if( [6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '  <block type="drawer_fill"></block>' +
  '</xml>';
  return '';
}


