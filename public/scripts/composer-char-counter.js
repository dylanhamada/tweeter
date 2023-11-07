$(document).ready(function() {
  const tweetInput = $("#tweet-text");
  const tweetCounter = $(".counter");
  
  tweetInput.on("keyup", function(event) {
    let charsRemaining = 140 - $(this).val().length;
    tweetCounter.text(charsRemaining);
    if (charsRemaining < 0) {
      tweetCounter.addClass("invalid");
    } else {
      tweetCounter.removeClass("invalid");
    }
  })
});