/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, шаблон для разработки новых заданий
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
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 2
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 3
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 4
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 5
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........', ],
  ['..........',  // Level 6
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 7
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 8
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 9
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
  ['..........',  // Level 10
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........',
   '..........' ],
];

//======================= BLOCK LIMIT  =======================
// Ограничение на ОБЩЕЕ количество используемых блоков для
// каждого уровня

var BlockLimit = [0, // Level 0 unused
    50,  // Level 1
    50,  // Level 2
    50,  // Level 3
    50,  // Level 4
    50,  // Level 5
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
   workspace.registerToolboxCategoryCallback(
                   'VARIABLE_MY', flyoutVariableBlocks );
}

function BlocklyBlocks( Level ) {
  if( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. includes( Level ) ) return '' + 
  '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">' +
//================== Команды Робота ==================
  '<category name="Робот" colour="%{BKY_ROBOT_HUE}">' +
    // вперед(n)
  '  <block type="robot_forward">' +         
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">1</field>' +
  '      </shadow>' +
  '  </block>' +
    // назад(n)
  '  <block type="robot_back">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">1</field>' +
  '      </shadow>' +
  '  </block>' +
    // поверни налево
  '  <block type="robot_left"></block>' +
    // поверни направо
  '  <block type="robot_right"></block>' +
    // посади
  '  <block type="robot_plant"></block>' +
  '</category>' +

//================== Датчики Робота ==================
  '<category name="Датчики" colour="%{BKY_CONDITION_HUE}">' +
    // впереди свободно
  '  <block type="robot_free_forward"></block>' +
    // сзади свободно
  '  <block type="robot_free_back"></block>' +
    // слева свободно
  '  <block type="robot_free_left"></block>' +
    // справа свободно
  '  <block type="robot_free_right"></block>' +
    // впереди стена
  '  <block type="robot_wall_forward"></block>' +
    // сзади стена
  '  <block type="robot_wall_back"></block>' +
    // слева стена
  '  <block type="robot_wall_left"></block>' +
    // справа стена
  '  <block type="robot_wall_right"></block>' +
    // здесь база
  '  <block type="robot_base_here"></block>' +
  '</category>' +

//================== Циклы (Blockly) ==================
  '<category name="Циклы" colour="%{BKY_LOOPS_HUE}">' +
    // повторить N раз
  '  <block type="controls_repeat_ext">' +
  '    <value name="TIMES">' +
  '      <shadow type="math_number">' +
  '        <field name="NUM">2</field>' +
  '      </shadow>' +
  '    </value>' +
  '  </block>' +
    // повторять, пока (пока не)
  '  <block type="controls_whileUntil"></block>' +
  '</category>' +

//================== Логика (Blockly) ==================
  '<category name="Логика" colour="%{BKY_LOGIC_HUE}">' +
    // если, то выполнить
  '  <block type="controls_if"></block>' +
    // если, то выполнить; иначе ...
  '  <block type="controls_if">' +
  '    <mutation else="1"></mutation>' +
  '  </block>' +   
    // сравнение (==, !=, <, <=, >, >=)
  '  <block type="logic_compare"></block>' +
    // И, ИЛИ
  '  <block type="logic_operation"></block>' +
    // НЕ
  '  <block type="logic_negate"></block>' +
  '</category>' +

//================== Переменные (Blockly) ==================
  '<category name="Переменные" custom="VARIABLE_MY" colour="%{BKY_VARIABLES_HUE}">'+
  '</category>'+

//================== Числа и арифметика (Blockly) ==================
  '<category name="Математика" colour="%{BKY_MATH_HUE}">' +
  '  <block type="math_number">' +
  '    <field name="NUM">1</field>' +
  '  </block>' +
  '  <block type="math_arithmetic"></block>' +  
  '</category>' +

//================== Процедуры (Blockly) ==================
  '<category name="Процедуры" custom="PROCEDURES_ONLY" colour="%{BKY_PROCEDURES_HUE}">' +
  '</category>' +

  '</xml>';
  }

