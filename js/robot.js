/**
 * @license
 * Copyright 2020 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Робот-Blockly, основной файл, описывающий поведение Робота
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/East/South/West squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
var tileShapes = {
  '0000': [0, 0],  // Single
  '0001': [0, 1],
  '0010': [0, 2],
  '0011': [0, 3],
  '0100': [1, 0],
  '0101': [1, 1],
  '0110': [1, 2],
  '0111': [1, 3],
  '1000': [2, 0],  
  '1001': [2, 1],
  '1010': [2, 2],
  '1110': [2, 3],
  '1100': [3, 0],
  '1101': [3, 1],
  '1011': [3, 2],
  '1111': [3, 3],
  '.': [4, 0],
  'x': [4, 1],
  'p': [4, 2],
  'b': [4, 3],
};

//======================= GLOBALS =======================
String.prototype.replaceAt = function( index, replacement ) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var robotInterpreter = null;
var workspace = {};
var programCode = [];
var firstStep = true;

var fileName = '';
var Level = 1;
var LevelVariant = 1;
var runFromVariant = -1;
var MAXVARIANTS = 1;

var LevelsDone = 0;
var LevelsTouched = 0;
var LevelsDoneKey;
var LevelsTouchedKey;

var LevelProgramKey;

var LevelSolutionRating = -1; // нет решения
var LevelSolutionRatingKey;
var allRatings = [0];

var AnimationDelayKey;
var MAXLEVEL = 10;
var map;
var baseMap;

var tiles = 'media/tiles.png';   // tiles: A 160x200 set of 20 map images.
var robot = 'media/robot.png';   // robot: A 320x40 set of 8 robot images.
var lidar = 'media/lidar.png';   // robot: A 200x40 set of 5 lidar images.

var squareType = {
  WALL: 'w',
  EMPTY: '.',
  TARGET: 'x',
  RTARGET: 'X',
  PAINTED: 'p',
  BASE: 'b',
  ROBOT: '0246XYZWBCDE'
};

var ROWS;
var COLS;
var SQUARE_SIZE = 40;
var MAZE_WIDTH;
var MAZE_HEIGHT;

var startPos = { 'x': 0, 'y': 0 };
var robotPos = { 'x': 0, 'y': 0 };
var virtualPos = { 'x': 0, 'y': 0 };

var direction = {
  NORTH: 0,
  EAST: 2,
  SOUTH: 4,
  WEST: 6
};

var startDirection = direction.NORTH;
var robotDirection = direction.NORTH;
var virtualDirection = direction.NORTH;

var robotMoveCount = 0;
var robotSensorCount = 0;

var sliderScale = 500;
var animationDelay = 50;

var sensorLightDelay = 500;
var runTypes = { NONE: -1, RUN: 0, STEP: 1 };
var runType = runTypes.NONE;

//======================= SHOW HELP =======================
function showHelp( header = "Справка" ) {
	var content = HelpContent[ Level ];
	if( content.length  && !(LevelsDone & (1 << (Level-1))) )
	  Blockly.alert( header, content, { top: '3em' } );
}

//======================= INIT APPLICATION =======================
function initApplication() { // widthProgram, heightProgram ) {
  var header = document.querySelector("title").innerHTML;	
  MAXLEVEL = Maps.length - 1; // Level 0 not used
  Level = getLevel();
  document.write( robotHTML( header ) ); //, widthProgram, heightProgram) ); 
  document.write( BlocklyBlocks(Level) );
  initRobot();
  window.addEventListener( "beforeunload", 
    function( e ) {
      if( workspace.getAllBlocks().length > 1 )        
        saveProgramToSessionStorage( false );
      return true; }
    );
}

function getParameterByName( name, url, defaultValue = '' ) {
  if( ! url ) url = window.location.search;
  var val = url.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
}

function getLevel() {
  var thisLevel = parseInt( getParameterByName( 'level', null, '1' ) );
  if( thisLevel < 1  ||  thisLevel > MAXLEVEL) 
  	thisLevel = 1;
  return thisLevel;  
}

//======================= INIT ROBOT =======================
var editor;
var blocklyArea;
var blocklyDiv;

function adjustBlocklyArea() {
  var rect = workspace.getBlocksBoundingBox();
  var height = rect.bottom - rect.top;
  blocklyArea.style.height = Math.max( height + 20, 453 ) + 'px';
  onResize();
}

function onResize(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while( element );
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize( workspace );
};

function injectBlockly() {

  blocklyArea = document.getElementById('blocklyArea');
  blocklyDiv = document.getElementById('blocklyDiv');

  var totalBlockLimit = BlockLimit[Level];
  if( typeof totalBlockLimit == 'object' ) {
  	totalBlockLimit = Math.max.apply(null, totalBlockLimit);
  	if( [Infinity, -Infinity].includes(totalBlockLimit) ) 
  	  totalBlockLimit = Infinity; 	 
    }

  if( typeof someBlocksLimit == 'object' ) 
       someBlocksLimit = someBlocksLimit[Level];
  else someBlocksLimit = {};

  workspace = Blockly.inject( blocklyDiv,
    { 
    media: './media/', 
    trashcan: true, 
    maxBlocks: totalBlockLimit + 1,  // +1 на блок Программа
    maxInstances: someBlocksLimit,
    move: {drag: false, scrollbars: false, wheel: false},
    toolbox: document.getElementById('toolbox') 
    } );

  workspace.addChangeListener( adjustBlocklyArea );
  window.addEventListener( 'resize', onResize, false );
  // onResize();
  setTimeout( onResize, 500 );
  // Blockly.svgResize( workspace );
}


function initRobot() {

  fileName = window.location.pathname.replace(/^.*[\\\/]/g, '');

  LevelsDoneKey = fileName + '_robotLevelsDone';  
  LevelsTouchedKey = fileName + '_robotLevelsTouched';  
  LevelProgramKey = fileName + '_' + Level;
  LevelSolutionRatingKey = fileName + '_rating_' + Level;
  AnimationDelayKey = fileName + '_animationDelay';

  (new Image()).src = './media/gold-kubok.jpg';
  (new Image()).src = './media/silver-kubok.jpg';
  (new Image()).src = './media/big-star.gif';

  injectBlockly();
  setCustomColors();

  if( typeof initThisApplication == 'function' )
  	initThisApplication();

  freshRemainingBlocks();
  workspace.addChangeListener( function() { 
    var runButton = document.getElementById('runButton');
    if( runButton.style.display == "none" )  
      reset();
   	loadCodeToEditor();
	freshRemainingBlocks();
	} );

  editor = ace.edit("editor");
  editor.setTheme("ace/theme/xcode");
  editor.session.setMode("ace/mode/python");
  editor.session.setUseWorker(false);  // disable syntax check
  editor.setReadOnly(true);

  drawMap();

  loadProgramFromSessionStorage();  
  loadLevelsDone();
  loadAllRatings();

  initializeSlider( sliderChangedCallback );

  showHelp();
}

//======================= SET CUSTOM COLORS =======================
function setCustomColors() {
  var blockStyles = {
   "main_block": {
      "colourPrimary": "#47878a",
      "colourSecondary": "#4c9297",
      "colourTertiary": "#356063"
      },
   };
  var robotTheme = Blockly.Theme.defineTheme( 'robot_theme', 
    {
    'base': Blockly.Themes.Classic,
    'blockStyles': blockStyles,
    //'startHats': true
    });
  workspace.setTheme( robotTheme );
}

//======================= FRESH REMAINING BLOCKS =======================
function textRemainingBlocks( remains ) {
  var blocksName;
  var twoDigits = remains % 100;
  var lastDigit = remains % 10;
  if( 10 <= twoDigits  &&  twoDigits <= 20 )  
    blocksName = ' блоков';
  else if( lastDigit == 1 )
    blocksName = ' блок';
  else if( [2, 3, 4].includes(lastDigit) )
    blocksName = ' блока';
  else
    blocksName = ' блоков';
  return remains + blocksName;
}
function freshRemainingBlocks() {
  var remains = workspace.remainingCapacity();
  if( remains == Infinity) 
    document.getElementById('blockCount').style.display = "none";          
  else 
    document.getElementById('capacity').textContent = textRemainingBlocks(remains);          
}

//======================= LOAD USER XML PROGRAM =======================
function loadUserXMLProgram( xml_text ) {
	if( xml_text == null ) return;

	if( xml_text.trim() == '' )
	  Blockly.promptMultiline( "Введите программу для Робота в формате XML", 
	  	 '', loadUserXMLProgram, "Программа:", {} );
	else {
      var xml = Blockly.Xml.textToDom( xml_text );
      workspace.clear();
      Blockly.Xml.domToWorkspace( xml, workspace );    
	  }
}

//======================= STRIP CODE =======================
function stripCode( code ) {
  code = code.replace(/(\('[^']{10,}'\))/gm, '()'); // only block id
  code = code.replace(/(\('[^']+',[ ]*)/g, '(');  // block id and params after it
	code = code.replace(/_/g, '%');
	code = code.replace(/%%/g, '_%');
	try { code = decodeURIComponent(code); } catch (err) { }
	return code;
}

//======================= SLIDER =======================
function sliderChangedCallback( sliderValue ) {
  animationDelay = Math.round( sliderScale * Math.exp(-4*sliderValue) );
  if( ! window.sessionStorage ) { return; }  
  window.sessionStorage[AnimationDelayKey] = animationDelay.toString(); 
}

//======================= LOAD CODE TO EDITOR =======================
function loadCodeToEditor( selectLang = null ) {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code;
  if( ! selectLang ) 
    selectLang = document.getElementById("lang");
  if( lang.value == "py" ) {
    code = Blockly.Python.workspaceToCode( workspace );
    editor.session.setMode("ace/mode/python");
    }
  else if( lang.value == "php" ) {
    code = Blockly.PHP.workspaceToCode( workspace );
    editor.session.setMode("ace/mode/php");
    }
  else if( lang.value == "dart" ) {
    code = Blockly.Dart.workspaceToCode( workspace );
    editor.session.setMode("ace/mode/dart");
    }
  else if( lang.value == "lua" ) {
    code = Blockly.Lua.workspaceToCode( workspace );
    editor.session.setMode("ace/mode/lua");
    }
  else if( lang.value == "xml" ) {
    code = getXMLCode();
    editor.session.setMode("ace/mode/xml");
    }
  else {
    code = Blockly.JavaScript.workspaceToCode( workspace );
    editor.session.setMode("ace/mode/javascript");
    }
  if( lang.value == "xml" ) 
    editor.getSession().setUseWrapMode(true);
  else {
    editor.getSession().setUseWrapMode(false);
    code = stripCode( code );
    }
  editor.setValue( code, 1 );
}

//======================= LOAD PROGRAM FROM DISK =======================
function loadProgramFromDisk() {
  var file = document.getElementById('file-load').files[0];
  if( !file ) { return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
    loadUserXMLProgram( content );
    };
  reader.readAsText(file);
}

//======================= SAVE PROGRAM TO DISK =======================
function doSaveFile( fileName ) {
  var textToWrite = getXMLCode();
  var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
  if ( fileName.trim() == '' ) 
    fileName = 'программа';
  if ( fileName.indexOf('.') < 0 ) 
    fileName += '.xml';
  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  if ( window.webkitURL != null )  // Chrome allows the link to be clicked without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  else { // Firefox requires the link to be added to the DOM before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    }
  downloadLink.click();
}

function destroyClickedElement(event)
{
  document.body.removeChild(event.target);
}

function saveProgramToDisk()
{
	Blockly.prompt( "Сохранение файла", '', doSaveFile, "Введите имя файла", {} );
}

//======================= RUN CODE =======================
var runtimeError;
function runCode( isStepwise = false ) {

  var remains = workspace.remainingCapacity();
  if( remains < 0 ) {
    Blockly.alert( "Выполнение программы прервано", 
      "Ошибка: в программе использовано слишком много блоков. " +
      "Чтобы исправить ошибку, нужно убрать " + textRemainingBlocks(-remains) + "." );
    return; 
    }

  if( runType == runTypes.NONE ) {
  	runFromVariant = LevelVariant;
    if( isStepwise ) 
    	 runType = runTypes.STEP;
    else {
    	runType = runTypes.RUN;
    	var primary = false; 
    	drawMap( primary, 0 );
        }
    }  

  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  var stepButton = document.getElementById('stepButton');
  if( isStepwise ) {
    runButton.style.display = 'inline';
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    }
  else {
    runButton.style.display = 'none';
    stepButton.style.display = 'none';
    resetButton.style.display = 'inline';
    }

  if( programCode.length > 0 ) {   
    animateProgram( isStepwise );
    return;
    }

  // Не подсвечивать блоки при трансляции
  //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  //Blockly.JavaScript.addReservedWords( 'highlightBlock' );

  var code;
  //if( blockId ) { // Getting code for a specific block
  //  var block = workspace.getBlockById( blockId );
  //  code = Blockly.JavaScript.blockToCode( block ); 
  //  } 
  //else {
    code = Blockly.JavaScript.workspaceToCode( workspace );
  //  }

  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  robotInterpreter = new Interpreter( code, initRobotApi );

  virtualPos = { 'x': robotPos.x, 'y': robotPos.y };
  virtualDirection = robotDirection;

  programCode = [];
  firstStep = true;
  runtimeError = '';
  robotMoveCount = 0;
  robotSensorCount = 0;

  saveProgramToSessionStorage();

  stepCode( isStepwise );
  }

//======================= STEP CODE =======================
var timeToWait = 0;
var MAXPROGLENGTH = 5000;
function stepCode( isStepwise = false ) {

  while( robotInterpreter.step() && !runtimeError.length )
  	if( programCode.length > MAXPROGLENGTH ) {
  	  runtimeError = 'Программа остановлена: слишком много операций. Возможно зацикливание.';	
      programCode.push( [ null, 'cycle' ] );	
      } 

  if( runtimeError.length ) 
    console.log( runtimeError );
  else {
    console.log( 'OK.' );
    programCode.push( [ null, 'finish' ] );	
    }
  
  animateProgram( isStepwise );

  return;	
}

function addStepPause( blockId ) {
  if( ! firstStep ) 
    programCode.push( [ blockId, 'stepReady' ] );
  else
    firstStep = false;
}

//======================= RESET =======================
function stripRobot( shape ) {
  if( squareType.ROBOT.indexOf(shape) > -1 ) {
    if( "XYZW".indexOf(shape) > -1 ) shape = 'x';
    if( "BCDE".indexOf(shape) > -1 ) shape = 'b';
    }
  return shape;
}
function restoreField() {
  for( var y = 0; y < ROWS; y++ ) {
    for( var x = 0; x < COLS; x++ ) {
      var shape = stripRobot( baseMap[y][x] );
      if( shape != map[y][x] )
      	changeTileTo( x, y, shape );
      }
    }  
  map = Array.from( baseMap );
}

function reset() {

  runtimeError = 'Выполнение прервано пользователем';

  workspace.highlightBlock( null );

  var runButton = document.getElementById('runButton');
  runButton.style.display = 'inline';
  var stepButton = document.getElementById('stepButton');
  stepButton.style.display = 'inline';
  var resetButton = document.getElementById('resetButton');
  resetButton.style.display = 'none';

  programCode = [];
  robotMoveCount = 0;
  robotSensorCount = 0;
  freshOperationCounters();

  
  if( MAXVARIANTS == 1 )
    restoreField();
  else if( runFromVariant > - 1 ) {
    var primary = false; 
    drawMap( primary, runFromVariant );
    }

  moveRobotTo( startPos.x, startPos.y );
  turnRobot( startDirection );
  
  runType = runTypes.NONE;
  runFromVariant = -1;

}

function showResetButton() {
  var runButton = document.getElementById('runButton');
  runButton.style.display = 'none';
  var stepButton = document.getElementById('stepButton');
  stepButton.style.display = 'none';
  var resetButton = document.getElementById('resetButton');
  resetButton.style.display = 'inline';
}

//======================= PROGRAM ANIMATION =======================
function freshOperationCounters() {
   var counters = document.getElementById('counters');
   if( robotMoveCount == 0 )
     counters.innerHTML = '';
   else
   	 counters.innerHTML = 'Выполнено операций: ' + Math.floor(robotMoveCount);
}

function animateProgram( isStepwise  = false ) {
    var stepPaused = false;
    
    var nextDelay = animationDelay;
    if( isStepwise ) nextDelay = 0;

	if( programCode.length > 0 ) {
      var operation = programCode.shift();
  	  var blockId = operation[0];
  	  var command = operation[1];
      highlightBlock( blockId );
      if( command == 'moveTo' ) {
	  	var xNew = operation[2];
	  	var yNew = operation[3];
	  	moveRobotTo( xNew, yNew, blockId );
        robotMoveCount += 0.5;
        }
      else if( command == 'turn' ) {
      	var turnTo = operation[2];
   	    turnRobot( turnTo, blockId );
        robotMoveCount += 0.5;
 		}
      else if( command == 'plant' ) {
	  	var xPlantTo = operation[2];
	  	var yPlantTo = operation[3];
        paintTile( xPlantTo, yPlantTo );
        robotMoveCount += 1;
        }
      else if( ['crash','plantFail','cycle'].includes(command) ) {
        Blockly.alert( 'Ошибка во время выполнения программы', 
        	           runtimeError, { top: '10em' } );
        showResetButton();
        }
      else if( command == 'finish' ) {
      	if( ! isStepwise  &&  LevelVariant < MAXVARIANTS-1 ) {
      	  if( checkSolution() ) {
      	    var primary = false; 
    	    drawMap( primary, LevelVariant+1 );
    	    isStepwise = false;
      	    runCode( isStepwise );
            return;
      	    }	
      	  }
      	else {
          checkSolution();
          showResetButton();
          }
        }  
      else if( command == 'free_forward_1' ) {
      	lidarOn( direction.NORTH );
      	if( isStepwise ) 
      	  nextDelay = sensorLightDelay;
        }
      else if( command == 'free_right_1' ) {
      	lidarOn( direction.EAST );
      	if( isStepwise ) 
      	  nextDelay = sensorLightDelay;
        }
      else if( command == 'free_back_1' ) {
      	lidarOn( direction.SOUTH );
      	if( isStepwise ) 
      	  nextDelay = sensorLightDelay;
        }
      else if( command == 'free_left_1' ) {
      	lidarOn( direction.WEST );
      	if( isStepwise ) 
      	  nextDelay = sensorLightDelay;
        }
      else if( ['free_forward_0', 'free_right_0', 'free_back_0', 'free_left_0'].includes(command) ) {
      	lidarOff();
        }
      else if( command == 'stepReady' ) {
        if( programCode[0][1] == 'finish' ) // next command
          isStepwise = false;
        if( isStepwise ) 
          stepPaused = true;
        }  
	  }
	freshOperationCounters();  
	if( ! stepPaused && programCode.length > 0 ) 
	  setTimeout(  function() { animateProgram( isStepwise ); }, nextDelay );
}

//======================= GET-SET LEVELS DONE TOUCHED =======================
function saveLevelsDone() {
  // MSIE 11 does not support sessionStorage (or localStorage) on file:// URLs.
  if( typeof Blockly == undefined || ! window.sessionStorage ) { return; }  
  var text = LevelsDone.toString();
  window.sessionStorage[LevelsDoneKey] = text;
}

function loadLevelsDone()  {
  try {   	
    if( window.sessionStorage ) {
  	  LevelsDone = window.sessionStorage[LevelsDoneKey] || 0;
      LevelsTouched = window.sessionStorage[LevelsTouchedKey] || 0;
      LevelSolutionRating = window.sessionStorage[LevelSolutionRatingKey] || -1;
      }
    } 
  catch (e) {
    // Firefox sometimes throws a SecurityError when accessing localStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    LevelsDone = 0;
    LevelsTouched = 0;
    LevelSolutionRating = -1;
    }
  LevelsDone = parseInt(LevelsDone);
  LevelsTouched = parseInt(LevelsTouched);
  LevelSolutionRating = parseInt(LevelSolutionRating);

  var levelMenu = document.getElementById("levelMenu");
  for( var i=1; i<=MAXLEVEL; i++ ) { 
  	var Level_i_Rating = loadSolutionRating( i );
  	var doneClass = ratingClass(Level_i_Rating);
    if( i == Level ) {
      var span = document.createElement('span');
      span.className = "level_number";
      if( LevelsDone & (1 << (i-1)) ) 
        span.className += " " + doneClass;        
      else
        span.className += " level_fill";
	  span.id = "level" + i;
	  span.innerHTML = i.toString();
	  levelMenu.appendChild( span );
      }
    else if( i == MAXLEVEL ) {
      var link = document.createElement('a');
	  link.className = "level_number";
      if( LevelsDone & (1 << (i-1)) ) 
        link.className += ' ' + doneClass;        
      else if( LevelsTouched & (1 << (i-1)) ) 
        link.className += ' level_fill';        
	  link.id = "level" + i;
	  link.href = "?level=" + i;
	  link.innerHTML = i.toString();
	  levelMenu.appendChild( link );
      }
    else {
      var link = document.createElement('a');
	  link.className = "level_dot";
      if( LevelsDone & (1 << (i-1)) ) 
        link.className += " " + doneClass;
      else if( LevelsTouched & (1 << (i-1)) ) 
        link.className += ' level_fill';        
	  link.id = "level" + i;
	  link.href = "?level=" + i;
	  levelMenu.appendChild( link );
      }
    levelMenu.appendChild( document.createTextNode(" ") );
    }
  return parseInt(LevelsDone);
};

//======================= RATING CLASS =======================
function ratingClass( rating ) {
  switch( rating ) {
    case 5: return "level_best "; break;	
 	case 4: return "level_medium "; break;	
    case 1: case 2: case 3: return "level_done ";        
    default: return "";        
    }
}

//======================= CALCULATE SOLUTION RATING  =======================
function calculateSolutionRating() {
  LevelSolutionRating = 5;  
  if( typeof BlockLimit == "undefined" ) 
  	return;
  var grid = BlockLimit[Level];
  if( typeof grid == "undefined" ) 
  	return;
  if( typeof grid != "object" )
  	grid = [grid];
  var numberOfBlocks = workspace.getAllBlocks().length;
  for( var i=0; i < grid.length; i++ ) {
    if( numberOfBlocks <= grid[i] + 1 ) break;
    LevelSolutionRating -= 1;
    }  
}

//======================= LOAD SOLUTION RATING  =======================
function loadSolutionRating( someLevel )  { 
  var someLevelSolutionRatingKey = fileName + '_rating_' + someLevel;
  var someLevelRating = 0;
  try {   	
    if( window.sessionStorage ) 
      someLevelRating = window.sessionStorage[someLevelSolutionRatingKey] || 0;
    } 
  catch (e) { someLevelRating = 0; }
  return parseInt(someLevelRating);
}

//======================= LOAD ALL RATINGS  =======================
function loadAllRatings() {
  var totalRatings = 0;	
  for( var i=1; i <= MAXLEVEL; i++ ) {
    var Level_i_Rating = loadSolutionRating( i );
    allRatings.push( Level_i_Rating );
    totalRatings += Level_i_Rating;
    }
  if( totalRatings > 0 ) {
    document.getElementById("starDiv").style.display = "inline";
    document.getElementById("totalStars").innerHTML = totalRatings.toString();
    }
}

//======================= FRESH TOTAL RATING  =======================
function freshTotalRating() {
  var totalRatings = 0;	
  allRatings[Level] = LevelSolutionRating;
  for( var i=1; i <= MAXLEVEL; i++ ) 
  	if( allRatings[i] > 0)  
      totalRatings += allRatings[i];
  if( totalRatings > 0 ) {
    document.getElementById("starDiv").style.display = "inline";
    document.getElementById("totalStars").innerHTML = totalRatings.toString();
    }
}

//======================= MULTI MAP TEXT  =======================
function multiMapText() {
	return '' + (LevelVariant+1) + ' из ' + MAXVARIANTS;
}

//======================= SHOW MULTI MAP  =======================
function showMultiMap() {
  var rating = document.getElementById("rating");	
  var multi = document.getElementById("multimap");	
  if( rating.style.display == "none" &&
      MAXVARIANTS > 1 ) {
  	multi.style.display = "inline";
  	var countSpan = document.getElementById("mapcount");
  	countSpan.innerHTML = multiMapText();
    }
  else
  	multi.style.display = "none";
}

//======================= SHOW RATING  =======================
function showRating() {
  var rating = document.getElementById("rating");	
  if( ! rating ) return;
  if( LevelSolutionRating < 0 ) {
    rating.style.display = "none";
    if( MAXVARIANTS > 1 ) showMultiMap();
	return;
	}
  rating.style.display = "inline";
  showMultiMap();
  for( var i=1; i<=5; i++ ) {
    var star = document.getElementById('star'+i);
    if( star ) 
      if( i <= LevelSolutionRating ) 
      	   star.src = "./media/star.gif";
      else star.src = "./media/grey-star.gif";    
    }
}

//======================= USE SESSION STORAGE =======================
function saveProgramToSessionStorage( touched = true ) {
  // MSIE 11 does not support sessionStorage (or localStorage) on file:// URLs.
  if( typeof Blockly == undefined || ! window.sessionStorage ) { return; }  

  var xml_text = getXMLCode();
  window.sessionStorage[LevelProgramKey] = xml_text;

  if( touched ) {
    LevelsTouched |= 1 << (Level-1);
    var text = LevelsTouched.toString();
    window.sessionStorage[LevelsTouchedKey] = text;
  }
}

function saveSolutionRating() {
  if( LevelSolutionRating > 0)	
    window.sessionStorage[LevelSolutionRatingKey] = LevelSolutionRating.toString();
}

function loadProgramFromSessionStorage()  {
  var xml_text;	
  try { 
  	xml_text = window.sessionStorage[LevelProgramKey]; 
    } 
  catch (e) {
    // Firefox sometimes throws a SecurityError when accessing localStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    }

  if( typeof xml_text == 'undefined' ) { 
    if( typeof ReadyProgram == 'object' ) 
      xml_text = ReadyProgram[Level];
    if( typeof xml_text == 'undefined'  ||  xml_text.trim() == '' )
      xml_text = '<xml><block type="robot_program" deletable="false" movable="false"></block></xml>';
    }
  else {
    if( xml_text.indexOf('robot_program') < 0 ) {
      xml_text = xml_text.replace( 'xml">' , 'xml">' + 
	        '<block type="robot_program" deletable="false" movable="false"><next>' );
	  xml_text = xml_text.replace( '</xml>' , '</next></block></xml>' );
      }
    try { 
      LevelSolutionRating = window.sessionStorage[LevelSolutionRatingKey];       
      } 
    catch (e) {
      // Firefox sometimes throws a SecurityError when accessing localStorage.
      // Restarting Firefox fixes this, so it looks like a bug.
      LevelSolutionRating = -1;
      }  
    }
  LevelSolutionRating = LevelSolutionRating || -1;   

  var xml = Blockly.Xml.textToDom( xml_text );
  Blockly.Xml.domToWorkspace( xml, workspace );    
  
  workspace.addChangeListener( Blockly.Events.disableOrphans );

  showRating();

  return true;
};

function getXMLCode() {
  var xml = Blockly.Xml.workspaceToDom( workspace, true );
  // Remove x/y coordinates from XML if there's only one block stack.
  // There's no reason to store this, removing it helps with anonymity.
  if ( workspace.getTopBlocks(false).length == 1 && xml.querySelector) {
    var block = xml.querySelector('block');
    if( block ) {
      block.removeAttribute('x');
      block.removeAttribute('y');
      }
    }
  var xml_text = Blockly.Xml.domToText(xml);
  return xml_text;
}

//======================= NEXT LEVEL =======================
function nextLevel( agree ) {
	if( agree && Level < MAXLEVEL ) {
       window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?level=' + (Level + 1);
	  }
}

//======================= ADD/REMOVE CLASS =======================
function addClass( ID, className ) {
  var element = document.getElementById( ID );
  classList = element.className.split(" ");
  if( classList.indexOf(className) == -1 ) 
    element.className += " " + className;
}
function removeClass( ID, className ) {
  var element = document.getElementById( ID );
  var replaceRegex = "\b" + className + "\b";
  var re = new RegExp( replaceRegex, "g" );
  element.className = element.className.replace( re, "" );
}

//======================= FIX SOLUTION RESULTS =======================
function fixSolutionResults( levelDone ) {

  if( levelDone ) {
    LevelsDone |= 1 << (Level - 1);   	
    calculateSolutionRating();
    }
  else {	  	
    LevelsDone &= ~(1 << (Level - 1));   	
    LevelSolutionRating = -1;	
    }  

  var id = "level" + Level;
  document.getElementById( id ).className = "level_number " + ratingClass(LevelSolutionRating); 

  saveLevelsDone();    
  saveSolutionRating();
  showRating(); 
  freshTotalRating();
}

//======================= CHECK SOLUTION =======================
function checkSolution() {
  var targetCount = 0;
  var baseCoords = { 'x': -1, 'y': -1 };
  for( var y = 0; y < ROWS; y++ ) {
    for( var x = 0; x < COLS; x++ ) {
      var shape = map[y][x];
      if( shape == squareType.TARGET )
      	targetCount ++;
      if( shape == squareType.BASE )
      	baseCoords = { 'x': x, 'y': y };  
      }
    }
  var errorMessage = '';
  var result = true;
  if( targetCount ) 
    errorMessage = 'Не обработано грядок: ' + targetCount + '. ';       
  if( baseCoords.x > -1 && 
  	  map[robotPos.y][robotPos.x] != squareType.BASE )  
  	errorMessage += 'Робот не пришёл на Базу.';

  if( errorMessage.length ) {
  	errorMessage = '<div class="error">' + errorMessage + '</div>';
    Blockly.alert( "Решение задачи неполное", 
    	"Задача пока не решена." + 
    	errorMessage + 'Попробуй ещё раз.', { top: '10em' } );
    
    fixSolutionResults( false );     
    
    result = false;  
    }
  else if( runType == runTypes.STEP  &&  MAXVARIANTS > 1 ) {
  	message = "На этом поле Робот правильно выполнил задание. Если ты уверен, что оно " +
  	          "будет правильно работать и на других вариантах полей, запускай полную проверку. " +
  	          "Для этого нужно щёлкнуть по кнопке &laquo;Старт&raquo;.";
    Blockly.alert( "Задание выполнено",  message, { top: '10em' } );        

    fixSolutionResults( false );     

    result = true;  
  	}
  else if( runType == runTypes.RUN  &&  LevelVariant < MAXVARIANTS-1 ) {
  	result = true; // без сообщений
    }
  else { 

    fixSolutionResults( true );     

  	var greetings = "Поздравляем!";
  	var message = "Задача полностью решена! ";
    if( LevelSolutionRating == 5 ) 
    	message = '<table><tr><td><img src="./media/gold-kubok.jpg"></td><td style="padding-left:10px;">' + 
                  message + 
                  '<br>У тебя отличное решение, оно оценивается в пять' +
                  '<img src="./media/star.gif" class="star">! Твоя награда&nbsp;&ndash; ' +
                  'золотой кубок!<br>';
    else if( LevelSolutionRating == 4 ) 
    	message = '<table><tr><td><img src="./media/silver-kubok.jpg"></td><td style="padding-left:10px;">' + 
                  message + 
                  '<br>У тебя хорошее решение, но оно оценивается только в четыре' +
                  '<img src="./media/star.gif" class="star">. Есть решение, ' +
                  'в котором используется меньше блоков. Твоя награда&nbsp;&ndash; ' +
                  'серебряный кубок!<br>';
    else
    	message = 'Робот выполнил задание, но решение не очень хорошее: ' +
                  'ты использовал слишком много блоков. ';

  	if( Level == MAXLEVEL ) {
  	  message += "Ты прошёл последний уровень игры." +
  	             ( LevelSolutionRating >= 4 ? '</td></tr></table>': '');
      Blockly.alert( greetings,  message, { top: '10em' } ); 
  	  }
  	else {
  	  message += "Перейти на следующий уровень?" +
  	             ( LevelSolutionRating >= 4 ? '</td></tr></table>': '');
      Blockly.confirm( greetings,  message, 
      	   { top: '10em', okMessage: 'Да', cancelMessage: 'Нет'  }, nextLevel ); 
  	  }
    }

  return result;

}

//======================= TURN ROBOT =======================
function scheduleRobotLeft( blockId )  { scheduleTurn( -2, blockId ); }
function scheduleRobotRight( blockId ) { scheduleTurn( 2, blockId ); }

function scheduleTurn( byTotal, blockId ) {
  var direction1 = virtualDirection + byTotal/2;
  addStepPause( blockId );
  programCode.push( [ blockId, 'turn', direction1 ] );
  var direction2 = virtualDirection + byTotal;	
  programCode.push( [ blockId, 'turn', direction2 ] );
  virtualDirection = (virtualDirection + byTotal + 8) % 8;
}

function turnRobot( newDirection ) {
  robotDirection = (newDirection + 8) % 8;
  var robotClip = document.getElementById('robotClipRect');
  robotClip.setAttribute('x', robotPos.x*SQUARE_SIZE );
  moveRobotTo( robotPos.x, robotPos.y );
}

//======================= LIDAR =====================

function lidarShiftXY( robotDir, lookDir ) {
  if( robotDir % 2 == 1 )
    return { 'dx': 0, 'dy': 0 };
  var row = robotDir / 2;
  var col = lookDir / 2; 
  var shift = [
// look FORWARD   RIGHT      BACK       LEFT
    [[-10, -17], [10, 0],   [-6, 16],  [-15, 0],  ],  // direction.NORTH
    [[8, -6],    [-4, 11],  [-17, -6], [-4, -17], ],  // direction.EAST
    [[-8, 8],    [-17, -2], [-5, -16], [11, -2],  ],  // direction.SOUTH
    [[-16, -6],  [-4, -18], [10, -3],  [-4, 11],  ],  // direction.WEST
    ];
  return { 'dx': shift[row][col][0], 'dy': shift[row][col][1] };
}    

function setLidar( lookDirection, imageNo ) {
  var lidarIcon = document.getElementById('lidar');
  var dxy = lidarShiftXY( robotDirection, lookDirection );
  lidarIcon.setAttribute('x', (robotPos.x - imageNo)*SQUARE_SIZE + dxy['dx'] );
  lidarIcon.setAttribute('y', robotPos.y*SQUARE_SIZE + dxy['dy'] );
  var lidarClip = document.getElementById('lidarClipRect');
  lidarClip.setAttribute('x', robotPos.x*SQUARE_SIZE + dxy['dx'] );
  lidarClip.setAttribute('y', robotPos.y*SQUARE_SIZE + dxy['dy']);  
}

function lidarOn( lookDirection ) {
  var imageNo = 1 + ((robotDirection + lookDirection)/2) % 4;
  setLidar( lookDirection, imageNo );
}

function lidarOff() {
  setLidar( direction.NORTH, 0 );
}

//======================= LOOK FOR PATH =====================
function outsideField( x, y ) {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) 
      return 1;
  return 0;
}

function canMoveTo( xNew, yNew, withBorder = true ) {
  if( outsideField( xNew, yNew ) )
    return ! withBorder;
  var what = map[yNew][xNew];
  if( what == squareType.WALL  ||  what == squareType.PAINTED )
    return false;
  return true;
}

function isFreeForward( blockId ) { 
  addStepPause( blockId );
  programCode.push( [ blockId, 'free_forward_1' ] );	
  programCode.push( [ blockId, 'free_forward_0' ] );	
  return isFreePath( virtualDirection ); 
}
function isFreeRight( blockId ) { 
  addStepPause( blockId );
  programCode.push( [ blockId, 'free_right_1' ] );	
  programCode.push( [ blockId, 'free_right_0' ] );	
  return isFreePath( virtualDirection + 2 ); 
}
function isFreeBack( blockId ) { 
  addStepPause( blockId );
  programCode.push( [ blockId, 'free_back_1' ] );	
  programCode.push( [ blockId, 'free_back_0' ] );	
  return isFreePath( virtualDirection + 4 ); 
}
function isFreeLeft( blockId ) { 
  addStepPause( blockId );
  programCode.push( [ blockId, 'free_left_1' ] );	
  programCode.push( [ blockId, 'free_left_0' ] );	
  return isFreePath( virtualDirection + 6 ); 
}

function isFreePath( lookDirection ) {
  lookDirection = (lookDirection + 8) % 8;	
  var newPos = { 'x': virtualPos.x,  'y': virtualPos.y };
  switch( lookDirection ) {
    case direction.NORTH: newPos.y -= 1; break; 
    case direction.EAST:  newPos.x += 1; break; 
    case direction.SOUTH: newPos.y += 1; break; 
    case direction.WEST:  newPos.x -= 1; break; 
    }
  var withBorder = false;  
  return canMoveTo( newPos.x, newPos.y, withBorder );
}

function isBaseHere( blockId ) { 
  programCode.push( [ blockId, 'base_here' ] );	
  var what = map[virtualPos.y][virtualPos.x];
  return what == squareType.BASE;      
}

//======================= MOVE ROBOT =======================
function scheduleRobotForward( blockId, steps ) {
  var newPos = { 'x': virtualPos.x, 'y': virtualPos.y };
  addStepPause( blockId );
  for( var i=0; i<steps; i++ ) {
    if( runtimeError.length ) break;	
  	var prevPos = { 'x': newPos.x, 'y': newPos.y };
  	switch( virtualDirection ) {
  	  case direction.NORTH: newPos.y -= 1; break;
  	  case direction.EAST:  newPos.x += 1; break;
  	  case direction.SOUTH: newPos.y += 1; break;
  	  case direction.WEST:  newPos.x -= 1; break;
  	  }
	  scheduleMove( prevPos, newPos, blockId ); 
    }	
}

function scheduleRobotBack( blockId, steps ) {
  var newPos = { 'x': virtualPos.x, 'y': virtualPos.y };
  addStepPause( blockId );
  for( var i=0; i<steps; i++ ) {
    if( runtimeError.length ) break;	
  	var prevPos = { 'x': newPos.x, 'y': newPos.y };
  	switch( virtualDirection ) {
  	  case direction.NORTH: newPos.y += 1; break;
  	  case direction.EAST:  newPos.x -= 1; break;
  	  case direction.SOUTH: newPos.y -= 1; break;
  	  case direction.WEST:  newPos.x += 1; break;
  	  }
  	scheduleMove( prevPos, newPos, blockId ); 
    }	
}

function scheduleMove( fromPos, toPos, blockId ) {
  if( ! canMoveTo( toPos.x, toPos.y ) ) {
  	console.log( fromPos, toPos );
    runtimeError = 'Робот не может сделать следующий шаг!';
    programCode.push( [ blockId, 'crash' ] );	
    return;
    }
  var x1 = (fromPos.x+toPos.x)/2;
  var y1 = (fromPos.y+toPos.y)/2;
  programCode.push( [ blockId, 'moveTo', x1, y1 ] );
  var x2 = toPos.x;
  var y2 = toPos.y;
  programCode.push( [ blockId, 'moveTo', x2, y2 ] );
  virtualPos = { 'x': toPos.x, 'y': toPos.y };
}

function moveRobotTo( xNew, yNew ) {

  var robotIcon = document.getElementById('robot');
  robotIcon.setAttribute('x', (xNew - robotDirection)*SQUARE_SIZE );
  robotIcon.setAttribute('y', yNew*SQUARE_SIZE);

  var robotClip = document.getElementById('robotClipRect');
  robotClip.setAttribute('x', xNew*SQUARE_SIZE );
  robotClip.setAttribute('y', yNew*SQUARE_SIZE);
  robotPos = { 'x': xNew, 'y': yNew };  

  lidarOff();
}

//======================= CHANGE TILE =======================
function changeTileTo( x, y, shape, modifyMap = true ) {
  if( shape == squareType.RTARGET ) 
  	shape = squareType.TARGET;	
  console.log(shape);
  var top = tileShapes[shape][0];
  var left = tileShapes[shape][1];
  var tileIDyx = '' + y + '_' + x;	
  var tileImage = document.getElementById( 'tileImage' + tileIDyx );
  tileImage.setAttribute( 'x', (x - left)*SQUARE_SIZE );
  tileImage.setAttribute( 'y', (y - top)*SQUARE_SIZE );  
  if( modifyMap )
    map[y] = map[y].replaceAt( x, shape );
}

function paintTile( x, y ) {
  changeTileTo( x, y, squareType.PAINTED );
}

//======================= PLANT =======================
function canPlantTo( x, y ) {
	return map[y][x] == squareType.TARGET || map[y][x] == squareType.RTARGET;
}

function schedulePlant( blockId ) {
  var xPlantTo = virtualPos.x;
  var yPlantTo = virtualPos.y;
  addStepPause( blockId );
  if( ! canPlantTo( xPlantTo, yPlantTo ) ) {
    runtimeError = 'Цветы можно сажать только на грядке!';
    programCode.push( [ blockId, 'plantFail' ] );	
    return;
    }
  programCode.push( [ blockId, 'plant', xPlantTo, yPlantTo ] );
  map[yPlantTo] = map[yPlantTo].replaceAt( xPlantTo, squareType.PAINTED );
}	

//======================= GET MAZE SIZE =======================
var savedROWS = -1;
var savedCOLS = -1;
function getMapSize( level, variant = 0 ) {
  map = Array.from( Maps[Level] );
  if( typeof map[0] == "object" ) {
  	MAXVARIANTS = map.length;
  	LevelVariant = variant; 
    map = Array.from( Maps[Level][variant] ); 
    }
  else if( typeof map[0] == "string" ) {
  	MAXVARIANTS = 1;
  	LevelVariant = 0; 
    if( variant != 0 )  
      return "Карта содержит только один вариант поля, запрошен вариант " + (variant+1);	
    }
  else return "Неверный тип данных для карты уровня";
  showMultiMap();

  baseMap = Array.from( map );
  ROWS = map.length;
  if( savedROWS > 0  &&  ROWS != savedROWS )
  	return "Высота лабиринта для варианта " + (variant+1) + " не совпадает с начальной (для варианта 1)."; 
  COLS = map[0].length;
  if( savedCOLS > 0  &&  COLS != savedCOLS )
  	return "Ширина лабиринта для варианта " + (variant+1) + " не совпадает с начальной (для варианта 1)."; 

  MAZE_WIDTH = SQUARE_SIZE * COLS;
  MAZE_HEIGHT = SQUARE_SIZE * ROWS;
  savedROWS = ROWS;
  savedCOLS = COLS;
  return 0;
}

//======================= PREV/NEXT FIELD VARIANT =======================
function freshVariantButtons() {
  var prev = document.getElementById("prevVar");
  var next = document.getElementById("nextVar");
  if( MAXVARIANTS > 1 ) {
    prev.style.display = "inline";
    next.style.display = "inline";
    }
  else {
    prev.style.display = "none";
    next.style.display = "none";
    }
  var prevImg = document.getElementById("prevImg");
  var nextImg = document.getElementById("nextImg");
  if( LevelVariant == 0 ) 
  	prevImg.src = "./media/prev-icon-gray.png";
  else
  	prevImg.src = "./media/prev-icon.png";
  if( LevelVariant == MAXVARIANTS-1 ) 
  	nextImg.src = "./media/next-icon-gray.png";
  else
  	nextImg.src = "./media/next-icon.png";
}

function prevFieldVariant() {
  if( LevelVariant == 0 ) return;
  if( runType != runTypes.NONE ) reset();
  var primary = false;
  drawMap( primary, LevelVariant - 1 );
}

function nextFieldVariant() {
  if( LevelVariant == MAXVARIANTS-1 ) return;
  if( runType != runTypes.NONE ) reset();
  var primary = false;
  drawMap( primary, LevelVariant + 1 );
}

//======================= DRAW MAP =======================
function drawMap( primary = true, variant = 0 ) {

  // Return a value of '1' if the specified square is wall or out of bounds,
  // '0' otherwise (empty, start, finish).
  function isWall ( x, y ) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) 
      return 0;
    return ( map[y][x] == squareType.WALL ) ? '1' : 0;
  };

  var retCode = getMapSize( Level, variant );
  if( retCode != 0 ) {
    alert( retCode );
    return;
    }
  freshVariantButtons();  
  
  var svg = document.getElementById('svgMaze');
  var scale = Math.max(ROWS, COLS) * SQUARE_SIZE;
  svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale);

  robotDirection = startDirection = 0;

  if( primary ) 
    // Draw the outer square.
    Blockly.utils.dom.createSvgElement('rect', {
      'height': MAZE_HEIGHT,
      'width': MAZE_WIDTH,
      'fill': '#F1EEE7',
      'stroke-width': 1,
      'stroke': '#CCB'
      }, svg);

    // Compute and draw the tile for each square.

  var tileId = 0;
  for( var y = 0; y < ROWS; y++ ) {
    
    if( map[y].length < COLS ) {
      alert( "Неверная карта поля: слишком короткая строка " + (y + 1) );
      return;
      }

    for( var x = 0; x < COLS; x++ ) {

      var shape = map[y][x];

      if( isWall(x, y) )
        shape = '' + isWall(x, y - 1) +  // North
                isWall(x + 1, y) +  // East
                isWall(x, y + 1) +  // South
                isWall(x - 1, y);   // West    

      if( squareType.ROBOT.indexOf(shape) > -1 ) {
        startPos = { 'x': x, 'y': y };
        if( '0246'.includes(shape) ) {
          startDirection = parseInt(shape);
          shape = '.';   
          }
        else if( 'XYZW'.includes(shape)  ) {
          startDirection = 2*'XYZW'.indexOf(shape);
          map[y] = map[y].replaceAt( x, 'x' );
          shape = 'x';   
          }
        else if( 'BCDE'.includes(shape) ) {
          startDirection = 2*'BCDE'.indexOf(shape);
          map[y] = map[y].replaceAt( x, 'b' );
          shape = 'b';   
          }
        robotDirection = startDirection;
        }  

      if( tileShapes[shape] == undefined ) {
        alert( "Неверная карта поля: неизвестный символ '" + shape + "' в строке " + (y + 1) );
        return; 
        }

      if( primary ) {
	    var top = tileShapes[shape][0];
	    var left = tileShapes[shape][1];

	        // Tile's clipPath element.
	    var tileIDyx = '' + y + '_' + x;  
	    var tileClip = Blockly.utils.dom.createSvgElement( 'clipPath', 
	        { 'id': 'tileClipPath' + tileIDyx }, 
	        svg );

	    Blockly.utils.dom.createSvgElement('rect', 
	        { 'id': 'tileClipRect' + tileIDyx, 
	          'height': SQUARE_SIZE,
	          'width': SQUARE_SIZE,
	          'x': x*SQUARE_SIZE,
	          'y': y*SQUARE_SIZE
	        }, 
	        tileClip );

	        // Tile sprite.
	    var tile = Blockly.utils.dom.createSvgElement('image', 
	        { 'id': 'tileImage' + tileIDyx, 
	          'height': SQUARE_SIZE*5,
	          'width': SQUARE_SIZE*4,
	          'clip-path': 'url(#tileClipPath' + tileIDyx + ')',
	          'x': (x - left)*SQUARE_SIZE,
	          'y': (y - top)*SQUARE_SIZE 
	        }, 
	        svg );

        tile.setAttributeNS( Blockly.utils.dom.XLINK_NS, 'xlink:href', tiles );
        }  
      else {
      	var modifyMap = false;
        changeTileTo( x, y, shape, modifyMap );
        }  

      tileId++;
      }
    }

  if( primary ) {
    // Add robot image
    var robotClip = Blockly.utils.dom.createSvgElement('clipPath', {
        'id': 'robotClipPath'
      }, svg);
    Blockly.utils.dom.createSvgElement('rect', {
        'id': 'robotClipRect',
        'x': startPos.x*SQUARE_SIZE,
        'y': startPos.y*SQUARE_SIZE,
        'height': SQUARE_SIZE,
        'width': SQUARE_SIZE,
      }, robotClip);

    var robotImage = Blockly.utils.dom.createSvgElement('image', 
      {
        'id': 'robot',
        'height': 40,
        'width': SQUARE_SIZE*8, // Full images
        'clip-path': 'url(#robotClipPath)',
        'x': (startPos.x - startDirection)*SQUARE_SIZE,
        'y': startPos.y*SQUARE_SIZE 
      }, 
      svg);
    robotImage.setAttributeNS( Blockly.utils.dom.XLINK_NS, 'xlink:href', robot );
    // Add lidar image
    
    var lidarClip = Blockly.utils.dom.createSvgElement('clipPath', {
        'id': 'lidarClipPath'
      }, svg);
    Blockly.utils.dom.createSvgElement('rect', {
        'id': 'lidarClipRect',
        'x': startPos.x*SQUARE_SIZE,
        'y': startPos.y*SQUARE_SIZE,
        'height': SQUARE_SIZE,
        'width': SQUARE_SIZE,
      }, lidarClip);

    var lidarImage = Blockly.utils.dom.createSvgElement('image', 
      {
        'id': 'lidar',
        'height': 40,
        'width': SQUARE_SIZE*5, // Full images
        'clip-path': 'url(#lidarClipPath)',
        'x': (startPos.x-0)*SQUARE_SIZE,
        'y': startPos.y*SQUARE_SIZE 
      }, 
      svg);
    lidarImage.setAttributeNS( Blockly.utils.dom.XLINK_NS, 'xlink:href', lidar );

    }
  else {
    moveRobotTo( startPos.x, startPos.y );
    }

  robotPos = { 'x': startPos.x, 'y': startPos.y };

  setLidar( robotDirection, 0 );

  }

//========================== ROBOT HTML =========================================

function robotHTML( header ) { //, widthProgram, heightProgram ) {
  return '<style>table#header td {margin:0; padding:0;}</style>' +
'<table id="header" width="100%" style="margin:0;"><tr><td><h1><span id="title" style="margin-right:10px;">' + header + '</span>' +
'<span id="levelMenu"></span>' +
'<span id="starDiv"><img id="bigStar" src="./media/big-star.gif" align="top" width="35" height="34">' +
'<span id="totalStars">12</span></span></h1></td><td align="right">' +
'<a href="http://kpolyakov.spb.ru/school/robots/blockly.htm">' +
'<img src="./media/link.gif" class="link"/></a> ' +
'<a href="http://kpolyakov.spb.ru/school/blockly/rob-blockly.htm">kpolyakov.spb.ru</a>' +
'</td></tr></table>' +
'<table width="100%"><tr><td><table width="400"><tr><td>' +
'<span id="prevVar">' +
'<img id="prevImg" src="./media/prev-icon-gray.png" title="Перейти к предыдущему варианту поля" ' +
'     onclick="prevFieldVariant();"></span>' +
'</td><td>' +
'<span id="multimap">Карта <span id="mapcount"></span></span>' +
'<span id="rating">Рейтинг твоего решения:' +
'<img src="./media/star.gif" class="star" id="star1"><img src="./media/star.gif" class="star" id="star2">' +
'<img src="./media/star.gif" class="star" id="star3"><img src="./media/star.gif" class="star" id="star4">' +
'<img src="./media/star.gif" class="star" id="star5">' +
'</span></td><td align="right">' +
'<span id="nextVar">' +
'<img id="nextImg" src="./media/next-icon.png" title="Перейти к следующему варианту поля" ' +
'     onclick="nextFieldVariant();"></span>' +
'</td></tr></table></td><td>' +
'  <div id="capacityBubble">' +
'   <label for="file-load" style="cursor: pointer;position:relative;top:6px;margin:0 5px 0 20px;">' +
'   <img id="upload" src="./media/open.gif" title="Открыть сохраненную программу">' +
'   <input type="file" id="file-load" style="display:none;" onclick="this.value=null;" ' +
'          onchange="loadProgramFromDisk();"></label>' +
'   <img id="save" src="./media/save.gif" title="Сохранить программу в формате XML"' +
'        style="cursor: pointer;position:relative;top:6px;margin-right:5px;" onclick="saveProgramToDisk();" />' +
'    <span id="blockCount">Ты можешь добавить в программу <span id="capacity">0 блоков</span></span>.' +
'  </div>' +
'</td>' +  
'</tr>' +  
'<tr>' +
'<td valign="top">' +
'  <!--canvas id="display" width="400" height="400"></canvas-->' +
'  <div id="visualization">' +
'    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px">' +
'      <g id="look">' +
'        <path d="M 0,-15 a 15 15 0 0 1 15 15" />' +
'        <path d="M 0,-35 a 35 35 0 0 1 35 35" />' +
'        <path d="M 0,-55 a 55 55 0 0 1 55 55" />' +
'      </g>' +
'    </svg>' +
'  </div>' +
'  <table width="100%"><tr><td valign="top">' +
'  <svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" ' +
'     xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50">' +
'    <!-- Slow icon. -->' +
'    <clipPath id="slowClipPath"><rect width="26" height="12" x="5" y="14"></rect></clipPath>' +
'    <image xlink:href="media/icons.png" height="63" width="105" x="-21" y="-21"' + 
'         clip-path="url(#slowClipPath)"></image>' +
'    <!-- Fast icon. -->' +
'    <clipPath id="fastClipPath"><rect width="26" height="16" x="120" y="10"></rect></clipPath>' +
'    <image xlink:href="media/icons.png" height="63" width="105" x="120" y="-21" ' +
'         clip-path="url(#fastClipPath)"></image>' +
'    <line id="sliderTrack" x1="10" y1="35" x2="140" y2="35"></line>' +
'    <rect id="trackTarget" style="opacity: 0" x="-10" y="15" width="170" height="40" rx="20" ry="20"></rect>' +
'    <path id="sliderKnob" d="m 0,0 l -8,8 v 12 h 16 v -12 z" transform="translate(75,23)"></path>' +
'    <circle id="knobTarget" style="opacity: 0" r="20" cy="35" cx="75"></circle>' +
'  </svg> ' +
'  </td><td> ' +
'  <div style="text-align:right;">' +
'    <button id="stepButton" title="Выполни программу по шагам" onclick="runCode(true);">' +
'      <img src="media/1x1.gif" class="step icon21">&nbsp;Шаг' +
'    </button>' +
'    <button id="runButton" title="Запусти написанную тобой программу" onclick="runCode();">' +
'      <img src="media/1x1.gif" class="run icon21">&nbsp;Старт' +
'    </button>' +
'    <button id="resetButton" title="Прервать программу и сбросить в начальное состояние" ' +
'                             onclick="reset();" style="display:none;">' +
'      <img src="media/1x1.gif" class="stop icon21">&nbsp;Сброс</button>' +
'  </div>' +
'  </td></tr></table>' +
'  <div id="counters"></div>' +
'</td>' +
'<td style="height:99%;width:100%;" valign="top">' +
'  <div id="blocklyArea" style="text-align:center;"></div>' +
//  <div id="blocklyDiv" style="height:' + heightProgram + 'px;width:' + widthProgram + 'px;"></div>' +
'  <div id="blocklyDiv" style="position:absolute;"></div>' +
'</td>' +
'</tr>' +
'<tr>' +
'<td colspan="2">' +
'  <h2>Программа на языке <select id="lang" onchange="loadCodeToEditor(this)";>' +
'    <option disabled>Выберите язык</option>' +
'    <option value="py" selected>Python</option>' +
'    <option value="js">JavaScript</option>' +
'    <option value="php">PHP</option>' +
'    <option value="dart">Dart</option>' +
'    <option value="lua">Lua</option>' +
'    <option value="xml">XML</option>' +
'   </select>' +
'   </h2>' +
'  <div id="editor" style="height: 400px;width:500px;"></div>' +
'</td>' +
'</tr>' +
'</table>' +
'<svg height="8" width="8" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
'<pattern id="crosshatch" patternUnits="userSpaceOnUse" width="8" height="8">' +
'<rect width="8" height="8" fill="#666"/>' +
'<path d="M0 0L8 8ZM8 0L0 8Z" stroke-width="0.5" stroke="#aaa"/>' +
'</pattern></svg>' +
'';
}

