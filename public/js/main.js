$(document).ready(function() {

  ////////  General Stuff  ////////
  $(".projects").on("click", function() {
    $(".sec-A").addClass("show-left");
    $(".head").hide();
  });

  $(".down").on("click", function() {
    $(".head").addClass("head-hide");
    // enableScroll();
  });

  $(".home").on("click", function() {
    $(".left").removeClass("show-left");
    $(".sec-B").removeClass("show-bottom");
  });

  $(".about-btn").on("click", function() {
    $(".sec-B").addClass("show-bottom");
    setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 500);
  });

  //////  Projects Code   ////////
  // open project
  $('.cd-single-project').on('click', function() {
    var selectedProject = $(this),
      toggle = !selectedProject.hasClass('is-full-width');
    if (toggle) toggleProject($(this), $('.projects-container'), toggle);
  });

  // close project
  $('.projects-container .cd-close').on('click', function() {
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });

  $('.home').on('click', function(){
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });


  // scroll to project info
  $('.projects-container .cd-scroll').on('click', function() {
    $('.projects-container').animate({
      'scrollTop': $(window).height()
    }, 500);
  });

  // update title and .cd-scroll opacity while scrolling
  $('.projects-container').on('scroll', function() {
    window.requestAnimationFrame(changeOpacity);
  });

  function toggleProject(project, container, bool) {
    if (bool) {
      // expand project
      container.addClass('project-is-open');
      project.addClass('is-full-width').siblings('li').removeClass('is-loaded');
    } else {
      // check media query
      var mq = window.getComputedStyle(document.querySelector('.projects-container'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
        delay = (mq == 'mobile') ? 100 : 0;

      container.removeClass('project-is-open');
      // fade out project
      project.animate({
        opacity: 0
      }, 800, function() {
        project.removeClass('is-loaded');
        $('.projects-container').find('.cd-scroll').attr('style', '');
        setTimeout(function() {
          project.attr('style', '').removeClass('is-full-width').find('.cd-title').attr('style', '');
        }, delay);
        setTimeout(function() {
          showCaption($('.projects-container li').eq(0));
        }, 300);
      });
    }
  }

  function changeOpacity() {
    var newOpacity = 1 - ($('.projects-container').scrollTop()) / 300;
    $('.projects-container .cd-scroll').css('opacity', newOpacity);
    $('.is-full-width .cd-title').css('opacity', newOpacity);
    // Bug fixed - Chrome background-attachment:fixed rendering issue
    $('.is-full-width').hide().show(0);
  }

  function showCaption(project) {
    if (project.length > 0) {
      setTimeout(function() {
        project.addClass('is-loaded');
        showCaption(project.next());
      }, 150);
    }
  }

  ////////  Fade-In code from About Me Section  ////////
  var timelineBlocks = $('.cd-timeline-block'),
    offset = .8;

  // hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  // on scolling, show/animate timeline blocks when enter the viewport
  $('.under').on('scroll', function() {
    (!window.requestAnimationFrame) ? setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 100): window.requestAnimationFrame(function() {
      showBlocks(timelineBlocks, offset);
    });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top > $('.under').scrollTop() + $(window).height() * offset) &&
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top <= $('.under').scrollTop() + $(window).height() * offset &&
        $(this).find('.cd-timeline-img').hasClass('is-hidden')) &&
      $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }

});
