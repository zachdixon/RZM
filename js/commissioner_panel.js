$(function(){
  // Show loading screen
  startLoading();
  imagesLoaded(function(){
    finishedLoading();
  });
  $('.select2').select2({tags: [], dropdownCssClass: 'hide'});
});

function imagesLoaded(){
  var $images = $('img'), images_loaded = 0;
  $images.each(function(index, image){
    image.onload = function(){
      images_loaded++;
      if(images_loaded >= $images.length){
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
