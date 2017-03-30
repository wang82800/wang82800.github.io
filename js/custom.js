/**
 * Custom JS
 */

/*** Navbar active links ***/

$(function() {

    function getPageName(url) {
        url = url.split("/");
        url = url[url.length - 1];
        url = url.split("#");
        url = url[0];
        return url;
    }

    var currentUrl = window.location.href;
    var pageName = getPageName(currentUrl);

    $(".navbar-nav li > a[href$='" + pageName + "']").parent("li").first()
        .addClass("active");

    $(".navbar-nav > li").has(".active").first()
        .addClass("active");

});


/*** Sticky footer ***/

$(function() {
    function stickyFooter() {
        var footer = $("footer");
        var footerHeight = footer.outerHeight(true);
        $("body").css("margin-bottom", footerHeight);
    };

    setTimeout(stickyFooter, 200);

    $(window).resize(function() {
        setTimeout(stickyFooter, 200);
    });
});


/*** Showcase carousel animations ***/

$(function() {

    function addAnimation(parent) {
        var elements = $(parent).find("[data-animation]");

        elements.each(function() {
            var animation = $(this).data("animation");
            $(this).addClass(animation);
        });
    };

    function removeAnimation(parent) {
        var elements = $(parent).find("[data-animation]");

        elements.each(function() {
            var animation = $(this).data("animation");
            $(this).removeClass(animation);
        });
    };

    $('#showcase-carousel').on({
        "slid.bs.carousel": function() {
            addAnimation("#showcase-carousel .item.active");
        },
        "slide.bs.carousel": function() {
            setTimeout(function() {
                removeAnimation("#showcase-carousel .item.active");
            }, 600);
        }
    });
});


/*** Smooth scroll to anchor ***/

$(function() {

    $('a[href*=#]').not('[href=#], [data-toggle], [data-slide]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 20)
                }, 1000);

                return false;
            }
        }
    });

});


/*** UI Elements: Affix ***/

$(function() {

    $("#ui-categories").affix({
        offset: {
            top: function() {
                var elem = $("#ui-categories");
                return (this.top = elem.offset().top - 20);
            },
            bottom: function() {
                return (this.bottom = $('footer').outerHeight(true))
            }
        }
    }).on("affix.bs.affix", function() {
        var blockWidth = $(this).width();
        $(this).css("width", blockWidth);
    });

});


/*** Gallery filtering ***/

/* Requires isotope.pkgd.min.js & imagesloaded.pkgd.min.js */

/**
 * Isotope filtering
 */

$(function() {

    if ($(".isotope-container").length) {

        // Init Isotope
        var $container = $('.isotope-container').imagesLoaded(function() {
            $container.isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows'
            });
        });

        // Filter items on click
        $(".gallery__nav > li").click(function() {

            // Filter items
            var filterValue = $(this).children("a").attr('data-filter');
            $container.isotope({ filter: filterValue });

            // Change active links in navigation
            $(this).addClass("active").siblings("li").removeClass("active");

            return false;
        });
    }
});


/*** Comments ***/

$(function() {

    $("form[name='comments__new'] textarea").on({

        focus: function() {
            if (!$(this).val()) {
                $(this).data("original-height", $(this).outerHeight());
            }
            $(this).animate({ "height": "68px" }, 300);
        },
        blur: function() {
            if (!$(this).val()) {
                $(this).animate({ "height": $(this).data("original-height") }, 300);
                $(this).parents("form").find("button[type='submit']").attr("disabled", "disabled");
            }
        },
        input: function() {
            $(this).parents("form").find("button[type='submit']").removeAttr("disabled");
        }

    });

});


// function getPageName(url) {
//     url = url.split("/");
//     url = url[url.length - 1];
//     url = url.split("#");
//     url = url[0];
//     return url;
// }

// var currentUrl = window.location.href;
// var pageName = getPageName(currentUrl);

// var isActive = "";

// pageName == "index.html" ? isActive = "active" : isActive = "";