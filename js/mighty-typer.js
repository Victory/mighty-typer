// maps char-set to another form one key to another in a textarea
(function () {

  var keymap; // keymap json is loaded from ajax
  var $mainTextarea; // where the string is stored

  var insertAtCaret = function (evt, key) {
    
  };

  var tt = function (evt) {
    console.log(evt.which, keymap[evt.which]);

    if (typeof keymap[evt.which] === "undefined") {
      return;
    }
    evt.preventDefault();
    var newKey = keymap[evt.which];
    var oldVal = $mainTextarea.val();
    $mainTextarea.val(oldVal + newKey);
  };
  
  jQuery(function ($) {
    $mainTextarea = $("#mainInput");
    var xhr = $.ajax({
      url: "/resources/ru/keymap.json",
      dataType: "json",
      method: "GET"
    });
    
    xhr.fail(function (data, status, xhr) {
      console.log('error', data);
    });

    xhr.done(function (data, status, xhr) {
      keymap = data;
      console.log(keymap);    
      $mainTextarea.on('keydown', tt);
    });

    xhr.always(function () {
    });
  });
}());