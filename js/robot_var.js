/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, переменные
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
   '.2xx......',
   '..xxx.....',
   '..xxxx....',
   '..xxxxx...',
   '..xxxxxx..',
   '..xxxxxxx.',
   '........b.',
   '..........' ],
  ['..........',  // Level 2
   '.2.....b..',  
   '.......x..',
   '......xx..',
   '.....xxx..',
   '....xxxx..',
   '...xxxxx..',
   '..xxxxxx..',
   '..........',
   '..........' ],
  ['..........',  // Level 3
   '.x.x.x.x..',
   '.x.x.x.x..',
   '.x.x.x.x..',
   '.x.x.x.x..',
   '.x.x.x....',
   '.x.x......',
   '.x.....2..',
   '.b........',
   '..........' ],
  ['..........',  // Level 4
   '.0.....xx.',
   '.....xxx..',
   '...xxx.x..',
   '.xxx.x.x..',
   '.x.x.x.x..',
   '.x.x.x.x..',
   '.x.x.x.x..',
   '.......b..',
   '..........' ],
  ['.wwwwwwww.',  // Level 5
   '0.x.x.x.x.',
   '..x.x.x.x.',
   '....x.x.x.',
   '....x.x.x.',
   '......x.x.',
   '......x.x.',
   '........x.',
   '........x.',
   '.........b', ],
  ['......x..',  // Level 6
   '.....xx...',
   '....xxx...',
   '...xxxx...',
   '..xxxxx...',
   '...xxxx...',
   '....xxx...',
   '.....xx...',
   '..0...x...',
   '........b.' ],
  ['2.........',  // Level 7
   '.......w..',
   '......wx..',
   '.....w....',
   '....wxxx..',
   '...w......',
   '..wxxxxx..',
   '.w........',
   'wxxxxxxx..',
   '........b.' ],
  ['.2........',  // Level 8
   '.......xw.',
   '......xxw.',
   '.....xxxw.',
   '....xxxxw.',
   '...xxxxxw.',
   '..xxxxxxw.',
   '.xxxxxxxw.',
   '.wwwwwwww.',
   'b.........' ],
  ['.......b..',  // Level 9
   'wwwwwww.w.',
   'wxxxxxxxw.',
   '.wxxxxxxw.',
   '..wxxxxxw.',
   '...wxxxxw.',
   '....wxxxw.',
   '.....wxxw.',
   '......wxw.',
   '.2........' ],
  ['.....b....',  // Level 10
   '...xxx....',
   '....x.....',
   '..xxxxx...',
   '....x.....',
   '0xxxxxxx..',
   '....x.....',
   'xxxxxxxxx.',
   '....x.....',   
   '..........' ],
  ['.xx.......',  // Level 11
   '.xx.......',
   '...xxx....',
   '...xxx....',
   '0..xxx....',
   '......xxxx',
   '......xxxx',
   '......xxxx',
   '......xxxx',
   'b.........' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [19, 24, 29], // Level 1
    [23, 29, 35], // Level 2
    [25, 32, 40], // Level 3
    [25, 32, 40], // Level 4
    [22, 28, 35], // Level 5
    [24, 31, 38], // Level 6
    [22, 28, 35], // Level 7
    [22, 28, 35],  // Level 8
    [27, 35, 43], // Level 9
    [39, 50, 60],  // Level 10
    [29, 40, 50], // Level 11
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'controls_repeat_ext': 2 }, // Level 1
	{ 'controls_repeat_ext': 2 }, // Level 2
	{ 'controls_repeat_ext': 2 }, // Level 3
	{ 'controls_repeat_ext': 2 }, // Level 4
	{ 'controls_repeat_ext': 2 }, // Level 5
	{ 'controls_repeat_ext': 2 }, // Level 6
	{ 'controls_repeat_ext': 2 }, // Level 7
	{ 'controls_repeat_ext': 2 }, // Level 8
	{ 'controls_repeat_ext': 2 }, // Level 9
	{ 'controls_repeat_ext': 2 }, // Level 10
	{ 'controls_repeat_ext': 3 }, // Level 11
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  'Для решения этого задания нужно использовать <b>переменные</b>. Так называются величины, которые ' +
  'могут изменяться во время выполнения программы. Чтобы добавить переменную, нужно щёлкнуть по ' +
  'кнопке <i>Создать переменную</i> в группе <i>Переменные</i>: ' +
  '<div align="center"><img src="./media/create-var.gif" style="margin:10px 15px 0 0;"></div> ' +
  'Вам будет предложено ввести имя, по которому вы будете обращаться к переменной ' +
  'в программе. Чтобы изменить значение переменной, нужно использовать блок ' +
  '<div align="center"><img src="./media/set-var.gif" style="margin:10px 15px 0 0;"></div> ' +
  'Кроме того, существует специальный блок для того, чтобы увеличить ' +
  'значение любой переменной: ' +
  '<div align="center"><img src="./media/inc-var.gif" style="margin:10px 15px 0 0;"></div> ' +
  'Эти блоки находятся в группе <i>Переменные</i>.' +
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
  'Для решения этого задания нужно использовать <b>арифметические выражения</b>. ' +
  'Попробуй применить новый блок из группы <i>Математика</i>: ' +
  '<div align="center"><img src="./media/math-block.gif" style="margin:10px 15px 0 0;"></div> ' +
  'В каждое из двух свободных окошек можно добавить число, имя переменной или другой такой же блок. ' +
  'Например, вот так вычисляется значение <tt>2+3&middot;W</tt>: ' +
  '<div align="center"><img src="./media/math-expr.gif" style="margin:10px 15px 0 0;"></div> ' +
  '', 
// Level 11   
  '', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );

}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9]. includes( Level ) ) return '' + 
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
  '</xml>';
  if( [10, 11]. includes( Level ) ) return '' + 
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
  '<category name="Математика" colour="%{BKY_MATH_HUE}">' +
  '  <block type="math_number">' +
  '    <field name="NUM">1</field>' +
  '  </block>' +
  '  <block type="math_arithmetic"></block>' +  
  '</category>' +
  '</xml>';
  }

