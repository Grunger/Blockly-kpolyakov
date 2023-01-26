/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */
 
/**
 * @fileoverview циклы с условием по мотивам ОГЭ
 * @editor Александр Башлаков
 * @web    klyaksa.net
 */ 

//======================= MAPS =======================
// Карта должна быть размером 10 на 10 клеток
// Условные обозначения:
//    . пустая клетка
//    w стена
//    p клумба с цветами
//    x грядка, в которую нужно посадить цветы
//    0 клетка, в которой находится Робот, смотрит на север 
//    2 клетка, в которой находится Робот, смотрит на восток 
//    4 клетка, в которой находится Робот, смотрит на юг
//    6 клетка, в которой находится Робот, смотрит на запад
//    X клетка-грядка, в которой находится Робот, смотрит на север

var Maps = 
 [ [], // Level 0   
    // ['..........',  
     // '..........',
     // '..........',
     // '..........',
     // '..........',
     // '..........',
     // '..........',
     // '..........',
     // '..........',
     // '..........'], 
 
  [// Level 1
    ['..........',  
      '..........',
     '.xwwwwwww..',
     '.xwxxxxxx..',
     '.xw........',
     '.xw........',
     '.xw........',
     '.xw........',
     '.xw........',
     '.0.........' ],
    ['..........',
      '..........',
     '.xwwwwww...',
     '.xwxxxxx...',
     '.xw........',
     '.xw........',
     '.xw........',
     '.xw........',
     '.0.........',
     '...........' ],
    ['..........',
     '..........',
     '.xwwwww....',
     '.xwxxxx....',
     '.xw........',
     '.xw........',
     '.xw........',
     '.xw........',
     '.xw........',
     '.0.........' ],
    ['..........',
     '..........',
     '.xwwwwwww.',
     '.xwxxxxxx.',
     '.xw.......',
     '.xw.......',
     '.xw.......',
     '.0........',
     '..........',
     '..........'],
  ], 
  [// Level 2
    ['..........',  
     '..........',
     '..wxxxxw..',
     '..w....w..',
     '..w....w..',
     '..w....w..',
     '..w....w..',
     '..w0..xw..',
     '..........',
     '...........'],
    ['..........',  
     '.wxxxxxxw.',
     '.w......w.',
     '.w......w.',
     '.w......w.',
     '.w......w.',
     '.w......w.',
     '.w......w.',
     '.w0....xw.',
     '...........'],
    ['..........',  
     '..........',
     '...wxxw...',
     '...w..w...',
     '...w..w...',
     '...w..w...',
     '...w0xw...',
     '..........',
     '..........',
     '..........'],
  ], 
  [// Level 3
    ['..........',  
     '..........',
     '....wx....',
     '....wx....',
     '....wx....',
     '....wx....',
     '...2wx....',
     '....wx....',
     '..........',
     '..........'], 
    ['..........',  
     '....wx....',
     '....wx....',
     '...2wx....',
     '....wx....',
     '....wx....',
     '....wx....',
     '....wx....',
     '....wx....',
     '..........'],
  ],
  [// Level 4
    ['..........',  
     '..........',
     '..........',
     '..xxxxxx..',
     '..2.......',
     '..wwwwww..',
     '..........',
     '..........',
     '..........',
     '..........'], 
    ['..........',  
     '..........',
     '..........',
     '.xxxxxxxx.',
     '.2........',
     '.wwwwwwww.',
     '..........',
     '..........',
     '..........',
     '..........'],
    ['..........',  
     '..........',
     '..........',
     '...xxxx...',
     '...2......',
     '...wwww....',
     '..........',
     '..........',
     '..........',
     '..........'],
  ],
  [// Level 5
    ['..........',  
     '..........',
     '.....4....',
     '..........',
     '..........',
     '..........',
     '..xwwwww..',
     '..xw...w..',
     '..xwwwww..',
     '..........'], 
    ['..........',  
     '..........',
     '.....4....',
     '..........',
     '..........',
     '.xwwwwwww.',
     '.xw.....w.',
     '.xw.....w.',
     '.xwwwwwww..',
     '..........'],
    ['.....4....',
     '..........',
     '..........',
     '..........',
     '..........',
     '.xwwwwwww.',
     '.xw.....w.',
     '.xw.....w.',
     '.xwwwwwww..',
     '..........'],
  ],
  [// Level 6
    ['..........',  
     '.xw.......',
     '.xw.......',
     '.xw.....0.',
     '.xwwwwwwx.',
     '.......wx.',
     '.......wx..',
     '.......wx..',
     '.......wx...',
     '..........'], 
    ['..........',
     '..........',
     '..xw......',
     '..xw...0..',
     '..xwwwwx..',
     '......wx..',
     '......wx..',
     '......wx..',
     '......wx..',
     '..........'],
    ['..........',
     '..xw......',
     '..xw......',
     '..xw......',
     '..xw......',
     '..xw...0..',
     '..xwwwwx..',
     '......wx..',
     '......wx..',
     '..........'],
  ],   
  [// Level 7
    ['..........',
     '..........',
     '..wwwwww..',
     '..xxxxxx..',
     '..........',
     '..........',
     '..wwwwww..',
     '..xxxxxx..',
     '....0......',
     '..........'],
    ['..........',
     '..wwwwww..',
     '..xxxxxx..',
     '..........',
     '..........',
     '..........',
     '..........',
     '..wwwwww..',
     '..xxxxxx..',
     '.....0.....'],
    ['..........',
     '.wwwwwwww.',
     '.xxxxxxxx.',
     '..........',
     '..........',
     '..........',
     '..........',
     '.wwwwwwww.',
     '.xxxxxxxx.',
     '.....0....'],
  ],
  [// Level 8
    ['..........',  
     '....4.....',
     '.wwwwwwww.',
     '.xxxxw....',
     '....xw....',
     '....xw....',
     '....xw....',
     '....xw.....',
     '..........',
     '..........'], 
    ['.....4....',
     '.wwwwwwww.',
     '.xxxxw....',
     '....xw....',
     '....xw....',
     '....xw....',
     '....xw.....',
     '....xw....',
     '....xw....', 
     '..........'],  
    ['.....4....',
     '.wwwwwwww..',
     '.xxxxxw...',
     '.....xw...',
     '.....xw...',
     '.....xw...',
     '.....xw...',
     '.....xw...',
     '.....xw...', 
     '..........'], 
  ],     
  [// Level 9
    ['..........', 
     '..........',
     '..........',
     '..........',
     'w...xw..0w',
     'w...xw...w',
     'w...xw...w',
     'w...xw...w',
     'w...xw...w',
     'wwwwwwwwww'], 
    ['..........', 
     'w...xw..0w',
     'w...xw...w',
     'w...xw...w',
     'w...xw...w',     
     'w...xw...w',
     'w...xw...w',
     'w...xw...w',
     'w...xw...w',
     'wwwwwwwwww'],
    ['..........', 
     '..........',
     '..........',
     '..........',
     '..........',     
     'w..xw...0w',
     'w..xw....w',
     'w..xw....w',
     'w..xw....w',
     'wwwwwwwwww'], 
  ],   
  [// Level 10
    ['wwwwwwwwww',  
     'w........w',
     'w......4.w',
     'w........w',
     'w........w',
     'wwwwbwwwww',
     '..........',
     '..........',
     '..........',
     '..........'],
    ['wwwwwwwwww',
     'w........w',
     'w.4......w',
     'w........w',
     'w........w',
     'w........w',
     'wwwwwwbwww',
     '..........',
     '..........',
     '..........'],
    ['wwwwwwwwww',
     'w.......4w',
     'w........w',
     'w........w',
     'w........w',
     'w........w',
     'w........w',
     'w........w',
     'w........w',
     'wbwwwwwwww'], 
  ], 
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [],    // Level 1
    [],    // Level 2
    [],    // Level 3
    [],    // Level 4
    [],    // Level 5
    [],    // Level 6
    [],    // Level 7
    [],    // Level 8
    [],    // Level 9
    [],    // Level 10
  ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'robot_plant': 2  }, // Level 1
	{ 'robot_plant': 3 }, // Level 2
	{ 'robot_plant': 1 }, // Level 3
	{ 'robot_plant': 1 }, // Level 4
	{ 'robot_plant': 1 }, // Level 5
	{ 'robot_plant': 2 }, // Level 6
	{ 'robot_plant': 2 }, // Level 7
	{ 'robot_plant': 2 }, // Level 8
	{ 'robot_plant': 1 }, // Level 9
	{}, // Level 10
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  '<table><tr><td><img src="./media/while-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Блок &laquo;повторять, пока&raquo; позволяет выполнить группу команд ' +
  'несколько раз, пока верно (истинно) условие после слова &laquo;пока&raquo;. ' +
  'Эти команды нужно поставить внутрь блока в правильном порядке.<br> ' +
  '</td></tr></table>' +
  'С помощью этого блока можно составлять программы, которые смогут работать ' +
  'в различных однотипных обстановках. </br>' + 
  'Тебе нужно написать такое решение задачи, которое будет работать правильно на всех полях ' +
  'задания. С помощью кнопок <img src="./media/prev-icon.png"> и <img src="./media/next-icon.png">, ' +
  'расположенных над полем Робота, можно посмотреть все эти поля.' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/varbuttons.jpg"></p>' +
  'При запуске ("Старт") программа проверяется на всех полях от первого до последнего.' + 
  '',
// Level 2   
  '', 
// Level 3   
  '', 
// Level 4   
  '',   
// Level 5   
  '', 
// Level 6   
  '', 
// Level 7   
  '', 
// Level 8   
  '', 
// Level 9   
  '', 
// Level 10   
  '', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward_once"></block>' +
  '  <sep gap="1"></sep>' +
  '  <block type="robot_back_once"></block>' +
  '  <sep gap="1"></sep>' +
  '  <block type="robot_left"></block>' +
  '  <sep gap="1"></sep>' +
  '  <block type="robot_right"></block>' +
  '  <sep gap="1"></sep>' +
  '  <block type="robot_plant"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="robot_free_forward"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_back"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_left"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_right"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="controls_whileUntil"></block>' +
  '</xml>';
  return '';
}