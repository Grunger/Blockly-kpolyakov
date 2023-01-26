/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Водолей-Blockly, блоки управления Водолеем
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

Blockly.Msg["ROBOT_HUE"] = "230";
Blockly.Msg["BKY_ROBOT_HUE"] = "230";
Blockly.Msg["CONDITION_HUE"] = "30";
Blockly.Msg["BKY_CONDITION_HUE"] = "30";

//======================= CONTROLS REPEAT WITH DROP_DOWN LIST =======================
Blockly.Blocks['controls_repeat_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("повторить")
        .appendField(new Blockly.FieldDropdown([["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], ["9","9"], ["10","10"]]), "TIMES")
        .appendField("раз");
    this.appendStatementInput("DO")
        .appendField(Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"]);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["LOOPS_HUE"]);
    this.setTooltip(Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"]);
    this.setHelpUrl(Blockly.Msg["CONTROLS_REPEAT_HELPURL"]);
    this.setStyle('loop_blocks');
    }
  };

Blockly.JavaScript['controls_repeat_list'] = function( block ) {  
  var repeats = String(Number(block.getFieldValue('TIMES')));
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.JavaScript.variableDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' + loopVar + '++) {\n' +
      branch + '}\n';
  return code; 
  };

Blockly.Python['controls_repeat_list'] = function( block ) {  
  var repeats = parseInt(block.getFieldValue('TIMES'), 10);
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  var loopVar = Blockly.Python.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
  };

Blockly.PHP['controls_repeat_list'] = function( block ) {  
  var repeats = String(Number(block.getFieldValue('TIMES')));
  var branch = Blockly.PHP.statementToCode(block, 'DO');
  branch = Blockly.PHP.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.PHP.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.PHP.variableDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += endVar + ' = ' + repeats + ';\n';
    }
  code += 'for (' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' + loopVar + '++) {\n' +
      branch + '}\n';
  return code;
  };

Blockly.Dart['controls_repeat_list'] = function( block ) {  
  var repeats = String(Number(block.getFieldValue('TIMES')));
  var branch = Blockly.Dart.statementToCode(block, 'DO');
  branch = Blockly.Dart.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.Dart.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.Dart.variableDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
  };

Blockly.Lua['controls_repeat_list'] = function( block ) {  
  var repeats = String(Number(block.getFieldValue('TIMES')));
  repeats = parseInt(repeats, 10);
  var branch = Blockly.Lua.statementToCode(block, 'DO');
  branch = Blockly.Lua.addLoopTrap(branch, block);
  branch = Blockly.Lua.addContinueLabel_(branch);
  var loopVar = Blockly.Lua.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var code = 'for ' + loopVar + ' = 1, ' + repeats + ' do\n' +
      branch + 'end\n';
  return code;
  };
  
//======================= ПРОГРАММА =======================
Blockly.Blocks['robot_program'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Программа");
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("Этот блок начинает программу для Робота");
    this.setHelpUrl("");
    this.setStyle('main_block');
    }
  };
Blockly.JavaScript['robot_program'] = function( block ) {  return ''; };
Blockly.Python['robot_program'] = function( block ) {  return '';  };
Blockly.PHP['robot_program'] = function( block ) {  return '';  };
Blockly.Dart['robot_program'] = function( block ) {  return '';  };
Blockly.Lua['robot_program'] = function( block ) {  return '';  };

//======================= НАПОЛНИ А =======================
Blockly.Blocks['vodoley_fill_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("наполни А");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Наполнить сосуд А");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_fill_a'] = function( block ) {
  var code = 'fillA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_fill_a'] = function( block ) {
  var code = 'fillA(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_fill_a'] = function( block ) {
  var code = 'fillA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_fill_a'] = function( block ) {
  var code = 'fillA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_fill_a'] = function( block ) {
  var code = 'fillA(\'' + block.id + '\')\n';
  return code;
  };

//======================= НАПОЛНИ B =======================
Blockly.Blocks['vodoley_fill_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("наполни Б");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Наполнить сосуд Б");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_fill_b'] = function( block ) {
  var code = 'fillB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_fill_b'] = function( block ) {
  var code = 'fillB(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_fill_b'] = function( block ) {
  var code = 'fillB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_fill_b'] = function( block ) {
  var code = 'fillB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_fill_b'] = function( block ) {
  var code = 'fillB(\'' + block.id + '\')\n';
  return code;
  };

//======================= НАПОЛНИ C =======================
Blockly.Blocks['vodoley_fill_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("наполни В");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Наполнить сосуд В");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_fill_c'] = function( block ) {
  var code = 'fillC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_fill_c'] = function( block ) {
  var code = 'fillC(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_fill_c'] = function( block ) {
  var code = 'fillC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_fill_c'] = function( block ) {
  var code = 'fillC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_fill_c'] = function( block ) {
  var code = 'fillC(\'' + block.id + '\')\n';
  return code;
  };

//======================= ВЫЛЕЙ А =======================
Blockly.Blocks['vodoley_empty_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вылей А");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Вылить воду из сосуда А");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_empty_a'] = function( block ) {
  var code = 'emptyA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_empty_a'] = function( block ) {
  var code = 'emptyA(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_empty_a'] = function( block ) {
  var code = 'emptyA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_empty_a'] = function( block ) {
  var code = 'emptyA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_empty_a'] = function( block ) {
  var code = 'emptyA(\'' + block.id + '\')\n';
  return code;
  };

//======================= ВЫЛЕЙ B =======================
Blockly.Blocks['vodoley_empty_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вылей Б");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Вылить воду из сосуда Б");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_empty_b'] = function( block ) {
  var code = 'emptyB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_empty_b'] = function( block ) {
  var code = 'emptyB(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_empty_b'] = function( block ) {
  var code = 'emptyB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_empty_b'] = function( block ) {
  var code = 'emptyB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_empty_b'] = function( block ) {
  var code = 'emptyB(\'' + block.id + '\')\n';
  return code;
  };

//======================= ВЫЛЕЙ C =======================
Blockly.Blocks['vodoley_empty_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вылей В");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Вылить воду из сосуда В");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_empty_c'] = function( block ) {
  var code = 'emptyC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_empty_c'] = function( block ) {
  var code = 'emptyC(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_empty_c'] = function( block ) {
  var code = 'emptyC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_empty_c'] = function( block ) {
  var code = 'emptyC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_empty_c'] = function( block ) {
  var code = 'emptyC(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из А в B =======================
Blockly.Blocks['vodoley_a_to_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из А в Б");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда А в сосуд Б");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_a_to_b'] = function( block ) {
  var code = 'fromAtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_a_to_b'] = function( block ) {
  var code = 'fromAtoB(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_a_to_b'] = function( block ) {
  var code = 'fromAtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_a_to_b'] = function( block ) {
  var code = 'fromAtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_a_to_b'] = function( block ) {
  var code = 'fromAtoB(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из B в A =======================
Blockly.Blocks['vodoley_b_to_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из Б в А");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда Б в сосуд А");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_b_to_a'] = function( block ) {
  var code = 'fromBtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_b_to_a'] = function( block ) {
  var code = 'fromBtoA(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_b_to_a'] = function( block ) {
  var code = 'fromBtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_b_to_a'] = function( block ) {
  var code = 'fromBtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_b_to_a'] = function( block ) {
  var code = 'fromBtoA(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из А в C =======================
Blockly.Blocks['vodoley_a_to_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из А в В");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда А в сосуд В");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_a_to_c'] = function( block ) {
  var code = 'fromAtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_a_to_c'] = function( block ) {
  var code = 'fromAtoC(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_a_to_c'] = function( block ) {
  var code = 'fromAtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_a_to_c'] = function( block ) {
  var code = 'fromAtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_a_to_c'] = function( block ) {
  var code = 'fromAtoC(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из C в A =======================
Blockly.Blocks['vodoley_c_to_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из В в А");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда В в сосуд А");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_c_to_a'] = function( block ) {
  var code = 'fromCtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_c_to_a'] = function( block ) {
  var code = 'fromCtoA(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_c_to_a'] = function( block ) {
  var code = 'fromCtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_c_to_a'] = function( block ) {
  var code = 'fromCtoA(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_c_to_a'] = function( block ) {
  var code = 'fromCtoA(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из B в C =======================
Blockly.Blocks['vodoley_b_to_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из Б в В");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда Б в сосуд В");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_b_to_c'] = function( block ) {
  var code = 'fromBtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_b_to_c'] = function( block ) {
  var code = 'fromBtoC(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_b_to_c'] = function( block ) {
  var code = 'fromBtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_b_to_c'] = function( block ) {
  var code = 'fromBtoC(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_b_to_c'] = function( block ) {
  var code = 'fromBtoC(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПЕРЕЛЕЙ из C в B =======================
Blockly.Blocks['vodoley_c_to_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перелей из В в Б");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Перелить воду из сосуда В в сосуд Б");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_c_to_b'] = function( block ) {
  var code = 'fromCtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['vodoley_c_to_b'] = function( block ) {
  var code = 'fromCtoB(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['vodoley_c_to_b'] = function( block ) {
  var code = 'fromCtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['vodoley_c_to_b'] = function( block ) {
  var code = 'fromCtoB(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['vodoley_c_to_b'] = function( block ) {
  var code = 'fromCtoB(\'' + block.id + '\')\n';
  return code;
  };

//======================= В СОСУДЕ A-B-C =======================
Blockly.Blocks['vodoley_in_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "в сосуде А" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет количество воды в сосуде А" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_in_a'] = function( block ) {
  var code = 'inA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_in_a'] = function( block ) {
  var code = 'inA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_in_a'] = function( block ) {
  var code = 'inA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_in_a'] = function( block ) {
  var code = 'inA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_in_a'] = function( block ) {
  var code = 'inA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['vodoley_in_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "в сосуде Б" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет количество воды в сосуде Б" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_in_b'] = function( block ) {
  var code = 'inB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_in_b'] = function( block ) {
  var code = 'inB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_in_b'] = function( block ) {
  var code = 'inB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_in_b'] = function( block ) {
  var code = 'inB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_in_b'] = function( block ) {
  var code = 'inB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['vodoley_in_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "в сосуде В" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет количество воды в сосуде В" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_in_c'] = function( block ) {
  var code = 'inC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_in_c'] = function( block ) {
  var code = 'inC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_in_c'] = function( block ) {
  var code = 'inC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_in_c'] = function( block ) {
  var code = 'inC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_in_c'] = function( block ) {
  var code = 'inC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= ОБЪЁМ СОСУДА A-B-C =======================
Blockly.Blocks['vodoley_size_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "размер А" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет размер сосуда А" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_size_a'] = function( block ) {
  var code = 'sizeA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_size_a'] = function( block ) {
  var code = 'sizeA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_size_a'] = function( block ) {
  var code = 'sizeA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_size_a'] = function( block ) {
  var code = 'sizeA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_size_a'] = function( block ) {
  var code = 'sizeA(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['vodoley_size_b'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "размер Б" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет размер сосуда Б" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_size_b'] = function( block ) {
  var code = 'sizeB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_size_b'] = function( block ) {
  var code = 'sizeB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_size_b'] = function( block ) {
  var code = 'sizeB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_size_b'] = function( block ) {
  var code = 'sizeB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_size_b'] = function( block ) {
  var code = 'sizeB(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['vodoley_size_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "размер В" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет размер сосуда В" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_size_c'] = function( block ) {
  var code = 'sizeC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_size_c'] = function( block ) {
  var code = 'sizeC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_size_c'] = function( block ) {
  var code = 'sizeC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_size_c'] = function( block ) {
  var code = 'sizeC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_size_c'] = function( block ) {
  var code = 'sizeC(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= ЦЕЛЬ (НУЖНО НАБРАТЬ) =======================
Blockly.Blocks['vodoley_target'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "цель" );
    this.setOutput( true , "Number" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет сколько воды нужно отмерить" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['vodoley_target'] = function( block ) {
  var code = 'target(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['vodoley_target'] = function( block ) {
  var code = 'target(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['vodoley_target'] = function( block ) {
  var code = 'target(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['vodoley_target'] = function( block ) {
  var code = 'target(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['vodoley_target'] = function( block ) {
  var code = 'target(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= INIT ROBOT API =======================
function initRobotApi( interpreter, globalObject ) {
    var wrapper;

    //--- НАПОЛНИ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyFill(blockId, 'A') );
      };  
    interpreter.setProperty( globalObject, 'fillA',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyFill(blockId, 'B') );
      };  
    interpreter.setProperty( globalObject, 'fillB',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyFill(blockId, 'C') );
      };  
    interpreter.setProperty( globalObject, 'fillC',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ВЫЛЕЙ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyEmpty(blockId, 'A') );
      };  
    interpreter.setProperty( globalObject, 'emptyA',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyEmpty(blockId, 'B') );
      };  
    interpreter.setProperty( globalObject, 'emptyB',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyEmpty(blockId, 'C') );
      };  
    interpreter.setProperty( globalObject, 'emptyC',
      interpreter.createNativeFunction( wrapper ) 
      );    
    
    //--- ПЕРЕЛЕЙ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'A', 'B') );
      };  
    interpreter.setProperty( globalObject, 'fromAtoB',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'A', 'C') );
      };  
    interpreter.setProperty( globalObject, 'fromAtoC',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'B', 'A') );
      };  
    interpreter.setProperty( globalObject, 'fromBtoA',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'B', 'C') );
      };  
    interpreter.setProperty( globalObject, 'fromBtoC',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'C', 'A') );
      };  
    interpreter.setProperty( globalObject, 'fromCtoA',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyMove(blockId, 'C', 'B') );
      };  
    interpreter.setProperty( globalObject, 'fromCtoB',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- В СОСУДЕ A-B-C ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyInVessel( blockId, 'A' ) );
      };  
    interpreter.setProperty( globalObject, 'inA',
      interpreter.createNativeFunction( wrapper ) 
      );       
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyInVessel( blockId, 'B' ) );
      };  
    interpreter.setProperty( globalObject, 'inB',
      interpreter.createNativeFunction( wrapper ) 
      );       
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyInVessel( blockId, 'C' ) );
      };  
    interpreter.setProperty( globalObject, 'inC',
      interpreter.createNativeFunction( wrapper ) 
      );       

    //--- ОБЪЁМ СОСУДА A-B-C ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleySizeVessel( blockId, 'A' ) );
      };  
    interpreter.setProperty( globalObject, 'sizeA',
      interpreter.createNativeFunction( wrapper ) 
      );       
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleySizeVessel( blockId, 'B' ) );
      };  
    interpreter.setProperty( globalObject, 'sizeB',
      interpreter.createNativeFunction( wrapper ) 
      );       
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleySizeVessel( blockId, 'C' ) );
      };  
    interpreter.setProperty( globalObject, 'sizeC',
      interpreter.createNativeFunction( wrapper ) 
      );       

    //--- ЦЕЛЬ (Сколько нужно набрать) ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( VodoleyTarget( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'target',
      interpreter.createNativeFunction( wrapper ) 
      );       

    // Не подсвечивать блоки при трансляции
    // Add an API function for highlighting blocks.
    //wrapper = function( blockId ) {
    //  blockId = blockId ? blockId.toString() : '';
    //  return interpreter.createPrimitive( highlightBlock( blockId ) );
    //  };
    //interpreter.setProperty(globalObject, 'highlightBlock',
    //  interpreter.createNativeFunction( wrapper ) 
    //  );
}
//======================= ROBOT COMMANDS =======================
function VodoleyFill( blockId, tag ) {
  scheduleVodoleyFill( blockId, tag );
  }
function VodoleyEmpty( blockId, tag ) {
  scheduleVodoleyEmpty( blockId, tag );
  }
function VodoleyMove( blockId, tagFrom, tagTo ) {
  scheduleVodoleyMove( blockId, tagFrom, tagTo );
  }
function VodoleyInVessel( blockId, tag ) {
  return currentContent( blockId, tag );
  }
function VodoleySizeVessel( blockId, tag ) {
  return vesselVolume( blockId, tag );
  }
function VodoleyTarget( blockId ) {
  return problemTarget( blockId );
  }

//======================= HIGHLIGHT BLOCK =======================
function highlightBlock( id ) {
  workspace.highlightBlock( id );
  }

//======================= PROCEDURES ONLY =======================
/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
function flyoutProcedureOnlyBlocks( workspace ) {
  var xmlList = [];
  if (Blockly.Blocks['procedures_defnoreturn']) {
    // <block type="procedures_defnoreturn" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'procedures_defnoreturn');
    block.setAttribute('gap', 16);
    var nameField = Blockly.utils.xml.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.utils.xml.createTextNode(
        Blockly.Msg['PROCEDURES_DEFNORETURN_PROCEDURE']));
    block.appendChild(nameField);
    xmlList.push(block);
    }
/*  
  if (Blockly.Blocks['procedures_defreturn']) {
    // <block type="procedures_defreturn" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'procedures_defreturn');
    block.setAttribute('gap', 16);
    var nameField = Blockly.utils.xml.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.utils.xml.createTextNode(
        Blockly.Msg['PROCEDURES_DEFRETURN_PROCEDURE']));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  if (Blockly.Blocks['procedures_ifreturn']) {
    // <block type="procedures_ifreturn" gap="16"></block>
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'procedures_ifreturn');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
*/  
  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
    }

  function populateProcedures(procedureList, templateName) {
    for (var i = 0; i < procedureList.length; i++) {
      var name = procedureList[i][0];
      var args = procedureList[i][1];
      // <block type="procedures_callnoreturn" gap="16">
      //   <mutation name="do something">
      //     <arg name="x"></arg>
      //   </mutation>
      // </block>
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);
      var mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('name', name);
      block.appendChild(mutation);
      for (var j = 0; j < args.length; j++) {
        var arg = Blockly.utils.xml.createElement('arg');
        arg.setAttribute('name', args[j]);
        mutation.appendChild(arg);
      }
      xmlList.push(block);
    }
  }

  var tuple = Blockly.Procedures.allProcedures(workspace);
  populateProcedures(tuple[0], 'procedures_callnoreturn');
  populateProcedures(tuple[1], 'procedures_callreturn');
  return xmlList;
};
