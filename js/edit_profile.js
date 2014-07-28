$(function(){
  $('#player-game-face').on('change', changeGameFace);
  $('#player-winning-game-face').on('change', changeWinningGameFace);
});

function changeGameFace(e) {
  var f, files, i, reader;

  files = e.target.files;

  i = 0;

  f = void 0;

  while (f = files[i]) {
    if (!f.type.match("image.*")) {
      continue;
    }
    reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var img;
        return img = e.target.result;
      };
    })(f);
    reader.readAsDataURL(f);
    i++;
  }
}
