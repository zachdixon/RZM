$(function() {
  $('#matchups').on('click', '.selected_star', function(e) {
    $(e.currentTarget).fadeOut('fast', function() {
      $(this).siblings('.blank_star').show();
    });
  });
  $('#matchups').on('click', '.blank_star', function(e) {
    $(e.currentTarget).fadeOut('fast', function() {
      $(this).siblings('.selected_star').show();
    });
  });

});