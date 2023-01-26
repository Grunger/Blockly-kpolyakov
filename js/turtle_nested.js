/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, вложенные циклы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': -120, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': -100, 'y': -75, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': -140, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': -20, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': -50, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': -35, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -170, 'y': 136, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -170, 'y': 150, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': -170, 'y': 133, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [9, 11, 15],  // Level 1
    [12, 15, 20], // Level 2
    [12, 15, 20], // Level 3
    [13, 16, 22], // Level 4
    [14, 17, 25],  // Level 5
    [11, 14, 20],  // Level 6
    [13, 16, 22],  // Level 7
    [14, 17, 25],  // Level 8
    [18, 22, 30],  // Level 9
    [26, 32, 40],  // Level 10
    ];

//======================= DIFF LIMIT  =======================
// Ограничение на количество несовпадающих пикселей для
// каждого уровня (по умолчанию - 5% от всех закрашенных пикселей решения)

//var DiffLimit = [0, // Level 0 unused
//    100,  // Level 1
//    200,  // Level 2
//    200,  // Level 3
//    200,  // Level 4
//    200,  // Level 5
//    200,  // Level 6
//    500,  // Level 7
//    500,  // Level 8
//    2000, // Level 9
//    5000, // Level 10
//    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { 
  for (var count = 0; count < 5; count++) {
  for (var count1 = 0; count1 < 4; count1++) { forward(40); right(90); } 
  penUp(); right(90); forward(50); left(90); penDown(); 
  }
  },
// Level 2 
function() { 
  for (var count = 0; count < 5; count++) {
  penDown();  
  for (var count1 = 0; count1 < 4; count1++) { forward(40); right(90); } 
  penUp(); right(45); forward(20); floodFill("#ffff00"); back(20); left(45);
  right(90); forward(40); left(90); forward(20); 
  }
  },
// Level 3 
function() { 
  right(45);
  for (var count = 0; count < 5; count++) {
  penDown();  
  for (var count1 = 0; count1 < 4; count1++) { forward(40); right(90); } 
  penUp(); right(45); forward(20); floodFill("#ffff00"); back(20); left(45);
  forward(40); right(90); forward(40); left(90);
  }
  },
// Level 4 
function() { 
  left(90);
  for (var count = 0; count < 4; count++) { 
  penDown();
  for (var count1 = 0; count1 < 4; count1++) { forward(40); right(90); } 
  right(45); penUp(); forward(20); floodFill("#ffff00"); back(20); 
  right(45); forward(40);  
  }  
  },
// Level 5 
function() {
  left(60);
  for (var count = 0; count < 8; count++) { 
  penDown();
  for (var count1 = 0; count1 < 3; count1++) { forward(40); right(120); } 
  right(30); penUp(); forward(20); floodFill("#ffff00"); back(20); 
  right(30); forward(40); right(-15); 
  }  
  },
// Level 6 
function() { 
  for (var count2 = 0; count2 < 3; count2++) {
  penDown();  
  for (var count = 0; count < 6; count++) { forward(40); right(60); }
  right(60); penUp(); forward(20); floodFill("#ffff00"); back(20);   
  left(60);
  left(120);
  }
  },
// Level 7 
function() { 
  for (var count2 = 0; count2 < 6; count2++) {
  penDown();
  for (var count = 0; count < 6; count++) { forward(40); left(60); }
  left(60); penUp(); forward(20); floodFill('#ffff00'); back(20);
  right(60); forward(40); right(60);
  }
  },
// Level 8 
function() { 
  for (var count3 = 0; count3 < 6; count3++) {
  for (var count2 = 0; count2 < 6; count2++) {
    penDown();
    for (var count = 0; count < 4; count++) { forward(30);  right(90); }
    penUp(); right(90); forward(60); left(90);
    }
  back(60); left(90); forward(360); right(90);
  }
  },
// Level 9 
function() { 
  for (var count3 = 0; count3 < 8; count3++) {
  for (var count2 = 0; count2 < 8; count2++) {
    right(45); penDown();
    for (var count = 0; count < 6; count++) { forward(30); right(90); }
    right(45); penUp(); forward(10); floodFill('#ffff00'); back(10); right(90);
    }
  left(135); forward(270); right(90); forward(210); right(45);
  }
  },
// Level 10 
function() { 
  for (var count4 = 0; count4 < 6; count4++) {
  for (var count2 = 0; count2 < 6; count2++) {
    penDown();
    for (var count = 0; count < 6; count++) { forward(30); right(60); }
    penUp(); right(30); forward(20); floodFill('#ffff00'); back(20);
    right(90); forward(30); left(60); forward(30); left(60);
    }
  left(120); forward(30);
  for (var count3 = 0; count3 < 5; count3++) {
    right(60); forward(30); left(60); forward(30);
    }
  forward(30); right(120); back(30); 
  }  
  },
];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй пять квадратов со стороной 40 шагов. Расстояние между квадратами &ndash; 10 шагов Черепахи.', 
// Level 2   
    'Эту цепочку квадратов нужно закрасить жёлтым цветом. Постарайся закрашивать квадрат сразу после того, ' +
    'как он был нарисован.', 
// Level 3   
    'Нарисуй пять квадратов в ряд.', 
// Level 4   
    'Нарисуй четыре закрашенных квадрата, которые связаны между собой. Закраску квадратов ' +
    'выполняйте в цикле.', 
// Level 5   
    'Построй солнышко с восемью лучиками. Каждый лучик &ndash; это равносторонний треуголник, длина ' +
    'его стороны равна 40 шагам Черепахи.', 
// Level 6   
    'Нарисуй три шестиугольные соты. Длина каждой стороны равны 40 шагам Черепахи. ', 
// Level 7   
    'Написуй кольцо из шести сот.  Длина каждой стороны равны 40 шагам Черепахи.', 
// Level 8   
    'Нарисуй много квадратов. Сторона каждого квадрата равна 30 шагам Черепахи, расстояние ' +
    'между квадратами тоже равно 30 шагам.', 
// Level 9   
    'Нарисуй сетку из квадратов. Сторона каждого квадрата равна 30 шагам Черепахи.', 
// Level 10   
    'Нарисуй сетку из шестиугольных сот.  Сторона каждой соты равна 30 шагам Черепахи.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
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
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="turtle_fill"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="controls_repeat_list"></block>' +
  '</xml>';
  return '';
}


