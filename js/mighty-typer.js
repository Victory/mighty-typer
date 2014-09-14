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
    var oldVal = $mainTextarea.val();
    $mainTextarea.val(oldVal + newKey);
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