!function ($) {
  'use strict';

  $(function () {
    // Scrollspy
    var $window = $(window)
    var $body   = $(document.body)

    $body.scrollspy({
      target: '.bs-docs-sidebar'
    })
    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

    // Kill links
    $('.bs-docs-container [href=#]').click(function (e) {
      e.preventDefault()
    })

    // Kill forms
    $('.bs-docs-container form[action=#]').submit(function (e) {
      e.preventDefault()
    })

    // Sidenav affixing
    setTimeout(function () {
      var $sideBar = $('.bs-docs-sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop      = $sideBar.offset().top
            var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
            var navOuterHeight = $('.bs-docs-nav').height()

            return (this.top = offsetTop - navOuterHeight - sideBarMargin)
          },
          bottom: function () {
            return (this.bottom = $('.bs-docs-footer').outerHeight(true))
          }
        }
      })
    }, 100)

    setTimeout(function () {
      $('.bs-top').affix()
    }, 100)

    // theme toggler
    ;(function () {
      var stylesheetLink = $('#bs-theme-stylesheet')
      var themeBtn = $('.bs-docs-theme-toggle')

      var activateTheme = function () {
        stylesheetLink.attr('href', stylesheetLink.attr('data-href'))
        themeBtn.text('Disable theme preview')
        localStorage.setItem('previewTheme', true)
      }

      if (localStorage.getItem('previewTheme')) {
        activateTheme()
      }

      themeBtn.click(function () {
        var href = stylesheetLink.attr('href')
        if (!href || href.indexOf('data') === 0) {
          activateTheme()
        } else {
          stylesheetLink.attr('href', '')
          themeBtn.text('Preview theme')
          localStorage.removeItem('previewTheme')
        }
      })
      // activateTheme();
    })();

    // navbar top toggler
    ;(function () {
      $('.bs-docs-navbar-top-toggle').click(function () {
        var shown = $(this).text() == "Hide the navbar";
        if(shown) {
          $("body").animate({paddingTop: "0px"});
          $('[data-navbar="top"]').hide('slow');
          $(this).text('Show the navbar');
        } else {
          $("body").animate({paddingTop: "70px"});
          $('[data-navbar="top"]').show('slow');
          $(this).text('Hide the navbar');
        }
      })
    })();

    // navbar bottom toggler
    ;(function () {
      $('.bs-docs-navbar-bottom-toggle').click(function () {
        var shown = $(this).text() == "Hide the navbar";
        if(shown) {
          $("body").animate({paddingBottom: "0px"});
          $('[data-navbar="bottom"]').hide('slow');
          $(this).text('Show the navbar');
        } else {
          $("body").animate({paddingBottom: "100px"});
          $('[data-navbar="bottom"]').show('slow');
          $(this).text('Hide the navbar');
        }
      })
    })();

    // Config ZeroClipboard
    ZeroClipboard.config({
      moviePath: 'assets/flash/ZeroClipboard.swf',
      hoverClass: 'btn-clipboard-hover'
    })

    // Insert copy to clipboard button before .highlight
    $('.highlight').each(function () {
      var highlight = $(this)
      var previous = highlight.prev()
      var btnHtml = '<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>'

      if (previous.hasClass('bs-example') || previous.hasClass('bs-html')) {
        // previous.before(btnHtml.replace(/btn-clipboard/, 'btn-clipboard with-example'))
      } else {
        highlight.before(btnHtml)
      }
    })
    var zeroClipboard = new ZeroClipboard($('.btn-clipboard'))
    var htmlBridge = $('#global-zeroclipboard-html-bridge')

    // Handlers for ZeroClipboard
    zeroClipboard.on('load', function () {
      htmlBridge
        .data('placement', 'top')
        .attr('title', 'Copy to clipboard')
        .tooltip()
    })

    // Copy to clipboard
    zeroClipboard.on('dataRequested', function (client) {
      var highlight = $(this).parent().nextAll('.highlight').first()
      client.setText(highlight.text())
    })

    // Notify copy success and reset tooltip title
    zeroClipboard.on('complete', function () {
      htmlBridge
        .attr('title', 'Copied!')
        .tooltip('fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('fixTitle')
    })

    // Notify copy failure
    zeroClipboard.on('noflash wrongflash', function () {
      htmlBridge
        .attr('title', 'Flash required')
        .tooltip('fixTitle')
        .tooltip('show')
    })
  })
}(jQuery)