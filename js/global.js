$(function(){
  // $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.placement = 'bottom';
  $('.x-editable').editable();

  // Initialize popovers with focus trigger type
  $('[data-toggle="tooltip"]').tooltip();

  // Show loading screen
  startLoading();
  imagesLoaded(function(){
    finishedLoading();
  });
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
