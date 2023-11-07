$(document).ready(function() {
  const tweetInput = $("#tweet-text");
  const tweetCounter = $(".counter");
  
  // adjust character counter as user types into textarea
  tweetInput.on("keyup", function(event) {
    let charsRemaining = 140 - $(this).val().length;

    tweetCounter.text(charsRemaining);
    // change text color to red if user exceeds character limit
    if (charsRemaining < 0) {
      tweetCounter.addClass("invalid");
    } else {
      tweetCounter.removeClass("invalid");
    }
  })
});