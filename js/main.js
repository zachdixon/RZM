$(function(){
  // Show loading screen
  startLoading();
  // Temp function to clone player
  formPlayers();
  // Hide loading when all images are loaded
  imagesLoaded();

  // Initialize tooltips
  $('.pqt').tooltip();

  // Wait a little to account for height so absolute positions are calculated correctly
  window.setTimeout(function(){
    positionPlayers();
  },100);

  // Position players absolutely
  $(window).resize(positionPlayers);

  // Temp button to show animation
  $('.randomize-players').on('click', randomizePlayers);

  // Toggle player's games for mobile UI
  $('.player-wrapper').on('click', function(e){$(e.currentTarget).toggleClass('expanded');});

  // Add temp classes to show different styles
  fakeClasses();
});

function fakeClasses(){
  var $player_2, $p2_game_4, $player_3, $p3_game4;
  $player_2 = $('.player-wrapper:nth-of-type(2)');
  $p2_game_4 = $player_2.find('.game-wrapper:nth-of-type(4)');
  $player_3 = $('.player-wrapper:nth-of-type(3)');
  $p3_game_4 = $player_3.find('.game-wrapper:nth-of-type(4)');
  // $player_2.addClass('details-left');
  $player_2.addClass('tied');
  $player_3.addClass('tied blue_pqt');
  $p2_game_4.removeClass('losing').addClass('tied_gray');
  $player_2.find('.game-wrapper:first').addClass('tying_gray');
  $p3_game_4.removeClass('losing').addClass('tied_blue');
  $player_3.find('.game-wrapper:first').addClass('tying_blue');

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
    $clone = $player.clone().attr('data-player',x).attr('data-place',x)
    $clone.find('.player-name').text("Player " + x);
    $clone.appendTo('#players-wrapper')
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
  if(e){e.preventDefault()};
  var arr = [];
  //create array of 1..10
  for(var i=1;i<=10;i++){
    arr.push(i);
  }
  //shuffle array
  arr = shuffle(arr);
  movePlayers(arr);
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
  if($(window).width() <= 655){
    var $player;
    $player = $(e.currentTarget);
    $player.find('.player-games-wrapper').slideToggle();
  } else {
    return false;
  }
}
