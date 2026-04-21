/* =============================================
   PORTFOLIO MAIN.JS
   jQuery + GSAP (ScrollTrigger) + AOS + Swiper
   ============================================= */

$(function () {

  /* ──────────────────────────────────────────
     1. AOS INIT
  ────────────────────────────────────────── */
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120,
  });


  /* ──────────────────────────────────────────
     2. GSAP · ScrollTrigger REGISTER
  ────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);


  /* ──────────────────────────────────────────
     3. HERO PARALLAX (GSAP)
  ────────────────────────────────────────── */
  // hero circles 미세 parallax (생동감 부여)
  gsap.to('.c1', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
  gsap.to('.c2', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });


  /* ──────────────────────────────────────────
     4. SKILL BAR ANIMATION (GSAP ScrollTrigger)
  ────────────────────────────────────────── */
  $('.skill-bar__fill').each(function () {
    const targetWidth = $(this).data('width') + '%';
    gsap.to(this, {
      width: targetWidth,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 88%',
        once: true,
      },
    });
  });


  /* ──────────────────────────────────────────
     5. HEADER SCROLL EFFECT
  ────────────────────────────────────────── */
  $(window).on('scroll.header', function () {
    if ($(this).scrollTop() > 50) {
      $('#header').addClass('scrolled');
    } else {
      $('#header').removeClass('scrolled');
    }
  });


  /* ──────────────────────────────────────────
     6. ACTIVE NAV LINK (scroll spy)
  ────────────────────────────────────────── */
  const sections = $('section[id]');
  const navLinks = $('.gnb-link');

  $(window).on('scroll.spy', function () {
    let current = '';
    const scrollY = $(this).scrollTop();

    sections.each(function () {
      const top = $(this).offset().top - 100;
      if (scrollY >= top) {
        current = $(this).attr('id');
      }
    });

    navLinks.removeClass('active');
    navLinks.filter('[href="#' + current + '"]').addClass('active');
    if (!current || current === 'hero') {
      navLinks.filter('[href="#hero"]').addClass('active');
    }
  });


  /* ──────────────────────────────────────────
     7. SMOOTH SCROLL (jQuery)
  ────────────────────────────────────────── */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.hash);
    if (!target.length) return;
    e.preventDefault();
    $('html, body').animate(
      { scrollTop: target.offset().top - 60 },
      700,
      'swing'
    );
  });


  /* ──────────────────────────────────────────
     8. MOBILE NAV
  ────────────────────────────────────────── */
  function openMobileNav() {
    $('#mobileNav').addClass('open');
    $('#mobileOverlay').addClass('show');
    $('#hamburger').addClass('open');
    $('body').css('overflow', 'hidden');
  }
  function closeMobileNav() {
    $('#mobileNav').removeClass('open');
    $('#mobileOverlay').removeClass('show');
    $('#hamburger').removeClass('open');
    $('body').css('overflow', '');
  }

  $('#hamburger').on('click', openMobileNav);
  $('#mobileClose, #mobileOverlay').on('click', closeMobileNav);
  $('.mobile-link').on('click', closeMobileNav);


  /* ──────────────────────────────────────────
     9. TOP BUTTON
  ────────────────────────────────────────── */
  $(window).on('scroll.top', function () {
    if ($(this).scrollTop() > 400) {
      $('#topBtn').addClass('show');
    } else {
      $('#topBtn').removeClass('show');
    }
  });

  $('#topBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });


  /* ──────────────────────────────────────────
     11. SWIPER INITIALIZATION (PROJECT)
  ────────────────────────────────────────── */
  const projectSwiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    loop: false,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });

  // Swiper 슬라이드 이동 시 AOS 갱신 (슬라이드 내부 요소 애니메이션을 위해)
  projectSwiper.on('slideChangeTransitionEnd', function () {
    AOS.refresh();
  });

  // 리사이즈 시 Swiper 업데이트 및 AOS 갱신
  $(window).on('resize', function() {
    if (projectSwiper) projectSwiper.update();
    AOS.refresh();
  });

}); // end $(function)
