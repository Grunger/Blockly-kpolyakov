/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, шаблон для новых наборов задач
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= MAPS =======================
// По умолчанию 1 единица - это 20 пикселей (unitSize)
// Поле 'unit' позволяет изменять эту величину для каждого уровня.

var Maps = 
[ {}, // Level 0   
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 1
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 2
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 3
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 4
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 5
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 6
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 7
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 8
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 9
  { 'x': 0, 'y': 0, 'show': true, 'pen': true, 'width': 2, 'unit': 30 }, // Level 10
];

//======================= BLOCK LIMIT  =======================
// Ограничение на количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    [50],  // Level 1
    [50], // Level 2
    [50], // Level 3
    [50], // Level 4
    [50],  // Level 5
    [30, 40, 50],  // Level 6
    [30, 40, 50],  // Level 7
    [30, 40, 50],  // Level 8
    [30, 40, 50],  // Level 9
    [30, 40, 50],  // Level 10
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

//======================= ANSWERS  =======================
// Ответы к заданиям в виде программ для Чертёжника
// При вызове drawGrid указываются координаты точки (0,0),
// третий аргумент drawGrid показывает, выделять ли оси красным цветом. 

var Answers = [ null, // Level 0 not used

// Level 1 
function() { drawGrid(200, 200); 
  },
// Level 2 
function() { drawGrid(200, 200); 
  },
// Level 3 
function() { drawGrid(200, 200); 
  },
// Level 4 
function() { drawGrid(200, 200); 
  },
// Level 5 
function() { drawGrid(200, 200); 
  },
// Level 6 
function() { drawGrid(200, 200); 
  },
// Level 7 
function() { drawGrid(200, 200);
  },
// Level 8 
function() { drawGrid(200, 200); 
  },
// Level 9 
function() { drawGrid(200, 200); 
  },
// Level 10 
function() { drawGrid(200, 200); 
  },

];  

//======================= HELP CONTENT  =======================
// Справочные сообщения, которые появляются перед началом каждого уровня

var HelpContent = [ '', // Level 0 not used
// Level 1   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 2   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 3   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 4   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 5   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 6   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 7   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 8   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 9   
    'Нарисуй рисунок, который видишь на экране.', 
// Level 10   
    'Нарисуй рисунок, который видишь на экране.', 
];

//======================= BLOCKLY BLOCKS =======================
// Содержание меню Blockly
function initThisApplication() {
   workspace.registerToolboxCategoryCallback(
                   'PROCEDURES_ONLY', flyoutProcedureOnlyBlocks );
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );
   checkPictureMode = checkPictureModes.EXACT;
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
  '<category name="Чертёжник" colour="%{BKY_ROBOT_HUE}">' +
  '  <block type="drawer_vector">' +
  '    <value name="DELTAX">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '    <value name="DELTAY">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_down"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_pen_up"></block>' +
  '</category>' +
  '<category name="Цвет" colour="%{BKY_COLOUR_HUE}">' +
  '  <block type="drawer_colour"></block>' +
  '  <sep gap="5"></sep>' +
  '  <block type="drawer_fill_no">' + 
  '    <value name="COLOUR">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">10</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
  '  <sep gap="5"></sep>' +
  '</category>' +
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
  '  <block type="controls_repeat_list"></block>' +
  '</category>' +
  '<category name="Переменные" custom="VARIABLE_MY" colour="%{BKY_VARIABLES_HUE}">'+
  '</category>'+
  '<category name="Математика" colour="%{BKY_MATH_HUE}">' +
  '  <block type="math_number">' +
  '    <field name="NUM">1</field>' +
  '  </block>' +
  '  <block type="math_negate"></block>' +
  '  <block type="math_arithmetic"></block>' +  
  '</category>' +
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +
  '</xml>';
  return '';
}
