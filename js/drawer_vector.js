/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, изучаем векторы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': -3, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 1
  { 'x': -3, 'y': -3, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 2
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 3
  { 'x': 0, 'y': -5, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 5
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 6
  { 'x': 0, 'y': -6, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 9
  { 'x': 0, 'y': -2, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [5, 6, 7],  // Level 1
    [5, 6, 7],  // Level 2
    [11, 12, 15],  // Level 3
    [7, 8, 9],  // Level 4
    [14, 16, 20],  // Level 5
    [14, 15, 17],  // Level 6
    [16, 17, 25],  // Level 7
    [16, 18, 20],  // Level 8
    [14, 15, 18],  // Level 9
    [18, 20, 22],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200, false); 
  vector(5,0); vector(-5,0);
  vector(5,4); vector(-5,-4);
  vector(5,-4);
  },
// Level 2 
function() { drawGrid(200, 200, false); 
  penColour('#00ff00');
  vector(0,7); vector(7,0); vector(0,-7); vector(-7,0);
  },
// Level 3 
function() { drawGrid(200, 200, false); 
  vector(4, 5); vector(-8,0); vector(8,-10); vector(-8,0); vector(8,10);
  vector(-4,-5);
  vector(5, 4); vector(0,-8); vector(-10,8); vector(0,-8); vector(10,8);
  },
// Level 4 
function() { drawGrid(200, 200, false); 
  vector(-4,5); vector(4,5); vector(4,-5); vector(-4,-5);
  penUp(); vector(0,5); floodFill('#ffff00');  
  },
// Level 5 
function() { drawGrid(200, 200, false); 
  penUp(); vector(-2,5); penDown(); vector(4,0); vector(3,-3);
  vector(0,-4); vector(-3,-3); vector(-4,0); vector(-3,3);
  vector(0,4); vector(3,3); penUp();
  vector(2,-5);	floodFill('#ffff00');  
  },
// Level 6 
function() { drawGrid(200, 200, false);
  penUp(); vector(1,2); penDown(); vector(0,-3); vector(3,0); vector(0,-3);	
  vector(-9,0); vector(0,3); vector(3,0); vector(0,3); vector(3,0);
  penUp(); vector(-1,-2); floodFill('#ffff00'); 
  },
// Level 7 
function() { drawGrid(200, 200, false); 
  vector(-6,6); vector(6,6); vector(6,-6); vector(-6,-6);
  penUp(); vector(0,6); floodFill('#ffff00'); 
  vector(-3,-3); penDown(); 
  vector(0,6); vector(6,0); vector(0,-6); vector(-6,0);
  penUp(); vector(3,3); floodFill('#00ff00'); 
  },
// Level 8 
function() { drawGrid(200, 200, false);
  vector(-5,0); vector(5,5); vector(5,-5); vector(-5,0); vector(3,0);	
  vector(0,-4); vector(-6,0); vector(0,4); 
  penUp(); vector(3,2); floodFill('#ffff00');
  vector(0,-4); floodFill('#660000');
  },
// Level 9 
function() { drawGrid(200, 230, false);
  penUp(); vector(-2,-2); penDown(); 
  vector(5,0); vector(0,-2); vector(-7,0); vector(0,10);
  vector(7,0); vector(0,-2); vector(-5,0); vector(0,-6);
  penUp(); vector(-1,0); floodFill('#ffff00');
  },
// Level 10 
function() { drawGrid(200, 230, false);
  penUp(); vector(-2,2); penDown();
  vector(4,0); vector(0,-5); vector(2,0); vector(0,12); vector(-2,0);
  vector(0,-5); vector(-4,0); vector(0,5); vector(-2,0); vector(0,-12);
  vector(2,0); vector(0,5);
  penUp(); vector(-1,0); floodFill('#ffff00');
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'На поле Чертёжника сделана разметка. Сторона каждого квадрата равна 1. ' + 
    'Нарисуй три отрезка.', 
// Level 2   
    'Теперь нарисуй квадрат пером зелёного цвета. Цвет линий можно ' +
    'изменять с помощью нового блока' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/color-block.gif"></p>' +
    'Попробуй!',
// Level 3   
    'Нарисуй четыре треугольника.', 
// Level 4   
    'Новый блок ' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/fill-block.gif"></p>' +
    'позволяет закрашивать область одного цвета, в которой находится Чертёжник. Помни, что ' +
    'для этого Чертёжник должен войти в эту область, не оставляя за собой следа. ' +
    'Нарисуй ромб и закрась его жёлтым цветом.', 
// Level 5   
    'Нарисуй восьмиугольник и закрась его.', 
// Level 6   
    'Нарисуй и закрась пьедестал почёта жёлтым цветом.', 
// Level 7   
    'Нарисуй квадрат в квадрате и закрась эти квадраты разными цветами.', 
// Level 8   
    'Нарисуй домик и раскрась разными цветами.', 
// Level 9  
    'Нарисуй букву С и закрась её жёлтым цветом.', 
// Level 10   
    'Нарисуй букву Н и закрась её жёлтым цветом.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '</xml>';
  if( [2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_vector_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="drawer_colour"></block>' +
  '  <block type="drawer_fill"></block>' +
  '</xml>';
  return '';
}


