/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, линейные алгоритмы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================

var Maps = 
[ {}, // Level 0   
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2 }, // Level 2
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 3
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 4
  { 'x': 0, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 5
  { 'x': -50, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 6
  { 'x': -50, 'y': -50, 'show': true, 'pen': true, 'width': 2 }, // Level 7
  { 'x': -120, 'y': -80, 'show': true, 'pen': true, 'width': 2 }, // Level 8
  { 'x': -75, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 9
  { 'x': 0, 'y': -100, 'show': true, 'pen': true, 'width': 2 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [2, 3, 4],  // Level 1
    [3, 4, 5],  // Level 2
    [4, 5, 7],  // Level 3
    [8, 10, 12],  // Level 4
    [9, 11, 13],  // Level 5
    [8, 10, 12],  // Level 6
    [12, 15, 20],  // Level 7
    [19, 22, 25],  // Level 8
    [19, 22, 25],  // Level 9
    [28, 32, 40],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Черепахи

var Answers = [ null, // Level 0 not used

// Level 1 
function() { forward(100); back(200); },
// Level 2 
function() { right(90); forward(75); back(150); },
// Level 3 
function() { forward(100); back(100); right(90); forward(100); },
// Level 4 
function() { forward(100); right(90); forward(100); right(90); 
             forward(100); right(90); forward(100);  },
// Level 5 
function() { left(45); forward(100); right(90); forward(100); right(90); 
             forward(100); right(90); forward(100);  },
// Level 6 
function() {
  forward( 200 ); back( 100 ); right( 90 ); forward( 100 ); left( 90 );
  back( 100 ); forward( 200 ); },
// Level 7 
function() { 
  forward(100); right(90); forward(100); right(90); forward(100); right(90); forward(100); right(90);
  right(45); penUp(); forward(20); floodFill("#ffff00"); 
  },
// Level 8 
function() { 
  forward(80); right(90); forward(80); left(90); forward(80); right(90); forward(80);
  right(90); forward(80); left(90); forward(80); right(90); forward(80); right(90);
  forward(240); penUp(); right(135); forward(20); floodFill('#ffff00');
  },
// Level 9 
function() { 
  forward(200); right(90); forward(150); right(90); forward(40); right(90); forward(110);
  left(90); forward(120); left(90); forward(110); right(90); forward(40); right(90); forward(150);
  right(135); penUp(); forward(20); floodFill('#ffff00');
  },
// Level 10 
function() { 
  left(45);
  forward(200); right(90); forward(40); right(90); forward(70); left(90); forward(70); left(90);
  forward(70); right(90); forward(40); right(90); forward(200); right(90); forward(40); right(90);
  forward(90); left(90); forward(70); left(90); forward(90); right(90); forward(40); right(135);
  penUp(); forward(20); floodFill('#ffff00');  
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй вертикальный отрезок длиной 200 шагов.', 
// Level 2   
    'Черепаха умеет поворачиваться влево и вправо на заданный угол. ' +
    'Нарисуй горизонтальный отрезок длиной 150 шагов.', 
// Level 3   
    'Нарисуй прямой угол.', 
// Level 4   
    'Теперь попробуй нарисовать квадрат со стороной 100. С помощью нового блока ' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/color-block.gif"></p>' +
    'можно изменять цвет линий, которые рисует Черепаха. Попробуй!' +
    '', 
// Level 5   
    'Попробуй нарисовать такой же квадрат, но повёрнутый на 45 градусов. Для этого ' +
    'достаточно добавить в программу одну команду.', 
// Level 6   
    'Нарисуйте букву "Н".', 
// Level 7   
    'Новый блок ' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/fill-block.gif"></p>' +
    'позволяет закрашивать область одного цвета, в которой находится Черепаха. Помни, что ' +
    'для этого Черепаха должна войти в эту область, не оставляя за собой следа.' +
    '', 
// Level 8   
    'Нарисуй пьедестал почёта. Здесь длина самых коротких отрезков равна 80 шагам Черепахи.', 
// Level 9   
    'Нарисуй букву С и закрась её жёлтым цветом. Здесь есть отрезки длиной 40, 110, 120, 150 ' +
    'и 200 шагов Черепахи.', 
// Level 10   
    'Нарисуй букву Н, которая наклонена на 45 градусов, и закрась её жёлтым цветом. Здесь есть ' +
    'отрезки длиной 40, 70, 90 и 200 шагов Черепахи.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="turtle_forward_simple"></block>' +
  '  <block type="turtle_back_simple"></block>' +
  '</xml>';
  if( [2, 3].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="turtle_forward_simple"></block>' +
  '  <block type="turtle_back_simple"></block>' +
  '  <block type="turtle_left_simple"></block>' +
  '  <block type="turtle_right_simple"></block>' +
  '</xml>';
  if( [4, 5, 6].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="turtle_forward_simple"></block>' +
  '  <block type="turtle_back_simple"></block>' +
  '  <block type="turtle_left_simple"></block>' +
  '  <block type="turtle_right_simple"></block>' +
  '  <block type="turtle_colour"></block>' +
  '</xml>';
  if( [7, 8, 9, 10].includes( Level ) ) return '' + 
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
  '</xml>';
  return '';
}


