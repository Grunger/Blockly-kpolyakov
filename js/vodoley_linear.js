/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Водолей-Blockly, шаблон для разработки новых заданий
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
  [ 2, [2, 0], [3, 0] ],  // Level 1
  [ 1, [2, 0], [3, 0] ],  // Level 2
  [ 1, [3, 0], [5, 0] ],  // Level 3
  [ 1, [6, 0], [10, 0], [15, 0] ],  // Level 4
  [ 1, [6, 3], [10, 0] ],  // Level 5
  [ 1, [8, 8], [5, 0], [3, 0] ],  // Level 6
  [ 6, [8, 0], [5, 0] ],  // Level 7
  [ 1, [8, 0], [5, 0] ],  // Level 8
  [ 4, [8, 0], [5, 0] ],  // Level 9
  [ 7, [6, 0], [10, 0], [15, 0] ],  // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [1, 2, 3],   // Level 1
    [2, 3, 4],   // Level 2
    [4, 6, 10],  // Level 3
    [4, 6, 10],  // Level 4
    [4, 6, 10],  // Level 5
    [5, 7, 10],  // Level 6
    [6, 12, 15], // Level 7        
    [8, 10, 12], // Level 8
    [10, 12, 15], // Level 9
    [7, 10, 15], // Level 10
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{  }, // Level 1
	{  }, // Level 2
	{  }, // Level 3
	{  }, // Level 4
	{  }, // Level 5
	{  }, // Level 6
	{  }, // Level 7
	{  }, // Level 8
	{  }, // Level 9
	{  }, // Level 10
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
  '', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly

function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   //workspace.registerToolboxCategoryCallback(
   //                'VARIABLE_MY', flyoutVariableBlocks );
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 5, 7, 8, 9]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_fill_a"></block>' +
  '  <block type="vodoley_fill_b"></block>' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '</xml>';
  if( [4, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_fill_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_fill_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_fill_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_a_to_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_b_to_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_c_to_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_c_to_b"></block>' +
  '  <sep gap="5"></sep>' +
  '</xml>';
  if( [6]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_empty_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_a_to_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_b_to_c"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_c_to_a"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="vodoley_c_to_b"></block>' +
  '  <sep gap="5"></sep>' +
  '</xml>';
  }

