/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * An example implementation of how one might replace Blockly's browser
 * dialogs. This is just an example, and applications are not encouraged to use
 * it verbatim.
 *
 * @namespace
 */
Dialog = {};

/** Override Blockly.alert() with custom implementation. */
Blockly.alert = function( header, message, props = {}, callback = null ) {
  Dialog.show( header, message, { props: props, showOkay: true, onCancel: callback } );
};

/** Override Blockly.confirm() with custom implementation. */
Blockly.confirm = function( header, message, props = {}, callback ) {
  Dialog.show( header, message, {
  	props: props, 
    showOkay: true,
    showCancel: true,
    onOkay: function() { callback( true ); },
    onCancel: function() { callback( false ); }
  });
};

/** Override Blockly.prompt() with custom implementation. */
Blockly.prompt = function( header, defaultValue = '', callback = null, message = '', props = {} ) {
  Dialog.show( header, message, {
  	props: props, 
    showInput: true,
    showMultiline: false,
    showOkay: true,
    showCancel: true,
    onOkay: function() { callback( Dialog.inputField.value ); },
    onCancel: function() { callback(null); }
  });
  Dialog.inputField.value = defaultValue;
};

Blockly.promptMultiline = function( header, defaultValue = '', callback = null , message = '', props = {}) {
  Dialog.show( header, message, {
  	props: props, 
    showInput: false,
    showMultiline: true,
    showOkay: true,
    showCancel: true,
    onOkay: function() { callback( Dialog.inputFieldMultiline.value ); },
    onCancel: function() { callback(null); }
  });
  Dialog.inputFieldMultiline.value = defaultValue;
};

/** Hides any currently visible dialog. */
Dialog.hide = function() {
  if (Dialog.backdropDiv_) {
    Dialog.backdropDiv_.style.display = 'none';
    Dialog.dialogDiv_.style.display = 'none';
    }
};

/**
 * Shows the dialog.
 * Allowed options:
 *  - showOkay: Whether to show the OK button.
 *  - showCancel: Whether to show the Cancel button.
 *  - showInput: Whether to show the text input field.
 *  - onOkay: Callback to handle the okay button.
 *  - onCancel: Callback to handle the cancel button and backdrop clicks.
 */
Dialog.show = function( title, message, options ) {
  var backdropDiv = Dialog.backdropDiv_;  
  var dialogDiv = Dialog.dialogDiv_;
  if ( ! dialogDiv ) {
    // Generate HTML
    backdropDiv = document.createElement('div');
    backdropDiv.id = 'DialogBackdrop';
    backdropDiv.style.cssText =
        'position: absolute; top: 0; left: 0; right: 0; bottom: 0;' +
        'background-color: rgba(0, 0, 0, .3);' +
        'z-index: 100;';
    document.body.appendChild( backdropDiv );

    dialogDiv = document.createElement('div');
    dialogDiv.id = 'dialog';
    dialogDiv.style.cssText =
        'width: 50%; left: 25%; top: 10em; z-index: 100;' +
        'background-color: #fff; color: #000; border: 1px solid #ccc;' +
        'position: absolute; border-radius: 8px;' +
        'box-shadow: 5px 5px 5px #888; padding: 10px;'; 
    backdropDiv.appendChild( dialogDiv );

    dialogDiv.onclick = function(event) {
      event.stopPropagation();
    };

    Dialog.backdropDiv_ = backdropDiv;
    Dialog.dialogDiv_ = dialogDiv;
    }

  backdropDiv.style.display = 'block';
  dialogDiv.style.display = 'block';

  if( options.props && typeof options.props.top != "undefined" )
       topPosition = options.props.top;	
  else topPosition = "10em";	
  dialogDiv.style.top = topPosition;

  if( options.props && typeof options.props.okMessage != "undefined" )
       okMessage = options.props.okMessage;	
  else okMessage = "OK";	

  if( options.props && typeof options.props.cancelMessage != "undefined" )
       cancelMessage = options.props.cancelMessage;	
  else cancelMessage = "Отмена";	

  dialogDiv.innerHTML =
      '<header class="dialogHeader" ' +
        'style="height: 25px; margin: -10px -10px 15px;' +
               'border-top-left-radius: 8px; border-top-right-radius: 8px;' +
               'background-color: #ddd; cursor: move; ' + 
               'padding: 5px 10px 0px; text-align: center; '+
               'font-size: 1.2em; font-weight: bold;"' +
               '>' + title + '</header>' +
      '<div class="dialogMessage">' + message + '</div>' +
      (options.showInput ? '<div><input id="DialogInput"' +
      	    'style="width:90%;"></div>' : '') +
      (options.showMultiline ? '<div><textarea id="DialogInputMultiline"'+ 
      	    'style="width:90%;height:200px;"></textarea></div>' : '') +
      '<div class="dialogButtons" style="text-align: right; padding: 1ex 1ex 0 0;">' +
      (options.showCancel ? '<button id="dialogCancel">' + cancelMessage + '</button>': '') +
      (options.showOkay ? '<button id="dialogOkay" class="secondary">' + okMessage + '</button>': '') +
      '</div>';

  var onOkay = function(event) {
    Dialog.hide();
    options.onOkay && options.onOkay();
    event && event.stopPropagation();
    };
  var onCancel = function(event) {
    Dialog.hide();
    options.onCancel && options.onCancel();
    event && event.stopPropagation();
    };

  var dialogInput = document.getElementById('DialogInput');
  Dialog.inputField = dialogInput;
  var dialogInputMultiline = document.getElementById('DialogInputMultiline');
  Dialog.inputFieldMultiline = dialogInputMultiline;

  inputElement = dialogInput || dialogInputMultiline;
  if( inputElement ) {    
    inputElement.focus();
    inputElement.onkeyup = function( event ) {
      if (event.keyCode == 13) { // Process as OK when user hits enter.
        onOkay();
        return false;
        } 
      else if (event.keyCode == 27)  { // Process as cancel when user hits esc.
        onCancel();
        return false;
        }
      };
    } 
  else {
    var okay = document.getElementById('dialogOkay');
    okay && okay.focus();
    }

  if ( options.showOkay ) 
    document.getElementById('dialogOkay').addEventListener('click', onOkay );
  if ( options.showCancel ) 
    document.getElementById('dialogCancel').addEventListener('click', onCancel );

  backdropDiv.onclick = onCancel;
};
