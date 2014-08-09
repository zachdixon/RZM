(function(window, document, $) {
  var JoinLeague = function() {

    this.init();
  }

  JoinLeague.prototype.init = function() {
    this.attachEventHandlers();
  }

  JoinLeague.prototype.attachEventHandlers = function() {
    var that = this;
    $('.btn-toggle-form').on('click', changeForm.bind(that));
  }

  function changeForm(e) {
    e.preventDefault();
    var $btn = $(e.currentTarget),
        data_form = $btn.attr('data-form'),
        hide_form;

    hide_form = (data_form === "register") ? "login" : "register";
    $('[data-form="'+hide_form+'"]:not(a)').fadeOut('fast', function() {
      $('[data-form="'+data_form+'"]:not(a)').fadeIn();
    });
  }

  window.JoinLeague = JoinLeague;
})(window, document, jQuery);

$(function() {
  var joinleague = new JoinLeague();
});
