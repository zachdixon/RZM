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
        var i = new Image(), resizedImg, cwidth = 300, cheight;
        i.src = e.target.result;
        cheight = cwidth * (i.height / i.width);
        resizedImg = imageToDataUri(i, cwidth, cheight);
        $(img).attr('src', resizedImg);
        $(input).val(resizedImg);
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
function imageToDataUri(img, width, height) {

  /// create an off-screen canvas
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  /// set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  /// draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, width, height);

  /// encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL();
}