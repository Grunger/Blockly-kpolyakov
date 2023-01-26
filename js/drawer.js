/**
 * @license
 * Copyright 2021 Константин Поляков
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Чертёжник-Blockly, основной файл, описывающий поведение Чертёжника
 * @author kpolyakov@mail.ru (Константин Поляков)
 * @web    kpolyakov.spb.ru
 */

//======================= GLOBALS =======================

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

var MAZE_WIDTH = 400;
var MAZE_HEIGHT = 400;
var xAxisShift = MAZE_WIDTH / 2; 
var yAxisShift = MAZE_HEIGHT / 2; 

var startPos = { 'x': 0, 'y': 0, 'show': false, 'pen': false };
var robotPos = { 'x': 0, 'y': 0, 'show': false, 'pen': false };
var virtualPos = { 'x': 0, 'y': 0, 'show': false, 'pen': false };

var startDirection = 0;
var robotDirection = 0;
var virtualDirection = 0;
var unitSize = 20;

var robotMoveCount = 0;

var ctxGrid;
var ctxScratch;
var ctxAnswer;
var ctxDisplay;
var robotColour;

var sliderScale = 250;
var animationDelay = 10;

var drawerImageFile  = './media/drawer.png';
var drawerImageFile0 = './media/drawer0.png';
var drawerImage = new Image();

var checkPictureModes = { ALPHA: 0, EXACT: 1 };
var checkPictureMode = checkPictureModes.ALPHA;

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

  drawerImage.src = drawerImageFile;
  drawerImage.onload = function() { display() };

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
  animationDelay = Math.round( sliderScale * Math.exp(-3.2188*sliderValue) );
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

  virtualPos = { 'x': robotPos['x'], 'y': robotPos['y'], 'show': false, 'pen': false };
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
var MAXPROGLENGTH = 10000;
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
function restoreField() {

  robotDirection = 0;
  robotPos = { 'x': startPos['x'], 'y': startPos['y'], 
               'show': startPos['show'], 'pen': startPos['pen'],
                'width': startPos['width'] };
  robotColour = "#000000";

  //ctxScratch.canvas.width = ctxScratch.canvas.width;
  ctxScratch.setTransform(1, 0, 0, 1, 0, 0);
  ctxScratch.clearRect( 0, 0, ctxScratch.canvas.width, ctxScratch.canvas.height );

  ctxScratch.strokeStyle = robotColour;
  ctxScratch.fillStyle = '#ffffff';
  ctxScratch.lineWidth = startPos['width'];
  //ctxScratch.lineCap = 'round';
  ctxScratch.font = 'normal 18pt Arial';

  //robotPos['pen'] = false;
  //doDrawerMove( robotPos['x'], robotPos['y'] );
  //robotPos['pen'] = startPos['pen'];
    
  display();

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

  restoreField();

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
      var param = operation[2];
      highlightBlock( blockId );

      if( command == 'show' ) {
	  	  doDrawerShow( param );
        robotMoveCount += 1;
        }
      else if( command == 'pen' ) {
        doDrawerPen( param );
        robotMoveCount += 1;
     	}
      else if( command == 'move' ) {
        var param2 = operation[3];
        doDrawerMove( param, param2 );
        robotMoveCount += 1;
        }
      else if( command == 'moveRel' ) {
        var param2 = operation[3];
        doDrawerMoveRel( param, param2 );
        robotMoveCount += 1;
        }
      else if( command == 'colour' ) {
        doPenColour( param );
        robotMoveCount += 1;
        }
      else if( command == 'fill' ) {
        doDrawerFill( param );
        robotMoveCount += 1;
        }
      else if( ['crash','cycle'].includes(command) ) {
        Blockly.alert( 'Ошибка во время выполнения программы', 
        	           runtimeError, { top: '10em' } );
        showResetButton();
        }
      else if( command == 'finish' ) {
        checkSolution();
        showResetButton();
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
      xml_text = '<xml><block type="drawer_program" deletable="false" movable="false"></block></xml>';
    }
  else {
    if( xml_text.indexOf('drawer_program') < 0 ) {
      xml_text = xml_text.replace( 'xml">' , 'xml">' + 
	        '<block type="drawer_program" deletable="false" movable="false"><next>' );
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
  
  freshRemainingBlocks();
  
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
function pixelsDiffName( n ) {
	var d10 = n % 100;
	var d0 = n % 10;
	if( 10 <= d10 && d10 <= 20 ) 
	  return "отличаются " + n + " пикселей";
	else if( d0 == 1 ) 
	  return "отличается " + n +" пиксель"; 
	else if( [2,3,4].includes(d0) ) 
	  return "отличаются " + n +" пикселя"; 
	else 
	  return "отличаются " + n +" пикселей";
}

function checkSolution() {

  var errorMessage = '';
  var result = true;

  // Compare the Alpha (opacity) byte of each pixel in the user's image and
  // the sample answer image.
  var userImage = ctxScratch.getImageData( 0, 0, MAZE_WIDTH, MAZE_HEIGHT );
  var answerImage = ctxAnswer.getImageData( 0, 0, MAZE_WIDTH, MAZE_HEIGHT );
  var len = Math.min( userImage.data.length, answerImage.data.length ); 
  var delta = 0;
  var answerNonEmpty = 0;

  if( checkPictureMode == checkPictureModes.EXACT ) {
    for( var i = 0; i < len; i += 4 ) {  // Check the RGBA bytes.
      if( answerImage.data[i+3] > 0 ) {
        answerNonEmpty ++;
        console.log( parseInt( (i/4) / 400), (i/4) % 400,  
            answerImage.data[i], answerImage.data[i+1], 
            answerImage.data[i+2], answerImage.data[i+3] );
        }
      for( var j = 0; j < 4; j ++ ) {        
        var diff = Math.abs(userImage.data[i+j] - answerImage.data[i+j]);        
        if( (j < 3 && diff > 32) || (j == 3 && diff > 100) ) {
          delta ++; 
          break;
          }      
        }
      }  
    }
  else {  
    // Pixels are in RGBA format.  Only check the Alpha bytes.
    for( var i = 3; i < len; i += 4 )  { // Check the Alpha byte.
      if( answerImage.data[i] > 0 ) answerNonEmpty ++;
//      if( Math.abs(userImage.data[i] - answerImage.data[i]) > 64 ) 
//        delta ++;
      relDiff = Math.abs(userImage.data[i] - answerImage.data[i]) / 256.; 
      if ( relDiff > 0.5 ) delta += relDiff;
      }
    delta = Math.round(delta);
    }

  var errorLimit = parseInt( 0.02*answerNonEmpty );  // tolerance 2%
  if( typeof(DiffLimit) == "object" )
    if( typeof(DiffLimit[Level]) == "number" )
      errorLimit = DiffLimit[Level];

  if( delta > errorLimit ) 
    errorMessage = ' Рисунок не совпадает с заданным (' + pixelsDiffName(delta) + '). ';      

  if( errorMessage.length ) {
  	errorMessage = '<div class="error">' + errorMessage + '</div>';
    Blockly.alert( "Решение задачи неполное", 
    	"Задача пока не решена." + 
    	errorMessage + 'Попробуй ещё раз.', { top: '10em' } );
    
    fixSolutionResults( false );     
    
    result = false;  
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

//======================= TURTLE ANSWER FUNCTIONS =======================
function show() { doDrawerShow( true ); }
function hide() { doDrawerShow( false ); }
function penDown() { doDrawerPen( true ); }
function penUp() { doDrawerPen( false ); }
function toPoint( absX, absY ) { doDrawerMove( absX, absY ); }
function vector( deltaX, deltaY ) { doDrawerMoveRel( deltaX, deltaY ); }
function penColour( colour ) { doPenColour( colour ); }
function floodFill( colour ) { doDrawerFill( colour ); }
function floodFillNo( colourNo ) { 
  if( colourNo < 0 ) colourNo = - colourNo;
  colourNo = colourNo % 16;
  var colors = [ '#000000', '#003399', '#339933', '#009999', 
                 '#990033', '#990066', '#663300', '#cccccc',
                 '#999999', '#0066ff', '#66ff33', '#33ffff',
                 '#ff3333', '#cc0099', '#ffff33', '#ffffff'];
  doDrawerFill( colors[colourNo] ); 
}
function drawGrid( _xAxisShift, _yAxisShift, withAxes = true ) {
  xAxisShift = _xAxisShift; 
  yAxisShift = _yAxisShift;	
  var x = 0;
  var prevWidth = robotPos['width'];
  robotPos['width'] = 1;
  if( withAxes ) 
  	   robotColour = '#ff0000';
  else robotColour = '#67d8ef';
  while( x*unitSize > -xAxisShift ) {
  	penUp();
  	toPoint( x, yAxisShift/unitSize );
  	penDown();
  	toPoint( x, (yAxisShift - MAZE_HEIGHT)/unitSize );
    robotColour = '#67d8ef';
    x -= 1;
    } 
  x = 1;  
  while( x*unitSize < MAZE_WIDTH-xAxisShift ) {
  	penUp();
  	toPoint( x, yAxisShift/unitSize );
  	penDown();
  	toPoint( x, (yAxisShift - MAZE_HEIGHT)/unitSize );
    x += 1;
    } 
  var y = 0;
  if( withAxes ) robotColour = '#ff0000';
  while( y*unitSize < yAxisShift ) {
  	penUp();
  	toPoint( -xAxisShift/unitSize, y );
  	penDown();
  	toPoint( (MAZE_WIDTH - xAxisShift)/unitSize, y );
    robotColour = '#67d8ef';
    y += 1;
    } 
  y = -1;
  while( y*unitSize > yAxisShift-MAZE_HEIGHT ) {
  	penUp();
  	toPoint( -xAxisShift/unitSize, y );
  	penDown();
  	toPoint( (MAZE_WIDTH - xAxisShift)/unitSize, y );
    y -= 1;
    } 
  penUp();
  toPoint( startPos['x'], startPos['y'] );
  penDown();
  robotPos['width'] = prevWidth; 
  robotColour = "#000000";

  ctxGrid.globalCompositeOperation = 'copy';
  ctxGrid.drawImage( ctxScratch.canvas, 0, 0 );

  ctxScratch.clearRect( 0, 0, ctxScratch.canvas.width, ctxScratch.canvas.height );
  //robotPos['pen'] = false;
  doDrawerMove( robotPos['x'], robotPos['y'] );
  robotPos['pen'] = startPos['pen'];
  
}

function drawAnswer() {  
  Answers[Level]();
  doDrawerPen( startPos['pen'] );
  ctxAnswer.globalCompositeOperation = 'copy';
  ctxAnswer.drawImage( ctxScratch.canvas, 0, 0 );
  ctxAnswer.globalCompositeOperation = 'source-over';
}

//======================= TURTLE IMPLEMENTATION =======================
var isAnimating = false;

function display() {

  ctxDisplay.clearRect(0, 0, ctxDisplay.canvas.width, ctxDisplay.canvas.height);
  //ctxDisplay.beginPath();
  //ctxDisplay.rect(0, 0, ctxDisplay.canvas.width, ctxDisplay.canvas.height);
  //ctxDisplay.fillStyle = '#ffffff';
  //ctxDisplay.fill();

  // Draw the grid layer.
  ctxDisplay.globalCompositeOperation = 'source-over';
  ctxDisplay.globalAlpha = 0.4;
  ctxDisplay.drawImage( ctxGrid.canvas, 0, 0 );
  ctxDisplay.globalAlpha = 1;

  // Draw the answer layer.
  ctxDisplay.globalCompositeOperation = 'source-over';
  ctxDisplay.globalAlpha = 0.4;
  ctxDisplay.drawImage( ctxAnswer.canvas, 0, 0 );
  ctxDisplay.globalAlpha = 1;

  // Draw the user layer.
  ctxDisplay.globalCompositeOperation = 'source-over';
  ctxDisplay.drawImage( ctxScratch.canvas, 0, 0 );

  // Draw the turtle.
  if ( robotPos['show'] ) {

    // Make the turtle the colour of the pen.
    ctxDisplay.strokeStyle = "#006600"; //ctxScratch.strokeStyle;
    ctxDisplay.fillStyle = "#333333"; //ctxScratch.fillStyle;

    // Draw the turtle body.
    x = xAxisShift + robotPos['x']*unitSize;
    y = yAxisShift - robotPos['y']*unitSize;

    ctxDisplay.translate( x, y );
    ctxDisplay.drawImage( drawerImage, -drawerImage.width, -18 );
    ctxDisplay.translate( -x, -y );
    }

}

function doDrawerShow( state ) {
  robotPos['show'] = state;
  display(); 
}

function doDrawerPen( state ) {
  robotPos['pen'] = state;
  if( state )
       drawerImage.src = drawerImageFile;
  else drawerImage.src = drawerImageFile0;
}

function doPenColour( colour ) {
  robotColour = colour;
}

function getPixel( imageData, x, y ) {
  function dec2hex( d ) {
    return (d+0x100).toString(16).substr(-2);
  }
  var width = imageData.width;
  var point = y * 4 * width + x * 4;
  var r = '' + dec2hex(imageData.data[point]);
  var g = '' + dec2hex(imageData.data[point+1]);
  var b = '' + dec2hex(imageData.data[point+2]);
  var a = '' + dec2hex(imageData.data[point+3]);
  return r + g + b + a;
}

function canvasFloodFill( ctx, x0, y0, color ) {
    var imageData = ctx.getImageData( 0, 0, MAZE_WIDTH, MAZE_HEIGHT );
    var width = imageData.width;
    var height = imageData.height;
    var stack = [ [x0, y0] ];
    var color0 = getPixel( imageData, x0, y0 );
    if( color.substr(1)+"ff" == color0 ) return;
    var r = parseInt( color.substr(1,2), 16);
    var g = parseInt( color.substr(3,2), 16);
    var b = parseInt( color.substr(5,2), 16);
    while( stack.length > 0 ) {   
        var pixelPos = stack.pop();
        var x = pixelPos[0];
        var y = pixelPos[1];
        if( x < 0 || x >= width)  continue;
        if( y < 0 || y >= height) continue;
        if( getPixel( imageData, x, y ) == color0 ) {
            // Закрашиваем
          var point = y * 4 * width + x * 4;
          imageData.data[point] = r;            
          imageData.data[point+1] = g;            
          imageData.data[point+2] = b;            
          imageData.data[point+3] = 255;            
            // Ставим соседей в стек на проверку
          stack.push( [ x - 1, y ]);
          stack.push( [ x + 1, y ]);
          stack.push( [ x, y - 1 ]);
          stack.push( [ x, y + 1 ]);
          }
      }
    ctx.putImageData( imageData, 0, 0 );
}

function doDrawerFill( colour ) {
  canvasFloodFill( ctxScratch, 
             Math.round( robotPos['x']*unitSize+xAxisShift ), 
             Math.round( yAxisShift-robotPos['y']*unitSize ), colour );
  display();
}

function doDrawerMove( absX, absY ) {

  if( robotPos['pen'] ) {
    ctxScratch.beginPath();
    ctxScratch.moveTo( Math.round(robotPos['x']*unitSize+xAxisShift) + 0.5, 
                       Math.round(yAxisShift-robotPos['y']*unitSize) + 0.5 );
    }

  robotPos['x'] = absX;
  robotPos['y'] = absY;

  if( robotPos['pen'] ) {
    ctxScratch.lineWidth = robotPos['width']; 
    ctxScratch.strokeStyle = robotColour;
    ctxScratch.lineTo( Math.round(robotPos['x']*unitSize+xAxisShift) + 0.5, 
                       Math.round(yAxisShift-robotPos['y']*unitSize) + 0.5 );
    ctxScratch.stroke();
    }

  display();
}

function doDrawerMoveRel( deltaX, deltaY ) {
  doDrawerMove( robotPos['x'] + deltaX,
                robotPos['y'] + deltaY );
}

function scheduleDrawerShow( blockId, state ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'show', state ] );
  virtualPos['show'] = state;
}

function schedulePenDown( blockId, state ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'pen', state ] );
  virtualPos['pen'] = state;
}

function scheduleDrawerMove( blockId, absX, absY ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'move', absX, absY ] );
  virtualPos['x'] = absX;
  virtualPos['y'] = absY;
}

function scheduleDrawerMoveRel( blockId, deltaX, deltaY ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'moveRel', deltaX, deltaY ] );
  virtualPos['x'] = virtualPos['x'] + deltaX;
  virtualPos['y'] = virtualPos['y'] + deltaY;
}

function scheduleDrawerColour( blockId, colour ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'colour', colour ] );
}

function scheduleDrawerFill( blockId, colour ) {
  addStepPause( blockId );
  programCode.push( [ blockId, 'fill', colour ] );
}

//======================= DRAW MAP =======================
function drawMap( primary = true, variant = 0 ) {

  ctxDisplay = document.getElementById('display').getContext('2d');
  ctxAnswer = document.getElementById('answer').getContext('2d');
  ctxScratch = document.getElementById('scratch').getContext('2d');
  ctxGrid = document.getElementById('grid').getContext('2d');
  
  startPos = { 'x': 0, 'y': 0, 'show': false, 'pen': false, 
               'width': 2, 'unit': 20 };

  var param = Maps[Level];
  if( typeof param['x'] != 'undefined' ) startPos['x'] = param['x'];
  if( typeof param['y'] != 'undefined' ) startPos['y'] = param['y'];
  if( typeof param['show'] != 'undefined' ) startPos['show'] = param['show'];
  if( typeof param['pen'] != 'undefined' ) startPos['pen'] = param['pen'];
  if( typeof param['width'] != 'undefined' ) startPos['width'] = param['width'];
  if( typeof param['unit'] != 'undefined' ) unitSize = param['unit'];

  robotPos = { 'x': startPos['x'], 'y': startPos['y'], 
               'show': startPos['show'], 'pen': startPos['pen'], 
               'width': startPos['width'] };

  ctxScratch.lineWidth = robotPos['width']; 

  startDirection = 0;
  robotDirection = 0;

  drawAnswer();

  restoreField();

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
'<a href="http://kpolyakov.spb.ru/school/blockly/drw-blockly.htm">kpolyakov.spb.ru</a>' +
'</td></tr></table>' +
'<table width="100%"><tr><td><table width="400"><tr><td>' +
'<span id="prevVar">' +
'<img id="prevImg" src="./media/prev-icon-gray.png" title="Перейти к предыдущему варианту поля" ' +
'     onclick="prevFieldVariant();"></span>' +
'</td><td>' +
'<span id="multimap" style="left:-32px;">Вариант <span id="mapcount"></span></span>' +
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
'  <div id="visualization" style="border:none;">' +
'    <canvas id="scratch" width="400" height="400" style="display: none"></canvas>' +
'    <canvas id="answer" width="400" height="400" style="display: none"></canvas>' +
'    <canvas id="grid" width="400" height="400" style="display: none"></canvas>' +
'    <canvas id="display" width="400" height="400" style="border:1px solid #cccccc;"></canvas>' +
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

