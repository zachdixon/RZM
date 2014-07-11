$(document).on('ready', function(){
  // TODO
  // Add game after drop
  // If replaced, enable team
  // Make dynamic for multiple games, i.e. for RZM picks contain to that div and only add/remove choosing class to helmets within containment
  // Add X button to remove choice, and enable team/game again

  $('.game-item-team').draggable({
    appendTo: '.games-wrapper',
    revert: "invalid",
    containment: '#pickem-panel',
    cursorAt: {top: 54, left: 54},
    snap: '.accept-rzm',
    snapMode: 'inner',
    zIndex: 100,
    helper: function(){
      var url = $(this).data('helmeturl');
      return $('<div class="helmet-wrapper"><img src="'+url+'" alt="" class="img-helmet"></div>');
    },
    start: function() {
      $('.helmet-wrapper.empty').addClass('choosing');
    },
    stop: function() {
      $('.helmet-wrapper').removeClass('choosing');
    }
  });

  $('.helmet-wrapper').droppable({
    accept: '.game-item-team',
    over: function(event, ui) {
      $(ui.helper).addClass('draggable-over');
    },
    out: function(event, ui) {
      $(ui.helper).removeClass('draggable-over');
    },
    drop: function(event, ui) {
      // Remove empty class from helmet wrapper
      $(this).removeClass('empty');
      // Disable dropped team and sibling team
      $(ui.draggable).siblings('.game-item-team').add(ui.draggable).addClass('disabled');
      // Set placeholder img src with helper's src
      $(this).find('img').attr('src',$(ui.helper).find('img').attr('src'));
    }
  })

});
