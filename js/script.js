/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false,
                }
            }
        ]
    });
  }); */
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        nav: false,
        items: 1,
        dots: false,
        loop: true,
        autoHeight: true,
        /* navText: [
                    '<button type="button" class="owl-prev"><img src="icons/left.svg"></button>',
                    '<button type="button" class="owl-next"><img src="icons/right.svg"></button>'
                ] */
    });
    const owl = $(".owl-carousel");
    owl.owlCarousel();
    // Go to the next item
    $(".next").click(function () {
        owl.trigger("next.owl.carousel");
    });
    // Go to the previous item
    $(".prev").click(function () {
        // With optional speed parameter
        // Parameters has to be in square brackSet '[]'
        owl.trigger("prev.owl.carousel", [300]);
    });

    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab_active)",
        function () {
        $(this)
            .addClass("catalog__tab_active")
            .siblings()
            .removeClass("catalog__tab_active")
            .closest("div.container")
            .find("div.catalog__content")
            .removeClass("catalog__content_active")
            .eq($(this).index())
            .addClass("catalog__content_active");
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
        $(this).on("click", function (e) {
            e.preventDefault();
            $(".catalog-item__content")
            .eq(i)
            .toggleClass("catalog-item__content_active");
            $(".catalog-item__list-wrapper").eq(i).toggleClass("catalog-item__list-wrapper_active");
        });
        });
    }

    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back");

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $(".overlay, #consultation").fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thank, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    


    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста,введите свое имя",
                phone: "Пожалуйста,введите свой номер телефона",
                email: {
                    required: "Пожалуйста,введите свой email",
                    email: "Ваш email должен быть в формате 'name@domain.com'"
                }
            }
        });
    };


    valideForms("#consultation-form")
    valideForms("#consultation form")
    valideForms("#order form")

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
 
        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut('slow');
            $('.overlay, #thank').fadeIn('slow');

            
            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn('slow');
        } else {
            $(".pageup").fadeOut('slow'); 
        }
    });
    $("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    
    new WOW().init();
});
