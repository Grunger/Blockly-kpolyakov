/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, линейные алгоритмы
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
   '..........',
   '...w......',
   '...w.0....',
   '...www....',
   '.....b....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 2
   '..........',
   '...b.0w...',
   '...xxxw...',
   '...wwww...',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 3
   '..........',
   '..........',
   '..........',
   '.0xxxxxxb.',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 4
   '..........',
   '...xxxx...',
   '..xwwwwb..',
   '..xw..w...',
   '..xw..w...',
   '..xwwww0...',
   '...xxxx...',
   '..........',
   '..........' ],
  ['..........',  // Level 5
   '..........',
   '.........w',
   '.........w',
   '.........w',
   '.2......bw',
   '.........w',
   '.........w',
   '.........w',
   '..........' ],
  ['..........',  // Level 6
   '..........',
   '..........',
   '..........',
   '.2........',
   '.wwwwwwwb.',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['w........w',  // Level 7
   'w........w',
   'w........w',
   'wxxxxxxx6w',
   'wxxxxxxx.w',
   'wxxxxxxx.w',
   'wxxxxxxx.w',
   'w.......bw',
   'w........w',
   'w........w' ],
 ];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
 //  1  2  3  4  5  6   7
     7, 9, 5, 9, 3, 5, 11 ];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  'На этом уровне нужно составить программу для Робота ' +
  'так, чтобы он пришёл на Базу для подзарядки. База ' +
  'изображается вот так:<div align="center"><img src="./media/base-cell.gif" ' +
  ' style="position:relative;top:4px;"></div>' +
  'Робот не может проходить через стенки на поле: <div align="center"><img '+
  'src="./media/wall-cell.gif" style="position:relative;top:4px;"></div>',
// Level 2   
  'На этом уровне ты познакомишься с новой командой ' +
  '<img src="./media/plant-block.gif" style="position:relative;top:8px;">. Выполняя эту команду, Робот ' +
  'сажает цветы в клетке, где он находится. Сажать цветы можно только ' +
  'на грядках, они изображаются вот так:<div align="center"><img src="./media/target-cell.gif"></div>' +
  'Робот не может проходить через цветы. Он должен посадить цветы на всех грядках и прийти на Базу.',
// Level 3   
  '<table><tr><td><img src="./media/ntimes-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;повторить&raquo; позволяет выполнить группу команд ' +
  'несколько раз. Эти команды нужно поставить внутрь блока в правильном порядке.' +
  '</td></tr></table>' +
  '', 
// Level 4   
   '', 
// Level 5   
  '<table><tr><td><img src="./media/while-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;повторять, пока&raquo; позволяет выполнить группу команд ' +
  'несколько раз, пока верно (истинно) условие после слова &laquo;пока&raquo;. ' +
  'Эти команды нужно поставить внутрь блока в правильном порядке.<br> ' +
  '</td></tr></table>' +
  '',
// Level 6   
  '<table><tr><td><img src="./media/whilenot-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'В блоке &laquo;повторять, пока&raquo; есть выпадающее меню (см. стрелку). В нём можно выбрать ' +
  'выриант <b>повторять, пока не</b>. В этом случае все будет наоборот: как только ' +
  'выполнится условие после слова &laquo;пока&raquo;, цикл остановится.<br> ' +
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
];

//======================= READY PROGRAMS  =======================
// Готовые программы, которые загружаются при запуске приложения

var ReadyProgram = [ '', // Level 0 not used
// Level 1   
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="robot_program" ' +
    'deletable="false" movable="false"><next><block type="robot_right"><next><block ' + 
    'type="robot_forward_once"><next><block type="robot_right"><next><block ' +
    'type="robot_forward_once"><next><block type="robot_forward_once"><next><block ' +
    'type="robot_right"><next><block type="robot_forward_once"></block></next></block>' +
    '</next></block></next></block></next></block></next></block></next></block></next></block></xml>', 
// Level 2   
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="robot_program" ' + 
    'deletable="false" movable="false"><next><block type="robot_back_once"><next><block ' +
    'type="robot_plant"><next><block type="robot_left"><next><block type="robot_forward_once">' +
    '<next><block type="robot_plant"><next><block type="robot_forward_once"><next><block ' +
    'type="robot_plant"><next><block type="robot_right"><next><block type="robot_forward_once">' +
    '</block></next></block></next></block></next></block></next></block></next></block>' +
    '</next></block></next></block></next></block></next></block></xml>', 
// Level 3   
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="robot_program" ' + 
    'deletable="false" movable="false" x="10" y="10"><next><block type="robot_right">' + 
    '<next><block type="controls_repeat_list"><field name="TIMES">6</field><statement ' + 
    'name="DO"><block type="robot_forward_once"><next><block type="robot_plant"></block>' + 
    '</next></block></statement><next><block type="robot_forward_once"></block></next></block>' + 
    '</next></block></next></block></xml>', 
// Level 4   
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="robot_program" deletable="false" movable="false"><next><block type="robot_back_once"><next><block type="robot_left"><next><block type="controls_repeat_list"><field name="TIMES">3</field><statement name="DO"><block type="controls_repeat_list"><field name="TIMES">4</field><statement name="DO"><block type="robot_forward_once"><next><block type="robot_plant"></block></next></block></statement><next><block type="robot_forward_once"><next><block type="robot_right"></block></next></block></next></block></statement><next><block type="robot_forward_once"></block></next></block></next></block></next></block></next></block></xml>', 
// Level 5   
    '<xml xmlns="https://developers.google.com/blockly/xml">' +
    '<block type="robot_program" deletable="false" movable="false"><next>' +
    '<block type="controls_whileUntil">' +
    '<field name="MODE">WHILE</field><value name="BOOL"><block type="robot_free_forward"></block>' +
    '</value><statement name="DO"><block type="robot_forward_once"></block></statement></block>' +
    '</next></block></xml>', 
// Level 6   
    '<xml xmlns="https://developers.google.com/blockly/xml">' +
    '<block type="robot_program" deletable="false" movable="false"><next>' +
    '<block type="controls_whileUntil">' +
    '<field name="MODE">UNTIL</field><value name="BOOL"><block type="robot_free_right"></block>' +
    '</value><statement name="DO"><block type="robot_forward_once"></block></statement><next>' +
    '<block type="robot_right"><next><block type="robot_forward_once"></block></next></block>' +
    '</next></block>' +
    '</next></block></xml>', 
// Level 7   
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="robot_program" ' + 
    'deletable="false" movable="false" x="10" y="10"><next><block type="controls_repeat_list">' + 
    '<field name="TIMES">4</field><statement name="DO"><block type="controls_whileUntil">' + 
    '<field name="MODE">WHILE</field><value name="BOOL"><block type="robot_free_forward">' + 
    '</block></value><statement name="DO"><block type="robot_forward_once"></block></statement>' + 
    '<next><block type="controls_whileUntil"><field name="MODE">WHILE</field><value name="BOOL">' + 
    '<block type="robot_free_back"></block></value><statement name="DO"><block type="robot_plant">' + 
    '<next><block type="robot_back_once"></block></next></block></statement><next><block ' + 
    'type="robot_left"><next><block type="robot_forward_once"><next><block type="robot_right">' + 
    '</block></next></block></next></block></next></block></next></block></statement></block>' + 
    '</next></block></xml>', 
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
  if( [1].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward_once"></block>' +
  '  <block type="robot_back_once"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '</xml>';
  if( [2].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward_once"></block>' +
  '  <block type="robot_back_once"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '</xml>';
  if( [3, 4].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward_once"></block>' +
  '  <block type="robot_back_once"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '</xml>';
  if( [5, 6].includes( Level ) ) return '' + 
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
  if( [7].includes( Level ) ) return '' + 
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
  '  <sep gap="10"></sep>' +
  '  <block type="robot_free_forward"></block>' +
  '  <sep gap="2"></sep>' +
  '  <block type="robot_free_back"></block>' +
  '  <sep gap="2"></sep>' +
  '  <block type="robot_free_left"></block>' +
  '  <sep gap="2"></sep>' +
  '  <block type="robot_free_right"></block>' +
  '  <sep gap="10"></sep>' +
  '  <block type="controls_repeat_list"></block>' +
  '  <sep gap="2"></sep>' +
  '  <block type="controls_whileUntil"></block>' +
  '</xml>';
  return '';
}

//<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
//  <category name="Робот" colour="%{BKY_ROBOT_HUE}">
//    <block type="robot_forward"></block>
//    <block type="robot_back"></block>
//    <block type="robot_left"></block>
//    <block type="robot_right"></block>
//    <block type="robot_plant"></block>
//  </category>
//  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">
//    <block type="controls_repeat_ext">
//      <value name="TIMES">
//        <shadow type="math_number">
//          <field name="NUM">10</field>
//        </shadow>
//      </value>
//    </block>
//    <block type="controls_whileUntil"></block>
//  </category>
//</xml>

