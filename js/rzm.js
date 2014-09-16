$(function(){
  // Show loading screen
  startLoading();
  // Temp function to clone player
  formPlayers();
  // Hide loading when all images are loaded
  // imagesLoaded();
  imagesLoaded(function(){
    finishedLoading();
  });

  // $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.placement = 'bottom';
  $('.x-editable').editable();

  // Initialize popovers with focus trigger type
  $('[data-toggle="tooltip"]').tooltip();

  // Initialize tooltips
  $('.pqt-wrapper').tooltip();

  // Wait a little to account for height so absolute positions are calculated correctly
  window.setTimeout(function(){
    positionPlayers();
  },200);

  // Position players absolutely
  $(window).resize(positionPlayers);

  // Temp button to show animation
  $('.randomize-players').on('click', randomizePlayers);

  // Toggle player's games for mobile UI
  // $('.player-wrapper').on('click', function(e){$(e.currentTarget).toggleClass('expanded');});
  $('.player-wrapper').on('click', toggleGames);


  // Add temp classes to show different styles
  fakeClasses();

  // Add fullscreen click handler
  $('.btn-fullscreen').on('click', toggleFullscreen);
  $(document).on("fullscreenchange", fullscreenChanged);
  $(document).on("webkitfullscreenchange", fullscreenChanged);
  $(document).on("mozfullscreenchange", fullscreenChanged);
  $(document).on("MSFullscreenChange", fullscreenChanged);

  // Initialize Masonry after all images loaded
  // var $players = $('#players-wrapper');
  // $players.imagesLoaded(function(){
  //   finishedLoading();
  //   $players.masonry({
  //     "columnWidth": ".player-wrapper",
  //     "itemSelector": ".player-wrapper",
  //     "gutter": 30
  //   });
  // });

});

function fakeClasses(){
  var $player_2, $p2_game_4;
  $player_2 = $('.player-wrapper:nth-of-type(2)');
  $p2_game_4 = $player_2.find('.game-wrapper:nth-of-type(4)');
  // $player_2.addClass('details-left');
  $player_2.addClass('players-tied');
  $p2_game_4.removeClass('losing').addClass('tied game-over');
  $p2_game_4.find('.point-value').text('0');
  $player_2.find('.game-wrapper:first').addClass('tying');
  $player_2.find('.game-wrapper:first .point-value').text('0');

}

function imagesLoaded(){
  var $images = $('img'), images_loaded = 0;
  $images.each(function(index, image){
    image.onload = function(){
      images_loaded++;
      if(images_loaded >= $images.length){
        positionPlayers();
        finishedLoading();
      }
    };
  });
}

function startLoading(){
  $('.loading').show();
}
function finishedLoading(){
  $('.loading').fadeOut('fast',function(){
    $('#main-container').show();
  });
}

function formPlayers(){
  var $player = $('.player-wrapper');
  var $clone;
  for(var x=2; x <= 10; x++){
    $clone = $player.clone().attr('data-player',x).attr('data-place',x);
    $clone.find('.player-name').text("Player " + x);
    $clone.appendTo('#players-wrapper');
  }
}

function positionPlayers(){
  var $players = $('.player-wrapper')
  var top, left, x_diff, y_diff;
  top = 0;
  left = 25;
  x_diff = $players.first()[0].offsetWidth + ($('#players-wrapper').width()/100);
  y_diff = $players.first()[0].offsetHeight + 10;
  $players.each(function(index,player){
    $(player).css({
      top: top,
      left: left
    });
    top += y_diff;
    if(index == 4){
      left += x_diff;
      top = 0;
    }
  });
}

function shuffle(array) {
  var tmp, current, top = array.length;

  if(top) while(--top) {
  	current = Math.floor(Math.random() * (top + 1));
  	tmp = array[current];
  	array[current] = array[top];
  	array[top] = tmp;
  }

  return array;
}

function randomizePlayers(e){
  if(e){e.preventDefault()}
  var arr = [];
  //create array of 1..10
  for(var i=1;i<=10;i++){
    arr.push(i);
  }
  //shuffle array
  arr = shuffle(arr);
  updatePlayers(arr);
}

// takes array of html, add class flipOutX, once done, remove flipOutX and add flipInX
function updatePlayers(new_order){
  // to fake http response, get html of players
  var $players = $('.player-wrapper');
  var $new_players = [];
  new_order.forEach(function(id,index, new_order){
    var $player = $('.player-wrapper[data-player='+id+']').clone();
    $new_players.push($player);
  });
  $players.each(function(index, player){
    $(player).addClass('animated flipOutX');
    $(player).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){

      var $new_player = $new_players[index];
      $('#players-wrapper').append($new_player);
      $(player).remove();
      positionPlayers();

      $new_player.addClass('animated flipInX');
      $new_player.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
        $new_player.removeClass('flipInX');
      });
    });
  });
}


// Pass array of player ids in order
// i.e [5,4,7,8,6,2,1,10,9,3]
function movePlayers(new_order){
  var middle_top, middle_left, player_width, player_height, positions = [];
  var $players = $('.player-wrapper');
  var $player = $players.first();
  player_width = $player.outerWidth();
  player_height = $player.outerHeight();
  middle_top = ($(document).height()/2) - (player_height/2) - $('#players-wrapper').offset().top;
  middle_left = ($(document).width()/2) - (player_width/2) - $('#players-wrapper').offset().left;

  $players.each(function(index,player){
    positions.push({top: player.offsetTop, left: player.offsetLeft});
  });
  $players.animate({top: middle_top, left: middle_left}, 500, 'swing', function(){
    var place = new_order.indexOf($(this).data('player'));
    var new_position = positions[place];
    $(this).animate({top: new_position.top, left: new_position.left}, 500);
  });

  new_order.forEach(function(id, index, new_order){
    $('.player-wrapper[data-player='+id+']').attr('data-place', index+1).appendTo('#players-wrapper');
  });
}

function toggleGames(e) {
  e.preventDefault();
  // If mobile UI
  if($(window).width() <= 767){
    $(e.currentTarget).find('.player-games-wrapper').toggle();
  } else {
    return false;
  }
}

function toggleFullscreen(e) {
  e.preventDefault();
  var i = $('#main-container')[0];

  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ){} else {
    $('#main-container').addClass('fullscreen');
    // go full-screen
    if (i.requestFullscreen) {
        i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
    }

  }
}

function fullscreenChanged() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ){} else {
    $('#main-container').removeClass('fullscreen');
  }
}
