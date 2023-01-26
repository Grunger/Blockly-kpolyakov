/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, циклические алгоритмы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': -3, 'y': 3, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 1
  { 'x': -3, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 2
  { 'x': 0, 'y': -4, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 3
  { 'x': 0, 'y': -5, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 5
  { 'x': 0, 'y': -6, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 15 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 20 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [6, 7, 8],     // Level 1
    [6, 7, 10],    // Level 2
    [8, 10, 12],   // Level 3
    [9, 10, 12],   // Level 4
    [12, 14, 18],  // Level 5
    [16, 18, 20],  // Level 6
    [19, 21, 25],  // Level 7
    [24, 26, 30],  // Level 8
    [24, 26, 30],  // Level 9
    [34, 36, 42],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  for (var count = 0; count < 6; count++) {
	vector(5, 0); vector(-5, 0);
	penUp(); vector(0, -1);
    penDown();
	}  
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  vector(0, 3);
  for (var count = 0; count < 8; count++) {
    penDown(); vector(0, -6);
	penUp(); vector(1, 6);
	}
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-5, 0);
  for (var count = 0; count < 6; count++) {
    penDown(); vector(5, 4);  vector(5, -4);
    penUp(); vector(-10, 1);
  }
},
// Level 4 
function() { drawGrid(200, 200, false); 
 for (var count = 0; count < 5; count++) {
    penDown(); vector(-5, 2); vector(10, 0); vector(-5, -2); 
    penUp(); vector(0, 1); floodFill('#ffff00');  vector(0, 1);
    }
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-8, -8);
  for (var count = 0; count < 6; count++) {
    penDown(); vector(0, 2); vector(2, 0); vector(0, -2); vector(-2, 0);
    penUp(); vector(1, 1); floodFill('#ffff00'); vector(2, 2);
    }
  },
// Level 6 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-8, 12);
  for (var count = 0; count < 6; count++) {
    penDown(); vector(1, -1); vector(1, 1); penUp(); vector(1, 0);
    }
  penUp(); vector(-18, -2);
  for (var count2 = 0; count2 < 5; count2++) {
    penDown(); vector(1, -1); vector(1, 1); penUp(); vector(1, 0);
    }
  },
// Level 7 
function() { drawGrid(200, 200, false);
  penUp(); vector(0, -4);
  for (var count = 0; count < 8; count++) {
    penDown(); vector(0, -1); vector(-1, 0); vector(0, 1); vector(1, 0);
    penUp(); vector(0, 1);
    }
  vector(-3, 0);
  for (var count2 = 0; count2 < 7; count2++) {
    penDown(); vector(0, -1); vector(-1, 0); vector(0, 1); vector(1, 0);
    penUp(); vector(1, 0);
    }
  },
// Level 8 
function() { drawGrid(200, 200, false);
  penUp(); vector(-7, -2);
  for (var count = 0; count < 5; count++) {
    penDown(); vector(0, 2); vector(2, 0); vector(0, -2); vector(-2, 0);
    penUp(); vector(1, 1); floodFill('#ffff00'); vector(2, -1);
    }
  penUp(); vector(-3, 2);
  for (var count2 = 0; count2 < 4; count2++) {
    penDown(); vector(0, 2); vector(-2, 0); vector(0, -2); vector(2, 0);
    penUp(); vector(-1, 1); floodFill('#ffff00'); vector(-2, -1);
    }
  },
// Level 9 
function() { drawGrid(200, 230, false);
  penUp(); vector(-6, 9); penDown();
  for (var count = 0; count < 4; count++) {
    vector(0, 3); vector(3, 0); vector(0, -2); vector(-1, 0); vector(0, 1);
    vector(-1, 0); vector(0, -2); vector(3, 0);
    }
  penUp(); vector(-16, 0); penDown();
  for (var count2 = 0; count2 < 4; count2++) {
    vector(-3, 0); vector(0, -3); vector(2, 0); vector(0, 1); vector(-1, 0);
    vector(0, 1); vector(2, 0); vector(0, -3);
    }
  },
// Level 10 
function() { drawGrid(200, 230, false);
  penUp(); vector(8, 9);
  for (var count = 0; count < 8; count++) {
    penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
    penUp(); vector(-1, -1); floodFill('#ffff00'); vector(-1, -1);
    }
  vector(4, 2);
  for (var count2 = 0; count2 < 7; count2++) {
    penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
    penUp(); vector(-1, -1); floodFill('#ffff00'); vector(3, 1);
    }
  vector(-2, 2);
  for (var count3 = 0; count3 < 6; count3++) {
    penDown(); vector(-2, 0); vector(0, -2); vector(2, 0); vector(0, 2);
    penUp(); vector(-1, -1); floodFill('#ffff00'); vector(1, 3);
    }
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй горизонтальные отрезки, используя цикл.', 
// Level 2   
    'Нарисуй вертикальные отрезки, используя цикл.', 
// Level 3   
    'Нарисуй шесть уголков, используя цикл.', 
// Level 4   
    'Нарисуй пять треугольников и закрась их.', 
// Level 5   
    'Нарисуй квадраты и закрась их.', 
// Level 6   
    'Нарисуй стаю галок.', 
// Level 7   
    'Нарисуй букву Т из квадратов.', 
// Level 8   
    'Нарисуй два ряда квадратов и закрась их жёлтым цветом.', 
// Level 9   
    'Нарисуй узор с помощью циклов.', 
// Level 10   
    'Нарисуй треугольник из закрашенных квадратов.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 6, 7, 9].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '</xml>';
  if( [4, 5, 8, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '  <block type="drawer_fill"></block>' +
  '</xml>';
  return '';
}


