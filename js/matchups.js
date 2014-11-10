$(function() {
  $('#matchups').on('click', '.selected_star', function(e) {
    e.stopPropagation();
    $(e.currentTarget).fadeOut('fast', function() {
      $(this).siblings('.blank_star').show();
    });
  });
  $('#matchups').on('click', '.blank_star', function(e) {
    e.stopPropagation();
    thisGame = $(e.currentTarget).closest('.match_ups_game_row');
    gameId = thisGame.data('game_id');
    otherGame = thisGame.siblings('[data-game_id="'+gameId+'"]');
    otherGame.find('.selected_star').fadeOut('fast', function() {
      $(this).siblings('.blank_star').show();
    });
    $(e.currentTarget).fadeOut('fast', function() {
      $(this).siblings('.selected_star').show();
    });
  });

  $('#matchups').on('click', '.match_ups_game_row', function(e) {
    gameId = $(e.currentTarget).data('game_id');
    $('.match_ups_game_row[data-game_id="'+gameId+'"]').toggleClass('active');
  });

  $('#matchups').on('keyup', '#input_filter', function(e) {
    text = new RegExp($(e.currentTarget).val(), "ig");
    $('.match_ups_usernames_table p').each(function(index){
      if($(this).data('username').match(text)) {
        $(this).css('visibility', 'visible');
      } else {
        $(this).css('visibility', 'hidden');
      }
    });
  });

});