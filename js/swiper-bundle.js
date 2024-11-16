var Swiper = (function () {
  "use strict";
  function e(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
  }
  function t(i, s) {
    void 0 === i && (i = {}),
      void 0 === s && (s = {}),
      Object.keys(s).forEach((r) => {
        void 0 === i[r] ? (i[r] = s[r]) : e(s[r]) && e(i[r]) && Object.keys(s[r]).length > 0 && t(i[r], s[r]);
      });
  }
  let i = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
  };
  function s() {
    let e = "undefined" != typeof document ? document : {};
    return t(e, i), e;
  }
  let r = {
    document: i,
    navigator: { userAgent: "" },
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function e() {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function a() {
    let e = "undefined" != typeof window ? window : {};
    return t(e, r), e;
  }
  function l(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function n() {
    return Date.now();
  }
  function o(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
  }
  function d(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function p() {
    let e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      let s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (null != s && !d(s)) {
        let r = Object.keys(Object(s)).filter((e) => 0 > t.indexOf(e));
        for (let a = 0, l = r.length; a < l; a += 1) {
          let n = r[a],
            u = Object.getOwnPropertyDescriptor(s, n);
          void 0 !== u &&
            u.enumerable &&
            (o(e[n]) && o(s[n])
              ? s[n].__swiper__
                ? (e[n] = s[n])
                : p(e[n], s[n])
              : !o(e[n]) && o(s[n])
              ? ((e[n] = {}), s[n].__swiper__ ? (e[n] = s[n]) : p(e[n], s[n]))
              : (e[n] = s[n]));
        }
      }
    }
    return e;
  }
  function u(e, t, i) {
    e.style.setProperty(t, i);
  }
  function c(e) {
    let { swiper: t, targetPosition: i, side: s } = e,
      r = a(),
      l = -t.translate,
      n = null,
      o,
      d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"), r.cancelAnimationFrame(t.cssModeFrameID);
    let p = i > l ? "next" : "prev",
      u = (e, t) => ("next" === p && e >= t) || ("prev" === p && e <= t),
      c = () => {
        (o = new Date().getTime()), null === n && (n = o);
        let e = Math.max(Math.min((o - n) / d, 1), 0),
          a = l + (0.5 - Math.cos(e * Math.PI) / 2) * (i - l);
        if ((u(a, i) && (a = i), t.wrapperEl.scrollTo({ [s]: a }), u(a, i))) {
          (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [s]: a });
            }),
            r.cancelAnimationFrame(t.cssModeFrameID);
          return;
        }
        t.cssModeFrameID = r.requestAnimationFrame(c);
      };
    c();
  }
  function f(e) {
    return e.querySelector(".swiper-slide-transform") || (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) || e;
  }
  function h(e, t) {
    return void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t));
  }
  function m(e) {
    try {
      console.warn(e);
      return;
    } catch (t) {}
  }
  function g(e, t) {
    var i;
    void 0 === t && (t = []);
    let s = document.createElement(e);
    return (
      s.classList.add(
        ...(Array.isArray(t)
          ? t
          : (void 0 === (i = t) && (i = ""),
            i
              .trim()
              .split(" ")
              .filter((e) => !!e.trim())))
      ),
      s
    );
  }
  function v(e, t) {
    let i = a();
    return i.getComputedStyle(e, null).getPropertyValue(t);
  }
  function $(e) {
    let t = e,
      i;
    if (t) {
      for (i = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (i += 1);
      return i;
    }
  }
  function w(e, t) {
    let i = [],
      s = e.parentElement;
    for (; s; ) t ? s.matches(t) && i.push(s) : i.push(s), (s = s.parentElement);
    return i;
  }
  function y(e, t, i) {
    let s = a();
    return i
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(s.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) +
          parseFloat(s.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom"))
      : e.offsetWidth;
  }
  function b(e) {
    return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
  }
  let _;
  function S() {
    return (
      _ ||
        (_ = (function e() {
          let t = a(),
            i = s();
          return {
            smoothScroll: i.documentElement && i.documentElement.style && "scrollBehavior" in i.documentElement.style,
            touch: !!("ontouchstart" in t || (t.DocumentTouch && i instanceof t.DocumentTouch)),
          };
        })()),
      _
    );
  }
  let T;
  function E(e) {
    return (
      void 0 === e && (e = {}),
      T ||
        (T = (function e(t) {
          let { userAgent: i } = void 0 === t ? {} : t,
            s = S(),
            r = a(),
            l = r.navigator.platform,
            n = i || r.navigator.userAgent,
            o = { ios: !1, android: !1 },
            d = r.screen.width,
            p = r.screen.height,
            u = n.match(/(Android);?[\s\/]+([\d.]+)?/),
            c = n.match(/(iPad).*OS\s([\d_]+)/),
            f = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            h = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            m = "MacIntel" === l;
          return (
            !c &&
              m &&
              s.touch &&
              ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(
                `${d}x${p}`
              ) >= 0 &&
              ((c = n.match(/(Version)\/([\d.]+)/)) || (c = [0, 1, "13_0_0"]), (m = !1)),
            u && "Win32" !== l && ((o.os = "android"), (o.android = !0)),
            (c || h || f) && ((o.os = "ios"), (o.ios = !0)),
            o
          );
        })(e)),
      T
    );
  }
  let x,
    C = (e, t, i) => {
      t && !e.classList.contains(i) ? e.classList.add(i) : !t && e.classList.contains(i) && e.classList.remove(i);
    },
    L = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      let i = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
      if (i) {
        let s = i.querySelector(`.${e.params.lazyPreloaderClass}`);
        !s &&
          e.isElement &&
          (i.shadowRoot
            ? (s = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
            : requestAnimationFrame(() => {
                i.shadowRoot && (s = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`)) && s.remove();
              })),
          s && s.remove();
      }
    },
    P = (e, t) => {
      if (!e.slides[t]) return;
      let i = e.slides[t].querySelector('[loading="lazy"]');
      i && i.removeAttribute("loading");
    },
    k = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext,
        i = e.slides.length;
      if (!i || !t || t < 0) return;
      t = Math.min(t, i);
      let s = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        let a = r,
          l = [a - t];
        l.push(...Array.from({ length: t }).map((e, t) => a + s + t)),
          e.slides.forEach((t, i) => {
            l.includes(t.column) && P(e, i);
          });
        return;
      }
      let n = r + s - 1;
      if (e.params.rewind || e.params.loop)
        for (let o = r - t; o <= n + t; o += 1) {
          let d = ((o % i) + i) % i;
          (d < r || d > n) && P(e, d);
        }
      else for (let p = Math.max(r - t, 0); p <= Math.min(n + t, i - 1); p += 1) p !== r && (p > n || p < r) && P(e, p);
    };
  function M(e) {
    let { swiper: t, runCallbacks: i, direction: s, step: r } = e,
      { activeIndex: a, previousIndex: l } = t,
      n = s;
    if ((n || (n = a > l ? "next" : a < l ? "prev" : "reset"), t.emit(`transition${r}`), i && a !== l)) {
      if ("reset" === n) {
        t.emit(`slideResetTransition${r}`);
        return;
      }
      t.emit(`slideChangeTransition${r}`), "next" === n ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`);
    }
  }
  function I(e, t, i) {
    let s = a(),
      { params: r } = e,
      l = r.edgeSwipeDetection,
      n = r.edgeSwipeThreshold;
    return !l || (!(i <= n) && !(i >= s.innerWidth - n)) || ("prevent" === l && (t.preventDefault(), !0));
  }
  function z(e) {
    let t = this,
      i = s(),
      r = e;
    r.originalEvent && (r = r.originalEvent);
    let l = t.touchEventsData;
    if ("pointerdown" === r.type) {
      if (null !== l.pointerId && l.pointerId !== r.pointerId) return;
      l.pointerId = r.pointerId;
    } else "touchstart" === r.type && 1 === r.targetTouches.length && (l.touchId = r.targetTouches[0].identifier);
    if ("touchstart" === r.type) {
      I(t, r, r.targetTouches[0].pageX);
      return;
    }
    let { params: o, touches: d, enabled: p } = t;
    if (!p || (!o.simulateTouch && "mouse" === r.pointerType) || (t.animating && o.preventInteractionOnTransition)) return;
    !t.animating && o.cssMode && o.loop && t.loopFix();
    let u = r.target;
    if (("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u)) || ("which" in r && 3 === r.which) || ("button" in r && r.button > 0) || (l.isTouched && l.isMoved)) return;
    let c = !!o.noSwipingClass && "" !== o.noSwipingClass,
      f = r.composedPath ? r.composedPath() : r.path;
    c && r.target && r.target.shadowRoot && f && (u = f[0]);
    let h = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
      m = !!(r.target && r.target.shadowRoot);
    if (
      o.noSwiping &&
      (m
        ? (function e(t, i) {
            return (
              void 0 === i && (i = this),
              (function e(i) {
                if (!i || i === s() || i === a()) return null;
                i.assignedSlot && (i = i.assignedSlot);
                let r = i.closest(t);
                return r || i.getRootNode ? r || e(i.getRootNode().host) : null;
              })(i)
            );
          })(h, u)
        : u.closest(h))
    ) {
      t.allowClick = !0;
      return;
    }
    if (o.swipeHandler && !u.closest(o.swipeHandler)) return;
    (d.currentX = r.pageX), (d.currentY = r.pageY);
    let g = d.currentX,
      v = d.currentY;
    if (!I(t, r, g)) return;
    Object.assign(l, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
      (d.startX = g),
      (d.startY = v),
      (l.touchStartTime = n()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      o.threshold > 0 && (l.allowThresholdMove = !1);
    let $ = !0;
    u.matches(l.focusableElements) && (($ = !1), "SELECT" === u.nodeName && (l.isTouched = !1)),
      i.activeElement && i.activeElement.matches(l.focusableElements) && i.activeElement !== u && i.activeElement.blur();
    let w = $ && t.allowTouchMove && o.touchStartPreventDefault;
    (o.touchStartForcePreventDefault || w) && !u.isContentEditable && r.preventDefault(),
      o.freeMode && o.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(),
      t.emit("touchStart", r);
  }
  function A(e) {
    let t = s(),
      i = this,
      r = i.touchEventsData,
      { params: a, touches: l, rtlTranslate: o, enabled: d } = i;
    if (!d || (!a.simulateTouch && "mouse" === e.pointerType)) return;
    let p = e;
    if ((p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)) {
      if (null !== r.touchId) return;
      let u = p.pointerId;
      if (u !== r.pointerId) return;
    }
    let c;
    if ("touchmove" === p.type) {
      if (!(c = [...p.changedTouches].filter((e) => e.identifier === r.touchId)[0]) || c.identifier !== r.touchId) return;
    } else c = p;
    if (!r.isTouched) {
      r.startMoving && r.isScrolling && i.emit("touchMoveOpposite", p);
      return;
    }
    let f = c.pageX,
      h = c.pageY;
    if (p.preventedByNestedSwiper) {
      (l.startX = f), (l.startY = h);
      return;
    }
    if (!i.allowTouchMove) {
      p.target.matches(r.focusableElements) || (i.allowClick = !1), r.isTouched && (Object.assign(l, { startX: f, startY: h, currentX: f, currentY: h }), (r.touchStartTime = n()));
      return;
    }
    if (a.touchReleaseOnEdges && !a.loop) {
      if (i.isVertical()) {
        if ((h < l.startY && i.translate <= i.maxTranslate()) || (h > l.startY && i.translate >= i.minTranslate())) {
          (r.isTouched = !1), (r.isMoved = !1);
          return;
        }
      } else if ((f < l.startX && i.translate <= i.maxTranslate()) || (f > l.startX && i.translate >= i.minTranslate())) return;
    }
    if (t.activeElement && p.target === t.activeElement && p.target.matches(r.focusableElements)) {
      (r.isMoved = !0), (i.allowClick = !1);
      return;
    }
    r.allowTouchCallbacks && i.emit("touchMove", p), (l.previousX = l.currentX), (l.previousY = l.currentY), (l.currentX = f), (l.currentY = h);
    let m = l.currentX - l.startX,
      g = l.currentY - l.startY;
    if (i.params.threshold && Math.sqrt(m ** 2 + g ** 2) < i.params.threshold) return;
    if (void 0 === r.isScrolling) {
      let v;
      (i.isHorizontal() && l.currentY === l.startY) || (i.isVertical() && l.currentX === l.startX)
        ? (r.isScrolling = !1)
        : m * m + g * g >= 25 && ((v = (180 * Math.atan2(Math.abs(g), Math.abs(m))) / Math.PI), (r.isScrolling = i.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle));
    }
    if (
      (r.isScrolling && i.emit("touchMoveOpposite", p),
      void 0 === r.startMoving && (l.currentX !== l.startX || l.currentY !== l.startY) && (r.startMoving = !0),
      r.isScrolling || ("touchmove" === p.type && r.preventTouchMoveFromPointerMove))
    ) {
      r.isTouched = !1;
      return;
    }
    if (!r.startMoving) return;
    (i.allowClick = !1), !a.cssMode && p.cancelable && p.preventDefault(), a.touchMoveStopPropagation && !a.nested && p.stopPropagation();
    let $ = i.isHorizontal() ? m : g,
      w = i.isHorizontal() ? l.currentX - l.previousX : l.currentY - l.previousY;
    a.oneWayMovement && (($ = Math.abs($) * (o ? 1 : -1)), (w = Math.abs(w) * (o ? 1 : -1))), (l.diff = $), ($ *= a.touchRatio), o && (($ = -$), (w = -w));
    let y = i.touchesDirection;
    (i.swipeDirection = $ > 0 ? "prev" : "next"), (i.touchesDirection = w > 0 ? "prev" : "next");
    let b = i.params.loop && !a.cssMode,
      _ = ("next" === i.touchesDirection && i.allowSlideNext) || ("prev" === i.touchesDirection && i.allowSlidePrev);
    if (!r.isMoved) {
      if ((b && _ && i.loopFix({ direction: i.swipeDirection }), (r.startTranslate = i.getTranslate()), i.setTransition(0), i.animating)) {
        let S = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 });
        i.wrapperEl.dispatchEvent(S);
      }
      (r.allowMomentumBounce = !1), a.grabCursor && (!0 === i.allowSlideNext || !0 === i.allowSlidePrev) && i.setGrabCursor(!0), i.emit("sliderFirstMove", p);
    }
    let T;
    if ((new Date().getTime(), r.isMoved && r.allowThresholdMove && y !== i.touchesDirection && b && _ && Math.abs($) >= 1)) {
      Object.assign(l, { startX: f, startY: h, currentX: f, currentY: h, startTranslate: r.currentTranslate }), (r.loopSwapReset = !0), (r.startTranslate = r.currentTranslate);
      return;
    }
    i.emit("sliderMove", p), (r.isMoved = !0), (r.currentTranslate = $ + r.startTranslate);
    let E = !0,
      x = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (x = 0),
      $ > 0
        ? (b &&
            _ &&
            !T &&
            r.allowThresholdMove &&
            r.currentTranslate > (a.centeredSlides ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1] : i.minTranslate()) &&
            i.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }),
          r.currentTranslate > i.minTranslate() && ((E = !1), a.resistance && (r.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + r.startTranslate + $) ** x)))
        : $ < 0 &&
          (b &&
            _ &&
            !T &&
            r.allowThresholdMove &&
            r.currentTranslate < (a.centeredSlides ? i.maxTranslate() + i.slidesSizesGrid[i.slidesSizesGrid.length - 1] : i.maxTranslate()) &&
            i.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex: i.slides.length - ("auto" === a.slidesPerView ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(a.slidesPerView, 10))),
            }),
          r.currentTranslate < i.maxTranslate() && ((E = !1), a.resistance && (r.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - r.startTranslate - $) ** x))),
      E && (p.preventedByNestedSwiper = !0),
      !i.allowSlideNext && "next" === i.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate),
      !i.allowSlidePrev && "prev" === i.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate),
      i.allowSlidePrev || i.allowSlideNext || (r.currentTranslate = r.startTranslate),
      a.threshold > 0)
    ) {
      if (Math.abs($) > a.threshold || r.allowThresholdMove) {
        if (!r.allowThresholdMove) {
          (r.allowThresholdMove = !0),
            (l.startX = l.currentX),
            (l.startY = l.currentY),
            (r.currentTranslate = r.startTranslate),
            (l.diff = i.isHorizontal() ? l.currentX - l.startX : l.currentY - l.startY);
          return;
        }
      } else {
        r.currentTranslate = r.startTranslate;
        return;
      }
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && i.freeMode) || a.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()),
      a.freeMode && a.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
      i.updateProgress(r.currentTranslate),
      i.setTranslate(r.currentTranslate));
  }
  function O(e) {
    let t = this,
      i = t.touchEventsData,
      s = e;
    s.originalEvent && (s = s.originalEvent);
    let r,
      a = "touchend" === s.type || "touchcancel" === s.type;
    if (a) {
      if (!(r = [...s.changedTouches].filter((e) => e.identifier === i.touchId)[0]) || r.identifier !== i.touchId) return;
    } else {
      if (null !== i.touchId || s.pointerId !== i.pointerId) return;
      r = s;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type)) {
      let o = ["pointercancel", "contextmenu"].includes(s.type) && (t.browser.isSafari || t.browser.isWebView);
      if (!o) return;
    }
    (i.pointerId = null), (i.touchId = null);
    let { params: d, touches: p, rtlTranslate: u, slidesGrid: c, enabled: f } = t;
    if (!f || (!d.simulateTouch && "mouse" === s.pointerType)) return;
    if ((i.allowTouchCallbacks && t.emit("touchEnd", s), (i.allowTouchCallbacks = !1), !i.isTouched)) {
      i.isMoved && d.grabCursor && t.setGrabCursor(!1), (i.isMoved = !1), (i.startMoving = !1);
      return;
    }
    d.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    let h = n(),
      m = h - i.touchStartTime;
    if (t.allowClick) {
      let g = s.path || (s.composedPath && s.composedPath());
      t.updateClickedSlide((g && g[0]) || s.target, g), t.emit("tap click", s), m < 300 && h - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", s);
    }
    if (
      ((i.lastClickTime = n()),
      l(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched || !i.isMoved || !t.swipeDirection || (0 === p.diff && !i.loopSwapReset) || (i.currentTranslate === i.startTranslate && !i.loopSwapReset))
    ) {
      (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
      return;
    }
    (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
    let v;
    if (((v = d.followFinger ? (u ? t.translate : -t.translate) : -i.currentTranslate), d.cssMode)) return;
    if (d.freeMode && d.freeMode.enabled) {
      t.freeMode.onTouchEnd({ currentPos: v });
      return;
    }
    let $ = v >= -t.maxTranslate() && !t.params.loop,
      w = 0,
      y = t.slidesSizesGrid[0];
    for (let b = 0; b < c.length; b += b < d.slidesPerGroupSkip ? 1 : d.slidesPerGroup) {
      let _ = b < d.slidesPerGroupSkip - 1 ? 1 : d.slidesPerGroup;
      void 0 !== c[b + _] ? ($ || (v >= c[b] && v < c[b + _])) && ((w = b), (y = c[b + _] - c[b])) : ($ || v >= c[b]) && ((w = b), (y = c[c.length - 1] - c[c.length - 2]));
    }
    let S = null,
      T = null;
    d.rewind && (t.isBeginning ? (T = d.virtual && d.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1) : t.isEnd && (S = 0));
    let E = (v - c[w]) / y,
      x = w < d.slidesPerGroupSkip - 1 ? 1 : d.slidesPerGroup;
    if (m > d.longSwipesMs) {
      if (!d.longSwipes) {
        t.slideTo(t.activeIndex);
        return;
      }
      "next" === t.swipeDirection && (E >= d.longSwipesRatio ? t.slideTo(d.rewind && t.isEnd ? S : w + x) : t.slideTo(w)),
        "prev" === t.swipeDirection && (E > 1 - d.longSwipesRatio ? t.slideTo(w + x) : null !== T && E < 0 && Math.abs(E) > d.longSwipesRatio ? t.slideTo(T) : t.slideTo(w));
    } else {
      if (!d.shortSwipes) {
        t.slideTo(t.activeIndex);
        return;
      }
      let C = t.navigation && (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl);
      C
        ? s.target === t.navigation.nextEl
          ? t.slideTo(w + x)
          : t.slideTo(w)
        : ("next" === t.swipeDirection && t.slideTo(null !== S ? S : w + x), "prev" === t.swipeDirection && t.slideTo(null !== T ? T : w));
    }
  }
  function D() {
    let e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    let { allowSlideNext: s, allowSlidePrev: r, snapGrid: a } = e,
      l = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0), (e.allowSlidePrev = !0), e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    let n = l && t.loop;
    ("auto" !== t.slidesPerView && !(t.slidesPerView > 1)) || !e.isEnd || e.isBeginning || e.params.centeredSlides || n
      ? e.params.loop && !l
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = s),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function G(e) {
    this.enabled &&
      !this.allowClick &&
      (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
  }
  function V() {
    let e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
    if (!s) return;
    (e.previousTranslate = e.translate),
      e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    let r,
      a = e.maxTranslate() - e.minTranslate();
    (r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
  }
  function B(e) {
    L(this, e.target), !this.params.cssMode && ("auto" === this.params.slidesPerView || this.params.autoHeight) && this.update();
  }
  function N() {
    let e = this;
    !e.documentTouchHandlerProceeded && ((e.documentTouchHandlerProceeded = !0), e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  let H = (e, t) => {
      let i = s(),
        { params: r, el: a, wrapperEl: l, device: n } = e,
        o = !!r.nested,
        d = "on" === t ? "addEventListener" : "removeEventListener",
        p = t;
      i[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
        a[d]("touchstart", e.onTouchStart, { passive: !1 }),
        a[d]("pointerdown", e.onTouchStart, { passive: !1 }),
        i[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
        i[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
        i[d]("touchend", e.onTouchEnd, { passive: !0 }),
        i[d]("pointerup", e.onTouchEnd, { passive: !0 }),
        i[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
        i[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
        i[d]("pointerout", e.onTouchEnd, { passive: !0 }),
        i[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
        i[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (r.preventClicks || r.preventClicksPropagation) && a[d]("click", e.onClick, !0),
        r.cssMode && l[d]("scroll", e.onScroll),
        r.updateOnWindowResize ? e[p](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", D, !0) : e[p]("observerUpdate", D, !0),
        a[d]("load", e.onLoad, { capture: !0 });
    },
    F = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var R = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  let W = {
      eventsEmitter: {
        on(e, t, i) {
          let s = this;
          if (!s.eventsListeners || s.destroyed || "function" != typeof t) return s;
          let r = i ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][r](t);
            }),
            s
          );
        },
        once(e, t, i) {
          let s = this;
          if (!s.eventsListeners || s.destroyed || "function" != typeof t) return s;
          function r() {
            s.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
            for (var i = arguments.length, a = Array(i), l = 0; l < i; l++) a[l] = arguments[l];
            t.apply(s, a);
          }
          return (r.__emitterProxy = t), s.on(e, r, i);
        },
        onAny(e, t) {
          return (
            !this.eventsListeners || this.destroyed || "function" != typeof e || (0 > this.eventsAnyListeners.indexOf(e) && this.eventsAnyListeners[t ? "unshift" : "push"](e)),
            this
          );
        },
        offAny(e) {
          if (!this.eventsListeners || this.destroyed || !this.eventsAnyListeners) return this;
          let t = this.eventsAnyListeners.indexOf(e);
          return t >= 0 && this.eventsAnyListeners.splice(t, 1), this;
        },
        off(e, t) {
          let i = this;
          return (
            i.eventsListeners &&
              !i.destroyed &&
              i.eventsListeners &&
              e.split(" ").forEach((e) => {
                void 0 === t
                  ? (i.eventsListeners[e] = [])
                  : i.eventsListeners[e] &&
                    i.eventsListeners[e].forEach((s, r) => {
                      (s === t || (s.__emitterProxy && s.__emitterProxy === t)) && i.eventsListeners[e].splice(r, 1);
                    });
              }),
            i
          );
        },
        emit() {
          let e = this;
          if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
          let t, i, s;
          for (var r = arguments.length, a = Array(r), l = 0; l < r; l++) a[l] = arguments[l];
          "string" == typeof a[0] || Array.isArray(a[0]) ? ((t = a[0]), (i = a.slice(1, a.length)), (s = e)) : ((t = a[0].events), (i = a[0].data), (s = a[0].context || e)),
            i.unshift(s);
          let n = Array.isArray(t) ? t : t.split(" ");
          return (
            n.forEach((t) => {
              e.eventsAnyListeners &&
                e.eventsAnyListeners.length &&
                e.eventsAnyListeners.forEach((e) => {
                  e.apply(s, [t, ...i]);
                }),
                e.eventsListeners &&
                  e.eventsListeners[t] &&
                  e.eventsListeners[t].forEach((e) => {
                    e.apply(s, i);
                  });
            }),
            e
          );
        },
      },
      update: {
        updateSize: function e() {
          let t,
            i,
            s = this.el;
          (t = void 0 !== this.params.width && null !== this.params.width ? this.params.width : s.clientWidth),
            (i = void 0 !== this.params.height && null !== this.params.height ? this.params.height : s.clientHeight),
            !((0 === t && this.isHorizontal()) || (0 === i && this.isVertical())) &&
              ((t = t - parseInt(v(s, "padding-left") || 0, 10) - parseInt(v(s, "padding-right") || 0, 10)),
              (i = i - parseInt(v(s, "padding-top") || 0, 10) - parseInt(v(s, "padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(i) && (i = 0),
              Object.assign(this, { width: t, height: i, size: this.isHorizontal() ? t : i }));
        },
        updateSlides: function e() {
          let t = this;
          function i(e, i) {
            return parseFloat(e.getPropertyValue(t.getDirectionLabel(i)) || 0);
          }
          let s = t.params,
            { wrapperEl: r, slidesEl: a, size: l, rtlTranslate: n, wrongRTL: o } = t,
            d = t.virtual && s.virtual.enabled,
            p = d ? t.virtual.slides.length : t.slides.length,
            c = h(a, `.${t.params.slideClass}, swiper-slide`),
            f = d ? t.virtual.slides.length : c.length,
            m = [],
            g = [],
            $ = [],
            w = s.slidesOffsetBefore;
          "function" == typeof w && (w = s.slidesOffsetBefore.call(t));
          let b = s.slidesOffsetAfter;
          "function" == typeof b && (b = s.slidesOffsetAfter.call(t));
          let _ = t.snapGrid.length,
            S = t.slidesGrid.length,
            T = s.spaceBetween,
            E = -w,
            x = 0,
            C = 0;
          if (void 0 === l) return;
          "string" == typeof T && T.indexOf("%") >= 0 ? (T = (parseFloat(T.replace("%", "")) / 100) * l) : "string" == typeof T && (T = parseFloat(T)),
            (t.virtualSize = -T),
            c.forEach((e) => {
              n ? (e.style.marginLeft = "") : (e.style.marginRight = ""), (e.style.marginBottom = ""), (e.style.marginTop = "");
            }),
            s.centeredSlides && s.cssMode && (u(r, "--swiper-centered-offset-before", ""), u(r, "--swiper-centered-offset-after", ""));
          let L = s.grid && s.grid.rows > 1 && t.grid;
          L ? t.grid.initSlides(c) : t.grid && t.grid.unsetSlides();
          let P,
            k = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e) => void 0 !== s.breakpoints[e].slidesPerView).length > 0;
          for (let M = 0; M < f; M += 1) {
            P = 0;
            let I;
            if ((c[M] && (I = c[M]), L && t.grid.updateSlide(M, I, c), !c[M] || "none" !== v(I, "display"))) {
              if ("auto" === s.slidesPerView) {
                k && (c[M].style[t.getDirectionLabel("width")] = "");
                let z = getComputedStyle(I),
                  A = I.style.transform,
                  O = I.style.webkitTransform;
                if ((A && (I.style.transform = "none"), O && (I.style.webkitTransform = "none"), s.roundLengths)) P = t.isHorizontal() ? y(I, "width", !0) : y(I, "height", !0);
                else {
                  let D = i(z, "width"),
                    G = i(z, "padding-left"),
                    V = i(z, "padding-right"),
                    B = i(z, "margin-left"),
                    N = i(z, "margin-right"),
                    H = z.getPropertyValue("box-sizing");
                  if (H && "border-box" === H) P = D + B + N;
                  else {
                    let { clientWidth: F, offsetWidth: R } = I;
                    P = D + G + V + B + N + (R - F);
                  }
                }
                A && (I.style.transform = A), O && (I.style.webkitTransform = O), s.roundLengths && (P = Math.floor(P));
              } else (P = (l - (s.slidesPerView - 1) * T) / s.slidesPerView), s.roundLengths && (P = Math.floor(P)), c[M] && (c[M].style[t.getDirectionLabel("width")] = `${P}px`);
              c[M] && (c[M].swiperSlideSize = P),
                $.push(P),
                s.centeredSlides
                  ? ((E = E + P / 2 + x / 2 + T),
                    0 === x && 0 !== M && (E = E - l / 2 - T),
                    0 === M && (E = E - l / 2 - T),
                    0.001 > Math.abs(E) && (E = 0),
                    s.roundLengths && (E = Math.floor(E)),
                    C % s.slidesPerGroup == 0 && m.push(E),
                    g.push(E))
                  : (s.roundLengths && (E = Math.floor(E)), (C - Math.min(t.params.slidesPerGroupSkip, C)) % t.params.slidesPerGroup == 0 && m.push(E), g.push(E), (E = E + P + T)),
                (t.virtualSize += P + T),
                (x = P),
                (C += 1);
            }
          }
          if (
            ((t.virtualSize = Math.max(t.virtualSize, l) + b),
            n && o && ("slide" === s.effect || "coverflow" === s.effect) && (r.style.width = `${t.virtualSize + T}px`),
            s.setWrapperSize && (r.style[t.getDirectionLabel("width")] = `${t.virtualSize + T}px`),
            L && t.grid.updateWrapperSize(P, m),
            !s.centeredSlides)
          ) {
            let W = [];
            for (let q = 0; q < m.length; q += 1) {
              let Y = m[q];
              s.roundLengths && (Y = Math.floor(Y)), m[q] <= t.virtualSize - l && W.push(Y);
            }
            (m = W), Math.floor(t.virtualSize - l) - Math.floor(m[m.length - 1]) > 1 && m.push(t.virtualSize - l);
          }
          if (d && s.loop) {
            let X = $[0] + T;
            if (s.slidesPerGroup > 1) {
              let j = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / s.slidesPerGroup),
                U = X * s.slidesPerGroup;
              for (let K = 0; K < j; K += 1) m.push(m[m.length - 1] + U);
            }
            for (let J = 0; J < t.virtual.slidesBefore + t.virtual.slidesAfter; J += 1)
              1 === s.slidesPerGroup && m.push(m[m.length - 1] + X), g.push(g[g.length - 1] + X), (t.virtualSize += X);
          }
          if ((0 === m.length && (m = [0]), 0 !== T)) {
            let Q = t.isHorizontal() && n ? "marginLeft" : t.getDirectionLabel("marginRight");
            c.filter((e, t) => !s.cssMode || !!s.loop || t !== c.length - 1).forEach((e) => {
              e.style[Q] = `${T}px`;
            });
          }
          if (s.centeredSlides && s.centeredSlidesBounds) {
            let Z = 0;
            $.forEach((e) => {
              Z += e + (T || 0);
            }),
              (Z -= T);
            let ee = Z - l;
            m = m.map((e) => (e <= 0 ? -w : e > ee ? ee + b : e));
          }
          if (s.centerInsufficientSlides) {
            let et = 0;
            if (
              ($.forEach((e) => {
                et += e + (T || 0);
              }),
              (et -= T) < l)
            ) {
              let ei = (l - et) / 2;
              m.forEach((e, t) => {
                m[t] = e - ei;
              }),
                g.forEach((e, t) => {
                  g[t] = e + ei;
                });
            }
          }
          if ((Object.assign(t, { slides: c, snapGrid: m, slidesGrid: g, slidesSizesGrid: $ }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)) {
            u(r, "--swiper-centered-offset-before", `${-m[0]}px`), u(r, "--swiper-centered-offset-after", `${t.size / 2 - $[$.length - 1] / 2}px`);
            let es = -t.snapGrid[0],
              er = -t.slidesGrid[0];
            (t.snapGrid = t.snapGrid.map((e) => e + es)), (t.slidesGrid = t.slidesGrid.map((e) => e + er));
          }
          if (
            (f !== p && t.emit("slidesLengthChange"),
            m.length !== _ && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")),
            g.length !== S && t.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && t.updateSlidesOffset(),
            t.emit("slidesUpdated"),
            !d && !s.cssMode && ("slide" === s.effect || "fade" === s.effect))
          ) {
            let ea = `${s.containerModifierClass}backface-hidden`,
              el = t.el.classList.contains(ea);
            f <= s.maxBackfaceHiddenSlides ? el || t.el.classList.add(ea) : el && t.el.classList.remove(ea);
          }
        },
        updateAutoHeight: function e(t) {
          let i = this,
            s = [],
            r = i.virtual && i.params.virtual.enabled,
            a = 0,
            l;
          "number" == typeof t ? i.setTransition(t) : !0 === t && i.setTransition(i.params.speed);
          let n = (e) => (r ? i.slides[i.getSlideIndexByData(e)] : i.slides[e]);
          if ("auto" !== i.params.slidesPerView && i.params.slidesPerView > 1) {
            if (i.params.centeredSlides)
              (i.visibleSlides || []).forEach((e) => {
                s.push(e);
              });
            else
              for (l = 0; l < Math.ceil(i.params.slidesPerView); l += 1) {
                let o = i.activeIndex + l;
                if (o > i.slides.length && !r) break;
                s.push(n(o));
              }
          } else s.push(n(i.activeIndex));
          for (l = 0; l < s.length; l += 1)
            if (void 0 !== s[l]) {
              let d = s[l].offsetHeight;
              a = d > a ? d : a;
            }
          (a || 0 === a) && (i.wrapperEl.style.height = `${a}px`);
        },
        updateSlidesOffset: function e() {
          let t = this.slides,
            i = this.isElement ? (this.isHorizontal() ? this.wrapperEl.offsetLeft : this.wrapperEl.offsetTop) : 0;
          for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = (this.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i - this.cssOverflowAdjustment();
        },
        updateSlidesProgress: function e(t) {
          void 0 === t && (t = (this && this.translate) || 0);
          let i = this,
            s = i.params,
            { slides: r, rtlTranslate: a, snapGrid: l } = i;
          if (0 === r.length) return;
          void 0 === r[0].swiperSlideOffset && i.updateSlidesOffset();
          let n = -t;
          a && (n = t),
            r.forEach((e) => {
              e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
            }),
            (i.visibleSlidesIndexes = []),
            (i.visibleSlides = []);
          let o = s.spaceBetween;
          "string" == typeof o && o.indexOf("%") >= 0 ? (o = (parseFloat(o.replace("%", "")) / 100) * i.size) : "string" == typeof o && (o = parseFloat(o));
          for (let d = 0; d < r.length; d += 1) {
            let p = r[d],
              u = p.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (u -= r[0].swiperSlideOffset);
            let c = (n + (s.centeredSlides ? i.minTranslate() : 0) - u) / (p.swiperSlideSize + o),
              f = (n - l[0] + (s.centeredSlides ? i.minTranslate() : 0) - u) / (p.swiperSlideSize + o),
              h = -(n - u),
              m = h + i.slidesSizesGrid[d],
              g = h >= 0 && h <= i.size - i.slidesSizesGrid[d],
              v = (h >= 0 && h < i.size - 1) || (m > 1 && m <= i.size) || (h <= 0 && m >= i.size);
            v && (i.visibleSlides.push(p), i.visibleSlidesIndexes.push(d), r[d].classList.add(s.slideVisibleClass)),
              g && r[d].classList.add(s.slideFullyVisibleClass),
              (p.progress = a ? -c : c),
              (p.originalProgress = a ? -f : f);
          }
        },
        updateProgress: function e(t) {
          if (void 0 === t) {
            let i = this.rtlTranslate ? -1 : 1;
            t = (this && this.translate && this.translate * i) || 0;
          }
          let s = this.params,
            r = this.maxTranslate() - this.minTranslate(),
            { progress: a, isBeginning: l, isEnd: n, progressLoop: o } = this,
            d = l,
            p = n;
          if (0 === r) (a = 0), (l = !0), (n = !0);
          else {
            a = (t - this.minTranslate()) / r;
            let u = 1 > Math.abs(t - this.minTranslate()),
              c = 1 > Math.abs(t - this.maxTranslate());
            (l = u || a <= 0), (n = c || a >= 1), u && (a = 0), c && (a = 1);
          }
          if (s.loop) {
            let f = this.getSlideIndexByData(0),
              h = this.getSlideIndexByData(this.slides.length - 1),
              m = this.slidesGrid[f],
              g = this.slidesGrid[h],
              v = this.slidesGrid[this.slidesGrid.length - 1],
              $ = Math.abs(t);
            (o = $ >= m ? ($ - m) / v : ($ + v - g) / v) > 1 && (o -= 1);
          }
          Object.assign(this, { progress: a, progressLoop: o, isBeginning: l, isEnd: n }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && this.updateSlidesProgress(t),
            l && !d && this.emit("reachBeginning toEdge"),
            n && !p && this.emit("reachEnd toEdge"),
            ((d && !l) || (p && !n)) && this.emit("fromEdge"),
            this.emit("progress", a);
        },
        updateSlidesClasses: function e() {
          let { slides: t, params: i, slidesEl: s, activeIndex: r } = this,
            a = this.virtual && i.virtual.enabled,
            l = this.grid && i.grid && i.grid.rows > 1,
            n = (e) => h(s, `.${i.slideClass}${e}, swiper-slide${e}`)[0],
            o,
            d,
            p;
          if (a) {
            if (i.loop) {
              let u = r - this.virtual.slidesBefore;
              u < 0 && (u = this.virtual.slides.length + u), u >= this.virtual.slides.length && (u -= this.virtual.slides.length), (o = n(`[data-swiper-slide-index="${u}"]`));
            } else o = n(`[data-swiper-slide-index="${r}"]`);
          } else l ? ((o = t.filter((e) => e.column === r)[0]), (p = t.filter((e) => e.column === r + 1)[0]), (d = t.filter((e) => e.column === r - 1)[0])) : (o = t[r]);
          o &&
            !l &&
            ((p = (function e(t, i) {
              let s = [];
              for (; t.nextElementSibling; ) {
                let r = t.nextElementSibling;
                i ? r.matches(i) && s.push(r) : s.push(r), (t = r);
              }
              return s;
            })(o, `.${i.slideClass}, swiper-slide`)[0]),
            i.loop && !p && (p = t[0]),
            (d = (function e(t, i) {
              let s = [];
              for (; t.previousElementSibling; ) {
                let r = t.previousElementSibling;
                i ? r.matches(i) && s.push(r) : s.push(r), (t = r);
              }
              return s;
            })(o, `.${i.slideClass}, swiper-slide`)[0]),
            i.loop),
            t.forEach((e) => {
              C(e, e === o, i.slideActiveClass), C(e, e === p, i.slideNextClass), C(e, e === d, i.slidePrevClass);
            }),
            this.emitSlidesClasses();
        },
        updateActiveIndex: function e(t) {
          let i = this,
            s = i.rtlTranslate ? i.translate : -i.translate,
            { snapGrid: r, params: a, activeIndex: l, realIndex: n, snapIndex: o } = i,
            d = t,
            p,
            u = (e) => {
              let t = e - i.virtual.slidesBefore;
              return t < 0 && (t = i.virtual.slides.length + t), t >= i.virtual.slides.length && (t -= i.virtual.slides.length), t;
            };
          if (
            (void 0 === d &&
              (d = (function e(t) {
                let { slidesGrid: i, params: s } = t,
                  r = t.rtlTranslate ? t.translate : -t.translate,
                  a;
                for (let l = 0; l < i.length; l += 1)
                  void 0 !== i[l + 1] ? (r >= i[l] && r < i[l + 1] - (i[l + 1] - i[l]) / 2 ? (a = l) : r >= i[l] && r < i[l + 1] && (a = l + 1)) : r >= i[l] && (a = l);
                return s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0), a;
              })(i)),
            r.indexOf(s) >= 0)
          )
            p = r.indexOf(s);
          else {
            let c = Math.min(a.slidesPerGroupSkip, d);
            p = c + Math.floor((d - c) / a.slidesPerGroup);
          }
          if ((p >= r.length && (p = r.length - 1), d === l && !i.params.loop)) {
            p !== o && ((i.snapIndex = p), i.emit("snapIndexChange"));
            return;
          }
          if (d === l && i.params.loop && i.virtual && i.params.virtual.enabled) {
            i.realIndex = u(d);
            return;
          }
          let f = i.grid && a.grid && a.grid.rows > 1,
            h;
          if (i.virtual && a.virtual.enabled && a.loop) h = u(d);
          else if (f) {
            let m = i.slides.filter((e) => e.column === d)[0],
              g = parseInt(m.getAttribute("data-swiper-slide-index"), 10);
            Number.isNaN(g) && (g = Math.max(i.slides.indexOf(m), 0)), (h = Math.floor(g / a.grid.rows));
          } else if (i.slides[d]) {
            let v = i.slides[d].getAttribute("data-swiper-slide-index");
            h = v ? parseInt(v, 10) : d;
          } else h = d;
          Object.assign(i, { previousSnapIndex: o, snapIndex: p, previousRealIndex: n, realIndex: h, previousIndex: l, activeIndex: d }),
            i.initialized && k(i),
            i.emit("activeIndexChange"),
            i.emit("snapIndexChange"),
            (i.initialized || i.params.runCallbacksOnInit) && (n !== h && i.emit("realIndexChange"), i.emit("slideChange"));
        },
        updateClickedSlide: function e(t, i) {
          let s = this,
            r = s.params,
            a = t.closest(`.${r.slideClass}, swiper-slide`);
          !a &&
            s.isElement &&
            i &&
            i.length > 1 &&
            i.includes(t) &&
            [...i.slice(i.indexOf(t) + 1, i.length)].forEach((e) => {
              !a && e.matches && e.matches(`.${r.slideClass}, swiper-slide`) && (a = e);
            });
          let l = !1,
            n;
          if (a) {
            for (let o = 0; o < s.slides.length; o += 1)
              if (s.slides[o] === a) {
                (l = !0), (n = o);
                break;
              }
          }
          if (a && l)
            (s.clickedSlide = a), s.virtual && s.params.virtual.enabled ? (s.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10)) : (s.clickedIndex = n);
          else {
            (s.clickedSlide = void 0), (s.clickedIndex = void 0);
            return;
          }
          r.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide();
        },
      },
      translate: {
        getTranslate: function e(t) {
          void 0 === t && (t = this.isHorizontal() ? "x" : "y");
          let { params: i, rtlTranslate: s, translate: r, wrapperEl: l } = this;
          if (i.virtualTranslate) return s ? -r : r;
          if (i.cssMode) return r;
          let n = (function e(t, i) {
            void 0 === i && (i = "x");
            let s = a(),
              r,
              l,
              n,
              o = (function e(t) {
                let i = a(),
                  s;
                return i.getComputedStyle && (s = i.getComputedStyle(t, null)), !s && t.currentStyle && (s = t.currentStyle), s || (s = t.style), s;
              })(t);
            return (
              s.WebKitCSSMatrix
                ? ((l = o.transform || o.webkitTransform).split(",").length > 6 &&
                    (l = l
                      .split(", ")
                      .map((e) => e.replace(",", "."))
                      .join(", ")),
                  (n = new s.WebKitCSSMatrix("none" === l ? "" : l)))
                : (r = (n =
                    o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"))
                    .toString()
                    .split(",")),
              "x" === i && (l = s.WebKitCSSMatrix ? n.m41 : 16 === r.length ? parseFloat(r[12]) : parseFloat(r[4])),
              "y" === i && (l = s.WebKitCSSMatrix ? n.m42 : 16 === r.length ? parseFloat(r[13]) : parseFloat(r[5])),
              l || 0
            );
          })(l, t);
          return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
        },
        setTranslate: function e(t, i) {
          let s = this,
            { rtlTranslate: r, params: a, wrapperEl: l, progress: n } = s,
            o = 0,
            d = 0;
          s.isHorizontal() ? (o = r ? -t : t) : (d = t),
            a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? o : d),
            a.cssMode
              ? (l[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d)
              : a.virtualTranslate ||
                (s.isHorizontal() ? (o -= s.cssOverflowAdjustment()) : (d -= s.cssOverflowAdjustment()), (l.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
          let p,
            u = s.maxTranslate() - s.minTranslate();
          (p = 0 === u ? 0 : (t - s.minTranslate()) / u) !== n && s.updateProgress(t), s.emit("setTranslate", s.translate, i);
        },
        minTranslate: function e() {
          return -this.snapGrid[0];
        },
        maxTranslate: function e() {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function e(t, i, s, r, a) {
          void 0 === t && (t = 0), void 0 === i && (i = this.params.speed), void 0 === s && (s = !0), void 0 === r && (r = !0);
          let l = this,
            { params: n, wrapperEl: o } = l;
          if (l.animating && n.preventInteractionOnTransition) return !1;
          let d = l.minTranslate(),
            p = l.maxTranslate(),
            u;
          if (((u = r && t > d ? d : r && t < p ? p : t), l.updateProgress(u), n.cssMode)) {
            let f = l.isHorizontal();
            if (0 === i) o[f ? "scrollLeft" : "scrollTop"] = -u;
            else {
              if (!l.support.smoothScroll) return c({ swiper: l, targetPosition: -u, side: f ? "left" : "top" }), !0;
              o.scrollTo({ [f ? "left" : "top"]: -u, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === i
              ? (l.setTransition(0), l.setTranslate(u), s && (l.emit("beforeTransitionStart", i, a), l.emit("transitionEnd")))
              : (l.setTransition(i),
                l.setTranslate(u),
                s && (l.emit("beforeTransitionStart", i, a), l.emit("transitionStart")),
                l.animating ||
                  ((l.animating = !0),
                  l.onTranslateToWrapperTransitionEnd ||
                    (l.onTranslateToWrapperTransitionEnd = function e(t) {
                      l &&
                        !l.destroyed &&
                        t.target === this &&
                        (l.wrapperEl.removeEventListener("transitionend", l.onTranslateToWrapperTransitionEnd),
                        (l.onTranslateToWrapperTransitionEnd = null),
                        delete l.onTranslateToWrapperTransitionEnd,
                        (l.animating = !1),
                        s && l.emit("transitionEnd"));
                    }),
                  l.wrapperEl.addEventListener("transitionend", l.onTranslateToWrapperTransitionEnd))),
            !0
          );
        },
      },
      transition: {
        setTransition: function e(t, i) {
          let s = this;
          s.params.cssMode || ((s.wrapperEl.style.transitionDuration = `${t}ms`), (s.wrapperEl.style.transitionDelay = 0 === t ? "0ms" : "")), s.emit("setTransition", t, i);
        },
        transitionStart: function e(t, i) {
          void 0 === t && (t = !0);
          let { params: s } = this;
          s.cssMode || (s.autoHeight && this.updateAutoHeight(), M({ swiper: this, runCallbacks: t, direction: i, step: "Start" }));
        },
        transitionEnd: function e(t, i) {
          void 0 === t && (t = !0);
          let s = this,
            { params: r } = s;
          (s.animating = !1), r.cssMode || (s.setTransition(0), M({ swiper: s, runCallbacks: t, direction: i, step: "End" }));
        },
      },
      slide: {
        slideTo: function e(t, i, s, r, a) {
          void 0 === t && (t = 0), void 0 === s && (s = !0), "string" == typeof t && (t = parseInt(t, 10));
          let l = this,
            n = t;
          n < 0 && (n = 0);
          let { params: o, snapGrid: d, slidesGrid: p, previousIndex: u, activeIndex: f, rtlTranslate: h, wrapperEl: m, enabled: g } = l;
          if ((!g && !r && !a) || l.destroyed || (l.animating && o.preventInteractionOnTransition)) return !1;
          void 0 === i && (i = l.params.speed);
          let v = Math.min(l.params.slidesPerGroupSkip, n),
            $ = v + Math.floor((n - v) / l.params.slidesPerGroup);
          $ >= d.length && ($ = d.length - 1);
          let w = -d[$];
          if (o.normalizeSlideIndex)
            for (let y = 0; y < p.length; y += 1) {
              let b = -Math.floor(100 * w),
                _ = Math.floor(100 * p[y]),
                S = Math.floor(100 * p[y + 1]);
              void 0 !== p[y + 1] ? (b >= _ && b < S - (S - _) / 2 ? (n = y) : b >= _ && b < S && (n = y + 1)) : b >= _ && (n = y);
            }
          if (
            l.initialized &&
            n !== f &&
            ((!l.allowSlideNext && (h ? w > l.translate && w > l.minTranslate() : w < l.translate && w < l.minTranslate())) ||
              (!l.allowSlidePrev && w > l.translate && w > l.maxTranslate() && (f || 0) !== n))
          )
            return !1;
          n !== (u || 0) && s && l.emit("beforeSlideChangeStart"), l.updateProgress(w);
          let T;
          if (((T = n > f ? "next" : n < f ? "prev" : "reset"), (h && -w === l.translate) || (!h && w === l.translate)))
            return (
              l.updateActiveIndex(n),
              o.autoHeight && l.updateAutoHeight(),
              l.updateSlidesClasses(),
              "slide" !== o.effect && l.setTranslate(w),
              "reset" !== T && (l.transitionStart(s, T), l.transitionEnd(s, T)),
              !1
            );
          if (o.cssMode) {
            let E = l.isHorizontal(),
              x = h ? w : -w;
            if (0 === i) {
              let C = l.virtual && l.params.virtual.enabled;
              C && ((l.wrapperEl.style.scrollSnapType = "none"), (l._immediateVirtual = !0)),
                C && !l._cssModeVirtualInitialSet && l.params.initialSlide > 0
                  ? ((l._cssModeVirtualInitialSet = !0),
                    requestAnimationFrame(() => {
                      m[E ? "scrollLeft" : "scrollTop"] = x;
                    }))
                  : (m[E ? "scrollLeft" : "scrollTop"] = x),
                C &&
                  requestAnimationFrame(() => {
                    (l.wrapperEl.style.scrollSnapType = ""), (l._immediateVirtual = !1);
                  });
            } else {
              if (!l.support.smoothScroll) return c({ swiper: l, targetPosition: x, side: E ? "left" : "top" }), !0;
              m.scrollTo({ [E ? "left" : "top"]: x, behavior: "smooth" });
            }
            return !0;
          }
          return (
            l.setTransition(i),
            l.setTranslate(w),
            l.updateActiveIndex(n),
            l.updateSlidesClasses(),
            l.emit("beforeTransitionStart", i, r),
            l.transitionStart(s, T),
            0 === i
              ? l.transitionEnd(s, T)
              : l.animating ||
                ((l.animating = !0),
                l.onSlideToWrapperTransitionEnd ||
                  (l.onSlideToWrapperTransitionEnd = function e(t) {
                    l &&
                      !l.destroyed &&
                      t.target === this &&
                      (l.wrapperEl.removeEventListener("transitionend", l.onSlideToWrapperTransitionEnd),
                      (l.onSlideToWrapperTransitionEnd = null),
                      delete l.onSlideToWrapperTransitionEnd,
                      l.transitionEnd(s, T));
                  }),
                l.wrapperEl.addEventListener("transitionend", l.onSlideToWrapperTransitionEnd)),
            !0
          );
        },
        slideToLoop: function e(t, i, s, r) {
          if ((void 0 === t && (t = 0), void 0 === s && (s = !0), "string" == typeof t)) {
            let a = parseInt(t, 10);
            t = a;
          }
          let l = this;
          if (l.destroyed) return;
          void 0 === i && (i = l.params.speed);
          let n = l.grid && l.params.grid && l.params.grid.rows > 1,
            o = t;
          if (l.params.loop) {
            if (l.virtual && l.params.virtual.enabled) o += l.virtual.slidesBefore;
            else {
              let d;
              if (n) {
                let p = o * l.params.grid.rows;
                d = l.slides.filter((e) => 1 * e.getAttribute("data-swiper-slide-index") === p)[0].column;
              } else d = l.getSlideIndexByData(o);
              let u = n ? Math.ceil(l.slides.length / l.params.grid.rows) : l.slides.length,
                { centeredSlides: c } = l.params,
                f = l.params.slidesPerView;
              "auto" === f ? (f = l.slidesPerViewDynamic()) : ((f = Math.ceil(parseFloat(l.params.slidesPerView, 10))), c && f % 2 == 0 && (f += 1));
              let h = u - d < f;
              if ((c && (h = h || d < Math.ceil(f / 2)), r && c && "auto" !== l.params.slidesPerView && !n && (h = !1), h)) {
                let m = c ? (d < l.activeIndex ? "prev" : "next") : d - l.activeIndex - 1 < l.params.slidesPerView ? "next" : "prev";
                l.loopFix({ direction: m, slideTo: !0, activeSlideIndex: "next" === m ? d + 1 : d - u + 1, slideRealIndex: "next" === m ? l.realIndex : void 0 });
              }
              if (n) {
                let g = o * l.params.grid.rows;
                o = l.slides.filter((e) => 1 * e.getAttribute("data-swiper-slide-index") === g)[0].column;
              } else o = l.getSlideIndexByData(o);
            }
          }
          return (
            requestAnimationFrame(() => {
              l.slideTo(o, i, s, r);
            }),
            l
          );
        },
        slideNext: function e(t, i, s) {
          void 0 === i && (i = !0);
          let r = this,
            { enabled: a, params: l, animating: n } = r;
          if (!a || r.destroyed) return r;
          void 0 === t && (t = r.params.speed);
          let o = l.slidesPerGroup;
          "auto" === l.slidesPerView && 1 === l.slidesPerGroup && l.slidesPerGroupAuto && (o = Math.max(r.slidesPerViewDynamic("current", !0), 1));
          let d = r.activeIndex < l.slidesPerGroupSkip ? 1 : o,
            p = r.virtual && l.virtual.enabled;
          if (l.loop) {
            if (n && !p && l.loopPreventsSliding) return !1;
            if ((r.loopFix({ direction: "next" }), (r._clientLeft = r.wrapperEl.clientLeft), r.activeIndex === r.slides.length - 1 && l.cssMode))
              return (
                requestAnimationFrame(() => {
                  r.slideTo(r.activeIndex + d, t, i, s);
                }),
                !0
              );
          }
          return l.rewind && r.isEnd ? r.slideTo(0, t, i, s) : r.slideTo(r.activeIndex + d, t, i, s);
        },
        slidePrev: function e(t, i, s) {
          void 0 === i && (i = !0);
          let r = this,
            { params: a, snapGrid: l, slidesGrid: n, rtlTranslate: o, enabled: d, animating: p } = r;
          if (!d || r.destroyed) return r;
          void 0 === t && (t = r.params.speed);
          let u = r.virtual && a.virtual.enabled;
          if (a.loop) {
            if (p && !u && a.loopPreventsSliding) return !1;
            r.loopFix({ direction: "prev" }), (r._clientLeft = r.wrapperEl.clientLeft);
          }
          let c = o ? r.translate : -r.translate;
          function f(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          let h = f(c),
            m = l.map((e) => f(e)),
            g = l[m.indexOf(h) - 1];
          if (void 0 === g && a.cssMode) {
            let v;
            l.forEach((e, t) => {
              h >= e && (v = t);
            }),
              void 0 !== v && (g = l[v > 0 ? v - 1 : v]);
          }
          let $ = 0;
          if (
            (void 0 !== g &&
              (($ = n.indexOf(g)) < 0 && ($ = r.activeIndex - 1),
              "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && ($ = Math.max(($ = $ - r.slidesPerViewDynamic("previous", !0) + 1), 0))),
            a.rewind && r.isBeginning)
          ) {
            let w = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
            return r.slideTo(w, t, i, s);
          }
          return a.loop && 0 === r.activeIndex && a.cssMode
            ? (requestAnimationFrame(() => {
                r.slideTo($, t, i, s);
              }),
              !0)
            : r.slideTo($, t, i, s);
        },
        slideReset: function e(t, i, s) {
          if ((void 0 === i && (i = !0), !this.destroyed)) return void 0 === t && (t = this.params.speed), this.slideTo(this.activeIndex, t, i, s);
        },
        slideToClosest: function e(t, i, s, r) {
          if ((void 0 === i && (i = !0), void 0 === r && (r = 0.5), this.destroyed)) return;
          void 0 === t && (t = this.params.speed);
          let a = this.activeIndex,
            l = Math.min(this.params.slidesPerGroupSkip, a),
            n = l + Math.floor((a - l) / this.params.slidesPerGroup),
            o = this.rtlTranslate ? this.translate : -this.translate;
          if (o >= this.snapGrid[n]) {
            let d = this.snapGrid[n],
              p = this.snapGrid[n + 1];
            o - d > (p - d) * r && (a += this.params.slidesPerGroup);
          } else {
            let u = this.snapGrid[n - 1],
              c = this.snapGrid[n];
            o - u <= (c - u) * r && (a -= this.params.slidesPerGroup);
          }
          return (a = Math.min((a = Math.max(a, 0)), this.slidesGrid.length - 1)), this.slideTo(a, t, i, s);
        },
        slideToClickedSlide: function e() {
          let t = this;
          if (t.destroyed) return;
          let { params: i, slidesEl: s } = t,
            r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
            a = t.clickedIndex,
            n,
            o = t.isElement ? "swiper-slide" : `.${i.slideClass}`;
          if (i.loop) {
            if (t.animating) return;
            (n = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
              i.centeredSlides
                ? a < t.loopedSlides - r / 2 || a > t.slides.length - t.loopedSlides + r / 2
                  ? (t.loopFix(),
                    (a = t.getSlideIndex(h(s, `${o}[data-swiper-slide-index="${n}"]`)[0])),
                    l(() => {
                      t.slideTo(a);
                    }))
                  : t.slideTo(a)
                : a > t.slides.length - r
                ? (t.loopFix(),
                  (a = t.getSlideIndex(h(s, `${o}[data-swiper-slide-index="${n}"]`)[0])),
                  l(() => {
                    t.slideTo(a);
                  }))
                : t.slideTo(a);
          } else t.slideTo(a);
        },
      },
      loop: {
        loopCreate: function e(t) {
          let i = this,
            { params: s, slidesEl: r } = i;
          if (!s.loop || (i.virtual && i.params.virtual.enabled)) return;
          let a = () => {
              let e = h(r, `.${s.slideClass}, swiper-slide`);
              e.forEach((e, t) => {
                e.setAttribute("data-swiper-slide-index", t);
              });
            },
            l = i.grid && s.grid && s.grid.rows > 1,
            n = s.slidesPerGroup * (l ? s.grid.rows : 1),
            o = i.slides.length % n != 0,
            d = l && i.slides.length % s.grid.rows != 0,
            p = (e) => {
              for (let t = 0; t < e; t += 1) {
                let r = i.isElement ? g("swiper-slide", [s.slideBlankClass]) : g("div", [s.slideClass, s.slideBlankClass]);
                i.slidesEl.append(r);
              }
            };
          if (o) {
            if (s.loopAddBlankSlides) {
              let u = n - (i.slides.length % n);
              p(u), i.recalcSlides(), i.updateSlides();
            } else
              m(
                "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
              );
            a();
          } else if (d) {
            if (s.loopAddBlankSlides) {
              let c = s.grid.rows - (i.slides.length % s.grid.rows);
              p(c), i.recalcSlides(), i.updateSlides();
            } else
              m(
                "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
              );
            a();
          } else a();
          i.loopFix({ slideRealIndex: t, direction: s.centeredSlides ? void 0 : "next" });
        },
        loopFix: function e(t) {
          let { slideRealIndex: i, slideTo: s = !0, direction: r, setTranslate: a, activeSlideIndex: l, byController: n, byMousewheel: o } = void 0 === t ? {} : t,
            d = this;
          if (!d.params.loop) return;
          d.emit("beforeLoopFix");
          let { slides: p, allowSlidePrev: u, allowSlideNext: c, slidesEl: f, params: h } = d,
            { centeredSlides: g } = h;
          if (((d.allowSlidePrev = !0), (d.allowSlideNext = !0), d.virtual && h.virtual.enabled)) {
            s &&
              (h.centeredSlides || 0 !== d.snapIndex
                ? h.centeredSlides && d.snapIndex < h.slidesPerView
                  ? d.slideTo(d.virtual.slides.length + d.snapIndex, 0, !1, !0)
                  : d.snapIndex === d.snapGrid.length - 1 && d.slideTo(d.virtual.slidesBefore, 0, !1, !0)
                : d.slideTo(d.virtual.slides.length, 0, !1, !0)),
              (d.allowSlidePrev = u),
              (d.allowSlideNext = c),
              d.emit("loopFix");
            return;
          }
          let v = h.slidesPerView;
          "auto" === v ? (v = d.slidesPerViewDynamic()) : ((v = Math.ceil(parseFloat(h.slidesPerView, 10))), g && v % 2 == 0 && (v += 1));
          let $ = h.slidesPerGroupAuto ? v : h.slidesPerGroup,
            w = $;
          w % $ != 0 && (w += $ - (w % $)), (w += h.loopAdditionalSlides), (d.loopedSlides = w);
          let y = d.grid && h.grid && h.grid.rows > 1;
          p.length < v + w
            ? m(
                "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
              )
            : y && "row" === h.grid.fill && m("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
          let b = [],
            _ = [],
            S = d.activeIndex;
          void 0 === l ? (l = d.getSlideIndex(p.filter((e) => e.classList.contains(h.slideActiveClass))[0])) : (S = l);
          let T = "next" === r || !r,
            E = "prev" === r || !r,
            x = 0,
            C = 0,
            L = y ? Math.ceil(p.length / h.grid.rows) : p.length,
            P = y ? p[l].column : l,
            k = P + (g && void 0 === a ? -v / 2 + 0.5 : 0);
          if (k < w) {
            x = Math.max(w - k, $);
            for (let M = 0; M < w - k; M += 1) {
              let I = M - Math.floor(M / L) * L;
              if (y) {
                let z = L - I - 1;
                for (let A = p.length - 1; A >= 0; A -= 1) p[A].column === z && b.push(A);
              } else b.push(L - I - 1);
            }
          } else if (k + v > L - w) {
            C = Math.max(k - (L - 2 * w), $);
            for (let O = 0; O < C; O += 1) {
              let D = O - Math.floor(O / L) * L;
              y
                ? p.forEach((e, t) => {
                    e.column === D && _.push(t);
                  })
                : _.push(D);
            }
          }
          if (
            ((d.__preventObserver__ = !0),
            requestAnimationFrame(() => {
              d.__preventObserver__ = !1;
            }),
            E &&
              b.forEach((e) => {
                (p[e].swiperLoopMoveDOM = !0), f.prepend(p[e]), (p[e].swiperLoopMoveDOM = !1);
              }),
            T &&
              _.forEach((e) => {
                (p[e].swiperLoopMoveDOM = !0), f.append(p[e]), (p[e].swiperLoopMoveDOM = !1);
              }),
            d.recalcSlides(),
            "auto" === h.slidesPerView
              ? d.updateSlides()
              : y &&
                ((b.length > 0 && E) || (_.length > 0 && T)) &&
                d.slides.forEach((e, t) => {
                  d.grid.updateSlide(t, e, d.slides);
                }),
            h.watchSlidesProgress && d.updateSlidesOffset(),
            s)
          ) {
            if (b.length > 0 && E) {
              if (void 0 === i) {
                let G = d.slidesGrid[S],
                  V = d.slidesGrid[S + x],
                  B = V - G;
                o
                  ? d.setTranslate(d.translate - B)
                  : (d.slideTo(S + Math.ceil(x), 0, !1, !0),
                    a &&
                      ((d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - B), (d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - B)));
              } else if (a) {
                let N = y ? b.length / h.grid.rows : b.length;
                d.slideTo(d.activeIndex + N, 0, !1, !0), (d.touchEventsData.currentTranslate = d.translate);
              }
            } else if (_.length > 0 && T) {
              if (void 0 === i) {
                let H = d.slidesGrid[S],
                  F = d.slidesGrid[S - C],
                  R = F - H;
                o
                  ? d.setTranslate(d.translate - R)
                  : (d.slideTo(S - C, 0, !1, !0),
                    a &&
                      ((d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - R), (d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - R)));
              } else {
                let W = y ? _.length / h.grid.rows : _.length;
                d.slideTo(d.activeIndex - W, 0, !1, !0);
              }
            }
          }
          if (((d.allowSlidePrev = u), (d.allowSlideNext = c), d.controller && d.controller.control && !n)) {
            let q = { slideRealIndex: i, direction: r, setTranslate: a, activeSlideIndex: l, byController: !0 };
            Array.isArray(d.controller.control)
              ? d.controller.control.forEach((e) => {
                  !e.destroyed && e.params.loop && e.loopFix({ ...q, slideTo: e.params.slidesPerView === h.slidesPerView && s });
                })
              : d.controller.control instanceof d.constructor &&
                d.controller.control.params.loop &&
                d.controller.control.loopFix({ ...q, slideTo: d.controller.control.params.slidesPerView === h.slidesPerView && s });
          }
          d.emit("loopFix");
        },
        loopDestroy: function e() {
          let { params: t, slidesEl: i } = this;
          if (!t.loop || (this.virtual && this.params.virtual.enabled)) return;
          this.recalcSlides();
          let s = [];
          this.slides.forEach((e) => {
            let t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
            s[t] = e;
          }),
            this.slides.forEach((e) => {
              e.removeAttribute("data-swiper-slide-index");
            }),
            s.forEach((e) => {
              i.append(e);
            }),
            this.recalcSlides(),
            this.slideTo(this.realIndex, 0);
        },
      },
      grabCursor: {
        setGrabCursor: function e(t) {
          let i = this;
          if (!i.params.simulateTouch || (i.params.watchOverflow && i.isLocked) || i.params.cssMode) return;
          let s = "container" === i.params.touchEventsTarget ? i.el : i.wrapperEl;
          i.isElement && (i.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = t ? "grabbing" : "grab"),
            i.isElement &&
              requestAnimationFrame(() => {
                i.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function e() {
          let t = this;
          (!t.params.watchOverflow || !t.isLocked) &&
            !t.params.cssMode &&
            (t.isElement && (t.__preventObserver__ = !0),
            (t["container" === t.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = ""),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function e() {
          let t = this,
            { params: i } = t;
          (t.onTouchStart = z.bind(t)),
            (t.onTouchMove = A.bind(t)),
            (t.onTouchEnd = O.bind(t)),
            (t.onDocumentTouchStart = N.bind(t)),
            i.cssMode && (t.onScroll = V.bind(t)),
            (t.onClick = G.bind(t)),
            (t.onLoad = B.bind(t)),
            H(t, "on");
        },
        detachEvents: function e() {
          H(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function e() {
          let t = this,
            { realIndex: i, initialized: s, params: r, el: a } = t,
            l = r.breakpoints;
          if (!l || (l && 0 === Object.keys(l).length)) return;
          let n = t.getBreakpoint(l, t.params.breakpointsBase, t.el);
          if (!n || t.currentBreakpoint === n) return;
          let o = n in l ? l[n] : void 0,
            d = o || t.originalParams,
            u = F(t, r),
            c = F(t, d),
            f = t.params.grabCursor,
            h = d.grabCursor,
            m = r.enabled;
          u && !c
            ? (a.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), t.emitContainerClasses())
            : !u &&
              c &&
              (a.classList.add(`${r.containerModifierClass}grid`),
              ((d.grid.fill && "column" === d.grid.fill) || (!d.grid.fill && "column" === r.grid.fill)) && a.classList.add(`${r.containerModifierClass}grid-column`),
              t.emitContainerClasses()),
            f && !h ? t.unsetGrabCursor() : !f && h && t.setGrabCursor(),
            ["navigation", "pagination", "scrollbar"].forEach((e) => {
              if (void 0 === d[e]) return;
              let i = r[e] && r[e].enabled,
                s = d[e] && d[e].enabled;
              i && !s && t[e].disable(), !i && s && t[e].enable();
            });
          let g = d.direction && d.direction !== r.direction,
            v = r.loop && (d.slidesPerView !== r.slidesPerView || g),
            $ = r.loop;
          g && s && t.changeDirection(), p(t.params, d);
          let w = t.params.enabled,
            y = t.params.loop;
          Object.assign(t, { allowTouchMove: t.params.allowTouchMove, allowSlideNext: t.params.allowSlideNext, allowSlidePrev: t.params.allowSlidePrev }),
            m && !w ? t.disable() : !m && w && t.enable(),
            (t.currentBreakpoint = n),
            t.emit("_beforeBreakpoint", d),
            s && (v ? (t.loopDestroy(), t.loopCreate(i), t.updateSlides()) : !$ && y ? (t.loopCreate(i), t.updateSlides()) : $ && !y && t.loopDestroy()),
            t.emit("breakpoint", d);
        },
        getBreakpoint: function e(t, i, s) {
          if ((void 0 === i && (i = "window"), !t || ("container" === i && !s))) return;
          let r = !1,
            l = a(),
            n = "window" === i ? l.innerHeight : s.clientHeight,
            o = Object.keys(t).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                let t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let d = 0; d < o.length; d += 1) {
            let { point: p, value: u } = o[d];
            "window" === i ? l.matchMedia(`(min-width: ${u}px)`).matches && (r = p) : u <= s.clientWidth && (r = p);
          }
          return r || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function e() {
          let t = this,
            { isLocked: i, params: s } = t,
            { slidesOffsetBefore: r } = s;
          if (r) {
            let a = t.slides.length - 1,
              l = t.slidesGrid[a] + t.slidesSizesGrid[a] + 2 * r;
            t.isLocked = t.size > l;
          } else t.isLocked = 1 === t.snapGrid.length;
          !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
            !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
            i && i !== t.isLocked && (t.isEnd = !1),
            i !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function e() {
          let { classNames: t, params: i, rtl: s, el: r, device: a } = this,
            l = (function e(t, i) {
              let s = [];
              return (
                t.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((t) => {
                        e[t] && s.push(i + t);
                      })
                    : "string" == typeof e && s.push(i + e);
                }),
                s
              );
            })(
              [
                "initialized",
                i.direction,
                { "free-mode": this.params.freeMode && i.freeMode.enabled },
                { autoheight: i.autoHeight },
                { rtl: s },
                { grid: i.grid && i.grid.rows > 1 },
                { "grid-column": i.grid && i.grid.rows > 1 && "column" === i.grid.fill },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": i.cssMode },
                { centered: i.cssMode && i.centeredSlides },
                { "watch-progress": i.watchSlidesProgress },
              ],
              i.containerModifierClass
            );
          t.push(...l), r.classList.add(...t), this.emitContainerClasses();
        },
        removeClasses: function e() {
          let { el: t, classNames: i } = this;
          t.classList.remove(...i), this.emitContainerClasses();
        },
      },
    },
    q = {};
  class Y {
    constructor() {
      let e, t;
      for (var i = arguments.length, r = Array(i), l = 0; l < i; l++) r[l] = arguments[l];
      1 === r.length && r[0].constructor && "Object" === Object.prototype.toString.call(r[0]).slice(8, -1) ? (t = r[0]) : ([e, t] = r),
        t || (t = {}),
        (t = p({}, t)),
        e && !t.el && (t.el = e);
      let n = s();
      if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
        let o = [];
        return (
          n.querySelectorAll(t.el).forEach((e) => {
            let i = p({}, t, { el: e });
            o.push(new Y(i));
          }),
          o
        );
      }
      let d = this;
      (d.__swiper__ = !0),
        (d.support = S()),
        (d.device = E({ userAgent: t.userAgent })),
        (d.browser =
          (x ||
            (x = (function e() {
              let t = a(),
                i = E(),
                s = !1;
              function r() {
                let e = t.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && 0 > e.indexOf("chrome") && 0 > e.indexOf("android");
              }
              if (r()) {
                let l = String(t.navigator.userAgent);
                if (l.includes("Version/")) {
                  let [n, o] = l
                    .split("Version/")[1]
                    .split(" ")[0]
                    .split(".")
                    .map((e) => Number(e));
                  s = n < 16 || (16 === n && o < 2);
                }
              }
              let d = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
                p = r(),
                u = p || (d && i.ios);
              return { isSafari: s || p, needPerspectiveFix: s, need3dFix: u, isWebView: d };
            })()),
          x)),
        (d.eventsListeners = {}),
        (d.eventsAnyListeners = []),
        (d.modules = [...d.__modules__]),
        t.modules && Array.isArray(t.modules) && d.modules.push(...t.modules);
      let u = {};
      d.modules.forEach((e) => {
        var i, s;
        e({
          params: t,
          swiper: d,
          extendParams:
            ((i = t),
            (s = u),
            function e(t) {
              void 0 === t && (t = {});
              let r = Object.keys(t)[0],
                a = t[r];
              if (
                "object" != typeof a ||
                null === a ||
                (!0 === i[r] && (i[r] = { enabled: !0 }),
                "navigation" === r && i[r] && i[r].enabled && !i[r].prevEl && !i[r].nextEl && (i[r].auto = !0),
                ["pagination", "scrollbar"].indexOf(r) >= 0 && i[r] && i[r].enabled && !i[r].el && (i[r].auto = !0),
                !(r in i && "enabled" in a))
              ) {
                p(s, t);
                return;
              }
              "object" != typeof i[r] || "enabled" in i[r] || (i[r].enabled = !0), i[r] || (i[r] = { enabled: !1 }), p(s, t);
            }),
          on: d.on.bind(d),
          once: d.once.bind(d),
          off: d.off.bind(d),
          emit: d.emit.bind(d),
        });
      });
      let c = p({}, R, u);
      return (
        (d.params = p({}, c, q, t)),
        (d.originalParams = p({}, d.params)),
        (d.passedParams = p({}, t)),
        d.params &&
          d.params.on &&
          Object.keys(d.params.on).forEach((e) => {
            d.on(e, d.params.on[e]);
          }),
        d.params && d.params.onAny && d.onAny(d.params.onAny),
        Object.assign(d, {
          enabled: d.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === d.params.direction,
          isVertical: () => "vertical" === d.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return 8388608 * Math.trunc(this.translate / 8388608);
          },
          allowSlideNext: d.params.allowSlideNext,
          allowSlidePrev: d.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: d.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: d.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        d.emit("_swiper"),
        d.params.init && d.init(),
        d
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      let { slidesEl: t, params: i } = this,
        s = h(t, `.${i.slideClass}, swiper-slide`),
        r = $(s[0]);
      return $(e) - r;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(this.slides.filter((t) => 1 * t.getAttribute("data-swiper-slide-index") === e)[0]);
    }
    recalcSlides() {
      let e = this,
        { slidesEl: t, params: i } = e;
      e.slides = h(t, `.${i.slideClass}, swiper-slide`);
    }
    enable() {
      let e = this;
      e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
    }
    disable() {
      let e = this;
      e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
    }
    setProgress(e, t) {
      e = Math.min(Math.max(e, 0), 1);
      let i = this.minTranslate(),
        s = this.maxTranslate(),
        r = (s - i) * e + i;
      this.translateTo(r, void 0 === t ? 0 : t), this.updateActiveIndex(), this.updateSlidesClasses();
    }
    emitContainerClasses() {
      let e = this;
      if (!e.params._emitClasses || !e.el) return;
      let t = e.el.className.split(" ").filter((t) => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      let t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
            .join(" ");
    }
    emitSlidesClasses() {
      let e = this;
      if (!e.params._emitClasses || !e.el) return;
      let t = [];
      e.slides.forEach((i) => {
        let s = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      let { params: i, slides: s, slidesGrid: r, slidesSizesGrid: a, size: l, activeIndex: n } = this,
        o = 1;
      if ("number" == typeof i.slidesPerView) return i.slidesPerView;
      if (i.centeredSlides) {
        let d = s[n] ? Math.ceil(s[n].swiperSlideSize) : 0,
          p;
        for (let u = n + 1; u < s.length; u += 1) s[u] && !p && ((d += Math.ceil(s[u].swiperSlideSize)), (o += 1), d > l && (p = !0));
        for (let c = n - 1; c >= 0; c -= 1) s[c] && !p && ((d += s[c].swiperSlideSize), (o += 1), d > l && (p = !0));
      } else if ("current" === e)
        for (let f = n + 1; f < s.length; f += 1) {
          let h = t ? r[f] + a[f] - r[n] < l : r[f] - r[n] < l;
          h && (o += 1);
        }
      else
        for (let m = n - 1; m >= 0; m -= 1) {
          let g = r[n] - r[m] < l;
          g && (o += 1);
        }
      return o;
    }
    update() {
      let e = this;
      if (!e || e.destroyed) return;
      let { snapGrid: t, params: i } = e;
      function s() {
        let t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      i.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && L(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses();
      let r;
      if (i.freeMode && i.freeMode.enabled && !i.cssMode) s(), i.autoHeight && e.updateAutoHeight();
      else {
        if (("auto" === i.slidesPerView || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
          let a = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
          r = e.slideTo(a.length - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || s();
      }
      i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      let i = this,
        s = i.params.direction;
      return (
        e || (e = "horizontal" === s ? "vertical" : "horizontal"),
        e === s ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
          i.el.classList.add(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    changeLanguageDirection(e) {
      let t = this;
      (!t.rtl || "rtl" !== e) &&
        (t.rtl || "ltr" !== e) &&
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      let t = this;
      if (t.mounted) return !0;
      let i = e || t.params.el;
      if (("string" == typeof i && (i = document.querySelector(i)), !i)) return !1;
      (i.swiper = t), i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
      let s = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`,
        r = (() => {
          if (i && i.shadowRoot && i.shadowRoot.querySelector) {
            let e = i.shadowRoot.querySelector(s());
            return e;
          }
          return h(i, s())[0];
        })();
      return (
        !r &&
          t.params.createElements &&
          ((r = g("div", t.params.wrapperClass)),
          i.append(r),
          h(i, `.${t.params.slideClass}`).forEach((e) => {
            r.append(e);
          })),
        Object.assign(t, {
          el: i,
          wrapperEl: r,
          slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : r,
          hostEl: t.isElement ? i.parentNode.host : i,
          mounted: !0,
          rtl: "rtl" === i.dir.toLowerCase() || "rtl" === v(i, "direction"),
          rtlTranslate: "horizontal" === t.params.direction && ("rtl" === i.dir.toLowerCase() || "rtl" === v(i, "direction")),
          wrongRTL: "-webkit-box" === v(r, "display"),
        }),
        !0
      );
    }
    init(e) {
      let t = this;
      if (t.initialized) return t;
      let i = t.mount(e);
      if (!1 === i) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0)
          : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      let s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? L(t, e)
            : e.addEventListener("load", (e) => {
                L(t, e.target);
              });
        }),
        k(t),
        (t.initialized = !0),
        k(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      let i = this,
        { params: s, el: r, wrapperEl: a, slides: l } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          s.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            r.removeAttribute("style"),
            a.removeAttribute("style"),
            l &&
              l.length &&
              l.forEach((e) => {
                e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.el.swiper = null),
            (function e(t) {
              let i = t;
              Object.keys(i).forEach((e) => {
                try {
                  i[e] = null;
                } catch (t) {}
                try {
                  delete i[e];
                } catch (s) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      p(q, e);
    }
    static get extendedDefaults() {
      return q;
    }
    static get defaults() {
      return R;
    }
    static installModule(e) {
      Y.prototype.__modules__ || (Y.prototype.__modules__ = []);
      let t = Y.prototype.__modules__;
      "function" == typeof e && 0 > t.indexOf(e) && t.push(e);
    }
    static use(e) {
      return Array.isArray(e) ? (e.forEach((e) => Y.installModule(e)), Y) : (Y.installModule(e), Y);
    }
  }
  function X(e, t, i, s) {
    return (
      e.params.createElements &&
        Object.keys(s).forEach((r) => {
          if (!i[r] && !0 === i.auto) {
            let a = h(e.el, `.${s[r]}`)[0];
            a || (((a = g("div", s[r])).className = s[r]), e.el.append(a)), (i[r] = a), (t[r] = a);
          }
        }),
      i
    );
  }
  function j(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function U(e, t) {
    let i = f(t);
    return i !== t && ((i.style.backfaceVisibility = "hidden"), (i.style["-webkit-backface-visibility"] = "hidden")), i;
  }
  Object.keys(W).forEach((e) => {
    Object.keys(W[e]).forEach((t) => {
      Y.prototype[t] = W[e][t];
    });
  }),
    Y.use([
      function e(t) {
        let { swiper: i, on: s, emit: r } = t,
          l = a(),
          n = null,
          o = null,
          d = () => {
            i && !i.destroyed && i.initialized && (r("beforeResize"), r("resize"));
          },
          p = () => {
            i &&
              !i.destroyed &&
              i.initialized &&
              (n = new ResizeObserver((e) => {
                o = l.requestAnimationFrame(() => {
                  let { width: t, height: s } = i,
                    r = t,
                    a = s;
                  e.forEach((e) => {
                    let { contentBoxSize: t, contentRect: s, target: l } = e;
                    (l && l !== i.el) || ((r = s ? s.width : (t[0] || t).inlineSize), (a = s ? s.height : (t[0] || t).blockSize));
                  }),
                    (r !== t || a !== s) && d();
                });
              })).observe(i.el);
          },
          u = () => {
            o && l.cancelAnimationFrame(o), n && n.unobserve && i.el && (n.unobserve(i.el), (n = null));
          },
          c = () => {
            i && !i.destroyed && i.initialized && r("orientationchange");
          };
        s("init", () => {
          if (i.params.resizeObserver && void 0 !== l.ResizeObserver) {
            p();
            return;
          }
          l.addEventListener("resize", d), l.addEventListener("orientationchange", c);
        }),
          s("destroy", () => {
            u(), l.removeEventListener("resize", d), l.removeEventListener("orientationchange", c);
          });
      },
      function e(t) {
        let { swiper: i, extendParams: s, on: r, emit: l } = t,
          n = [],
          o = a(),
          d = function (e, t) {
            void 0 === t && (t = {});
            let s = o.MutationObserver || o.WebkitMutationObserver,
              r = new s((e) => {
                if (i.__preventObserver__) return;
                if (1 === e.length) {
                  l("observerUpdate", e[0]);
                  return;
                }
                let t = function t() {
                  l("observerUpdate", e[0]);
                };
                o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0);
              });
            r.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              n.push(r);
          },
          p = () => {
            if (i.params.observer) {
              if (i.params.observeParents) {
                let e = w(i.hostEl);
                for (let t = 0; t < e.length; t += 1) d(e[t]);
              }
              d(i.hostEl, { childList: i.params.observeSlideChildren }), d(i.wrapperEl, { attributes: !1 });
            }
          },
          u = () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), r("init", p), r("destroy", u);
      },
    ]);
  let K = [
    function e(t) {
      let { swiper: i, extendParams: r, on: l, emit: n } = t,
        o = s(),
        d = a();
      function p(e) {
        if (!i.enabled) return;
        let { rtlTranslate: t } = i,
          r = e;
        r.originalEvent && (r = r.originalEvent);
        let l = r.keyCode || r.charCode,
          p = i.params.keyboard.pageUpDown,
          u = p && 33 === l,
          c = p && 34 === l,
          f = 37 === l,
          h = 39 === l,
          m = 38 === l,
          g = 40 === l;
        if ((!i.allowSlideNext && ((i.isHorizontal() && h) || (i.isVertical() && g) || c)) || (!i.allowSlidePrev && ((i.isHorizontal() && f) || (i.isVertical() && m) || u)))
          return !1;
        if (
          !r.shiftKey &&
          !r.altKey &&
          !r.ctrlKey &&
          !r.metaKey &&
          (!o.activeElement || !o.activeElement.nodeName || ("input" !== o.activeElement.nodeName.toLowerCase() && "textarea" !== o.activeElement.nodeName.toLowerCase()))
        ) {
          if (i.params.keyboard.onlyInViewport && (u || c || f || h || m || g)) {
            let v = !1;
            if (w(i.el, `.${i.params.slideClass}, swiper-slide`).length > 0 && 0 === w(i.el, `.${i.params.slideActiveClass}`).length) return;
            let $ = i.el,
              y = $.clientWidth,
              b = $.clientHeight,
              _ = d.innerWidth,
              S = d.innerHeight,
              T = (function e(t) {
                let i = a(),
                  r = s(),
                  l = t.getBoundingClientRect(),
                  n = r.body,
                  o = t.clientTop || n.clientTop || 0,
                  d = t.clientLeft || n.clientLeft || 0,
                  p = t === i ? i.scrollY : t.scrollTop,
                  u = t === i ? i.scrollX : t.scrollLeft;
                return { top: l.top + p - o, left: l.left + u - d };
              })($);
            t && (T.left -= $.scrollLeft);
            let E = [
              [T.left, T.top],
              [T.left + y, T.top],
              [T.left, T.top + b],
              [T.left + y, T.top + b],
            ];
            for (let x = 0; x < E.length; x += 1) {
              let C = E[x];
              if (C[0] >= 0 && C[0] <= _ && C[1] >= 0 && C[1] <= S) {
                if (0 === C[0] && 0 === C[1]) continue;
                v = !0;
              }
            }
            if (!v) return;
          }
          i.isHorizontal()
            ? ((u || c || f || h) && (r.preventDefault ? r.preventDefault() : (r.returnValue = !1)),
              (((c || h) && !t) || ((u || f) && t)) && i.slideNext(),
              (((u || f) && !t) || ((c || h) && t)) && i.slidePrev())
            : ((u || c || m || g) && (r.preventDefault ? r.preventDefault() : (r.returnValue = !1)), (c || g) && i.slideNext(), (u || m) && i.slidePrev()),
            n("keyPress", l);
        }
      }
      function u() {
        i.keyboard.enabled || (o.addEventListener("keydown", p), (i.keyboard.enabled = !0));
      }
      function c() {
        i.keyboard.enabled && (o.removeEventListener("keydown", p), (i.keyboard.enabled = !1));
      }
      (i.keyboard = { enabled: !1 }),
        r({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        l("init", () => {
          i.params.keyboard.enabled && u();
        }),
        l("destroy", () => {
          i.keyboard.enabled && c();
        }),
        Object.assign(i.keyboard, { enable: u, disable: c });
    },
    function e(t) {
      let { swiper: i, extendParams: s, on: r, emit: a } = t;
      function l(e) {
        let t;
        return e && "string" == typeof e && i.isElement && (t = i.el.querySelector(e))
          ? t
          : (e &&
              ("string" == typeof e && (t = [...document.querySelectorAll(e)]),
              i.params.uniqueNavElements && "string" == typeof e && t && t.length > 1 && 1 === i.el.querySelectorAll(e).length
                ? (t = i.el.querySelector(e))
                : t && 1 === t.length && (t = t[0])),
            e && !t)
          ? e
          : t;
      }
      function n(e, t) {
        let s = i.params.navigation;
        (e = b(e)).forEach((e) => {
          e &&
            (e.classList[t ? "add" : "remove"](...s.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = t),
            i.params.watchOverflow && i.enabled && e.classList[i.isLocked ? "add" : "remove"](s.lockClass));
        });
      }
      function o() {
        let { nextEl: e, prevEl: t } = i.navigation;
        if (i.params.loop) {
          n(t, !1), n(e, !1);
          return;
        }
        n(t, i.isBeginning && !i.params.rewind), n(e, i.isEnd && !i.params.rewind);
      }
      function d(e) {
        e.preventDefault(), (!i.isBeginning || i.params.loop || i.params.rewind) && (i.slidePrev(), a("navigationPrev"));
      }
      function p(e) {
        e.preventDefault(), (!i.isEnd || i.params.loop || i.params.rewind) && (i.slideNext(), a("navigationNext"));
      }
      function u() {
        let e = i.params.navigation;
        if (
          ((i.params.navigation = X(i, i.originalParams.navigation, i.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" })), !(e.nextEl || e.prevEl))
        )
          return;
        let t = l(e.nextEl),
          s = l(e.prevEl);
        Object.assign(i.navigation, { nextEl: t, prevEl: s }), (t = b(t)), (s = b(s));
        let r = (t, s) => {
          t && t.addEventListener("click", "next" === s ? p : d), !i.enabled && t && t.classList.add(...e.lockClass.split(" "));
        };
        t.forEach((e) => r(e, "next")), s.forEach((e) => r(e, "prev"));
      }
      function c() {
        let { nextEl: e, prevEl: t } = i.navigation;
        (e = b(e)), (t = b(t));
        let s = (e, t) => {
          e.removeEventListener("click", "next" === t ? p : d), e.classList.remove(...i.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => s(e, "next")), t.forEach((e) => s(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (i.navigation = { nextEl: null, prevEl: null }),
        r("init", () => {
          !1 === i.params.navigation.enabled ? h() : (u(), o());
        }),
        r("toEdge fromEdge lock unlock", () => {
          o();
        }),
        r("destroy", () => {
          c();
        }),
        r("enable disable", () => {
          let { nextEl: e, prevEl: t } = i.navigation;
          if (((e = b(e)), (t = b(t)), i.enabled)) {
            o();
            return;
          }
          [...e, ...t].filter((e) => !!e).forEach((e) => e.classList.add(i.params.navigation.lockClass));
        }),
        r("click", (e, t) => {
          let { nextEl: s, prevEl: r } = i.navigation;
          (s = b(s)), (r = b(r));
          let l = t.target;
          if (i.params.navigation.hideOnClick && !r.includes(l) && !s.includes(l)) {
            if (i.pagination && i.params.pagination && i.params.pagination.clickable && (i.pagination.el === l || i.pagination.el.contains(l))) return;
            let n;
            s.length ? (n = s[0].classList.contains(i.params.navigation.hiddenClass)) : r.length && (n = r[0].classList.contains(i.params.navigation.hiddenClass)),
              !0 === n ? a("navigationShow") : a("navigationHide"),
              [...s, ...r].filter((e) => !!e).forEach((e) => e.classList.toggle(i.params.navigation.hiddenClass));
          }
        });
      let f = () => {
          i.el.classList.remove(...i.params.navigation.navigationDisabledClass.split(" ")), u(), o();
        },
        h = () => {
          i.el.classList.add(...i.params.navigation.navigationDisabledClass.split(" ")), c();
        };
      Object.assign(i.navigation, { enable: f, disable: h, update: o, init: u, destroy: c });
    },
    function e(t) {
      let { swiper: i, extendParams: s, on: r, emit: a } = t,
        l = "swiper-pagination";
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${l}-bullet`,
          bulletActiveClass: `${l}-bullet-active`,
          modifierClass: `${l}-`,
          currentClass: `${l}-current`,
          totalClass: `${l}-total`,
          hiddenClass: `${l}-hidden`,
          progressbarFillClass: `${l}-progressbar-fill`,
          progressbarOppositeClass: `${l}-progressbar-opposite`,
          clickableClass: `${l}-clickable`,
          lockClass: `${l}-lock`,
          horizontalClass: `${l}-horizontal`,
          verticalClass: `${l}-vertical`,
          paginationDisabledClass: `${l}-disabled`,
        },
      }),
        (i.pagination = { el: null, bullets: [] });
      let n,
        o = 0;
      function d() {
        return !i.params.pagination.el || !i.pagination.el || (Array.isArray(i.pagination.el) && 0 === i.pagination.el.length);
      }
      function p(e, t) {
        let { bulletActiveClass: s } = i.params.pagination;
        e &&
          (e = e[`${"prev" === t ? "previous" : "next"}ElementSibling`]) &&
          (e.classList.add(`${s}-${t}`), (e = e[`${"prev" === t ? "previous" : "next"}ElementSibling`]) && e.classList.add(`${s}-${t}-${t}`));
      }
      function u(e) {
        let t = e.target.closest(j(i.params.pagination.bulletClass));
        if (!t) return;
        e.preventDefault();
        let s = $(t) * i.params.slidesPerGroup;
        if (i.params.loop) {
          if (i.realIndex === s) return;
          i.slideToLoop(s);
        } else i.slideTo(s);
      }
      function c() {
        let e = i.rtl,
          t = i.params.pagination;
        if (d()) return;
        let s = i.pagination.el;
        s = b(s);
        let r,
          l,
          u = i.virtual && i.params.virtual.enabled ? i.virtual.slides.length : i.slides.length,
          c = i.params.loop ? Math.ceil(u / i.params.slidesPerGroup) : i.snapGrid.length;
        if (
          (i.params.loop
            ? ((l = i.previousRealIndex || 0), (r = i.params.slidesPerGroup > 1 ? Math.floor(i.realIndex / i.params.slidesPerGroup) : i.realIndex))
            : void 0 !== i.snapIndex
            ? ((r = i.snapIndex), (l = i.previousSnapIndex))
            : ((l = i.previousIndex || 0), (r = i.activeIndex || 0)),
          "bullets" === t.type && i.pagination.bullets && i.pagination.bullets.length > 0)
        ) {
          let f = i.pagination.bullets,
            h,
            m,
            g;
          if (
            (t.dynamicBullets &&
              ((n = y(f[0], i.isHorizontal() ? "width" : "height", !0)),
              s.forEach((e) => {
                e.style[i.isHorizontal() ? "width" : "height"] = `${n * (t.dynamicMainBullets + 4)}px`;
              }),
              t.dynamicMainBullets > 1 && void 0 !== l && ((o += r - (l || 0)) > t.dynamicMainBullets - 1 ? (o = t.dynamicMainBullets - 1) : o < 0 && (o = 0)),
              (g = ((m = (h = Math.max(r - o, 0)) + (Math.min(f.length, t.dynamicMainBullets) - 1)) + h) / 2)),
            f.forEach((e) => {
              let i = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e) => `${t.bulletActiveClass}${e}`)]
                .map((e) => ("string" == typeof e && e.includes(" ") ? e.split(" ") : e))
                .flat();
              e.classList.remove(...i);
            }),
            s.length > 1)
          )
            f.forEach((e) => {
              let s = $(e);
              s === r ? e.classList.add(...t.bulletActiveClass.split(" ")) : i.isElement && e.setAttribute("part", "bullet"),
                t.dynamicBullets && (s >= h && s <= m && e.classList.add(...`${t.bulletActiveClass}-main`.split(" ")), s === h && p(e, "prev"), s === m && p(e, "next"));
            });
          else {
            let v = f[r];
            if (
              (v && v.classList.add(...t.bulletActiveClass.split(" ")),
              i.isElement &&
                f.forEach((e, t) => {
                  e.setAttribute("part", t === r ? "bullet-active" : "bullet");
                }),
              t.dynamicBullets)
            ) {
              let w = f[h],
                _ = f[m];
              for (let S = h; S <= m; S += 1) f[S] && f[S].classList.add(...`${t.bulletActiveClass}-main`.split(" "));
              p(w, "prev"), p(_, "next");
            }
          }
          if (t.dynamicBullets) {
            let T = Math.min(f.length, t.dynamicMainBullets + 4),
              E = (n * T - n) / 2 - g * n,
              x = e ? "right" : "left";
            f.forEach((e) => {
              e.style[i.isHorizontal() ? x : "top"] = `${E}px`;
            });
          }
        }
        s.forEach((e, s) => {
          if (
            ("fraction" === t.type &&
              (e.querySelectorAll(j(t.currentClass)).forEach((e) => {
                e.textContent = t.formatFractionCurrent(r + 1);
              }),
              e.querySelectorAll(j(t.totalClass)).forEach((e) => {
                e.textContent = t.formatFractionTotal(c);
              })),
            "progressbar" === t.type)
          ) {
            let l;
            l = t.progressbarOpposite ? (i.isHorizontal() ? "vertical" : "horizontal") : i.isHorizontal() ? "horizontal" : "vertical";
            let n = (r + 1) / c,
              o = 1,
              d = 1;
            "horizontal" === l ? (o = n) : (d = n),
              e.querySelectorAll(j(t.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${o}) scaleY(${d})`), (e.style.transitionDuration = `${i.params.speed}ms`);
              });
          }
          "custom" === t.type && t.renderCustom
            ? ((e.innerHTML = t.renderCustom(i, r + 1, c)), 0 === s && a("paginationRender", e))
            : (0 === s && a("paginationRender", e), a("paginationUpdate", e)),
            i.params.watchOverflow && i.enabled && e.classList[i.isLocked ? "add" : "remove"](t.lockClass);
        });
      }
      function f() {
        let e = i.params.pagination;
        if (d()) return;
        let t =
            i.virtual && i.params.virtual.enabled ? i.virtual.slides.length : i.grid && i.params.grid.rows > 1 ? i.slides.length / Math.ceil(i.params.grid.rows) : i.slides.length,
          s = i.pagination.el;
        s = b(s);
        let r = "";
        if ("bullets" === e.type) {
          let l = i.params.loop ? Math.ceil(t / i.params.slidesPerGroup) : i.snapGrid.length;
          i.params.freeMode && i.params.freeMode.enabled && l > t && (l = t);
          for (let n = 0; n < l; n += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(i, n, e.bulletClass))
              : (r += `<${e.bulletElement} ${i.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (r = e.renderFraction ? e.renderFraction.call(i, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(i, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`),
          (i.pagination.bullets = []),
          s.forEach((t) => {
            "custom" !== e.type && (t.innerHTML = r || ""), "bullets" === e.type && i.pagination.bullets.push(...t.querySelectorAll(j(e.bulletClass)));
          }),
          "custom" !== e.type && a("paginationRender", s[0]);
      }
      function h() {
        i.params.pagination = X(i, i.originalParams.pagination, i.params.pagination, { el: "swiper-pagination" });
        let e = i.params.pagination;
        if (!e.el) return;
        let t;
        "string" == typeof e.el && i.isElement && (t = i.el.querySelector(e.el)),
          t || "string" != typeof e.el || (t = [...document.querySelectorAll(e.el)]),
          t || (t = e.el),
          t &&
            0 !== t.length &&
            (i.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(t) &&
              t.length > 1 &&
              (t = [...i.el.querySelectorAll(e.el)]).length > 1 &&
              (t = t.filter((e) => w(e, ".swiper")[0] === i.el)[0]),
            Array.isArray(t) && 1 === t.length && (t = t[0]),
            Object.assign(i.pagination, { el: t }),
            (t = b(t)).forEach((t) => {
              "bullets" === e.type && e.clickable && t.classList.add(...(e.clickableClass || "").split(" ")),
                t.classList.add(e.modifierClass + e.type),
                t.classList.add(i.isHorizontal() ? e.horizontalClass : e.verticalClass),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (t.classList.add(`${e.modifierClass}${e.type}-dynamic`), (o = 0), e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type && e.progressbarOpposite && t.classList.add(e.progressbarOppositeClass),
                e.clickable && t.addEventListener("click", u),
                i.enabled || t.classList.add(e.lockClass);
            }));
      }
      function m() {
        let e = i.params.pagination;
        if (d()) return;
        let t = i.pagination.el;
        t &&
          (t = b(t)).forEach((t) => {
            t.classList.remove(e.hiddenClass),
              t.classList.remove(e.modifierClass + e.type),
              t.classList.remove(i.isHorizontal() ? e.horizontalClass : e.verticalClass),
              e.clickable && (t.classList.remove(...(e.clickableClass || "").split(" ")), t.removeEventListener("click", u));
          }),
          i.pagination.bullets && i.pagination.bullets.forEach((t) => t.classList.remove(...e.bulletActiveClass.split(" ")));
      }
      r("changeDirection", () => {
        if (!i.pagination || !i.pagination.el) return;
        let e = i.params.pagination,
          { el: t } = i.pagination;
        (t = b(t)).forEach((t) => {
          t.classList.remove(e.horizontalClass, e.verticalClass), t.classList.add(i.isHorizontal() ? e.horizontalClass : e.verticalClass);
        });
      }),
        r("init", () => {
          !1 === i.params.pagination.enabled ? v() : (h(), f(), c());
        }),
        r("activeIndexChange", () => {
          void 0 === i.snapIndex && c();
        }),
        r("snapIndexChange", () => {
          c();
        }),
        r("snapGridLengthChange", () => {
          f(), c();
        }),
        r("destroy", () => {
          m();
        }),
        r("enable disable", () => {
          let { el: e } = i.pagination;
          e && (e = b(e)).forEach((e) => e.classList[i.enabled ? "remove" : "add"](i.params.pagination.lockClass));
        }),
        r("lock unlock", () => {
          c();
        }),
        r("click", (e, t) => {
          let s = t.target,
            r = b(i.pagination.el);
          if (i.params.pagination.el && i.params.pagination.hideOnClick && r && r.length > 0 && !s.classList.contains(i.params.pagination.bulletClass)) {
            if (i.navigation && ((i.navigation.nextEl && s === i.navigation.nextEl) || (i.navigation.prevEl && s === i.navigation.prevEl))) return;
            let l = r[0].classList.contains(i.params.pagination.hiddenClass);
            !0 === l ? a("paginationShow") : a("paginationHide"), r.forEach((e) => e.classList.toggle(i.params.pagination.hiddenClass));
          }
        });
      let g = () => {
          i.el.classList.remove(i.params.pagination.paginationDisabledClass);
          let { el: e } = i.pagination;
          e && (e = b(e)).forEach((e) => e.classList.remove(i.params.pagination.paginationDisabledClass)), h(), f(), c();
        },
        v = () => {
          i.el.classList.add(i.params.pagination.paginationDisabledClass);
          let { el: e } = i.pagination;
          e && (e = b(e)).forEach((e) => e.classList.add(i.params.pagination.paginationDisabledClass)), m();
        };
      Object.assign(i.pagination, { enable: g, disable: v, render: f, update: c, init: h, destroy: m });
    },
    function e(t) {
      let { swiper: i, extendParams: r, on: a, emit: l, params: n } = t;
      (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        r({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !1, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } });
      let o,
        d,
        p = n && n.autoplay ? n.autoplay.delay : 3e3,
        u = n && n.autoplay ? n.autoplay.delay : 3e3,
        c,
        f = new Date().getTime(),
        h,
        m,
        g,
        v,
        $,
        w,
        y;
      function b(e) {
        if (i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl) {
          if ((i.wrapperEl.removeEventListener("transitionend", b), !y)) L();
        }
      }
      let _ = () => {
          if (i.destroyed || !i.autoplay.running) return;
          i.autoplay.paused ? (h = !0) : h && ((u = c), (h = !1));
          let e = i.autoplay.paused ? c : f + u - new Date().getTime();
          (i.autoplay.timeLeft = e),
            l("autoplayTimeLeft", e, e / p),
            (d = requestAnimationFrame(() => {
              _();
            }));
        },
        S = () => {
          let e;
          if (!(e = i.virtual && i.params.virtual.enabled ? i.slides.filter((e) => e.classList.contains("swiper-slide-active"))[0] : i.slides[i.activeIndex])) return;
          let t = parseInt(e.getAttribute("data-swiper-autoplay"), 10);
          return t;
        },
        T = (e) => {
          if (i.destroyed || !i.autoplay.running) return;
          cancelAnimationFrame(d), _();
          let t = void 0 === e ? i.params.autoplay.delay : e;
          (p = i.params.autoplay.delay), (u = i.params.autoplay.delay);
          let s = S();
          !Number.isNaN(s) && s > 0 && void 0 === e && ((t = s), (p = s), (u = s)), (c = t);
          let r = i.params.speed,
            a = () => {
              i &&
                !i.destroyed &&
                (i.params.autoplay.reverseDirection
                  ? !i.isBeginning || i.params.loop || i.params.rewind
                    ? (i.slidePrev(r, !0, !0), l("autoplay"))
                    : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, r, !0, !0), l("autoplay"))
                  : !i.isEnd || i.params.loop || i.params.rewind
                  ? (i.slideNext(r, !0, !0), l("autoplay"))
                  : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, r, !0, !0), l("autoplay")),
                i.params.cssMode &&
                  ((f = new Date().getTime()),
                  requestAnimationFrame(() => {
                    T();
                  })));
            };
          return (
            t > 0
              ? (clearTimeout(o),
                (o = setTimeout(() => {
                  a();
                }, t)))
              : requestAnimationFrame(() => {
                  a();
                }),
            t
          );
        },
        E = () => {
          (f = new Date().getTime()), (i.autoplay.running = !0), T(), l("autoplayStart");
        },
        x = () => {
          (i.autoplay.running = !1), clearTimeout(o), cancelAnimationFrame(d), l("autoplayStop");
        },
        C = (e, t) => {
          if (i.destroyed || !i.autoplay.running) return;
          clearTimeout(o), e || (w = !0);
          let s = () => {
            l("autoplayPause"), i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", b) : L();
          };
          if (((i.autoplay.paused = !0), t)) {
            $ && (c = i.params.autoplay.delay), ($ = !1), s();
            return;
          }
          let r = c || i.params.autoplay.delay;
          (c = r - (new Date().getTime() - f)), (i.isEnd && c < 0 && !i.params.loop) || (c < 0 && (c = 0), s());
        },
        L = () => {
          (i.isEnd && c < 0 && !i.params.loop) ||
            i.destroyed ||
            !i.autoplay.running ||
            ((f = new Date().getTime()), w ? ((w = !1), T(c)) : T(), (i.autoplay.paused = !1), l("autoplayResume"));
        },
        P = () => {
          if (i.destroyed || !i.autoplay.running) return;
          let e = s();
          "hidden" === e.visibilityState && ((w = !0), C(!0)), "visible" === e.visibilityState && L();
        },
        k = (e) => {
          "mouse" === e.pointerType && ((w = !0), (y = !0), i.animating || i.autoplay.paused || C(!0));
        },
        M = (e) => {
          "mouse" === e.pointerType && ((y = !1), i.autoplay.paused && L());
        },
        I = () => {
          i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", k), i.el.addEventListener("pointerleave", M));
        },
        z = () => {
          i.el.removeEventListener("pointerenter", k), i.el.removeEventListener("pointerleave", M);
        },
        A = () => {
          let e = s();
          e.addEventListener("visibilitychange", P);
        },
        O = () => {
          let e = s();
          e.removeEventListener("visibilitychange", P);
        };
      a("init", () => {
        i.params.autoplay.enabled && (I(), A(), E());
      }),
        a("destroy", () => {
          z(), O(), i.autoplay.running && x();
        }),
        a("_freeModeStaticRelease", () => {
          (g || w) && L();
        }),
        a("_freeModeNoMomentumRelease", () => {
          i.params.autoplay.disableOnInteraction ? x() : C(!0, !0);
        }),
        a("beforeTransitionStart", (e, t, s) => {
          !i.destroyed && i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? C(!0, !0) : x());
        }),
        a("sliderFirstMove", () => {
          if (!i.destroyed && i.autoplay.running) {
            if (i.params.autoplay.disableOnInteraction) {
              x();
              return;
            }
            (m = !0),
              (g = !1),
              (w = !1),
              (v = setTimeout(() => {
                (w = !0), (g = !0), C(!0);
              }, 200));
          }
        }),
        a("touchEnd", () => {
          if (!i.destroyed && i.autoplay.running && m) {
            if ((clearTimeout(v), clearTimeout(o), i.params.autoplay.disableOnInteraction)) {
              (g = !1), (m = !1);
              return;
            }
            g && i.params.cssMode && L(), (g = !1), (m = !1);
          }
        }),
        a("slideChange", () => {
          !i.destroyed && i.autoplay.running && ($ = !0);
        }),
        Object.assign(i.autoplay, { start: E, stop: x, pause: C, resume: L });
    },
    function e(t) {
      let { swiper: i, extendParams: s, on: r } = t;
      s({ fadeEffect: { crossFade: !1 } });
      let a = () => {
          let { slides: e } = i,
            t = i.params.fadeEffect;
          for (let s = 0; s < e.length; s += 1) {
            let r = i.slides[s],
              a = r.swiperSlideOffset,
              l = -a;
            i.params.virtualTranslate || (l -= i.translate);
            let n = 0;
            i.isHorizontal() || ((n = l), (l = 0));
            let o = i.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(r.progress), 0) : 1 + Math.min(Math.max(r.progress, -1), 0),
              d = U(t, r);
            (d.style.opacity = o), (d.style.transform = `translate3d(${l}px, ${n}px, 0px)`);
          }
        },
        l = (e) => {
          let t = i.slides.map((e) => f(e));
          t.forEach((t) => {
            t.style.transitionDuration = `${e}ms`;
          }),
            (function e(t) {
              let { swiper: i, duration: s, transformElements: r, allSlides: a } = t,
                { activeIndex: l } = i,
                n = (e) => {
                  if (!e.parentElement) {
                    let t = i.slides.filter((t) => t.shadowRoot && t.shadowRoot === e.parentNode)[0];
                    return t;
                  }
                  return e.parentElement;
                };
              if (i.params.virtualTranslate && 0 !== s) {
                let o = !1,
                  d;
                (d = a
                  ? r
                  : r.filter((e) => {
                      let t = e.classList.contains("swiper-slide-transform") ? n(e) : e;
                      return i.getSlideIndex(t) === l;
                    })).forEach((e) => {
                  !(function e(t, i) {
                    function s(e) {
                      e.target === t && (i.call(t, e), t.removeEventListener("transitionend", s));
                    }
                    i && t.addEventListener("transitionend", s);
                  })(e, () => {
                    if (o || !i || i.destroyed) return;
                    (o = !0), (i.animating = !1);
                    let e = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 });
                    i.wrapperEl.dispatchEvent(e);
                  });
                });
              }
            })({ swiper: i, duration: e, transformElements: t, allSlides: !0 });
        };
      !(function e(t) {
        let { effect: i, swiper: s, on: r, setTranslate: a, setTransition: l, overwriteParams: n, perspective: o, recreateShadows: d, getEffectParams: p } = t;
        r("beforeInit", () => {
          if (s.params.effect !== i) return;
          s.classNames.push(`${s.params.containerModifierClass}${i}`), o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`);
          let e = n ? n() : {};
          Object.assign(s.params, e), Object.assign(s.originalParams, e);
        }),
          r("setTranslate", () => {
            s.params.effect === i && a();
          }),
          r("setTransition", (e, t) => {
            s.params.effect === i && l(t);
          }),
          r("transitionEnd", () => {
            s.params.effect === i &&
              d &&
              p &&
              p().slideShadows &&
              (s.slides.forEach((e) => {
                e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e) => e.remove());
              }),
              d());
          });
        let u;
        r("virtualUpdate", () => {
          s.params.effect === i &&
            (s.slides.length || (u = !0),
            requestAnimationFrame(() => {
              u && s.slides && s.slides.length && (a(), (u = !1));
            }));
        });
      })({
        effect: "fade",
        swiper: i,
        on: r,
        setTranslate: a,
        setTransition: l,
        overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !i.params.cssMode }),
      });
    },
  ];
  return Y.use(K), Y;
})();
