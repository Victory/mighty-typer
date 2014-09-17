jQuery(function ($) {
  $keyboard = $("#keyboard");
  var chars = $keyboard.text();
  $keyboard.html('');
  var ch = "";
  var $d = $("div");
  var $span;
  var space = "";
  var spacings = [0, 30, 40, 50];
  for (var ii=0; ii < chars.length; ii++) {
    ch = chars[ii];
    if (ch == " ") {
      continue;
    }

    $span = $("<span>");
    if (ch == "\n") {
      $d.append($("<br>"));
      space = spacings.shift();
      $span.css('margin-left', space);
      $d.append($span);
      continue;
    }

    $span.addClass('key');
    $span.text(ch);
    $d.append($span);
  }
  $keyboard.append($d);
});