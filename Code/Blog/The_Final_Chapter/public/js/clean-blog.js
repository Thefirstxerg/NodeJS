(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass("is-visible");
          } else {
            $('#mainNav').removeClass("is-visible is-fixed");
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass("is-visible");
          if (currentTop > headerHeight && !$('#mainNav').hasClass("is-fixed")) $('#mainNav').addClass("is-fixed");
        }
        this.previousTop = currentTop;
      });
  }

  // Dynamic navbar text contrast based on background image
  function setNavbarTextContrast() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;
    var style = getComputedStyle(nav);
    var bgImg = style.backgroundImage;
    if (!bgImg || bgImg === 'none') return;

    // Extract image URL
    var urlMatch = bgImg.match(/url\(["']?(.+?)["']?\)/);
    if (!urlMatch) return;
    var imgUrl = urlMatch[1];

    var img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = imgUrl;
    img.onload = function() {
      // Create canvas to sample the image
      var canvas = document.createElement('canvas');
      canvas.width = nav.offsetWidth;
      canvas.height = nav.offsetHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      var r=0, g=0, b=0, count=0;
      for (var i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i+1];
        b += imageData[i+2];
        count++;
      }
      r = Math.round(r/count);
      g = Math.round(g/count);
      b = Math.round(b/count);
      // Calculate luminance
      var luminance = (0.299*r + 0.587*g + 0.114*b)/255;
      var textColor = luminance > 0.5 ? '#222' : '#fff';
      var navLinks = nav.querySelectorAll('.navbar-brand, .navbar-nav > li.nav-item > a');
      navLinks.forEach(function(el) {
        el.style.color = textColor;
        el.style.textShadow = luminance > 0.5 ? '1px 1px 2px #fff' : '1px 1px 2px #000';
      });
    };
  }

  document.addEventListener('DOMContentLoaded', setNavbarTextContrast);
  window.addEventListener('resize', setNavbarTextContrast);

})(jQuery); // End of use strict