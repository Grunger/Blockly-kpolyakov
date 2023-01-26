/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, циклические алгоритмы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': 0, 'y': -75, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': 0, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': 0, 'y': -20, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': -50, 'y': -80, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': -50, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -62, 'y': -88, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': -34, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [3, 4, 5],  // Level 1
    [8, 10, 15],  // Level 2
    [8, 10, 15],  // Level 3
    [8, 10, 15],  // Level 4
    [4, 6, 10],  // Level 5
    [7, 9, 15],  // Level 6
    [18, 21, 15],  // Level 7
    [12, 15, 20],  // Level 8
    [15, 18, 25],  // Level 9
    [12, 15, 23],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { 
  for (var count = 0; count < 4; count++) { forward(100); right(90); } },
// Level 2 
function() { 
  left(45);
  for (var count = 0; count < 4; count++) { forward(100); right(90); } 
  right(45); penUp(); forward(20); floodFill("#ffff00");  
  },
// Level 3 
function() { 
  left(30);
  for (var count = 0; count < 3; count++) { forward(100); right(120); } 
  right(30); penUp(); forward(20); floodFill("#ffff00");
  },
// Level 4 
function() { 
  left(18);
  for (var count = 0; count < 5; count++) { forward(100); right(72); } 
  right(30); penUp(); forward(20); floodFill("#ffff00");
  },
// Level 5 
function() {
  for (var count = 0; count < 12; count++) { forward(100); back(100); right(30); } 
  },
// Level 6 
function() { 
  for (var count = 0; count < 4; count++) { forward(100); right(90); }
  forward(100); 
  for (count = 0; count < 4; count++) { forward(60); right(90); } 
  },
// Level 7 
function() { 
  for (var count = 0; count < 4; count++) { forward(100); right(90); }
  right(45); penUp(); forward(20); floodFill("#ffff00"); 
  back(20); left(45); penDown();
  forward(100); 
  for (count = 0; count < 4; count++) { forward(60); right(90); } 
  right(45); penUp(); forward(20); floodFill("#ffff00"); 
  back(20); left(45); penDown();
  },
// Level 8 
function() { 
  right(18);
  for (var count = 0; count < 5; count++) { forward(200); right(144); } 
  right(18); penUp(); forward(60); right(50);
  for (var count2 = 0; count2 < 5; count2++) {
    floodFill('#ffff00'); forward(55); left(72);
    } 
  },
// Level 9 
function() { 
  left(18);
  for (var count = 0; count < 5; count++) { forward(100); right(72); } 
  right(54); penUp(); forward(20); left(54); penDown(); 
  for (count = 0; count < 5; count++) { forward(75); right(72); } 
  right(30); penUp(); back(10); floodFill("#ffff00");
  },
// Level 10 
function() { 
  right(10);
  for (var count = 0; count < 9; count++) { forward(200); right(160); } 
  right(10); penUp(); forward(60); right(70);  
  for (var count2 = 0; count2 < 9; count2++) {
    floodFill('#ffff00'); forward(26); left(40);
    } 
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй квадрат со стороной 100 шагов, используя цикл.', 
// Level 2   
    'Теперь разверни квадрат и закрась его жёлтым цветом.', 
// Level 3   
    'Нарисуйте жёлтый равносторонний треугольник. Попробуйте вычислить угол поворота при каждом повторении ' +
    'цикла, так чтобы за 3 раза Черепаха сделала полный оборот и вернулась в исходное положение.', 
// Level 4   
    'Попробуйте справиться с пятиугольником! Главное&nbsp;&mdash; правильно рассчитать угол ' +
    'поворота.', 
// Level 5   
    'Постройте ёжика.', 
// Level 6   
    'Нарисуйте букву В, используя два цикла.', 
// Level 7   
    'Теперь букву В нужно закрасить жёлтым цветом.', 
// Level 8   
    'Нарисуй пятиконечную звезду и закрась жёлтым цветом её лучи.', 
// Level 9   
    'Нарисуй два вложенных друг в друга пятиугольника и закрась &laquo;кольцо&raquo;, которое получилось. ' +
    'У большого пятиугольника сторона равна 100 шагам Черепахи, а у маленького &ndash; 75 шагам.', 
// Level 10   
    'Нарисуй девятиконечную звезду и закрась жёлтым цветом её лучи. ', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
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
  if( [5].includes( Level ) ) return '' + 
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
  '  <block type="controls_repeat_num"></block>' +
  '</xml>';
  return '';
}


