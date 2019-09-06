$(document).ready(function() {

  //  General functionality //
  $(".projects-btn").on("click", function() {
    $(".sec-A").addClass("show-left");
    $(".head").hide();
  });

  $(".down").on("click", function() {
    $(".head").addClass("head-hide");
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

  // Landing typer //
  var typed = new Typed('.element', {
    strings: [" Empowering^1500", " Art^1500", " Freedom^1500", " A Headache^1500", " Life^1500", " Dope^1500"],
    typeSpeed: 100
  });
  

  // Projects Code //
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

  // Update Title and .cd-scroll Opacity While Scrolling //
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

  //  Fade-In code from About Me Section  //
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

  // bar graph
  var header = $('.stats__header');
  var bar  = $('.stats__item-bar');
  var nums = $('.stats__item-num');
  var overlay = $('.stats__overlay');
  var back = $('.stats__overlay-back');
  var isOpen = false;

  var vYear = $('#year');
  var vAvg = $('#avg');
  var vGames = $('#games');
  var vGoal = $('#goals');

  $(document).on('ready', function() {
    entrance();
  });

  bar.on('click', showOverlay);
  back.on('click', showOverlay);

  function entrance() {
    bar.addClass('active');
    header.addClass('active');
    header.on('transitionend webkitTransitionend', function() {
      nums.css('opacity', '1');
      bar.css('transition-delay', '0');
      header.off('transitionend webkitTransitionend');
    });
  }

  function showOverlay() {
    if (!isOpen) {
      overlay.addClass('active').removeAttr('style');
      bar.css('transition', 'all 0.4s cubic-bezier(0.86, 0, 0.07, 1)')
      .removeClass('active');
      header.removeClass('active');
      nums.css('opacity', '0');
      isOpen = true;
      
    updateInfo($(this).parent().index());
    } else {
      overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
      bar.addClass('active').removeAttr('style');
      header.addClass('active');
      nums.css('opacity', '1');
      isOpen = false;
    }
  }

  var data = [
    {
      year: '2007-2008',
      goals: '65',
      games: '82',
      avg: '0.79'
      
    },
    {
      year: '2008-2009',
      goals: '56',
      games: '79',
      avg: '0.7'
      
    },
    {
      year: '2009-2010',
      goals: '50',
      games: '72',
      avg: '0.69'
      
    },
    {
      year: '2010-2011',
      goals: '32',
      games: '79',
      avg: '0.40'
      
    },
    {
      year: '2011-2012',
      goals: '38',
      games: '78',
      avg: '0.48'
      
    },
    {
      year: '2012-2013',
      goals: '32',
      games: '48',
      avg: '0.66'
      
    },
    {
      year: '2013-2014',
      goals: '51',
      games: '78',
      avg: '0.65'
      
    },
    {
      year: '2014-2015',
      goals: '50',
      games: '76',
      avg: '0.66'
      
    }
  ];

  function updateInfo(index) {
    vYear.text(data[index].year);
    vAvg.text(data[index].avg);
    vGoal.text(data[index].goals);
    vGames.text(data[index].games);
  }

});
