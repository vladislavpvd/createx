"use strict";

var bodyStyles = window.getComputedStyle(document.body);
var gap = parseInt(bodyStyles.getPropertyValue('--grid-gap'));
"use strict";

if (document.querySelector('.we-offer')) {
  var accordion1 = new GraphAccordion('.accordion-1', {
    speed: 300
  });
  var accordion2 = new GraphAccordion('.accordion-2', {
    speed: 300
  });
}
"use strict";

var burger = document.querySelector('.burger');
var menu = document.querySelector('.header__nav');
var overlay = document.querySelector('.overlay');

var disScroll = function disScroll() {
  var pagePosition = window.scrollY;
  document.body.classList.add('dis-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
};

var enScroll = function enScroll() {
  var pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('dis-scroll');
  window.scrollTo({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
};

burger.addEventListener('click', function (e) {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');
  overlay.classList.toggle('overlay--active');

  if (burger.classList.contains('burger--active')) {
    disScroll();
  } else {
    enScroll();
  }
});
"use strict";

var modal = new GraphModal();
"use strict";

var portfolioTabsNav = document.querySelector('.portfolio-tabs-nav');
var portfolioTabsBtns = document.querySelectorAll('.portfolio-tabs-nav__btn');
var portfolioTabsItems = document.querySelectorAll('.portfolio-tabs__item');
var portfolioTabsItemsVisible = document.querySelectorAll('.portfolio-tabs__item--visible');
var loadMore = document.querySelector('.portfolio-more');
var maxItems = 9;

if (portfolioTabsNav) {
  var isLoadMoreNeeded = function isLoadMoreNeeded(selector) {
    if (selector.length <= maxItems) {
      loadMore.style.display = 'none';
    } else {
      loadMore.style.display = 'inline-flex';
    }
  };

  var hideMoreItems = function hideMoreItems(selector) {
    if (selector.length > maxItems) {
      var arr = Array.from(selector);
      var hiddenItems = arr.slice(maxItems, selector.length);
      hiddenItems.forEach(function (el) {
        el.classList.remove('portfolio-tabs__item--visible');
        el.classList.remove('portfolio-tabs__item--visible-more');
      });
    }
  };

  portfolioTabsNav.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('portfolio-tabs-nav__btn')) {
      var path = target.dataset.path;
      portfolioTabsBtns.forEach(function (el) {
        el.classList.remove('portfolio-tabs-nav__btn--active');
      });
      target.classList.add('portfolio-tabs-nav__btn--active');
      portfolioTabsItems.forEach(function (el) {
        el.classList.remove('portfolio-tabs__item--visible');
        el.classList.remove('portfolio-tabs__item--visible-more');
      });
      document.querySelectorAll("[data-target=\"".concat(path, "\"]")).forEach(function (el) {
        el.closest('.portfolio-tabs__item').classList.add('portfolio-tabs__item--visible');
      });
      isLoadMoreNeeded(document.querySelectorAll("[data-target=\"".concat(path, "\"]")));
      hideMoreItems(document.querySelectorAll('.portfolio-tabs__item--visible'));

      if (path == 'all') {
        portfolioTabsItems.forEach(function (el) {
          el.classList.add('portfolio-tabs__item--visible');
        });
        isLoadMoreNeeded(document.querySelectorAll('.portfolio-tabs__item--visible'));
        hideMoreItems(document.querySelectorAll('.portfolio-tabs__item--visible'));
      }
    }
  });
  hideMoreItems(portfolioTabsItems);
  isLoadMoreNeeded(portfolioTabsItemsVisible);
  loadMore.addEventListener('click', function (e) {
    var visibleItems = document.querySelectorAll('.portfolio-tabs__item--visible');
    var path = document.querySelector('.portfolio-tabs-nav__btn--active').dataset.path;
    console.log(path);

    if (path == 'all') {
      portfolioTabsItems.forEach(function (el) {
        el.classList.add('portfolio-tabs__item--visible-more');
        loadMore.style.display = 'none';
      });
    } else {
      document.querySelectorAll("[data-target=\"".concat(path, "\"]")).forEach(function (el) {
        el.closest('.portfolio-tabs__item').classList.add('portfolio-tabs__item--visible-more');
      });
      loadMore.style.display = 'none';
    }
  });
}
"use strict";

var circles = document.querySelectorAll('.facts-element__circle');
circles.forEach(function (el) {
  if (el.dataset.percentage == 'true') {
    var progress = el.querySelector('.progress');
    var valueBlock = el.querySelector('.facts-element__value');
    var radius = progress.getAttribute('r');
    var circleLength = 2 * Math.PI * radius;
    var full = el.dataset.full;
    var value = el.dataset.value;
    var percentageProgress = Math.floor(value / full * 100);
    valueBlock.textContent = value;
    progress.setAttribute('stroke-dasharray', circleLength);
    progress.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);
  } else {
    var _progress = el.querySelector('.progress');

    var _valueBlock = el.querySelector('.facts-element__value');

    var _radius = _progress.getAttribute('r');

    var _circleLength = 2 * Math.PI * _radius;

    var percent = el.dataset.percent;

    var _percentageProgress = Math.floor(percent);

    _valueBlock.textContent = percent + '%';

    _progress.setAttribute('stroke-dasharray', _circleLength);

    _progress.setAttribute('stroke-dashoffset', _circleLength - _circleLength * _percentageProgress / 100);
  }
});
"use strict";

var selects = document.querySelectorAll('.form-field__select');
selects.forEach(function (el) {
  new Choices(el, {
    shouldSort: false,
    position: 'bottom',
    searchEnabled: false
  });
});
"use strict";

var portSlider = document.querySelector('.portfolio-section__items');
var relatedSlider = document.querySelector('.related-projects__items');

if (portSlider) {
  var portfolioSlider = new Swiper(portSlider, {
    slidesPerView: 1,
    spaceBetween: gap,
    on: {
      init: function init() {
        var activeSlide = portSlider.querySelector('.swiper-slide-active');
        var nextActiveSlide = activeSlide.nextElementSibling;
        var nextNextActiveSlide = nextActiveSlide.nextElementSibling;
        activeSlide.classList.add('slider-visible');
        nextActiveSlide.classList.add('slider-visible');
        nextNextActiveSlide.classList.add('slider-visible');
      }
    },
    navigation: {
      nextEl: '.portfolio-section__next',
      prevEl: '.portfolio-section__prev'
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      }
    }
  });
  document.querySelector('.portfolio-section__prev').addEventListener('click', function () {
    var activeSlide = portSlider.querySelector('.swiper-slide-next');
    document.querySelectorAll('.portfolio-section__items .swiper-slide').forEach(function (el) {
      el.classList.remove('slider-visible');
    });

    if (activeSlide.previousElementSibling) {
      var nextActiveSlide = activeSlide.previousElementSibling;
      activeSlide.classList.add('slider-visible');
      nextActiveSlide.classList.add('slider-visible');
      activeSlide.nextElementSibling.classList.add('slider-visible');
    }
  });
  document.querySelector('.portfolio-section__next').addEventListener('click', function () {
    var activeSlide = portSlider.querySelector('.swiper-slide-active');
    var nextActiveSlide = activeSlide.nextElementSibling;
    var nextNextActiveSlide = nextActiveSlide.nextElementSibling;
    document.querySelectorAll('.portfolio-section__items .swiper-slide').forEach(function (el) {
      el.classList.remove('slider-visible');
    });
    activeSlide.classList.add('slider-visible');
    nextActiveSlide.classList.add('slider-visible');
    nextNextActiveSlide.classList.add('slider-visible');
  });
}

if (relatedSlider) {
  var relatedProjSlider = new Swiper(relatedSlider, {
    slidesPerView: 1,
    spaceBetween: gap,
    on: {
      init: function init() {
        var activeSlide = relatedSlider.querySelector('.swiper-slide-active');
        var nextActiveSlide = activeSlide.nextElementSibling;
        var nextNextActiveSlide = nextActiveSlide.nextElementSibling;
        activeSlide.classList.add('slider-visible');
        nextActiveSlide.classList.add('slider-visible');
        nextNextActiveSlide.classList.add('slider-visible');
      }
    },
    navigation: {
      nextEl: '.related-projects__next',
      prevEl: '.related-projects__prev'
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      }
    }
  });
  document.querySelector('.related-projects__prev').addEventListener('click', function () {
    var activeSlide = relatedSlider.querySelector('.swiper-slide-next');
    document.querySelectorAll('.related-projects__items .swiper-slide').forEach(function (el) {
      el.classList.remove('slider-visible');
    });

    if (activeSlide.previousElementSibling) {
      var nextActiveSlide = activeSlide.previousElementSibling;
      activeSlide.classList.add('slider-visible');
      nextActiveSlide.classList.add('slider-visible');
      activeSlide.nextElementSibling.classList.add('slider-visible');
    }
  });
  document.querySelector('.related-projects__next').addEventListener('click', function () {
    var activeSlide = relatedSlider.querySelector('.swiper-slide-active');
    var nextActiveSlide = activeSlide.nextElementSibling;
    var nextNextActiveSlide = nextActiveSlide.nextElementSibling;
    document.querySelectorAll('.related-projects__items .swiper-slide').forEach(function (el) {
      el.classList.remove('slider-visible');
    });
    activeSlide.classList.add('slider-visible');
    nextActiveSlide.classList.add('slider-visible');
    nextNextActiveSlide.classList.add('slider-visible');
  });
}

var testimonialsSlider = new Swiper('.testimonials__items', {
  slidesPerView: 1,
  spaceBetween: gap,
  loop: true,
  navigation: {
    nextEl: '.testimonials__next',
    prevEl: '.testimonials__prev'
  }
});
var workImages = document.querySelector('.work-images-slider');

if (workImages) {
  var workSlider = new Swiper('.work-images-nav', {
    spaceBetween: 20,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      576: {
        slidesPerView: 6
      },
      768: {
        slidesPerView: 10
      }
    }
  });
  var workSlidesNav = new Swiper(workImages, {
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: ".work-images__next",
      prevEl: ".work-images__prev"
    },
    thumbs: {
      swiper: workSlider
    }
  });
}

var historySlider = document.querySelector('.history-slider');

if (historySlider) {
  var _workSlider = new Swiper(historySlider, {
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: ".history__next",
      prevEl: ".history__prev"
    }
  });

  _workSlider.on('slideChange', function () {
    console.log(_workSlider.realIndex);
    historyBtns.forEach(function (el) {
      el.classList.remove('history-nav__btn--active');
    });
    document.querySelector(".history-nav__btn[data-index=\"".concat(_workSlider.realIndex, "\"]")).classList.add('history-nav__btn--active');
  });

  var historyBtns = document.querySelectorAll('.history-nav__btn');
  historyBtns.forEach(function (el, idx) {
    el.setAttribute('data-index', idx);
    el.addEventListener('click', function (e) {
      var index = e.currentTarget.dataset.index;
      historyBtns.forEach(function (el) {
        el.classList.remove('history-nav__btn--active');
      });
      e.currentTarget.classList.add('history-nav__btn--active');

      _workSlider.slideTo(index);
    });
  });
}

var heroSliderSpeed = 1500;
var bodyStyles = window.getComputedStyle(document.body);
var fooBar = bodyStyles.getPropertyValue('--hero-slider-speed'); //get

document.body.style.setProperty('--hero-slider-speed', heroSliderSpeed + 'ms'); //set

var heroSlider = new Swiper('.hero-slider', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.hero__next',
    prevEl: '.hero__prev'
  },
  speed: heroSliderSpeed,
  autoplay: {
    delay: 1000
  },
  pagination: {
    el: '.hero__pag',
    type: 'bullets',
    clickable: true
  },
  on: {
    init: function init() {
      var paginationBullets = document.querySelectorAll('.hero__pag .swiper-pagination-bullet');
      paginationBullets.forEach(function (el) {
        el.innerHTML = "<span class=\"hero__bar\"></span>";
      });
    }
  }
});
"use strict";

var scroll = new SmoothScroll('.to-top');
var toTop = document.querySelector('.to-top');
var heroHeight;

if (document.querySelector('.hero')) {
  heroHeight = document.querySelector('.hero').offsetHeight;
}

if (document.querySelector('.page-hero')) {
  heroHeight = document.querySelector('.page-hero').offsetHeight;
}

var isVisibleToTop = function isVisibleToTop() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (y >= heroHeight) {
    toTop.classList.add('to-top--active');
  } else {
    toTop.classList.remove('to-top--active');
  }
};

isVisibleToTop(window.scrollY);
window.addEventListener('scroll', function () {
  var y = window.scrollY;
  isVisibleToTop(y);
});
"use strict";

var videoBlock = document.querySelector('.video-block');

if (videoBlock) {
  var video = videoBlock.querySelector('video');
  var playBtn = videoBlock.querySelector('.video-block__play');
  playBtn.addEventListener('click', function () {
    videoBlock.classList.add('video-block--played');
    video.play();
    video.controls = true;
    playBtn.classList.add('video-block__play--played');
  });

  video.onpause = function () {
    videoBlock.classList.remove('video-block--played');
    video.controls = false;
    playBtn.classList.remove('video-block__play--played');
  };
}
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map
