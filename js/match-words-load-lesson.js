var dict = [];
var trans = [];
jQuery(function ($) {
  $.get(
    "/resources/ru/courses/daysOfTheWeek.json",
    function (fData) {
      dict = fData;
      $.get(
        "/resources/us/courses/daysOfTheWeek.json",
        function (lData) {
          trans = lData;
          var $script = $("<script>");
          $.getScript("/js/match-words.js");
        }
      );
    }
  );
});