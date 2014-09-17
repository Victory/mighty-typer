jQuery(function ($) {
  
  var dict = ["доброе утро", "хороший чай", "может у меня есть", 
              "вы можете иметь", "весна лето осень зима", "шторм"];

  var curWord = randomWord();

  var $matched = $("#matched");
  var $mainInput = $("#mainInput");
  var $mainFeedback = $("#mainFeedback");
  var $wordProgress = $("#wordProgress");
  $matched.html(curWord);

  function randomWord () {
    var choice = Math.floor(Math.random() * dict.length);
    return dict[choice];
  };

   

  function giveReward () {
    $mainFeedback.text("очень хорошо!");
    
    var loadNewWord = function () {
      curWord = randomWord();
      $mainInput.val('');
      $matched.html(curWord);
      $mainFeedback.text('');
      $wordProgress.text('');
    }

    setTimeout(loadNewWord, 1000);
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

    var progress = "";
    var numCorrect = $(".matchedChar", $highlights).length;
    var numExpected = expected.length;
    progress += numCorrect;
    progress += "/";
    progress += numExpected;
    
    $wordProgress.text(progress);

    if (numExpected == numCorrect) {
      $wordProgress.addClass('matchedChar');
      giveReward(curWord);
    } else {
      $wordProgress.removeClass('matchedChar');
    }
  };


  (function () {
    
    $mainInput.keyup(function () {
      var actual = $mainInput.val();
      var $highlights = highlightMatched(curWord, actual);
      $matched.html('');
      $matched.append($highlights);
      setWordProgress($highlights, curWord);
    });

  }());
});