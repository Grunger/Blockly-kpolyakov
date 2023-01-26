/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, блоки управления Чертёжником
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

Blockly.Msg["ROBOT_HUE"] = "200";
Blockly.Msg["BKY_ROBOT_HUE"] = "200";
Blockly.Msg["COLOUR_HUE"] = "50";
Blockly.Msg["BKY_COLOUR_HUE"] = "50";
Blockly.Msg["CONDITION_HUE"] = "30";
Blockly.Msg["BKY_CONDITION_HUE"] = "30";

//======================= MATH-DECREASE =======================
Blockly.Blocks['math_decrease'] = {
  init: function() {
    this.appendValueInput("DELTA")
        .setCheck("Number")
        .appendField("уменьшить")
        .appendField(new Blockly.FieldVariable("%{BKY_MATH_CHANGE_TITLE_ITEM}"), "VAR")
        .appendField("на");
    this.setColour(Blockly.Msg["MATH_HUE"]);
    this.setTooltip("%{BKY_MATH_CHANGE_TITLE}");
    this.setHelpUrl("%{BKY_MATH_CHANGE_HELPURL}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('variable_blocks');
    },    
  };

Blockly.JavaScript['math_decrease'] = function( block ) {  
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DELTA',
                  Blockly.JavaScript.ORDER_ADDITION) || '0';
// В новых версиях .nameDB_
//  var varName = Blockly.JavaScript.nameDB_.getName(
  var varName = Blockly.JavaScript.variableDB_.getName(
       block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
                   ' : 0) - ' + argument0 + ';\n';
  };

Blockly.Python['math_decrease'] = function( block ) {  
  Blockly.Python.definitions_['from_numbers_import_Number'] = 'from numbers import Number';
  var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
                  Blockly.Python.ORDER_ADDITIVE) || '0';
//  var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'),
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
                Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = (' + varName + ' if isinstance(' + varName +
      ', Number) else 0) - ' + argument0 + '\n';
  };

Blockly.PHP['math_decrease'] = function( block ) {  
  var argument0 = Blockly.PHP.valueToCode(block, 'DELTA',
                  Blockly.PHP.ORDER_ADDITION) || '0';
//  var varName = Blockly.PHP.nameDB_.getName(block.getFieldValue('VAR'),
  var varName = Blockly.PHP.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' -= ' + argument0 + ';\n';
  };

Blockly.Dart['math_decrease'] = function( block ) {  
  var argument0 = Blockly.Dart.valueToCode(block, 'DELTA',
                  Blockly.Dart.ORDER_ADDITIVE) || '0';
//  var varName = Blockly.Dart.nameDB_.getName(block.getFieldValue('VAR'),
  var varName = Blockly.Dart.variableDB_.getName(block.getFieldValue('VAR'),
                Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = (' + varName + ' is num ? ' + varName + ' : 0) - ' +
         argument0 + ';\n';
  };

Blockly.Lua['math_decrease'] = function( block ) {  
  var argument0 = Blockly.Lua.valueToCode(block, 'DELTA',
                   Blockly.Lua.ORDER_ADDITIVE) || '0';
//  var varName = Blockly.Lua.nameDB_.getName(block.getFieldValue('VAR'),
  var varName = Blockly.Lua.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + varName + ' - ' + argument0 + '\n';
  };
  
//======================= MATH-NEGATE =======================
Blockly.Blocks['math_negate'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("-");
    this.setOutput(true, null);
    this.setColour(Blockly.Msg["MATH_HUE"]);
    this.setTooltip("Число с обратным знаком");
    this.setStyle('math_blocks');
    }
  };

Blockly.JavaScript['math_negate'] = function( block ) {  
  var arg = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
  if (arg[0] == '-') arg = ' ' + arg; // --3 is not legal in JS.    
  var code = '-' + arg;
  return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];  
  };

Blockly.Python['math_negate'] = function( block ) {  
  var arg = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_UNARY_SIGN) || '0';
  if (arg[0] == '-') arg = ' ' + arg; // --3 is not legal in JS.    
  var code = '-' + arg;
  return [code, Blockly.Python.ORDER_UNARY_SIGN];  
  };

Blockly.PHP['math_negate'] = function( block ) {  
  var arg = Blockly.PHP.valueToCode(block, 'VALUE',
            Blockly.PHP.ORDER_UNARY_NEGATION) || '0';
  if (arg[0] == '-') arg = ' ' + arg; // --3 is not legal in JS.    
  var code = '-' + arg;
  return [code, Blockly.PHP.ORDER_UNARY_NEGATION];  
  };

Blockly.Dart['math_negate'] = function( block ) {  
  var arg = Blockly.Dart.valueToCode(block, 'VALUE',
            Blockly.Dart.ORDER_UNARY_PREFIX) || '0';
  if (arg[0] == '-') arg = ' ' + arg; // --3 is not legal in JS.    
  var code = '-' + arg;
  return [code, Blockly.Dart.ORDER_UNARY_PREFIX];  
  };

Blockly.Lua['math_negate'] = function( block ) {  
  var arg = Blockly.Lua.valueToCode(block, 'VALUE',
            Blockly.Lua.ORDER_UNARY) || '0';
  if (arg[0] == '-') arg = ' ' + arg; // --3 is not legal in JS.    
  var code = '-' + arg;
  return [code, Blockly.Lua.ORDER_UNARY];  
  };
  

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
Blockly.Blocks['drawer_program'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Программа");
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("Этот блок начинает программу для Чертёжника");
    this.setHelpUrl("");
    this.setStyle('main_block');
    }
  };
Blockly.JavaScript['drawer_program'] = function( block ) {  return ''; };
Blockly.Python['drawer_program'] = function( block ) {  return '';  };
Blockly.PHP['drawer_program'] = function( block ) {  return '';  };
Blockly.Dart['drawer_program'] = function( block ) {  return '';  };
Blockly.Lua['drawer_program'] = function( block ) {  return '';  };

//======================= ПОКАЖИСЬ =======================
Blockly.Blocks['drawer_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("покажись");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Показать Чертёжника на экране");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['drawer_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['drawer_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['drawer_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['drawer_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['drawer_show'] = function( block ) {
  var code = 'show(\'' + block.id + '\')\n';
  return code;
  };

//======================= СКРОЙСЯ =======================
Blockly.Blocks['drawer_hide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("скройся");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Скрыть Чертёжника");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['drawer_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['drawer_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['drawer_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['drawer_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['drawer_hide'] = function( block ) {
  var code = 'hide(\'' + block.id + '\')\n';
  return code;
  };

//======================= ОПУСТИ ПЕРО =======================
Blockly.Blocks['drawer_pen_down'] = {
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
Blockly.JavaScript['drawer_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['drawer_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['drawer_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['drawer_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['drawer_pen_down'] = function( block ) {
  var code = 'penDown(\'' + block.id + '\')\n';
  return code;
  };

//======================= ПОДНИМИ ПЕРО =======================
Blockly.Blocks['drawer_pen_up'] = {
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
Blockly.JavaScript['drawer_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['drawer_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['drawer_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['drawer_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['drawer_pen_up'] = function( block ) {
  var code = 'penUp(\'' + block.id + '\')\n';
  return code;
  };

//======================= В ТОЧКУ =======================
Blockly.Blocks['drawer_point'] = {
  init: function() {
   this.appendValueInput("ABSX")
        .setCheck("Number")
        .appendField("в точку (");
    this.appendValueInput("ABSY")
        .setCheck("Number")
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Чертёжник движется в точку с заданными координатами");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['drawer_point'] = function( block ) {
  var absX = Blockly.JavaScript.valueToCode(block, 'ABSX', Blockly.JavaScript.ORDER_ATOMIC);
  var absY = Blockly.JavaScript.valueToCode(block, 'ABSY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Python['drawer_point'] = function( block ) {
  var absX = Blockly.Python.valueToCode(block, 'ABSY', Blockly.JavaScript.ORDER_ATOMIC);
  var absY = Blockly.Python.valueToCode(block, 'ABSX', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ')\n';
  return code;
  };

Blockly.PHP['drawer_point'] = function( block ) {
  var absX = Blockly.PHP.valueToCode(block, 'ABSX', Blockly.JavaScript.ORDER_ATOMIC);
  var absY = Blockly.PHP.valueToCode(block, 'ABSY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Dart['drawer_point'] = function( block ) {
  var absX = Blockly.Dart.valueToCode(block, 'ABSX', Blockly.JavaScript.ORDER_ATOMIC);
  var absY = Blockly.Dart.valueToCode(block, 'ABSY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Lua['drawer_point'] = function( block ) {
  var absX = Blockly.Lua.valueToCode(block, 'ABSX', Blockly.JavaScript.ORDER_ATOMIC);
  var absY = Blockly.Lua.valueToCode(block, 'ABSY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ')\n';
  return code;
  };

Blockly.Blocks['drawer_point_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("в точку (")
        .appendField( new Blockly.FieldNumber(10), "ABSX" )
        .appendField(",")
        .appendField( new Blockly.FieldNumber(10), "ABSY" )
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Чертёжник движется в заданную точку");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['drawer_point_simple'] = function( block ) {
  var absX = block.getFieldValue('ABSX');
  var absY = block.getFieldValue('ABSY');
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Python['drawer_point_simple'] = function( block ) {
  var absX = block.getFieldValue('ABSX');
  var absY = block.getFieldValue('ABSY');
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ')\n';
  return code;
  };

Blockly.PHP['drawer_point_simple'] = function( block ) {
  var absX = block.getFieldValue('ABSX');
  var absY = block.getFieldValue('ABSY');
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Dart['drawer_point_simple'] = function( block ) {
  var absX = block.getFieldValue('ABSX');
  var absY = block.getFieldValue('ABSY');
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ');\n';
  return code;
  };

Blockly.Lua['drawer_point_simple'] = function( block ) {
  var absX = block.getFieldValue('ABSX');
  var absY = block.getFieldValue('ABSY');
  var code = 'toPoint(\'' + block.id + '\', ' + absX + ', ' + absY + ')\n';
  return code;
  };

//======================= ВЕКТОР =======================
Blockly.Blocks['drawer_vector'] = {
  init: function() {
   this.appendValueInput("DELTAX")
        .setCheck("Number")
        .appendField("вектор (");
    this.appendValueInput("DELTAY")
        .setCheck("Number")
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Чертёжник перемещается на вектор");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['drawer_vector'] = function( block ) {
  var deltaX = Blockly.JavaScript.valueToCode(block, 'DELTAX', Blockly.JavaScript.ORDER_ATOMIC);
  var deltaY = Blockly.JavaScript.valueToCode(block, 'DELTAY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Python['drawer_vector'] = function( block ) {
  var deltaX = Blockly.Python.valueToCode(block, 'DELTAX', Blockly.JavaScript.ORDER_ATOMIC);
  var deltaY = Blockly.Python.valueToCode(block, 'DELTAY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ')\n';
  return code;
  };

Blockly.PHP['drawer_vector'] = function( block ) {
  var deltaX = Blockly.PHP.valueToCode(block, 'DELTAX', Blockly.JavaScript.ORDER_ATOMIC);
  var deltaY = Blockly.PHP.valueToCode(block, 'DELTAY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Dart['drawer_vector'] = function( block ) {
  var deltaX = Blockly.Dart.valueToCode(block, 'DELTAX', Blockly.JavaScript.ORDER_ATOMIC);
  var deltaY = Blockly.Dart.valueToCode(block, 'DELTAY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Lua['drawer_vector'] = function( block ) {
  var deltaX = Blockly.Lua.valueToCode(block, 'DELTAX', Blockly.JavaScript.ORDER_ATOMIC);
  var deltaY = Blockly.Lua.valueToCode(block, 'DELTAY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ')\n';
  return code;
  };

Blockly.Blocks['drawer_vector_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вектор (")
        .appendField( new Blockly.FieldNumber(10), "DELTAX" )
        .appendField(",")
        .appendField( new Blockly.FieldNumber(10), "DELTAY" )
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Чертёжник перемещается на вектор");
    this.setHelpUrl("");
    }
  };

Blockly.JavaScript['drawer_vector_simple'] = function( block ) {
  var deltaX = block.getFieldValue('DELTAX');
  var deltaY = block.getFieldValue('DELTAY');
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Python['drawer_vector_simple'] = function( block ) {
  var deltaX = block.getFieldValue('DELTAX');
  var deltaY = block.getFieldValue('DELTAY');
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ')\n';
  return code;
  };

Blockly.PHP['drawer_vector_simple'] = function( block ) {
  var deltaX = block.getFieldValue('DELTAX');
  var deltaY = block.getFieldValue('DELTAY');
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Dart['drawer_vector_simple'] = function( block ) {
  var deltaX = block.getFieldValue('DELTAX');
  var deltaY = block.getFieldValue('DELTAY');
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ');\n';
  return code;
  };

Blockly.Lua['drawer_vector_simple'] = function( block ) {
  var deltaX = block.getFieldValue('DELTAX');
  var deltaY = block.getFieldValue('DELTAY');
  var code = 'vector(\'' + block.id + '\', ' + deltaX + ', ' + deltaY + ')\n';
  return code;
  };

//======================= ЦВЕТ ПЕРА =======================
Blockly.Blocks['drawer_colour'] = {
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

Blockly.JavaScript['drawer_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Python['drawer_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ')\n';
};

Blockly.PHP['drawer_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Dart['drawer_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Lua['drawer_colour'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'penColour(\'' + block.id + '\', ' + colour + ')\n';
};

//======================= ЗАЛИТЬ =================
Blockly.Blocks['drawer_fill'] = {
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

Blockly.JavaScript['drawer_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Python['drawer_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ')\n';
};

Blockly.PHP['drawer_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Dart['drawer_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ');\n';
};

Blockly.Lua['drawer_fill'] = function(block) {
  var colour = "'" + block.getFieldValue('COLOUR') + "'";
  return 'floodFill(\'' + block.id + '\', ' + colour + ')\n';
};

//======================= ЗАЛИТЬ ЦВЕТОМ № =================
Blockly.Blocks['drawer_fill_no'] = {
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
Blockly.JavaScript['drawer_fill_no'] = function( block ) {
  var colourNo = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Python['drawer_fill_no'] = function( block ) {
  var colourNo = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ')\n';
  return code;
  };

Blockly.PHP['drawer_fill_no'] = function( block ) {
  var colourNo = Blockly.PHP.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Dart['drawer_fill_no'] = function( block ) {
  var colourNo = Blockly.Dart.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ');\n';
  return code;
  };

Blockly.Lua['drawer_fill_no'] = function( block ) {
  var colourNo = Blockly.Lua  .valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'floodFillNo(\'' + block.id + '\', ' + colourNo + ')\n';
  return code;
  };

//======================= INIT ROBOT API =======================
function initRobotApi( interpreter, globalObject ) {
    var wrapper;

    //--- ПОКАЖИСЬ - СКРОЙСЯ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( DrawerShow( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'show',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( DrawerHide( blockId ) );
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

    //--- В ТОЧКУ (  X, Y ) ---
    wrapper = function( blockId, absX, absY ) {
      return interpreter.createPrimitive( DrawerToPoint( blockId, absX, absY ) );
      };  
    interpreter.setProperty( globalObject, 'toPoint',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ВЕКТОР ( DELTAX, DELTAY ) ---
    wrapper = function( blockId, deltaX, deltaY ) {
      return interpreter.createPrimitive( DrawerVector( blockId, deltaX, deltaY ) );
      };  
    interpreter.setProperty( globalObject, 'vector',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ЦВЕТ ---
    wrapper = function( blockId, colour ) {
      return interpreter.createPrimitive( DrawerColour( blockId, colour ) );
      };  
    interpreter.setProperty( globalObject, 'penColour',
      interpreter.createNativeFunction( wrapper ) 
      );    

    //--- ЗАЛИТЬ ---
    wrapper = function( blockId, colour ) {
      return interpreter.createPrimitive( DrawerFill( blockId, colour ) );
      };  
    interpreter.setProperty( globalObject, 'floodFill',
      interpreter.createNativeFunction( wrapper ) 
      );    

    wrapper = function( blockId, colourNo ) {
      return interpreter.createPrimitive( DrawerFillNo( blockId, colourNo ) );
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
//======================= DRAWER COMMANDS =======================
function DrawerShow( blockId ) {
  scheduleDrawerShow( blockId, true );
  }
function DrawerHide( blockId ) {
  scheduleDrawerShow( blockId, false );
  }
function PenDown( blockId ) {
  schedulePenDown( blockId, true );
  }
function PenUp( blockId ) {
  schedulePenDown( blockId, false );
  }
function DrawerToPoint( blockId, absX, absY ) {
  scheduleDrawerMove( blockId, absX, absY );
  }
function DrawerVector( blockId, deltaX, deltaY ) {
  scheduleDrawerMoveRel( blockId, deltaX, deltaY );
  }
function DrawerColour( blockId, colour ) {
  scheduleDrawerColour( blockId, colour );
  }
function DrawerFill( blockId, colour ) {
  scheduleDrawerFill( blockId, colour );
  }
function DrawerFillNo( blockId, colourNo ) {
  if( colourNo < 0 ) colourNo = - colourNo;
  colourNo = colourNo % 16;
  var colors = [ '#000000', '#003399', '#339933', '#009999', 
                 '#990033', '#990066', '#663300', '#cccccc',
                 '#999999', '#0066ff', '#66ff33', '#33ffff',
                 '#ff3333', '#cc0099', '#ffff33', '#ffffff'];
  scheduleDrawerFill( blockId, colors[colourNo] );
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
      //================ Added by K. Polyakov 13.10.2020
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
//      block.setAttribute('gap', Blockly.Blocks['variables_get'] ? 20 : 8);
      block.setAttribute('gap', Blockly.Blocks['math_decrease'] ? 8 : 24);
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

       //================ Added by K. Polyakov 03.11.2021
    if (Blockly.Blocks['math_decrease']) {
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'math_decrease');
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
      //================ End

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
