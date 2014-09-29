var dict = [];
var trans = [];
jQuery(function ($) {

  var lesson = "daysOfTheWeek"
  $.get(
    "/resources/ru/courses/" + lesson + ".json",
    function (fData) {
      dict = fData;
      $.get(
        "/resources/us/courses/" + lesson + ".json",
        function (lData) {
          trans = lData;
          var $script = $("<script>");
          $.getScript("/js/match-words.js");
        }
      );
    }
  );
});