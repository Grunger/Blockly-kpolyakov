/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Водолей-Blockly, циклы ПОКА
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
  [ // Level 1:  A = B*k + 1
    [ 1, [3, 0], [2, 0] ], 
    [ 1, [7, 0], [2, 0] ], 
    [ 1, [13, 0], [2, 0] ], 
  ],  
  [ // Level 2: B = A*k + 2  
    [ 2, [3, 0], [5, 0] ], 
    [ 2, [3, 0], [14, 0] ], 
    [ 2, [3, 0], [26, 0] ], 
  ],  
  [ // Level 3: A = B*k - 1
    [ 1, [8, 0], [3, 0] ], 
    [ 1, [17, 0], [3, 0] ], 
    [ 1, [26, 0], [3, 0] ], 
  ],  
  [ // Level 4: B = A*k - 2
    [ 2, [3, 0], [7, 0] ], 
    [ 2, [3, 0], [19, 0] ], 
    [ 2, [3, 0], [25, 0] ], 
  ],  
  [ // Level 5: A = B*k + T (цель)
    [ 3, [15, 0], [4, 0] ], 
    [ 4, [29, 0], [5, 0] ], 
    [ 5, [41, 0], [6, 0] ], 
  ],  
  [ // Level 6: B = A*k - T (цель)
    [ 4, [5, 0], [11, 0] ], 
    [ 5, [6, 0], [25, 0] ], 
    [ 6, [7, 0], [43, 0] ], 
  ],  
  [ // Level 7: B = A*k + 1
    [ 2, [4, 0], [5, 0] ], 
    [ 2, [5, 0], [16, 0] ], 
    [ 2, [6, 0], [31, 0] ], 
  ],  
  [ // Level 8: B = A*k - 4
    [ 3, [5, 0], [16, 0] ], 
    [ 3, [5, 0], [26, 0] ], 
    [ 3, [5, 0], [36, 0] ], 
  ],  
  [ // Level 9: B = A*k + 4
    [ 1, [3, 0], [7, 0] ], 
    [ 2, [6, 0], [16, 0] ], 
    [ 3, [5, 0], [34, 0] ], 
  ],  
  [ // Level 10: B = A*k - 6
    [ 2, [15, 0], [7, 0] ], 
    [ 3, [19, 0], [5, 0] ], 
    [ 4, [42, 0], [8, 0] ], 
  ],  
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [7, 10, 15],  // Level 1
    [7, 10, 15],  // Level 2
    [6, 9, 12],   // Level 3
    [6, 9, 12],   // Level 4
    [7, 10, 15],  // Level 5
    [6, 9, 12],   // Level 6
    [15, 25, 35],  // Level 7
    [14, 25, 35],  // Level 8
    [15, 25, 35],  // Level 9
    [12, 25, 35],  // Level 10
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{ 'vodoley_empty_a': 1, 'vodoley_empty_b': 1 },  // Level 1
	{ 'vodoley_empty_a': 1, 'vodoley_empty_b': 1  }, // Level 2
  { 'vodoley_empty_a': 1, 'vodoley_empty_b': 1 },  // Level 3
  { 'vodoley_empty_a': 1, 'vodoley_empty_b': 1  }, // Level 4
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
  '<table><tr><td><img src="./media/while-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;повторять, пока&raquo; позволяет выполнить группу команд ' +
  'несколько раз, пока верно (истинно) условие после слова &laquo;пока&raquo;. ' +
  'Эти команды нужно поставить внутрь блока в правильном порядке.<br> ' +
  '</td></tr></table>' +
  'Тебе нужно написать такое решение задачи, которое будет работать правильно для нескольких ' +
  'задач. С помощью кнопок <img src="./media/prev-icon.png"> и <img src="./media/next-icon.png">, ' +
  'расположенных над полем Водолея, можно посмотреть все эти задачи. ' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/vodoley-varbtn.jpg"></p>' +
  'Вот пример ' +
  'использования блока &laquo;повторять, пока&raquo;:' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/while-vodoley.gif"></p>' +
  '',
// Level 2   
  '',
// Level 3   
  '',
// Level 4   
  '', 
// Level 5   
  'Для решения этой задачи тебе пригодятся новые датчики Водолея:' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/vodoley-sensor2.gif"></p>' +
  'Датчики &laquo;размер А&raquo; и &laquo;размер B&raquo; показыают размеры сосудов, ' +
  'а датчик &laquo;цель&raquo; показывает, какое количество воды нужно отмерить в задаче. ' +
  'Эти датчики можно использовать в условиях, например:' +
  '<p align="center" style="margin: 5px 0;"><img src="./media/vodoley-sensor-ex.gif"></p>' +
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
   sliderScale = 500;
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   //workspace.registerToolboxCategoryCallback(
   //                'VARIABLE_MY', flyoutVariableBlocks );
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 7, 8]. includes( Level ) ) return '' + 
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
  '  </category>' +
  '  <category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '    <block type="controls_whileUntil"></block>' +
  '  </category>' +
  '  <category name="Условия" colour="%{BKY_LOGIC_HUE}">' +
  '    <block type="logic_compare">' +
  '       <value name="B">' +
  '         <shadow type="math_number">' +
  '           <field name="NUM">1</field>' +
  '         </shadow>' +
  '       </value>' +
  '    </block>' +
  '  </category>' +
  '</xml>';
  if( [5, 6, 9, 10]. includes( Level ) ) return '' + 
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

