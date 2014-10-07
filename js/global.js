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

  $('.sortable').sortable({
    placeholder: 'sortable-placeholder',
    tolerance: 'intersect',
    axis: 'x'
  });
  $('.sortable').disableSelection();

  $('.btn-scoreboard').on('click', showHideScoreboard);

  $(window).on('resize', checkTopNav);
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

function checkTopNav(e) {
  if($('.top-nav').height() > 84) {
    $('.countdown-wrapper').removeClass('pull-right').addClass('pull-left');
  } else {
    $('.countdown-wrapper').removeClass('pull-left').addClass('pull-right');
  }
}

function showHideScoreboard(e) {
  $body = $('body')
  $body.toggleClass('scoreboard-open');
  if($body.hasClass('scoreboard-open')) {
    $(e.target).text('Hide');
  } else {
    $(e.target).text('Scoreboard');
  }
}


//######################################################################################
// Author: ricocheting.com
// Version: v2.0
// Date: 2011-03-31
// Description: displays the amount of time until the "dateFuture" entered below.

// NOTE: the month entered must be one less than current month. ie; 0=January, 11=December
// NOTE: the hour is in 24 hour format. 0=12am, 15=3pm etc
// format: dateFuture1 = new Date(year,month-1,day,hour,min,sec)
// example: dateFuture1 = new Date(2003,03,26,14,15,00) = April 26, 2003 - 2:15:00 pm

dateFuture1 = new Date(2014,9,2,15,54,00);

// TESTING: comment out the line below to print out the "dateFuture" for testing purposes
//document.write(dateFuture +"<br />");


//###################################
//nothing beyond this point
function GetCount(ddate,iid){

  dateNow = new Date();	//grab current date
  amount = ddate.getTime() - dateNow.getTime();	//calc milliseconds between dates
  delete dateNow;

  // if time is already past
  if(amount < 0){
    document.getElementById(iid).innerHTML="Now!";
  }
  // else date is still good
  else{
    days=0;hours=0;mins=0;secs=0;out="";

    amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

    days=Math.floor(amount/86400);//days
    amount=amount%86400;

    hours=Math.floor(amount/3600);//hours
    amount=amount%3600;

    mins=Math.floor(amount/60);//minutes
    amount=amount%60;

    secs=Math.floor(amount);//seconds

    if(days != 0){out += "<p class='pull-left'><span>" + days +"</span>"+((days==1)?"day":"days")+"</p>";}
    if(hours != 0){out += "<p class='pull-left'><span>" + hours +"</span>"+((hours==1)?"hour":"hours")+"</p>";}
    out += "<p class='pull-left'><span>" + mins +"</span>"+((mins==1)?"min":"mins")+"</p>";
    out += "<p class='pull-left'><span>" + secs +"</span>"+((secs==1)?"sec":"secs")+"</p>";
    document.getElementById(iid).innerHTML=out;

    // No labels
//    if(days != 0){out += days +":";}
//    if(hours != 0){out += hours +":";}
//    out += mins +":";
//    out += secs +":";
//    out = out.substr(0,out.length-1);
//    document.getElementById(iid).innerHTML=out;

    setTimeout(function(){GetCount(ddate,iid)}, 1000);
  }
}

window.onload=function(){
  GetCount(dateFuture1, 'countbox1');
  //you can add additional countdowns here (just make sure you create dateFuture2 and countbox2 etc for each)
};