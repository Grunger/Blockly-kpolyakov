/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, блоки управления Роботом
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

Blockly.Msg["ROBOT_HUE"] = "230";
Blockly.Msg["BKY_ROBOT_HUE"] = "230";
Blockly.Msg["CONDITION_HUE"] = "30";
Blockly.Msg["BKY_CONDITION_HUE"] = "30";

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

//======================= ВПЕРЕД =======================
Blockly.Blocks['robot_forward'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .appendField("вперёд на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот движется вперёд");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_forward'] = function( block ) {
  var times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Python['robot_forward'] = function( block ) {
  var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

Blockly.PHP['robot_forward'] = function( block ) {
  var times = Blockly.PHP.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Dart['robot_forward'] = function( block ) {
  var times = Blockly.Dart.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ');\n';
  return code;
  };

Blockly.Lua['robot_forward'] = function( block ) {
  var times = Blockly.Lua.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'forward(\'' + block.id + '\', ' + times + ')\n';
  return code;
  };

//======================= ВПЕРЕД на 1 =======================
Blockly.Blocks['robot_forward_once'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("вперёд");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот движется вперёд на одну клетку");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_forward_once'] = function( block ) {
  var code = 'forwardOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['robot_forward_once'] = function( block ) {
  var code = 'forwardOnce(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['robot_forward_once'] = function( block ) {
  var code = 'forwardOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['robot_forward_once'] = function( block ) {
  var code = 'forwardOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['robot_forward_once'] = function( block ) {
  var code = 'forwardOnce(\'' + block.id + '\')\n';
  return code;
  };

//======================= НАЗАД =======================
Blockly.Blocks['robot_back'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .appendField("назад на");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот движется назад");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_back'] = function(block) {
  var times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times +  ');\n';
  return code;
  };

Blockly.Python['robot_back'] = function(block) {
  var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times +  ')\n';
  return code;
  };

Blockly.PHP['robot_back'] = function(block) {
  var times = Blockly.PHP.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times +  ');\n';
  return code;
  };

Blockly.Dart['robot_back'] = function(block) {
  var times = Blockly.Dart.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times +  ');\n';
  return code;
  };

Blockly.Lua['robot_back'] = function(block) {
  var times = Blockly.Lua.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'back(\'' + block.id + '\', ' + times +  ')\n';
  return code;
  };

//======================= НАЗАД на 1 =======================
Blockly.Blocks['robot_back_once'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("назад");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот движется назад на одну клетку");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_back_once'] = function( block ) {
  var code = 'backOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Python['robot_back_once'] = function( block ) {
  var code = 'backOnce(\'' + block.id + '\')\n';
  return code;
  };

Blockly.PHP['robot_back_once'] = function( block ) {
  var code = 'backOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Dart['robot_back_once'] = function( block ) {
  var code = 'backOnce(\'' + block.id + '\');\n';
  return code;
  };

Blockly.Lua['robot_back_once'] = function( block ) {
  var code = 'backOnce(\'' + block.id + '\')\n';
  return code;
  };

//======================= НАЛЕВО =======================
Blockly.Blocks['robot_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("поверни налево");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот поворачивается налево");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_left'] = function(block) {
  var code = 'turnLeft(\''+ block.id + '\');\n';
  return code;
};

Blockly.Python['robot_left'] = function(block) {
  var code = 'turnLeft(\''+ block.id + '\')\n';
  return code;
};

Blockly.PHP['robot_left'] = function(block) {
  var code = 'turnLeft(\''+ block.id + '\');\n';
  return code;
};

Blockly.Dart['robot_left'] = function(block) {
  var code = 'turnLeft(\''+ block.id + '\');\n';
  return code;
};

Blockly.Lua['robot_left'] = function(block) {
  var code = 'turnLeft(\''+ block.id + '\')\n';
  return code;
};

//======================= НАПРАВО =======================
Blockly.Blocks['robot_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("поверни направо");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот поворачивается направо");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_right'] = function( block ) {
  var code = 'turnRight(\'' + block.id + '\');\n';
  return code;
};

Blockly.Python['robot_right'] = function( block ) {
  var code = 'turnRight(\'' + block.id + '\')\n';
  return code;
};

Blockly.PHP['robot_right'] = function( block ) {
  var code = 'turnRight(\'' + block.id + '\');\n';
  return code;
};

Blockly.Dart['robot_right'] = function( block ) {
  var code = 'turnRight(\'' + block.id + '\');\n';
  return code;
};

Blockly.Lua['robot_right'] = function( block ) {
  var code = 'turnRight(\'' + block.id + '\')\n';
  return code;
};

//======================= ПОСАДИ =======================
Blockly.Blocks['robot_plant'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("посади");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["ROBOT_HUE"]);
    this.setTooltip("Робот сажает цветы");
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_plant'] = function( block ) {
  var code = 'plant(\'' + block.id + '\');\n';
  return code;
};

Blockly.Python['robot_plant'] = function( block ) {
  var code = 'plant(\'' + block.id + '\')\n';
  return code;
};

Blockly.PHP['robot_plant'] = function( block ) {
  var code = 'plant(\'' + block.id + '\');\n';
  return code;
};

Blockly.Dart['robot_plant'] = function( block ) {
  var code = 'plant(\'' + block.id + '\');\n';
  return code;
};

Blockly.Lua['robot_plant'] = function( block ) {
  var code = 'plant(\'' + block.id + '\')\n';
  return code;
};

//======================= ВПЕРЕДИ СВОБОДНО =======================
Blockly.Blocks['robot_free_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "впереди свободно" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что впереди свободно" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_free_forward'] = function( block ) {
  var code = 'freeForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_free_forward'] = function( block ) {
  var code = 'freeForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_free_forward'] = function( block ) {
  var code = 'freeForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_free_forward'] = function( block ) {
  var code = 'freeForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_free_forward'] = function( block ) {
  var code = 'freeForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СЗАДИ СВОБОДНО =======================
Blockly.Blocks['robot_free_back'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "сзади свободно" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что сзади свободно" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_free_back'] = function( block ) {
  var code = 'freeBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_free_back'] = function( block ) {
  var code = 'freeBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_free_back'] = function( block ) {
  var code = 'freeBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_free_back'] = function( block ) {
  var code = 'freeBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_free_back'] = function( block ) {
  var code = 'freeBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СЛЕВА СВОБОДНО =======================
Blockly.Blocks['robot_free_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "слева свободно" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что слева свободно" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_free_left'] = function( block ) {
  var code = 'freeLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_free_left'] = function( block ) {
  var code = 'freeLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_free_left'] = function( block ) {
  var code = 'freeLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_free_left'] = function( block ) {
  var code = 'freeLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_free_left'] = function( block ) {
  var code = 'freeLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СЛЕВА СВОБОДНО =======================
Blockly.Blocks['robot_free_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "справа свободно" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что справа свободно" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_free_right'] = function( block ) {
  var code = 'freeRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_free_right'] = function( block ) {
  var code = 'freeRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_free_right'] = function( block ) {
  var code = 'freeRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_free_right'] = function( block ) {
  var code = 'freeRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_free_right'] = function( block ) {
  var code = 'freeRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= ВПЕРЕДИ СТЕНА =======================
Blockly.Blocks['robot_wall_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "впереди стена" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что впереди стена" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_wall_forward'] = function( block ) {
  var code = 'wallForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_wall_forward'] = function( block ) {
  var code = 'wallForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_wall_forward'] = function( block ) {
  var code = 'wallForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_wall_forward'] = function( block ) {
  var code = 'wallForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_wall_forward'] = function( block ) {
  var code = 'wallForward(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СЗАДИ СТЕНА =======================
Blockly.Blocks['robot_wall_back'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "сзади стена" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что сзади стена" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_wall_back'] = function( block ) {
  var code = 'wallBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_wall_back'] = function( block ) {
  var code = 'wallBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_wall_back'] = function( block ) {
  var code = 'wallBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_wall_back'] = function( block ) {
  var code = 'wallBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_wall_back'] = function( block ) {
  var code = 'wallBack(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СЛЕВА СТЕНА =======================
Blockly.Blocks['robot_wall_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "слева стена" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что слева стена" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_wall_left'] = function( block ) {
  var code = 'wallLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_wall_left'] = function( block ) {
  var code = 'wallLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_wall_left'] = function( block ) {
  var code = 'wallLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_wall_left'] = function( block ) {
  var code = 'wallLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_wall_left'] = function( block ) {
  var code = 'wallLeft(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= СПРАВА СТЕНА =======================
Blockly.Blocks['robot_wall_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "справа стена" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что справа стена" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_wall_right'] = function( block ) {
  var code = 'wallRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_wall_right'] = function( block ) {
  var code = 'wallRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_wall_right'] = function( block ) {
  var code = 'wallRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_wall_right'] = function( block ) {
  var code = 'wallRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_wall_right'] = function( block ) {
  var code = 'wallRight(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= БАЗА =======================
Blockly.Blocks['robot_base_here'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( "здесь база" );
    this.setOutput( true , "Boolean" );
    this.setColour( Blockly.Msg["CONDITION_HUE"] );
    this.setTooltip( "Определяет, верно ли, что Робот пришёл на Базу" );
    this.setHelpUrl("");
    }
  };
Blockly.JavaScript['robot_base_here'] = function( block ) {
  var code = 'baseHere(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['robot_base_here'] = function( block ) {
  var code = 'baseHere(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PHP['robot_base_here'] = function( block ) {
  var code = 'baseHere(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Dart['robot_base_here'] = function( block ) {
  var code = 'baseHere(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Lua['robot_base_here'] = function( block ) {
  var code = 'baseHere(\'' + block.id + '\')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//======================= INIT ROBOT API =======================
function initRobotApi( interpreter, globalObject ) {
    var wrapper;
    //--- НАЛЕВО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotLeft(blockId) );
      };  
    interpreter.setProperty( globalObject, 'turnLeft',
      interpreter.createNativeFunction( wrapper ) 
      );    
    //--- НАПРАВО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotRight(blockId) );
      };  
    interpreter.setProperty( globalObject, 'turnRight',
      interpreter.createNativeFunction( wrapper ) 
      );    
    //--- ПОСАДИ ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotPlant(blockId) );
      };  
    interpreter.setProperty( globalObject, 'plant',
      interpreter.createNativeFunction( wrapper ) 
      );    
    //--- ВПЕРЁД ---
    wrapper = function( blockId, steps ) {
      return interpreter.createPrimitive( RobotForward( blockId, steps ) );
      };  
    interpreter.setProperty( globalObject, 'forward',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotForwardOnce( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'forwardOnce',
      interpreter.createNativeFunction( wrapper ) 
      );    
    //--- НАЗАД ---
    wrapper = function( blockId, steps  ) {
      return interpreter.createPrimitive( RobotBack( blockId, steps ) );
      };  
    interpreter.setProperty( globalObject, 'back',
      interpreter.createNativeFunction( wrapper ) 
      );    
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotBackOnce( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'backOnce',
      interpreter.createNativeFunction( wrapper ) 
      );    
    //--- ВПЕРЕДИ СВОБОДНО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotFreeForward( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'freeForward',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СЗАДИ СВОБОДНО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotFreeBack( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'freeBack',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СЛЕВА СВОБОДНО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotFreeLeft( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'freeLeft',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СПРАВА СВОБОДНО ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotFreeRight( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'freeRight',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- ВПЕРЕДИ СТЕНА ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotWallForward( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'wallForward',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СЗАДИ СТЕНА ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotWallBack( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'wallBack',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СЛЕВА СТЕНА ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotWallLeft( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'wallLeft',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СПРАВА СТЕНА ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotWallRight( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'wallRight',
      interpreter.createNativeFunction( wrapper ) 
      );       
    //--- СПРАВА СТЕНА ---
    wrapper = function( blockId ) {
      return interpreter.createPrimitive( RobotBaseHere( blockId ) );
      };  
    interpreter.setProperty( globalObject, 'baseHere',
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
function RobotLeft( blockId ) {
  scheduleRobotLeft( blockId );
  }
function RobotRight( blockId ) {
  scheduleRobotRight( blockId );
  }
function RobotForward( blockId, steps ) {
  scheduleRobotForward( blockId, steps );
  }
function RobotBack( blockId, steps) {
  scheduleRobotBack( blockId, steps );
  }
function RobotForwardOnce( blockId ) {
  scheduleRobotForward( blockId, 1  );
  }
function RobotBackOnce( blockId ) {
  scheduleRobotBack( blockId, 1 );
  }
function RobotPlant( blockId ) {
  schedulePlant( blockId );
  }
function RobotFreeForward( blockId ) {
  return isFreeForward( blockId );
  }  
function RobotFreeBack( blockId ) {
  return isFreeBack( blockId );
  }  
function RobotFreeLeft( blockId ) {
  return isFreeLeft( blockId );
  }  
function RobotFreeRight( blockId ) {
  return isFreeRight( blockId );
  }  
function RobotWallForward( blockId ) {
  return ! isFreeForward( blockId );
  }  
function RobotWallBack( blockId ) {
  return ! isFreeBack( blockId );
  }  
function RobotWallLeft( blockId ) {
  return ! isFreeLeft( blockId );
  }  
function RobotWallRight( blockId ) {
  return ! isFreeRight( blockId );
  }  
function RobotBaseHere( blockId ) {
  return isBaseHere( blockId );
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
