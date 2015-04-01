$(document).ready(function(){
  $(".begin").on("click",function(){
    $(".sec-A").addClass("showing");
    $(".head").hide();
  });

  $(".down").on("click",function(){
    $(".head").addClass("head-hide");
  });

  $(".home").on("click",function(){
    $(".side").removeClass("showing");
  });

  $(".contact-btn").on("click",function(){
    $(".sec-B").addClass("showing");
  });

  $(".back-btn").on("click",function(){
    $(".sec-B").removeClass("showing");
  });
});