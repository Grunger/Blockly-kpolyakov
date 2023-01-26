/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Водолей-Blockly, циклы N раз
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
  [ 1, [7, 0], [2, 0] ],  // Level 1
  [ 1, [2, 0], [9, 0] ],  // Level 2
  [ 1, [19, 0], [2, 0] ],  // Level 3
  [ 2, [3, 0], [14, 0] ],  // Level 4
  [ 1, [20, 0], [3, 0] ],  // Level 5
  [ 3, [4, 0], [29, 0] ],  // Level 6
  [ 2, [25, 0], [3, 0] ],  // Level 7
  [ 4, [5, 0], [23, 0] ],  // Level 8
  [ 3, [7, 0], [30, 0] ],  // Level 9
  [ 3, [6, 0], [47, 0] ],  // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [4, 6, 10],   // Level 1
    [4, 6, 10],   // Level 2
    [4, 10, 20],  // Level 3
    [4, 6, 10],   // Level 4
    [3, 7, 15],   // Level 5
    [4, 10, 16],  // Level 6
    [3, 10, 20],  // Level 7
    [8, 15, 30],  // Level 8
    [8, 15, 30],  // Level 9
    [15, 30, 45],  // Level 10
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
  { 'vodoley_fill_a': 1, 'vodoley_fill_b': 1 }, // Level 7
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 8
  { 'vodoley_fill_a': 2, 'vodoley_fill_b': 2 }, // Level 9
];

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
  '<table><tr><td><img src="./media/ntimes-block.gif" style="margin:10px 15px 0 0;"></td><td>' +
  'Новый блок &laquo;повторить&raquo; позволяет выполнить группу команд ' +
  'несколько раз. Эти команды нужно поставить внутрь блока в правильном порядке.' +
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
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '  <block type="vodoley_fill_a"></block>' +
  '  <block type="vodoley_fill_b"></block>' +
  '  <block type="vodoley_empty_a"></block>' +
  '  <block type="vodoley_empty_b"></block>' +
  '  <block type="vodoley_a_to_b"></block>' +
  '  <block type="vodoley_b_to_a"></block>' +
  '  <block type="controls_repeat_list"></block>' +
  '</xml>';
  }

