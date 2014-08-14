$(function(){
  $('.sub-nav-link').on('click', changeSection);
  $('#game-face-upload').on('change', changeGameFace);
  $('#winning-face-upload').on('change', changeWinningFace);
});

function changeSection(e) {
  e.preventDefault();
  var $btn, $section;
  $btn = $(e.currentTarget);
  $('.main-sub-nav li.active').removeClass('active');
  $btn.closest('li').addClass('active');
  $section = $('.'+$btn.attr('data-section'));
  $('.settings-section:visible').fadeOut('fast', function() {
    $($section).show();
  });
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
