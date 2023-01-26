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
   '.......b..',
   '..........',
   '..........',
   '..........',
   '..........',
   '..0.......',
   '..........',
   '..........' ],
  ['..........',  // Level 2
   '..........',
   '.....0....',
   '..........',
   '..wwwwww..',
   '..........',
   '....b.....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 3
   '..........',
   '..........',
   '.....b....',
   '...xxx....',
   '...0......',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 4
   '..........',
   '..b.......',
   '..x....x..',
   '..wwwwww..',
   '..........',
   '....6.....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 5
   '.....0....',
   '..........',
   '..........',
   '...x.x....',
   '...wwwb...',
   '....x.....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 6
   '..........',
   '....b.....',
   '...w.ww...',
   '...wxxw...',
   '...wwww...',
   '....0.....',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 7
   '..........',
   '..w.....b.',
   '..wx......',
   '..wx......',
   '..wx......',
   '..wwwwww..',
   '..0.......',
   '..........',
   '..........' ],
  ['..........',  // Level 8
   '..........',
   '..x.......',
   '..wwwwwwww',
   '........0w',
   '..wwwwwwww',
   '..x.......',
   '........b.',
   '..........',
   '..........' ],
  ['..........',  // Level 9
   '..........',
   '..........',
   '..bxxxx....',
   '...wwwww..',
   '...w.0w...',
   '...w..w...',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 10
   '...www....', 
   '...wxw....', 
   '...wxw....',
   '.wwwxwww..',
   '.......0..',
   '.wwwxwww..',
   '...wxw....',
   '...wxw....',
   '....b.....' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [3, 4, 5],  // Level 1
    [6, 8, 10],  // Level 2
    [9, 11, 13],  // Level 3
    [10, 12, 14],  // Level 4
    [14, 17, 22],  // Level 5
    [15, 18, 23], // Level 6 
    [15, 18, 23], // Level 7 
    [16, 19, 24], // Level 8 
    [15, 20, 25], // Level 9 
    [16, 21, 26]  // Level 10 
    ];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  'На этом уровне нужно составить программу для Робота ' +
  'так, чтобы он пришёл на Базу для подзарядки. База ' +
  'изображается вот так:<div align="center"><img src="./media/base-cell.gif" ' +
  ' style="position:relative;top:4px;"></div>',
// Level 2   
  'На этом уровне нужно составить программу для Робота ' +
  'так, чтобы он пришёл на Базу для подзарядки. База ' +
  'изображается вот так:<div align="center"><img src="./media/base-cell.gif" '+
  ' style="position:relative;top:4px;"></div>' +
  'Робот не может проходить через стенки на поле: <div align="center"><img '+
  'src="./media/wall-cell.gif" style="position:relative;top:4px;"></div>',
// Level 3   
    'На этом уровне ты познакомишься с новой командой ' +
  '<img src="./media/plant-block.gif" style="position:relative;top:8px;">. Выполняя эту команду, Робот ' +
  'сажает цветы в клетке, где он находится. Сажать цветы можно только ' +
  'на грядках, они изображаются вот так:<div align="center"><img src="./media/target-cell.gif"></div>' +
  'Робот не может проходить по цветам. Он должен посадить цветы на всех грядках и прийти на Базу.',
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
  if( [1, 2].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward"></block>' +
  '  <block type="robot_back"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '</xml>';
  if( [3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="robot_forward"></block>' +
  '  <block type="robot_back"></block>' +
  '  <block type="robot_left"></block>' +
  '  <block type="robot_right"></block>' +
  '  <block type="robot_plant"></block>' +
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

