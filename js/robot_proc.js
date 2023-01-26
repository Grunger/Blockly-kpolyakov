/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, процедуры
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
   '..........',
   '....b.....',
   '.....xxx..',
   '..........',
   '..........',
   '..xxx.....',
   '..0.......',
   '..........',
   '..........' ],
  ['.........b',  // Level 2
   '..........',
   '...x......',
   '...xx.....',
   '..........',
   '.2..x.....',
   '....xx....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 3
   '..........',
   '..........',
   '..2....b..',
   '.wxwwxww..',
   '.wxxwxxw..',
   '.wwwwwww..',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 4
   '.wxww.....',
   '.wxxw.....',
   '.wwww.....',
   '....wxww..',
   '....wxxw..',
   '....wwww..',
   'b.......0.',
   '..........',
   '..........' ],
  ['.wwwwwwww.',  // Level 5
   '.wxwb.xxw.',
   '.wxx..wxw.',
   '.www..www.',
   '..........',  
   '...www....',
   '...wxw....',
   '...wxx....',
   '...www0...',
   '..........' ],
  ['..........',  // Level 6
   '.wwwww....',
   '.wxxxw....',
   '.wwxww....',
   '.........b',
   '.wx....x..',
   '.wxx..xx..',
   '.wxw...x..',
   '.www...0..',
   '..........' ],
  ['........6.',  // Level 7
   '...xw.....',  
   '...xw.....',
   '.xxxwxw...',
   '.wwwwxw...',
   '...xxxwxw.',
   '...wwwwxw.',
   '.....xxxw.',
   '.....wwww.',
   '....b.....', ],
  ['..........',  // Level 8
   '...x..x....',
   '..xx..xx..',
   '.xxx..xxx.',
   '.b........',
   '..........',
   '.xxx..xxx.',
   '..xx..xx..',
   '...x..x...',
   '....0.....' ],
  ['..........',  // Level 9
   '.2......b.',
   '...wxw....',
   '...xxx....',
   '...wxw....',
   '.wxw.wxw..',
   '.xxx.xxx..',
   '.wxw.wxw..',
   '..........',
   '..........' ],
  ['..........',  // Level 10
   '...xxxx...',
   '...xwwx...',
   '..bxxxx...',
   '.xxx..2...',
   '.xwx..xxx.',
   '.xwx..xwx.',
   '.xxx..xwx.',
   '......xxx.',
   '..........' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [17, 22, 27],  // Level 1
    [18, 23, 28], // Level 2
    [17, 22, 27], // Level 3
    [24, 31, 38],  // Level 4
    [29, 39, 49], // Level 5
    [28, 38, 48],  // Level 6
    [32, 42, 52],  // Level 7
    [37, 47, 57],  // Level 8
    [31, 41, 51],  // Level 9
    [31, 41, 51],  // Level 10
     ];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  '<table><tr><td><img src="./media/proc-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;процедура&raquo; позволяет вызывать группу команд по имени. ' +
  'Имя процедуры впишите вместо текста &laquo;введите имя&raquo;, ' +
  'а в центральную часть блока добавьте нужные команды.<br> ' +
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
  '', 
// Level 7   
  '', 
// Level 8   
  '', 
// Level 9   
  '', 
// Level 10   
  'В этом самом сложном задании тебе предстоит серьёзно побороться с нехваткой блоков для построения ' +
  'программы (количество блоков ограничено). ' +
  'Не забудь, что в программе может быть несколько процедур, и одна процедура может вызывать другую.', 
];

//======================= READY PROGRAMS  =======================
// Готовые программы, которые загружаются при запуске приложения

var ReadyProgram = [ '', // Level 0 not used
// Level 1 
    '<xml xmlns="https://developers.google.com/blockly/xml">' +
    '<block type="robot_program" deletable="false" movable="false" x="10" y="10"></block>' +
    '<block type="procedures_defnoreturn" x="156" y="10"><field name="NAME">введите имя</field>' +
    '<comment pinned="false" h="80" w="160">Определение процедуры</comment></block></xml>' +  
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

}

function BlocklyBlocks( Level ) {

  //Blockly.Blocks['procedures_defreturn'] = null;
  //Blockly.Blocks['procedures_ifreturn'] = null;

  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="robot_forward"></block>' +
  '  <block type="robot_back"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '</category>' +
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  return '';
}

