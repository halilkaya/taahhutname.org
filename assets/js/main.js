$(document).ready(function() {

  // var myURL = parseURL(document.URL);
  // var myURL_source = myURL.protocol + "://" + myURL.host + ":" + myURL.port + myURL.path;
  // var url0 = myURL_source + ".json?callback=hey";

  window.lang = new Lang("en");

  // $.getJSON(url0, function(data){
  // }).complete(function() {
  //   langSwitch("tr");
  // });
//
//  $("#en-switcher").css("color", "#999999");
//
//  langSwitch = function(lang){
//    window.lang.change(lang);
//    if(window.lang.currentLang == "en"){
//      $("#en-switcher").css("color", "#999999");
//    }else if(window.lang.currentLang == "tr"){
//      $("#tr-switcher").css("color", "#999999");
//    }
//  };
//
//  $("#lang-switcher a").click(function(e){
//    e.preventDefault();
//    if(window.lang.currentLang == "tr"){
//      $(this).css("color", "#999999");
//      $("#en-switcher").css("color", "#B7005B");
//    } else if(window.lang.currentLang == "en") {
//      $(this).css("color", "#999999");
//      $("#tr-switcher").css("color", "#B7005B");
//    }
//  });

  var $root = $('html, body');
  $('a.scroll').click(function() {
      var href = $.attr(this, 'href');
      console.log(href);
      $root.animate({
          scrollTop: $(href).offset().top - 50
      }, 500, function () {
          window.location.hash = href;
      });
      return false;
  });

});