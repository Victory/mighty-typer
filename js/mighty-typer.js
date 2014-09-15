// maps char-set to another form one key to another in a textarea
var bark = function (msg) {
  alert(msg);
};

(function () {

  var whichToChar = {};
  var keymap; // keymap json is loaded from ajax
  var ordinalKeymap; // keymap json is loaded from ajax
  var $mainTextarea; // where the string is stored

  var insertAtCaret = function (evt, newKey) {
    var target = evt.target;
    var caretPos = target.selectionStart;
    
    var oldVal = $mainTextarea.val();
    var newVal = oldVal.substring(0, caretPos) +
      newKey +
      oldVal.substring(caretPos);
    $mainTextarea.val(newVal);

    // nothing special, inserting at the end of textarea
    if (caretPos === oldVal.length) {
      return;
    };

    // move the caret after the newValue
    caretPos += 1;
    if (target.createTextRange) {
      range = target.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      target.focus();
      if (typeof target.selectionStart !== "undefined") {
        target.setSelectionRange(caretPos, caretPos);
      }
    }
  };

  var tt = function (evt) {
    var ch = whichToChar[evt.which];
    if (typeof ch === "undefined") {
      return;
    }
    var newKey = keymap[ch];
    if (typeof newKey === "undefined") {
      return;
    }

    evt.preventDefault();
    if (evt.shiftKey) {
      newKey = newKey.toUpperCase();
    }
    insertAtCaret(evt, newKey);
  };
  
  var getKeymap = function (url) {
    var xhr = $.ajax({
      url: url,
      dataType: "json",
      method: "GET"
    });    
    xhr.fail(function (data, status, xhr) {
      bark('could not load json for keymap');
    });
    xhr.done(function (data, status, xhr) {
      keymap = data;
      $mainTextarea.on('keydown', tt);
    });
    return xhr;
  };

  var getCharToWhich = function (url) {
    var xhr = $.ajax({
      url: url,
      dataType: "json",
      method: "GET"
    });    
    xhr.fail(function (data, status, xhr) {
      bark('could not load json for ordinal');
    });
    xhr.done(function (data, status, xhr) {
      whichToChar = data;
    });
    return xhr;
  };

  jQuery(function ($) {
    $mainTextarea = $("#mainInput");

    var whichToCharXhr = getCharToWhich("/resources/us/charToOrdinal.json");
    whichToCharXhr.always(function () {
      var keymapXhr = getKeymap("/resources/ru/keymap.json");
    });
  });
}());