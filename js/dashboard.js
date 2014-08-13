$(function(){
  // $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.placement = 'bottom';
  $('.x-editable').editable();

  // Initialize tooltips
  $('.pqt-wrapper').tooltip();

  $('.show-player-details').on('click', togglePlayerDetails);
  $('.my-dashboard .show-player-details').trigger('click');
  $('#game-face-upload').on('change', changeGameFace);
  $('#winning-face-upload').on('change', changeWinningFace);

  $('#player-select').on('change', changeDashboard);
});

function togglePlayerDetails(e) {
  e.preventDefault();
  var $btn = $(this),
      $details = $btn.prev('.player-details');

  $details.slideToggle();
  $btn.toggleClass('closed open');

  if($btn.hasClass('open')){
    $btn.text('Show Less');
  }else{
    $btn.text('Show More');
  }
}

function changeDashboard(e) {
  e.preventDefault();
  var val = $(this).val();
  if(val == "all"){
    $('.dashboard-wrapper').fadeIn();
  }else{
    $('.dashboard-wrapper:visible').fadeOut('fast', function(){
      $('.dashboard-wrapper#player-'+val).fadeIn();
    });

  }
}
function getImage(e, img, input) {
  var files = e.target.files, f = undefined, reader, i = 0;

  while (f = files[i]) {
    if (!f.type.match("image.*")) {
      continue;
    }
    reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        $(img).attr('src', e.target.result);
        $(input).val(e.target.result);
      };
    })(f);
    reader.readAsDataURL(f);
    i++;
  }
}
function changeGameFace(e) {
  var image = getImage(e, '.img-game-face', '#game-face-hidden');
}
function changeWinningFace(e) {
  var image = getImage(e, '.img-winning-face', '#winning-face-hidden');
}
