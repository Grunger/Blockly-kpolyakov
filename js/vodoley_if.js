/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Водолей-Blockly, алгоритмы с ветвлениями
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= PROBLEMS =======================
// Массив данных для задач на Водолея
// map[0] - сколько нужно набрать
// map[1] - данные о сосуде A
//   map[1][0] - объём сосуда A
//   map[1][1] - сколько уже есть в сосуде A
// map[2] - данные о сосуде B
//   map[2][0] - объём сосуда B
//   map[2][1] - сколько уже есть в сосуде B
// map[3] - данные о сосуде C (или отсутствует)
//   map[3][0] - объём сосуда C 
//   map[3][1] - сколько уже есть в сосуде C

var Maps = 
 [ [], // Level 0   
  [ // Level 1
    [ 1, [1, 0], [6, 0] ], 
    [ 1, [9, 0], [1, 0] ], 
    [ 1, [1, 0], [1, 0] ], 
  ],  
  [ // Level 2
    [ 1, [3, 0], [2, 0] ], 
    [ 1, [2, 0], [3, 0] ], 
  ],  
  [ // Level 3  Big = 2*Small + T (цель)
    [ 11, [15, 0], [2, 0] ], 
    [ 7, [13, 0], [3, 0] ], 
    [ 5, [4, 0], [13, 0] ], 
    [ 3, [6, 0], [15, 0] ], 
  ],  
  [ // Level 4  Big = 3*Small - T (цель)
    [ 3, [12, 0], [5, 0] ], 
    [ 4, [6, 0], [14, 0] ], 
  ],  
  [ // Level 5  Big = 7*Small + T (цель)
    [ 1, [15, 0], [2, 0] ], 
    [ 1, [2, 0], [15, 0] ], 
  ],  
  [ // Level 6  Big = Small*k + T (цель)
    [ 2, [3, 0], [8, 0] ], 
    [ 2, [3, 0], [14, 0] ], 
    [ 2, [11, 0], [3, 0] ], 
    [ 2, [17, 0], [3, 0] ], 
  ],  
  [ // Level 7: Big = Small*k - T (цель)
    [ 2, [3, 0], [7, 0] ], 
    [ 2, [4, 0], [14, 0] ], 
    [ 2, [13, 0], [5, 0] ], 
    [ 2, [16, 0], [6, 0] ], 
  ],  
  [ // Level 8: Big = Small*k + T (цель)
    [ 3, [5, 0], [13, 0] ], 
    [ 4, [6, 0], [22, 0] ], 
    [ 5, [37, 0], [8, 0] ], 
    [ 6, [42, 0], [9, 0] ], 
  ],  
  [ // Level 9: Big = Small*k - T (цель)
    [ 3, [4, 0], [5, 0] ], 
    [ 4, [5, 0], [21, 0] ], 
    [ 5, [19, 0], [6, 0] ], 
    [ 6, [29, 0], [7, 0] ], 
  ],  
  [ // Level 10: 
    [ 1, [5, 0], [13, 0] ], 
    [ 2, [15, 0], [7, 0] ], 
    [ 3, [11, 0], [4, 0] ], 
    [ 5, [3, 0], [14, 0] ], 
    [ 9, [18, 0], [5, 0] ], 
    [ 13, [7, 0], [26, 0] ], 
    [ 19, [28, 0], [11, 0] ], 
  ],  
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [6, 8, 11],    // Level 1
    [8, 11, 15],   // Level 2
    [14, 20, 25],  // Level 3
    [16, 23, 28],  // Level 4
    [12, 18, 25],  // Level 5
    [18, 25, 35],  // Level 6
    [16, 23, 28],  // Level 7
    [18, 25, 35],  // Level 8
    [16, 23, 28],  // Level 9
    [28, 38, 48],  // Level 10
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 1
	{ 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 2
  { 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 3
  { 'vodoley_fill_a': 3, 'vodoley_fill_b': 3 }, // Level 4
  { 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 5
  { 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 6
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 7
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 8
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 9
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 10
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
  'Тебе нужно написать такое решение, которое будет работать правильно для целой серии ' +
  'задач. С помощью кнопок <img src="./media/prev-icon.png"> и <img src="./media/next-icon.png">, ' +
  'расположенных над окном Водолея, можно посмотреть все эти задачи.' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/vodoley-varbtn.jpg"></p>' +
  '',
// Level 2   
  '',
// Level 3   
  '',
// Level 4   
  '', 
// Level 5   
  '<table><tr><td><img src="./media/ntimes-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Блок &laquo;повторить&raquo; позволяет выполнить группу команд ' +
  'несколько раз. Эти команды нужно поставить внутрь блока в правильном порядке.' +
  '', 
// Level 6   
  '<table><tr><td><img src="./media/while-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Блок &laquo;повторять, пока&raquo; позволяет выполнить группу команд ' +
  'несколько раз, пока верно (истинно) условие после слова &laquo;пока&raquo;. ' +
  'Эти команды нужно поставить внутрь блока в правильном порядке.<br> ' +
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

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function initThisApplication() {
   sliderScale = 500;
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   //workspace.registerToolboxCategoryCallback(
   //                'VARIABLE_MY', flyoutVariableBlocks );
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_fill_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_fill_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_size_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_size_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="controls_if">' +
  '    <mutation else="1"></mutation>' +
  '  </block>' +   
  '  <sep gap="5"></sep>' +
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '</xml>';
  if( [5]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <category name="Водолей" colour="%{BKY_ROBOT_HUE}">' +
  '    <block type="vodoley_fill_a"></block>' +
  '    <block type="vodoley_fill_b"></block>' +
  '    <block type="vodoley_empty_a"></block>' +
  '    <block type="vodoley_empty_b"></block>' +
  '    <block type="vodoley_a_to_b"></block>' +
  '    <block type="vodoley_b_to_a"></block>' +
  '  </category>' +
  '  <category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '    <block type="vodoley_size_a"></block>' +
  '    <block type="vodoley_size_b"></block>' +
  '  </category>' +
  '  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '    <block type="controls_repeat_list">' +
  '  </category>' +
  '  <category name="Условия" colour="%{BKY_LOGIC_HUE}">' +
  '    <block type="controls_if">' +
  '      <mutation else="1"></mutation>' +
  '    </block>' +   
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '  </category>' +
  '</xml>';
  if( [6, 7]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <category name="Водолей" colour="%{BKY_ROBOT_HUE}">' +
  '    <block type="vodoley_fill_a"></block>' +
  '    <block type="vodoley_fill_b"></block>' +
  '    <block type="vodoley_empty_a"></block>' +
  '    <block type="vodoley_empty_b"></block>' +
  '    <block type="vodoley_a_to_b"></block>' +
  '    <block type="vodoley_b_to_a"></block>' +
  '  </category>' +
  '  <category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '    <block type="vodoley_in_a"></block>' +
  '    <block type="vodoley_in_b"></block>' +
  '    <block type="vodoley_size_a"></block>' +
  '    <block type="vodoley_size_b"></block>' +
  '  </category>' +
  '  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '    <block type="controls_whileUntil"></block>' +
  '  </category>' +
  '  <category name="Условия" colour="%{BKY_LOGIC_HUE}">' +
  '    <block type="controls_if">' +
  '      <mutation else="1"></mutation>' +
  '    </block>' +   
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '  </category>' +
  '</xml>';
  if( [8, 9]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <category name="Водолей" colour="%{BKY_ROBOT_HUE}">' +
  '    <block type="vodoley_fill_a"></block>' +
  '    <block type="vodoley_fill_b"></block>' +
  '    <block type="vodoley_empty_a"></block>' +
  '    <block type="vodoley_empty_b"></block>' +
  '    <block type="vodoley_a_to_b"></block>' +
  '    <block type="vodoley_b_to_a"></block>' +
  '  </category>' +
  '  <category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '    <block type="vodoley_in_a"></block>' +
  '    <block type="vodoley_in_b"></block>' +
  '    <block type="vodoley_size_a"></block>' +
  '    <block type="vodoley_size_b"></block>' +
  '    <block type="vodoley_target"></block>' +
  '  </category>' +
  '  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '    <block type="controls_whileUntil"></block>' +
  '  </category>' +
  '  <category name="Условия" colour="%{BKY_LOGIC_HUE}">' +
  '    <block type="controls_if">' +
  '      <mutation else="1"></mutation>' +
  '    </block>' +   
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '  </category>' +
  '</xml>';
  if( [10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <category name="Водолей" colour="%{BKY_ROBOT_HUE}">' +
  '    <block type="vodoley_fill_a"></block>' +
  '    <block type="vodoley_fill_b"></block>' +
  '    <block type="vodoley_empty_a"></block>' +
  '    <block type="vodoley_empty_b"></block>' +
  '    <block type="vodoley_a_to_b"></block>' +
  '    <block type="vodoley_b_to_a"></block>' +
  '  </category>' +
  '  <category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
  '    <block type="vodoley_in_a"></block>' +
  '    <block type="vodoley_in_b"></block>' +
  '    <block type="vodoley_size_a"></block>' +
  '    <block type="vodoley_size_b"></block>' +
  '    <block type="vodoley_target"></block>' +
  '  </category>' +
  '  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '    <block type="controls_whileUntil"></block>' +
  '  </category>' +
  '  <category name="Условия" colour="%{BKY_LOGIC_HUE}">' +
  '    <block type="controls_if"></block>' +   
  '    <block type="controls_if">' +
  '      <mutation else="1"></mutation>' +
  '    </block>' +   
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '  </category>' +
  '</xml>';
  }

