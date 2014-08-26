$(function(){
  // Show loading screen
  startLoading();
  imagesLoaded(function(){
    finishedLoading();
    showHideLMS();
  });
  $('.sub-nav-link').on('click', changeSection);
  $('.select2').select2({tags: [], dropdownCssClass: 'hide'});
  $('[data-toggle="tooltip"]').tooltip();
  $('.radio-league-type').on('change', showHideLMS);

//  $('.ladda-button').ladda('bind');
});

function changeSection(e) {
  e.preventDefault();
  var $btn, $section;
  $btn = $(e.currentTarget);
  $('.main-sub-nav li.active').removeClass('active');
  $btn.closest('li').addClass('active');
  $section = $('.'+$btn.attr('data-section'));
  $('.tab-section:visible').fadeOut('fast', function() {
    $($section).show();
  });
}

function showHideLMS(e) {
  e.preventDefault();
  var $input, $lms = $('.lms-games');
  $input = $(e.currentTarget);
  if($input.val() == 'plus') {
    $lms.show();
  } else {
    $lms.hide();
  }

}

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
