$(document).ready(function() {
  var rippleWrap = $('.ripple-wrap');
  var rippler = $('.ripple');
  var finish = false;
  var count = 0;
  var monitor = function(el) {
    var computed = window.getComputedStyle(el, null);
    var borderwidth = parseFloat(
      computed.getPropertyValue('border-left-width')
    );
    if (!finish && borderwidth >= 1500) {
      el.style.WebkitAnimationPlayState = 'paused';
      el.style.animationPlayState = 'paused';
      swapContent();
    } 
    if (finish) {
      el.style.WebkitAnimationPlayState = 'running';
      el.style.animationPlayState = 'running';
      return;
    } else {
      window.requestAnimationFrame(function() {
        monitor(el);
      });
    }
  };

  var storedContent = $('.content--second').html();
  $('.content--second').remove();

  rippler.bind('webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend', function() {
    rippleWrap.removeClass('goripple');
  });

  $('body').on('click', '.transition', function(e) {
    rippler.css('left', e.clientX + 'px');
    rippler.css('top', e.clientY + 'px');
    e.preventDefault();
    finish = false;
    rippleWrap.addClass('goripple');
    window.requestAnimationFrame(function() {
      monitor(rippler[0]);
    });
  });

  function checkShit() {
    count++
    if (count > 1) {
      count = 0
      $('body').removeClass('shit not-shit');
      return;
    }
    else if ( randomTruthy() ) {
      $('body').addClass('shit');
      $('.content__headline').text('Shit');
      $('.content__description').text('Yep. Confirmed Shit');
    } else {
      $('body').addClass('not-shit');
      $('.content__headline').text('Not Shit');
      $('.content__description').text('Definitely Not Shit');
    }
  }

  function randomTruthy() {
    return Math.random() >= 0.5
  }

  function swapContent() {
    var newContent = $('.content--first').html();
    $('.content--first').html(storedContent);
    checkShit();
    storedContent = newContent;
    // do some Ajax, put it in the DOM and then set this to true
    setTimeout(function() {
      finish = true;
    }, 10);
  }
});