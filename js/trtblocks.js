/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Черепаха-Blockly, блоки управления Черепахой
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

Blockly.Msg["ROBOT_HUE"] = "200";
Blockly.Msg["BKY_ROBOT_HUE"] = "200";
Blockly.Msg["COLOUR_HUE"] = "50";
Blockly.Msg["BKY_COLOUR_HUE"] = "50";
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
  
//======================= CONTROLS REPEAT WITH DROP_DOWN LIST =======================
Blockly.Blocks['controls_repeat_num'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("повторить")
        .appendField( new Blockly.FieldNumber(2), "TIMES")
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

Blockly.JavaScript['controls_repeat_num'] = function( block ) {  
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

Blockly.Python['controls_repeat_num'] = function( block ) {  
  var repeats = parseInt(block.getFieldValue('TIMES'), 10);
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  var loopVar = Blockly.Python.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
  };

Blockly.PHP['controls_repeat_num'] = function( block ) {  
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

Blockly.Dart['controls_repeat_num'] = function( block ) {  
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

Blockly.Lua['controls_repeat_num'] = function( block ) {  
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
Blockly.Blocks['turtle_program'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Программа");
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("Этот блок начинает программу для Черепахи");
    this.setHelpUrl("");
    this.setStyle('main_block');
    }
  };
Blockly.JavaScript['turtle_program'] = function( block ) {  return ''; };
Blockly.Python['turtle_program'] = function( block ) {  return '';  };
Blockly.PHP['turtle_program'] = function( block ) {  return '';  };
Blockly.Dart['turtle_program'] = function( block ) {  return '';  };
Blockly.Lua['turtle_program'] = function( block ) {  return '';  };

//======================= ПОКАЖИСЬ =======================
Blockly.Blocks['turtle_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("покажись");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Показать Черепаху на экране");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['turtle_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['turtle_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['turtle_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['turtle_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\')\n';
  return code;
  };

//======================= СКРОЙСЯ =======================
Blockly.Blocks['turtle_hide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("скройся");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Скрыть Черепаху");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['turtle_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['turtle_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['turtle_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['turtle_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\')\n';
  return code;
  };

//======================= ОПУСТИ ПЕРО =======================
Blockly.Blocks['turtle_pen_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("опусти перо");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Опустить перо для рисования");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['turtle_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['turtle_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['turtle_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['turtle_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПОДНИМИ ПЕРО =======================
Blockly.Blocks['turtle_pen_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("подними перо");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Поднять перо и не оставлять следа");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['turtle_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['turtle_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['turtle_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['turtle_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\')\n';
  return code;
  };

//======================= ВПЕРЕД =======================
Blockly.Blocks['turtle_forward'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .appendField("вперёд на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха движется вперёд");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_forward'] = function( block ) {
  var times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_forward'] = function( block ) {
  var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_forward'] = function( block ) {
  var times = Blockly.PHP.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_forward'] = function( block ) {
  var times = Blockly.Dart.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_forward'] = function( block ) {
  var times = Blockly.Lua.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.Blocks['turtle_forward_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вперёд на")
        .appendField( new Blockly.FieldNumber(100), "TIMES" );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха движется вперёд");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_forward_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_forward_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_forward_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_forward_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_forward_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

//======================= НАЗАД =======================
Blockly.Blocks['turtle_back'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .appendField("назад на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха движется назад");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_back'] = function( block ) {
  var times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_back'] = function( block ) {
  var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_back'] = function( block ) {
  var times = Blockly.PHP.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_back'] = function( block ) {
  var times = Blockly.Dart.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_back'] = function( block ) {
  var times = Blockly.Lua.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.Blocks['turtle_back_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("назад на")
        .appendField( new Blockly.FieldNumber(100), "TIMES" );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха движется назад");
    this.setHelpUrl("");
    }
  };

Blockly.JavaScript['turtle_back_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_back_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'back(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_back_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_back_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'back(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_back_simple'] = function( block ) {
  var times = block.getFieldValue('TIMES');
  var code = 'back(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

//======================= ВЛЕВО =======================
Blockly.Blocks['turtle_left'] = {
  init: function() {
    this.appendValueInput("DEGREES")
        .appendField("поверни влево на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха поворачивает влево");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_left'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'left(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Python['turtle_left'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'left(\'' + block.id + '\', ' + degrees + ')\n';
  return code;
  };

Blockly.PHP['turtle_left'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'left(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Dart['turtle_left'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'left(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Lua['turtle_left'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'left(\'' + block.id + '\', ' + degrees + ')\n';
  return code;
  };

Blockly.Blocks['turtle_left_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("поверни влево на")
        .appendField( new Blockly.FieldAngle(90), "DEGREES");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха поворачивает влево");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_left_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'left(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_left_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'left(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_left_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'left(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_left_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'left(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_left_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'left(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

//======================= ВПРАВО =======================
Blockly.Blocks['turtle_right'] = {
  init: function() {
    this.appendValueInput("DEGREES")
        .appendField("поверни вправо на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха поворачивает вправо");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_right'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'right(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Python['turtle_right'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'right(\'' + block.id + '\', ' + degrees + ')\n';
  return code;
  };

Blockly.PHP['turtle_right'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'right(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Dart['turtle_right'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'right(\'' + block.id + '\', ' + degrees + ');\n';
  return code;
  };

Blockly.Lua['turtle_right'] = function( block ) {
  var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'right(\'' + block.id + '\', ' + degrees + ')\n';
  return code;
  };

Blockly.Blocks['turtle_right_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("поверни вправо на")
        .appendField( new Blockly.FieldAngle(90), "DEGREES");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Черепаха поворачивает вправо");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_right_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'right(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['turtle_right_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'right(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['turtle_right_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'right(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['turtle_right_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'right(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['turtle_right_simple'] = function( block ) {
  var times = block.getFieldValue('DEGREES');
  var code = 'right(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

//======================= ЦВЕТ ПЕРА =======================
Blockly.Blocks['turtle_colour'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "цвет пера" )
        .appendField( new Blockly.FieldColour('#ff0000'), 'COLOUR' );       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour( Blockly.Msg['COLOUR_HUE'] );
    this.setTooltip( "Выбрать цвет линии" );
    this.setHelpUrl( "" );
  }
};

Blockly.JavaScript['turtle_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Python['turtle_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ')\n';
};

Blockly.PHP['turtle_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Dart['turtle_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Lua['turtle_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ')\n';
};

//======================= ЗАЛИТЬ =================
Blockly.Blocks['turtle_fill'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "залить цветом" )
        .appendField( new Blockly.FieldColour('#ff0000'), 'COLOUR' );       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour( Blockly.Msg['COLOUR_HUE'] );
    this.setTooltip( "Залить область выбранным цветом" );
    this.setHelpUrl( "" );
  }
};

Blockly.JavaScript['turtle_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Python['turtle_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ')\n';
};

Blockly.PHP['turtle_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Dart['turtle_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Lua['turtle_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ')\n';
};

//======================= ЗАЛИТЬ ЦВЕТОМ № =================
Blockly.Blocks['turtle_fill_no'] = {
  init: function() {
    this.appendValueInput("COLOUR")
        .appendField("залей цветом №");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["COLOUR_HUE"]);
    this.setTooltip("Залить стандартным цветом с заданным номером");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['turtle_fill_no'] = function( block ) {
  var colourNo = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Python['turtle_fill_no'] = function( block ) {
  var colourNo = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ')\n';
  return code;
  };

Blockly.PHP['turtle_fill_no'] = function( block ) {
  var colourNo = Blockly.PHP.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Dart['turtle_fill_no'] = function( block ) {
  var colourNo = Blockly.Dart.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Lua['turtle_fill_no'] = function( block ) {
  var colourNo = Blockly.Lua  .valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ')\n';
  return code;
  };

//======================= INIT ROBOT API =======================
function initRobotApi( interpreter, globalObject ) {
    var wrapper;

    //--- ПОКАЖИСЬ - СКРОЙСЯ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( TurtleShow( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'show',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( TurtleHide( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'hide',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ПЕРО ВВЕРХ - ВНИЗ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( PenDown( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'penDown',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( PenUp( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'penUp',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ВПЕРЁД - НАЗАД ---
    wrapper = function( blockId, steps ) {
      return interpreter.createPrimitive( TurtleForward( blockId, steps ) );
      };  
    interpreter.setProperty( globalObject, 'forward',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId, steps ) {
      return interpreter.createPrimitive( TurtleBack( blockId, steps ) );
      };  
    interpreter.setProperty( globalObject, 'back',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ВЛЕВО - ВПРАВО ---
    wrapper = function( blockId, degrees ) {
      return interpreter.createPrimitive( TurtleLeft( blockId, degrees ) );
      };  
    interpreter.setProperty( globalObject, 'left',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId, degrees ) {
      return interpreter.createPrimitive( TurtleRight( blockId, degrees ) );
      };  
    interpreter.setProperty( globalObject, 'right',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ЦВЕТ ---
    wrapper = function( blockId, colour ) {
      return interpreter.createPrimitive( TurtleColour( blockId, colour ) );
      };  
    interpreter.setProperty( globalObject, 'penColour',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ЗАЛИТЬ ---
    wrapper = function( blockId, colour ) {
      return interpreter.createPrimitive( TurtleFill( blockId, colour ) );
      };  
    interpreter.setProperty( globalObject, 'floodFill',
      interpreter.createNativeFunction( wrapper ) 
      );    

    wrapper = function( blockId, colourNo ) {
      return interpreter.createPrimitive( TurtleFillNo( blockId, colourNo ) );
      };  
    interpreter.setProperty( globalObject, 'floodFillNo',
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
//======================= TURTLE COMMANDS =======================
function TurtleShow( blockId ) {
  scheduleTurtleShow( blockId, true );
  }
function TurtleHide( blockId ) {
  scheduleTurtleShow( blockId, false );
  }
function PenDown( blockId ) {
  schedulePenDown( blockId, true );
  }
function PenUp( blockId ) {
  schedulePenDown( blockId, false );
  }
function TurtleForward( blockId, steps ) {
  scheduleTurtleMove( blockId, steps );
  }
function TurtleBack( blockId, steps ) {
  scheduleTurtleMove( blockId, -steps );
  }
function TurtleLeft( blockId, degrees ) {
  scheduleTurtleTurn( blockId, -degrees );
  }
function TurtleRight( blockId, degrees ) {
  scheduleTurtleTurn( blockId, degrees );
  }
function TurtleColour( blockId, colour ) {
  scheduleTurtleColour( blockId, colour );
  }
function TurtleFill( blockId, colour ) {
  scheduleTurtleFill( blockId, colour );
  }
function TurtleFillNo( blockId, colourNo ) {
  if( colourNo < 0 ) colourNo = - colourNo;
  colourNo = colourNo % 16;
  var colors = [ '#000000', '#003399', '#339933', '#009999', 
                 '#990033', '#990066', '#663300', '#cccccc',
                 '#999999', '#0066ff', '#66ff33', '#33ffff',
                 '#ff3333', '#cc0099', '#ffff33', '#ffffff'];
  scheduleTurtleFill( blockId, colors[colourNo] );
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

//======================= VARIABLE_MY =======================
/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
function flyoutVariableBlocks( workspace ) {

  var xmlList = [];
  var button = document.createElement( 'button' );
  button.setAttribute( 'text', '%{BKY_NEW_VARIABLE}' );
  button.setAttribute( 'callbackKey', 'CREATE_VARIABLE' );

  workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
  });

  xmlList.push(button);

  var variableModelList = workspace.getVariablesOfType('');

  if (variableModelList.length > 0) {
    // New variables are added to the end of the variableModelList.
    var mostRecentVariable = variableModelList[variableModelList.length - 1];
    if (Blockly.Blocks['variables_set']) {
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'variables_set');
      block.setAttribute('gap', Blockly.Blocks['math_change'] ? 8 : 24);
      block.appendChild(
          Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
      //================ Added by K. Polyakov 13.10.220
      var value = Blockly.Xml.textToDom(
          '<value name="VALUE">' +
          '<shadow type="math_number">' +
          '<field name="NUM">0</field>' +
          '</shadow>' +
          '</value>');
      block.appendChild(value);
      xmlList.push(block);
      //================ End
    }
    if (Blockly.Blocks['math_change']) {
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'math_change');
      block.setAttribute('gap', Blockly.Blocks['variables_get'] ? 20 : 8);
      block.appendChild(
          Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
      var value = Blockly.Xml.textToDom(
          '<value name="DELTA">' +
          '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>');
      block.appendChild(value);
      xmlList.push(block);
    }

    if (Blockly.Blocks['variables_get']) {
      variableModelList.sort(Blockly.VariableModel.compareByName);
      for (var i = 0, variable; (variable = variableModelList[i]); i++) {
        var block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'variables_get');
        block.setAttribute('gap', 8);
        block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
        xmlList.push(block);
      }
    }
  }
  return xmlList;
};
