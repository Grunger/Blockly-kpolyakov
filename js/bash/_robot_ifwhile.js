/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, шаблон для разработки новых заданий
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


  [// Level 10
    ['wwwwwwwwww',
     'w...wb.w.w',
     'w.w...ww.w',
     'w.wwwww..w',
     'w.w.0....w',
     'w.ww.www.w',
     'w......w.w',
     'w.wwwwww.w',
     'w..w.....w',
     'wwwwwwwwww'],
    ['wwwwwwwwww',
     'w...wb...w',
     'w.w.wwww.w',
     'w.w.w..w.w',
     'w.w.ww...w',
     'w.w..w.www',
     'w.ww.w...w',
     'w.2wwwww.w',
     'w........w',
     'wwwwwwwwww'],
    ['wwwwwwwwww',
     'w...wb...w',
     'w.w.wwww.w',
     'w.w.w..w.w',
     'w.w.ww...w',
     'w.w..w.www',
     'w.ww.w...w',
     'w..wwww..w',
     'w......4.w',
     'wwwwwwwwww'],
  ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ }, // Level 1
	{ }, // Level 2
	{ }, // Level 3
	{ }, // Level 4
	{ }, // Level 5
	{ }, // Level 6
	{ }, // Level 7
	{ }, // Level 8
	{ }, // Level 9
	{ }, // Level 10
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1
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
  '<p>Одним из самых простых правил для прохождения лабиринта является правило &laquo;одной руки&raquo;: двигаясь по лабиринту, надо все время касаться правой или левой рукой его стены. Этот алгоритм, вероятно, был известен еще древним грекам. Возможно, придется пройти долгий путь, заходя во все тупики, но в итоге цель будет достигнута.</p>'
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function BlocklyBlocks( Level ) {
  
    if( [1,2,3,4,5,6,7,8,9,10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
//================== Команды Робота ==================
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
    // вперед
  '  <block type="robot_forward_once"></block>' +
    // назад
  '  <block type="robot_back_once"></block>' +
    // поверни налево
  '  <block type="robot_left"></block>' +
    // поверни направо
  '  <block type="robot_right"></block>' +
    // посади
  '  <block type="robot_plant"></block>' +
  '</category>' +
//================== Датчики Робота ==================
  '<category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
    // впереди свободно
  '  <block type="robot_free_forward"></block>' +
    // сзади свободно
  '  <block type="robot_free_back"></block>' +
    // слева свободно
  '  <block type="robot_free_left"></block>' +
    // справа свободно
  '  <block type="robot_free_right"></block>' +
  '  <block type="robot_base_here"></block>' +  
  '</category>' +
//================== Циклы (Blockly) ==================
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
    // повторять, пока (пока не)
  '  <block type="controls_repeat_list"></block>' + 
  '  <block type="controls_whileUntil"></block>' +
  '</category>' +
//================== Логика (Blockly) ==================
  '<category name="Логика" colour="%{BKY_LOGIC_HUE}">' +
    // если, то выполнить
  '  <block type="controls_if"></block>' +
    // если, иначе
  '  <block type="controls_if">' +
  '    <mutation else="1"></mutation>' +
  '  </block>' +       
    // И, ИЛИ
  '  <block type="logic_operation"></block>' +
    // НЕ
  '  <block type="logic_negate"></block>' +
  '</category>' +
  '</xml>';
  }

