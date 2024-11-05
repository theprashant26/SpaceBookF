(function ($) {
    "use strict";
    $(document).ready(function () {
        function sliderAnimations(elements) {
            var animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data("delay");
                var $animationDuration = $this.data("duration");
                var $animationType = "inserct-animation " + $this.data("animation");
                $this.css({
                    "animation-delay": $animationDelay,
                    "-webkit-animation-delay": $animationDelay,
                    "animation-duration": $animationDuration,
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        const swiperSlides = document.querySelectorAll(".inserct-slider .swiper-slide, .content-slider .swiper-slider");
        const slideCount = swiperSlides.length;
        $(".inserct-slider .inserct-fraction .total-count, .content-slider .inserct-fraction .total-count").text(
            slideCount
        );
        $(".inserct-slider .inserct-fraction .current-count, .content-slider .inserct-fraction .current-count").text(1);

        var sliderOptions = {
            speed: 1500,
            autoplay: {
                delay: 7000,
            },
            disableOnInteraction: false,
            initialSlide: 0,
            parallax: false,
            mousewheel: false,
            loop: true,
            grabCursor: true,
            navigation: {
                nextEl: ".inserct-slider .swiper-prev",
                prevEl: ".inserct-slider .swiper-next",
            },
            pagination: {
                el: ".inserct-swiper-pagination",
                type: "fraction",
            },
        };
        sliderOptions.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find("[data-animation]");
                sliderAnimations(animatingElements);
            },

            progress: function (swiper, progress) {
                if (0.25 == progress) {
                    var progressVal = 100 / 3;
                } else if (0.5 == progress) {
                    var progressVal = (100 / 3) * 2;
                } else if (0.75 == progress) {
                    var progressVal = 100;
                } else {
                    var progressVal = 100 / 3;
                }
                $(".inserct-slider .swiper-slider-progress").css({
                    width: progressVal + "%",
                });
            },

            resize: function () {
                this.update();
            },
        };

        var swiper = new Swiper(".inserct-slider", sliderOptions);
    });
})(jQuery);
