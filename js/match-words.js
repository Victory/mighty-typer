jQuery(function ($) {
  var dictOriginal = dict;
  var curWord = randomWord();

  var $matched = $("#matched");
  var $mainInput = $("#mainInput");
  var $mainFeedback = $("#mainFeedback");
  var $wordProgress = $("#wordProgress");

  var $trans = $("#trans");

  $matched.html(curWord);

  $("#showKb").click(function (evt) {
    $("#kb").show();
    $(this).hide();
  });

  function randomWord () {
    var choice = Math.floor(Math.random() * dict.length);
    return dict[choice];
  };
   
  function removeCurWord () {
    for (var ii=0; ii < dict.length; ii++) {
      if (dict[ii] === curWord) {
        dict.splice(ii, 1);
        return;
      }
    }
  };

  function transCurWord() {
    for (var ii=0; ii < dictOriginal.length; ii++) {
      if (dictOriginal[ii] === curWord) {
        return trans[ii];
      }
    }
  };

  function giveReward () {
    $mainFeedback.text("очень хорошо!");
    $trans.text(transCurWord());

    removeCurWord();
    var loadNewWord = function () {
      if (dict.length == 0) {
        alert("all done");
        return;
      }

      curWord = randomWord();
      $mainInput.val('');
      $matched.html(curWord);
      $mainFeedback.text('');
      $wordProgress.text('');
      $trans.text('');
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