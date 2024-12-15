"use strict";

var initHeader = (header) => {
    var menuBtn = header.querySelector(".header_v_1_art6__menu_btn"),
        mobileBtn = header.querySelector(".header_v_1_art6__show_mobile"),
        hasDropdown = header.querySelectorAll(".item_has_dropdown"),
        menuExtra = header.querySelector(".header_v_1_art6__extra"),
        overlay = header.querySelector(".header_v_1_art6__overlay"),
        mobileMenu = header.querySelector(".header_v_1_art6__mobile"),
        extraItems = header.querySelectorAll(".header_v_1_art6__extra_item"),
        moreButtons = header.querySelectorAll(".header_v_1_art6__more_btn"),
        mobileButtons = header.querySelectorAll(".js_toggle_mobile_menu_btn"),
        mobileWrappers = Array.from(
            header.querySelectorAll(".header_v_1_art6__mobile_wrapper")
        ),
        mobileCallBackButton = header.querySelector(
            ".header_v_1_art6__mobile_phone"
        );

    // обработчик дополнительного меню
    var menuExtraHandler = (action) => {
        menuExtra && menuExtra.classList[action]("active");

        var isExtraMenuOpen = header.classList.contains("extra-menu-open");

        if (isExtraMenuOpen) {
            extraItems.length > 0 &&
                extraItems.forEach((i) => i.classList.remove("active"));
        }

        header.classList[action]("extra-menu-open");
        menuBtn && menuBtn.classList[action]("active");
    };

    // добавление "слушателя" кнопке переключения выпадающего меню

    menuBtn &&
        menuBtn.addEventListener("click", () => menuExtraHandler("toggle"));

    // обработчик мобильного меню

    var mobileMenuHandler = (action) => {
        var isMobileMenuOpen = header.classList.contains("mobile-menu-open");

        if (isMobileMenuOpen) {
            mobileWrappers.length > 0 &&
                mobileWrappers.forEach((i) => {
                    var isTopLevelWrapper = i.classList.contains("top_level");

                    isTopLevelWrapper
                        ? i.classList.add("active")
                        : i.classList.remove("active");
                });
        }

        header.classList[action]("mobile-menu-open");
        mobileBtn && mobileBtn.classList[action]("active");
        document.body.classList[action]("lock");
    };

    // добавление "слушателя" кнопке переключения мобильного меню

    mobileBtn &&
        mobileBtn.addEventListener("click", () => {
            var isMobileMenuOpen =
                header.classList.contains("mobile-menu-open");

            isMobileMenuOpen
                ? mobileMenuHandler("remove")
                : mobileMenuHandler("add");
        });

    // закрытие дополнительного и мобильного меню при клике на "header_art6__overlay"

    overlay &&
        overlay.addEventListener("click", () => {
            menuExtraHandler("remove");
            mobileMenuHandler("remove");
        });

    // при увеличении ширины экрана больше 767px закрывается мобильное меню,
    // при уменьшении - закрывается дополнительное меню

    var mm767 = window.matchMedia("(max-width: 767px)");

    mm767.addEventListener("change", () =>
        mm767.matches ? menuExtraHandler("remove") : mobileMenuHandler("remove")
    );

    // закрытие мобильного меню при клике на кнопку обратного звонка

    mobileCallBackButton &&
        mobileCallBackButton.addEventListener("click", () => {
            mobileMenuHandler("remove");
        });

    // обработчик кнопок "еще"

    moreButtons.length > 0 &&
        moreButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                var parent = btn.closest(".header_v_1_art6__extra_item");
                parent.classList.toggle("active");
            });
        });

    // обработчик выпадающего меню

    var closeDropdown = (e) => {
        if (!e.target.closest(".item_has_dropdown")) {
            hasDropdown.forEach((i) => {
                i.classList.remove("active");
            });
        }
    };

    hasDropdown.length > 0 &&
        hasDropdown.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                hasDropdown.forEach((i) => {
                    i.classList.remove("active");
                });

                item.classList.add("active");

                window.addEventListener("mousemove", (e) =>
                    closeDropdown(e, item)
                );
            });
        });

    var mm1200 = window.matchMedia("(max-width: 1200px)");

    mm1200.addEventListener("change", () => {
        if (mm1200.matches) {
            hasDropdown.length > 0 &&
                hasDropdown.forEach((item) => {
                    item.classList.remove("active");
                });
        }
    });

    // логика переходов в мобильном меню

    var mobileMenuTransition = (mobileButtons) => {
        if (mobileWrappers.length < 1) return;

        var delay = mobileMenu.dataset.animationDelay || 400;

        mobileButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                var currentWrapper = btn.closest(
                    ".header_v_1_art6__mobile_wrapper"
                );

                var targetWrapper = mobileWrappers.find(
                    (w) => w.dataset.id === btn.dataset.id
                );

                if (targetWrapper) {
                    currentWrapper.style.display = "none";
                    currentWrapper.classList.remove("active");
                    targetWrapper.classList.add("active");
                    setTimeout(() => {
                        currentWrapper.style.display = "";
                    }, delay);
                }
            });
        });
    };

    mobileButtons.length > 0 && mobileMenuTransition(mobileButtons);

    // скрыть / показать блюр при скролле

    // const callback = (entries, observer) => {
    //     entries.forEach((entry) => {
    //         var parentInner = entry.target.closest(
    //             ".header_v_1_art6__mobile_wrapper"
    //         );

    //         if (entry.isIntersecting) {
    //             parentInner.classList.add("hide_blur");
    //         } else {
    //             parentInner.classList.remove("hide_blur");
    //         }
    //     });
    // };

    // var inners = header.querySelectorAll(".header_v_1_art6__mobile_inner");

    // inners.forEach((inner) => {
    //     const options = {
    //         threshold: 0,
    //     };

    //     const list = inner.querySelector(".header_v_1_art6__mobile_list");

    //     const lastElement = list.lastElementChild;

    //     const observer = new IntersectionObserver(callback, options);

    //     observer.observe(lastElement);
    // });

    // hide / show header by scroll

    var toggleHeaderByScroll = (header) => {
        let prevScroll = window.scrollY || document.documentElement.scrollTop;
        let curScroll;
        let direction = 0;
        let prevDirection = 0;

        var checkScroll = () => {
            /*
             ** Find the direction of scroll
             ** 0 - initial, 1 - up, 2 - down
             */

            curScroll = window.scrollY || document.documentElement.scrollTop;
            if (curScroll > prevScroll) {
                //scrolled up
                direction = 2;
            } else if (curScroll < prevScroll) {
                //scrolled down
                direction = 1;
            }

            if (direction !== prevDirection) {
                toggleHeader(direction, curScroll);
            }

            prevScroll = curScroll;
        };

        const scrollStart = 100;

        var toggleHeader = (direction, curScroll) => {
            if (direction === 2 && curScroll > scrollStart) {
                if (header.classList.contains("extra-menu-open")) {
                    return;
                } else if (!header.classList.contains("mobile-menu-open")) {
                    header.classList.add("hide");
                    prevDirection = direction;
                }
            } else if (direction === 1) {
                header.classList.remove("hide");
                prevDirection = direction;
            }
        };

        window.addEventListener("scroll", checkScroll);
    };

    toggleHeaderByScroll(header);
};

var initSlider = (sliderContainer) => {
    var slider = new Swiper(sliderContainer, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 8000,
        },
        pagination: {
            el: ".slider-v-1__navigation",
            clickable: true,
        },
    });
};

// ========== FORM VALIDATION

var initInputCheck = (formElements) => {
    formElements.forEach((el) => {
        el.addEventListener("input", () => {
            el.classList.remove("error");
        });
    });
};

var doFormValidation = (formElements) => {
    var requiredElements = formElements.filter((el) => {
        return el.required;
    });

    requiredElements.length > 0 &&
        requiredElements.forEach((el) => {
            if (!el.value) {
                el.classList.add("error");
            } else {
                el.classList.remove("error");
            }
        });
};

var checkErorrs = (formElements) => {
    var isErrorConsist = formElements.some((el) =>
        el.classList.contains("error")
    );
    return !isErrorConsist;
};

var initFormValidation = (forms) => {
    if (forms.length < 0) return;

    forms.forEach((form) => {
        var inputs = Array.from(form.querySelectorAll(".js-input"));

        inputs.length > 0 && initInputCheck(inputs);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            doFormValidation(inputs);

            var checkResult = checkErorrs(inputs);

            if (checkResult) {
                form.reset();

                // feedback.classList.add("success");
            }
        });
    });
};

var initNashiRabotySliders = (container) => {
    var fullSliderEl = container.querySelector(".nashi-raboty-v1__full_slider");
    var previewSliderEl = container.querySelector(
        ".nashi-raboty-v1__thumb_slider"
    );

    if (!fullSliderEl || !previewSliderEl) return;

    var previewSlider = new Swiper(previewSliderEl, {
        slidesPerView: 3,
        spaceBetween: 12,
        loop: false,
        brakepoints: {
            768: {
                spaceBetween: 10,
            },
            992: {
                spaceBetween: 14,
            },
            1301: {
                spaceBetween: 17,
            },
            1601: {
                spaceBetween: 20,
            },
        },
    });

    var fullSlider = new Swiper(fullSliderEl, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        thumbs: {
            swiper: previewSlider,
        },
        navigation: {
            prevEl: ".nashi-raboty-v1__full_prev",
            nextEl: ".nashi-raboty-v1__full_next",
        },
    });
};

// init video

var initVKVideo = (videos) => {
    // generate video url

    var generateUrl = (num, id) => {
        var query = "&hd=2&autoplay=1";
        return "https://vk.com/video_ext.php?oid=-" + num + "&id=" + id + query;
    };

    // create iframe element
    var createIframe = (num, id) => {
        var iframe = document.createElement("iframe");
        iframe.classList.add("video-iframe");
        iframe.setAttribute("src", generateUrl(num, id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
        );

        return iframe;
    };

    // handling each video element
    videos.forEach((el) => {
        var videoHref = el.dataset.video;
        var deletedLength = "https://vk.com/video-".length;

        var videoFull = videoHref
            .substring(deletedLength, videoHref.length)
            .split("_");

        var videoPlayBtn = el.querySelector(".video-play-btn");

        var videoPlayBtnHandler = (e) => {
            var button = e.target;
            var iframe = createIframe(videoFull[0], videoFull[1]);
            el.querySelector(".js-video-preview").remove();
            button.removeEventListener("click", videoPlayBtnHandler);
            button.remove();
            el.append(iframe);
        };

        videoPlayBtn.addEventListener("click", videoPlayBtnHandler);
    });
};

var initFreeWidthSlider = (slider) => {
    console.log(slider);
    new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 15,
        navigation: {
            nextEl: ".sertifikaty_v_1__next",
            prevEl: ".sertifikaty_v_1__prev",
        },
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // init header
    var header = document.querySelector(".header_v_1_art6");

    header && initHeader(header);

    // init slider

    var sliderContainer = document.querySelector(".slider-v-1__container");

    sliderContainer && initSlider(sliderContainer);

    // init form validation

    var forms = document.querySelectorAll(".js-form");

    forms.length > 0 && initFormValidation(forms);

    // init nashi-raboty sliders

    var nashiRabotySlidersContainers = document.querySelectorAll(
        ".nashi-raboty-v1__sliders"
    );

    nashiRabotySlidersContainers.length > 0 &&
        nashiRabotySlidersContainers.forEach((container) =>
            initNashiRabotySliders(container)
        );

    // get all video elements on the page
    var videos = Array.from(document.querySelectorAll(".video-block"));

    videos.length > 0 && initVKVideo(videos);

    // init free width slider

    var free_width_sliders = Array.from(
        document.querySelectorAll(".js-free-width-slider")
    );

    free_width_sliders.length > 0 &&
        free_width_sliders.forEach((slider) => initFreeWidthSlider(slider));
});
