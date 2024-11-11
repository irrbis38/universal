var initHeader = (header) => {
  var menuBtn = header.querySelector(".header_art6__menu_btn"),
    mobileBtn = header.querySelector(".header_art6__show_mobile"),
    hasDropdown = header.querySelectorAll(".item_has_dropdown"),
    menuExtra = header.querySelector(".header_art6__extra"),
    overlay = header.querySelector(".header_art6__overlay"),
    mobileMenu = header.querySelector(".header_art6__mobile"),
    extraItems = header.querySelectorAll(".header_art6__extra_item"),
    moreButtons = header.querySelectorAll(".header_art6__more_btn"),
    mobileButtons = header.querySelectorAll(".js_toggle_mobile_menu_btn"),
    mobileWrappers = Array.from(header.querySelectorAll(".header_art6__mobile_wrapper")),
    mobileCallBackButton = header.querySelector(".header_art6__mobile_phone");

  // обработчик дополнительного меню
  var menuExtraHandler = (action) => {
    menuExtra && menuExtra.classList[action]("active");

    var isExtraMenuOpen = header.classList.contains("extra-menu-open");

    if (isExtraMenuOpen) {
      extraItems.length > 0 && extraItems.forEach((i) => i.classList.remove("active"));
    }

    header.classList[action]("extra-menu-open");
    menuBtn && menuBtn.classList[action]("active");
  };

  // добавление "слушателя" кнопке переключения выпадающего меню

  menuBtn && menuBtn.addEventListener("click", () => menuExtraHandler("toggle"));

  // обработчик мобильного меню

  var mobileMenuHandler = (action) => {
    var isMobileMenuOpen = header.classList.contains("mobile-menu-open");

    if (isMobileMenuOpen) {
      mobileWrappers.length > 0 &&
        mobileWrappers.forEach((i) => {
          var isTopLevelWrapper = i.classList.contains("top_level");

          isTopLevelWrapper ? i.classList.add("active") : i.classList.remove("active");
        });
    }

    header.classList[action]("mobile-menu-open");
    mobileBtn && mobileBtn.classList[action]("active");
    document.body.classList[action]("lock");
  };

  // добавление "слушателя" кнопке переключения мобильного меню

  mobileBtn &&
    mobileBtn.addEventListener("click", () => {
      var isMobileMenuOpen = header.classList.contains("mobile-menu-open");

      isMobileMenuOpen ? mobileMenuHandler("remove") : mobileMenuHandler("add");
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

  mm767.addEventListener("change", () => (mm767.matches ? menuExtraHandler("remove") : mobileMenuHandler("remove")));

  // закрытие мобильного меню при клике на кнопку обратного звонка

  mobileCallBackButton &&
    mobileCallBackButton.addEventListener("click", () => {
      mobileMenuHandler("remove");
    });

  // обработчик кнопок "еще"

  moreButtons.length > 0 &&
    moreButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        var parent = btn.closest(".header_art6__extra_item");
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

        window.addEventListener("click", (e) => closeDropdown(e, item));
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
        var currentWrapper = btn.closest(".header_art6__mobile_wrapper");

        var targetWrapper = mobileWrappers.find((w) => w.dataset.id === btn.dataset.id);

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

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      var parentInner = entry.target.closest(".header_art6__mobile_wrapper");

      if (entry.isIntersecting) {
        parentInner.classList.add("hide_blur");
      } else {
        parentInner.classList.remove("hide_blur");
      }
    });
  };

  var inners = header.querySelectorAll(".header_art6__mobile_inner");

  inners.forEach((inner) => {
    const options = {
      threshold: 0,
    };

    const list = inner.querySelector(".header_art6__mobile_list");

    const lastElement = list.lastElementChild;

    const observer = new IntersectionObserver(callback, options);

    observer.observe(lastElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  var header = document.querySelector(".header_art6");

  header && initHeader(header);
});
