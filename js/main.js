$(function(){
  formPlayers();
  positionPlayers();

  $(window).resize(positionPlayers);
});


function formPlayers(){
  var $player = $('.player-wrapper');
  var $clone;
  for(var x=2; x <= 10; x++){
    $clone = $player.clone().attr('data-player',x).attr('data-place',x)
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
    $(this).find('.player-position').text(place + 1)
    $(this).animate({top: new_position.top, left: new_position.left}, 500);
  });

  new_order.forEach(function(id, index, new_order){
    $('.player-wrapper[data-player='+id+']').attr('data-place', index+1).appendTo('#players-wrapper');
  });
}
