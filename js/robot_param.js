/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, процедуры с параметрами
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
  ['..........',  // Level 1
   '....x.....',
   '....x.....',
   '....x..x..',
   '....x..x..',
   '.x..x..x..',
   '.x..x..x..',
   '.x..x..x..',
   '.0......b.',
   '..........' ],
  ['........b.',  // Level 2
   '..xxxxxx..',
   '..x....x..',
   '..x....x..',
   '..x....x..',
   '..x....x..',
   '..x....x..',
   '..x....x..',
   '...xxxx...',
   '..0.......' ],
  ['....x...b.',  // Level 3
   '....x.....',
   '....x.....',
   '....x.....',
   '....x.....',
   '....x.....',
   'xxxx4xxxx.',
   '....x.....',
   '....x.....',
   '....x.....' ],
  ['.2........',  // Level 4
   '.xxxxxxx.b',
   '.x.......x',
   '....xxxxxx',
   '.xx.......',
   '..x.......',
   '..x.......',
   '..x.......',
   '..x.......',
   '..........' ],
  ['.......bww',  // Level 5
   'wwww....xw',
   'wxxw....xw',
   'wx......xw',
   'wx......xw',
   'ww....wxxw',
   '...wwwwwww',
   '...wxxxxxw',
   '2.......xw',
   '........ww', ],
  ['..........',  // Level 6
   '..xxx...b.',
   '..xxx.....',
   '..........',
   '....xxxx..',
   '....xxxx..',
   '..xxxxxxx.',
   '..xxxxxxx.',
   '..0.......',
   '..........' ],
  ['......w..b',  // Level 7
   '.xxx..x.x.',
   '.xw...x.x.',
   '.x....x.x.',
   '.....wx.x.',
   '..xxxxx.x.',
   '........x.',
   '.w.....wx.',
   '.xxxxxxxxw',
   '..........' ],
  ['.xxxb.....',  // Level 8
   '..x.......',
   '..x..xxx..',
   '..x...x...',
   '.xxx..x...',
   '.....xxx..',
   '.x......x.',
   '.xxxxxxxx.',
   '.x......x.',
   '..........' ],
  ['..........',  // Level 9
   '.0.xxx....',
   '.x..x..x..',
   '.x.....x..',
   '.xx.b.xx..',   
   '.x.....x..',
   '.x.....x..',
   '....x.....',
   '.xxxxxxx..',
   '..........' ],
  ['.........b',  // Level 10
   '.....xx...',
   '.....xx...',
   '..........',
   '0xxx......',
   '.xxx..xxxx',
   '.xxx..xxxx',
   '......xxxx',
   '......xxxx',
   '..........' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [25, 30, 35],  // Level 1 
    [31, 40, 50],  // Level 2
    [27, 35, 45],  // Level 3
    [34, 44, 54],  // Level 4
    [39, 50, 60],  // Level 5
    [40, 40, 60],  // Level 6
    [51, 60, 70],  // Level 7
    [45, 55, 65],  // Level 8
    [46, 56, 66],  // Level 9
    [35, 45, 55],  // Level 10
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'controls_repeat_ext': 1 }, // Level 1
	{ 'controls_repeat_ext': 1 }, // Level 2
	{ 'controls_repeat_ext': 1 }, // Level 3
	{ 'controls_repeat_ext': 1 }, // Level 4
	{ 'controls_repeat_ext': 1 }, // Level 5
	{ 'controls_repeat_ext': 2 }, // Level 6
	{ 'controls_repeat_ext': 2 }, // Level 7
	{ 'controls_repeat_ext': 2 }, // Level 8
	{ 'controls_repeat_ext': 3 }, // Level 9
	{ 'controls_repeat_ext': 2 }, // Level 10
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  'При решении этих заданий нужно использовать <b>процедуры с параметрами</b>. Параметры&nbsp;&mdash; это данные, ' +
  'от которых зависит работа процедуры. Чтобы добавить параметры к процедуре, нужно щёлкнуть по ' +
  'кнопке <img src="./media/param-btn.gif"/> и добавить нужно количество блоков в середину: ' +
  'блока <i>параметры</i>: ' +
  '<div align="center"><img src="./media/param-set.gif" style="margin:10px 15px 0 0;"></div> ' +
  'Чтобы убрать окно с параметрами, щелкни ещё раз по кнопке <img src="./media/param-btn.gif"/>.' +
  'При вызове такой процедуры нужно определить значения всех параметров, добавив блоки с числами ' +
  'или арифметическими выражениями: ' +
  '<div align="center"><img src="./media/param-call.gif" style="margin:10px 15px 0 0;"></div> ' +
  'Блок вызова процедуры находится в группе <i>Процедуры</i>. ' +
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

function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="robot_forward">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">1</field>' +
  '      </shadow>' +
  '  </block>' +
  '  <block type="robot_back">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">1</field>' +
  '      </shadow>' +
  '  </block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_repeat_ext">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">2</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '</category>' +
  '<category name="Переменные" custom="VARIABLE_MY" colour="%{BKY_VARIABLES_HUE}">'+
  '</category>'+
  '<category name="Числа" colour="%{BKY_MATH_HUE}">' +
  '  <block type="math_number">' +
  '    <field name="NUM">1</field>' +
  '  </block>' +
  '</category>' +
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  }

