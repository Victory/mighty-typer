jQuery(function ($) {
  var dict = ["доброе утро", "хороший чай", "может у меня есть", 
              "вы можете иметь", "весна лето осень зима"];

  function randomWord () {
    var choice = Math.floor(Math.random() * dict.length);
    return dict[choice];
  };

  function highlightMatched(expected, actual) {
    var $highlights = $("<div>");
    var a;
    var e;
    var span;

    for (var ii = 0; ii < expected.length; ii++) {
      e = expected[ii];
      span = $("<span>");
      span.text(e);

      if (ii >= actual.length) {
        $highlights.append(span);
        continue;
      }

      a = actual[ii];  
      if (a === e) {
        span.addClass('matchedChar');
      } else {
        span.addClass('missedChar');
      }
      $highlights.append(span);
    }

    return $highlights;
  };

  function setWordProgress($highlights, expected) {
    $wordProgress = $("#wordProgress");
    var progress = "";
    var numCorrect = $(".matchedChar", $highlights).length;
    var numExpected = expected.length;
    progress += numCorrect;
    progress += "/";
    progress += numExpected;
    
    $wordProgress.text(progress);

    if (numExpected == numCorrect) {
      $wordProgress.addClass('matchedChar');
    } else {
      $wordProgress.removeClass('matchedChar');
    }
  };

  (function () {
    var curWord = randomWord();
    var $matched = $("#matched");
    var $mainInput = $("#mainInput");
    
    $matched.html(curWord);
    
    $mainInput.keyup(function () {
      var actual = $mainInput.val();
      var $highlights = highlightMatched(curWord, actual);
      $matched.html('');
      $matched.append($highlights);
      setWordProgress($highlights, curWord);
    });

  }());
});