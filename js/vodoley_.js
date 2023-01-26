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
  [ 1, [2, 0], [3, 0] ],        // Level 1
  [ 1, [2, 0], [3, 0], [4, 0],  // Level 2
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [1, 2, 3],   // Level 1
    [2, 3, 4],   // Level 2
     ];

//======================= SOME BLOCKS LIMIT  =======================
// Ограничение на количество используемых блоков ОТДЕЛЬНЫХ ТИПОВ для
// каждого уровня

var someBlocksLimit = [ {}, // Level 0 unused
	{  }, // Level 1
	{  }, // Level 2
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  '',
// Level 2   
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
  return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_fill_a"></block>' +
  '  <block type="vodoley_fill_b"></block>' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '</xml>';
  }

