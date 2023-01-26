/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, изучаем координаты
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 2
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 3
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 4
  { 'x': -5, 'y': 5, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 5
  { 'x': -5, 'y': 5, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 6
  { 'x': -3, 'y': 5, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 7
  { 'x': -2, 'y': 3, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 9
  { 'x': 0, 'y': -2, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [1, 2, 3],  // Level 1
    [4, 5, 6],  // Level 2
    [3, 4, 5],  // Level 3
    [3, 4, 5],  // Level 4
    [4, 5, 6],  // Level 5
    [9, 10, 11],  // Level 6
    [5, 6, 7],  // Level 7
    [11, 12, 13],  // Level 8
    [14, 15, 16],  // Level 9
    [18, 20, 22],  // Level 10
    ];

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(30, 200); 
  toPoint(10,0); 
  },
// Level 2 
function() { drawGrid(30, 300); 
  penColour('#00ff00');
  toPoint(10,0); toPoint(10,5); toPoint(0,0);
  },
// Level 3 
function() { drawGrid(350, 300); 
  toPoint(-10,0); toPoint(-10,5); toPoint(0,0);
  },
// Level 4 
function() { drawGrid(350, 100); 
  toPoint(-9,-3); toPoint(-3,-9); toPoint(0,0);
  },
// Level 5 
function() { drawGrid(200, 200); 
  toPoint(-5,-5); toPoint(5,-5); toPoint(5,5); toPoint(-5,5); 
  },
// Level 6 
function() { drawGrid(200, 200); 
  toPoint(-5,-5); toPoint(5,-5); toPoint(5,5); toPoint(-5,5);
  toPoint(0,5); toPoint(5,0);
  toPoint(0,-5); toPoint(-5,0); toPoint(0,5);
  },
// Level 7 
function() { drawGrid(200, 200);
  toPoint(-3,-5); toPoint(-3,1); toPoint(3,1);
  toPoint(3,5); toPoint(3,-5);
  },
// Level 8 
function() { drawGrid(200, 200);
  toPoint(1,3); toPoint(1,0); toPoint(4,0); toPoint(4,-3);
  toPoint(-5,-3); toPoint(-5,0); toPoint(-2,0); toPoint(-2,3);
  penUp(); toPoint(-1,2); floodFill('#ffff00');
  },
// Level 9 
function() { drawGrid(200, 230);
  penUp(); toPoint(-4,6); penDown(); 
  toPoint(3,6); toPoint(3,4);
  toPoint(-2,4); toPoint(-2,-2); toPoint(3,-2);
  toPoint(3,-4); toPoint(-4,-4); toPoint(-4,6);	
  penUp(); toPoint(-3,0); floodFill('#ffff00');
  },
// Level 10 
function() { drawGrid(200, 230);
  penUp(); toPoint(-4,7); penDown(); 
  toPoint(-2,7); toPoint(-2,2); toPoint(2,2);
  toPoint(2,7); toPoint(4,7); toPoint(4,-5);
  toPoint(2,-5); toPoint(2,0); toPoint(-2,0);
  toPoint(-2,-5); toPoint(-4,-5); toPoint(-4,7);
  penUp(); toPoint(0,1); floodFill('#ffff00');
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'На поле Чертёжника сделана разметка. Оси координат обозначены красными линиями. '+
    'Сторона каждого квадрата равна 1. Нарисуй горизонтальный отрезок длиной 10.', 
// Level 2   
    'Теперь нарисуй прямоугольный треугольник пером зелёного цвета. Цвет линий можно ' +
    'изменять с помощью нового блока' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/color-block.gif"></p>' +
    'Попробуй!',
// Level 3   
    'Нарисуй треугольник, у которого есть вершины с отрицательными координатами.', 
// Level 4   
    'Нарисуй прямоугольный треугольник, у которого есть вершины с отрицательными координатами.', 
// Level 5   
    'Попробуй нарисовать квадрат с центром в начале координат.', 
// Level 6   
    'Попробуй нарисовать квадрат внутри квадрата.', 
// Level 7   
    'Нарисуй букву Н.', 
// Level 8   
    'Новый блок ' +
    '<p align="center" style="margin: 5px 0;"><img src="./media/fill-block.gif"></p>' +
    'позволяет закрашивать область одного цвета, в которой находится Чертёжник. Помни, что ' +
    'для этого Чертёжник должен войти в эту область, не оставляя за собой следа. ' +
    'Нарисуй и закрась пьедестал почёта жёлтым цветом.', 
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
  '  <block type="drawer_point_simple"></block>' +
//  '  <block type="drawer_vector_simple"></block>' +
//  '  <block type="drawer_point"></block>' +
//  '  <block type="drawer_vector"></block>' +
  '</xml>';
  if( [2, 3, 4, 5, 6, 7].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_point_simple"></block>' +
  '  <block type="drawer_colour"></block>' +
  '</xml>';
  if( [8, 9, 10, 11].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="drawer_point_simple"></block>' +
  '  <block type="drawer_pen_up"></block>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <block type="drawer_colour"></block>' +
  '  <block type="drawer_fill"></block>' +
  '</xml>';
  return '';
}


