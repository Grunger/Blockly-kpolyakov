/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, условные операторы
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
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
  ['wwwwwwwwww',  // Level 1
   '.....b....',
   '.....xw...',
   '..........',
   '.....xw...',
   '.....xw...',
   '..........',
   '.....xw...',
   '..........',
   '.....0....' ],
  ['wwwwwwwwww',  // Level 2
   '....bx....',
   '....w.....',
   '.....x....',
   '....w.....',
   '....w.....',
   '.....x....',
   '.....x....',
   '....w.....',
   '....w0....' ],
  ['..........',  // Level 3
   '.........w',
   '.........w',
   '.........w',
   '..x.x..x.w',
   '0........w',
   '..w.w..wbw',
   '.........w',
   '.........w',
   '..........' ],
  ['...w2.....',  // Level 4
   '...w......',
   '.....xx...',
   '...w......',
   '...w......',
   '.....xx...',
   '.....xx...',
   '...w......',
   '...b......',
   'wwwwwwwwww' ],
  ['wwwwwwwwww',  // Level 5
   '0........w',
   'wwwwwwww.w',
   'w......w.w',
   'w.wwww.w.w',
   'w.wbww.w.w',
   'w.w....w.w',
   'w.wwwwww.w',
   'w........w',
   'wwwwwwwwww' ],
  ['w.........',  // Level 6
   'w.........',
   'w.........',
   'w.........',
   'wb.x..x.xx',
   'w.x.xx.x.0',
   'w.w.ww.w..',
   'w.........',
   'w.........',
   'w.........', ],
  ['wwwwwwwwbw',  // Level 7
   '6...w..w.w',
   'www.w..w.w',
   'w...w..w.w',
   'w.www..w.w',
   '.......w.w',
   'wwww.w.w.w',
   'wwww.www.w',
   'w........w',
   'w.wwwwww.w',   ],
  ['wwxxwxwwxw',  // Level 8
   'w........w',
   'x.......bw',
   'w.........',
   'x.........',
   'x.........',
   'w.........',
   'x.........',
   'w.........',
   'w0........' ],
  ['wwwwwwwwww',  // Level 9
   'wbxxxxxxxw',
   'w.w......w',
   'w.xxxxxwww',
   'w.w......w',
   'w.w......w',
   'w.xxxxxxww',
   'w.xxxxxxxw',
   'w.w......w',
   'w0.......w' ],
  ['w.........',  // Level 10
   'w.........',
   'w.........',
   'wbwx.xww..',
   'wx..x...x0',
   'w.xw.wxx..',
   'w.........',
   'w.........',
   'w.........',
   'w.........' ],
  ['wwwwwwwwww',  // Level 11
   'w.wwbwww.w',
   'w.ww.www.w',
   'w.ww.....w',
   'w.w.ww.www',
   'w.w.ww.www',
   '.........w',
   'www.wwww.w',
   '0......w.w',
   'wwwwwwwwww' ],
  ['wwwwwwwwww',  // Level 12
   'w..xwx.xww',
   'www.w.wx.w',
   'wwwx.xw.ww',
   'ww.xwx.xww',
   'www.w.wx.w',
   'wwwx.xwx.w',
   'www.wx.xww',
   'wb.....0.w',
   'wwwwwwwwww' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [6, 8, 10],    // Level 1
    [9, 12, 15],   // Level 2
    [13, 17, 21],  // Level 3
    [17, 22, 27],  // Level 4
    [7, 10, 13],   // Level 5
    [14, 17, 21],  // Level 6
    [9, 12, 15],   // Level 7
    [23, 28, 35],  // Level 8
    [14, 18, 23],  // Level 9
    [21, 26, 35],  // Level 10
    [16, 21, 28],  // Level 11
    [22, 27, 35],  // Level 12
    ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'robot_plant': 1 }, // Level 1
	{ 'robot_plant': 2 }, // Level 2
	{ 'robot_plant': 1 }, // Level 3
	{ 'robot_plant': 2 }, // Level 4
	{  }, // Level 5
	{ 'robot_plant': 2 }, // Level 6
	{  }, // Level 7
	{ 'robot_plant': 2 }, // Level 8
	{ 'robot_plant': 1 }, // Level 9
	{ 'robot_plant': 3 }, // Level 10
	{  }, // Level 11
	{ 'robot_plant': 2 }, // Level 12
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  '<table><tr><td><img src="./media/if-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;если&raquo; позволяет выполнить группу команд только в том случае, ' +
  'когда верно (истинно) условие после слова &laquo;если&raquo;. ' +
  'Эти команды нужно поставить внутрь блока в правильном порядке.<br> ' +
  '</td></tr></table>' +
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
  '<table><tr><td><img src="./media/ifelse-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;если-иначе&raquo; позволяет выполнить одну группу команд в том случае, ' +
  'когда верно (истинно) условие после слова &laquo;если&raquo;, и другую&nbsp;&mdash; если ' +
  'это условие неверно (ложно).<br> ' +
  '</td></tr></table>' +
  '', 
// Level 7   
  '', 
// Level 8   
  '', 
// Level 9   
  '', 
// Level 10   
  '', 
// Level 11   
  '', 
// Level 12   
  '', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="robot_forward_once"></block>' +
  '  <block type="robot_back_once"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '</category>' +
  '<category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '  <block type="robot_free_forward"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_back"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_left"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_right"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="robot_wall_forward"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_back"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_left"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_right"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="robot_base_here"></block>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_whileUntil"></block>' +
  '</category>' +
  '<category name="Логика" colour="%{BKY_LOGIC_HUE}">' +
  '  <block type="controls_if"></block>' +
  //'  <block type="logic_negate"></block>' +
  '</category>' +
  '</xml>';
  if( [5, 6, 7, 8, 9, 10, 11, 12]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="robot_forward_once"></block>' +
  '  <block type="robot_back_once"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '</category>' +
  '<category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '  <block type="robot_free_forward"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_back"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_left"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_free_right"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="robot_wall_forward"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_back"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_left"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="robot_wall_right"></block>' +
  '  <sep gap="20"></sep>' +
  '  <block type="robot_base_here"></block>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_whileUntil"></block>' +
  '</category>' +
  '<category name="Логика" colour="%{BKY_LOGIC_HUE}">' +
  '  <block type="controls_if"></block>' +
  '  <block type="controls_if">' +
  '    <mutation else="1"></mutation>' +
  '  </block>' +   
//'  <block type="logic_negate"></block>' +
  '</category>' +
  '</xml>';
  return '';
}

