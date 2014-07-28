$(function(){
  // $.fn.editable.defaults.mode = 'inline';
  $.fn.editable.defaults.placement = 'bottom';
  $('.x-editable').editable();

  // Initialize tooltips
  $('.pqt-wrapper').tooltip();

  $('.show-player-details').on('click', togglePlayerDetails);
  $('.my-dashboard .show-player-details').trigger('click');

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
