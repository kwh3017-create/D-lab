/* =============================================
   PORTFOLIO MAIN.JS
   jQuery + GSAP (ScrollTrigger) + AOS
   ============================================= */

$(function () {

  /* ──────────────────────────────────────────
     1. AOS INIT
  ────────────────────────────────────────── */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });


  /* ──────────────────────────────────────────
     2. GSAP · ScrollTrigger REGISTER
  ────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);


  /* ──────────────────────────────────────────
     3. HERO INTRO ANIMATION (GSAP Timeline)
  ────────────────────────────────────────── */
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .to('#heroSub', { opacity: 1, y: 0, duration: .8 }, .3)
    .from('.hero-title .line', {
      yPercent: 110,
      stagger: .15,
      duration: 1,
    }, .6)
    .to('#heroDesc', { opacity: 1, y: 0, duration: .8 }, 1.2)
    .to('#heroBtns', { opacity: 1, y: 0, duration: .8 }, 1.5);

  // hero circles 미세 parallax
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
    // HOME 링크는 #hero 섹션과 매핑
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
     9. WORKS FILTER (jQuery)
  ────────────────────────────────────────── */
  $('.filter-btn').on('click', function () {
    const filter = $(this).data('filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.work-item').removeClass('hide');
      // AOS re-init for newly shown items
      setTimeout(function () { AOS.refresh(); }, 50);
      return;
    }

    $('.work-item').each(function () {
      if ($(this).data('category') === filter) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });

    setTimeout(function () { AOS.refresh(); }, 50);
  });


  /* ──────────────────────────────────────────
     10. TOP BUTTON
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
     11. CONTACT FORM SUBMIT (Mock)
  ────────────────────────────────────────── */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    const btn = $(this).find('[type="submit"]');
    const originalHtml = btn.html();

    btn.html('<i class="fa-solid fa-spinner fa-spin"></i> 전송 중...').prop('disabled', true);

    // 실제 서버 연동 전 Mock 딜레이
    setTimeout(function () {
      btn.html('<i class="fa-solid fa-check"></i> 전송 완료!');
      gsap.to('#contactForm', {
        y: -4,
        duration: .2,
        yoyo: true,
        repeat: 1,
      });

      setTimeout(function () {
        btn.html(originalHtml).prop('disabled', false);
        $('#contactForm')[0].reset();
      }, 2500);
    }, 1500);
  });


  /* ──────────────────────────────────────────
     12. GSAP · SECTION TITLE UNDERLINE
         (텍스트 아래 라인 슬라이드 인)
  ────────────────────────────────────────── */
  gsap.utils.toArray('.section-title h2').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });


  /* ──────────────────────────────────────────
     13. SKILL CARDS STAGGER (GSAP)
  ────────────────────────────────────────── */
  gsap.from('.skill-card', {
    opacity: 0,
    y: 50,
    stagger: .1,
    duration: .7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.skills-cards',
      start: 'top 80%',
      once: true,
    },
  });


  /* ──────────────────────────────────────────
     14. WORKS ITEMS STAGGER (GSAP)
  ────────────────────────────────────────── */
  gsap.from('.work-item', {
    opacity: 0,
    y: 60,
    stagger: .12,
    duration: .8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.works-grid',
      start: 'top 80%',
      once: true,
    },
  });


  /* ──────────────────────────────────────────
     15. FULL-PAGE SNAP SCROLL + WORKS 가로 캐러셀
  ────────────────────────────────────────── */
  const $snapSections = $('section, footer');
  const worksIndex    = $snapSections.index($('#works')[0]);
  let snapLocked      = false;

  function calcSnapIndex() {
    const scrollY = $(window).scrollTop();
    let idx = 0;
    $snapSections.each(function (i) {
      if (scrollY >= $(this).offset().top - 10) idx = i;
    });
    return idx;
  }

  let snapIndex = calcSnapIndex();

  // 뒤로 가기 등으로 돌아왔을 때 snapIndex 재동기화
  window.addEventListener('pageshow', function () {
    snapIndex = calcSnapIndex();
  });

  // ── 프로젝트 캐러셀 ──
  const $projectList  = $('.project-list');
  const $projectItems = $('.project-item');
  const PROJECT_COUNT = $projectItems.length;
  let projectIndex    = 0;

  // 도트 생성
  const $dots = $('<div class="project-dots"></div>');
  for (let i = 0; i < PROJECT_COUNT; i++) {
    $dots.append('<span class="project-dot' + (i === 0 ? ' active' : '') + '"></span>');
  }
  $projectList.after($dots);

  function updateDots(idx) {
    $('.project-dot').removeClass('active').eq(idx).addClass('active');
  }

  function scrollProject(idx) {
    snapLocked = true;
    projectIndex = idx;
    const w = $('#works .container').width();
    gsap.to($projectList[0], {
      x: -(idx * w),
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: function () {
        setTimeout(function () { snapLocked = false; }, 200);
      },
    });
    updateDots(idx);
  }

  const isMobile = () => window.innerWidth <= 768;

  // ── 섹션 스냅 ──
  function snapTo(index) {
    if (snapLocked) return;
    if (index < 0) index = 0;
    if (index >= $snapSections.length) index = $snapSections.length - 1;
    if (index === snapIndex) return;

    // works 진입 시 첫 번째 프로젝트부터
    if (index === worksIndex) {
      projectIndex = 0;
      gsap.set($projectList[0], { x: 0 });
      updateDots(0);
    }

    snapLocked = true;
    snapIndex = index;
    const target = $snapSections.eq(index).offset().top;
    $('html, body').animate({ scrollTop: target }, 900, 'swing', function () {
      setTimeout(function () { snapLocked = false; }, 300);
    });
  }

  // ── 방향 처리 공통 함수 ──
  function handleDir(dir) {
    if (snapLocked) return;

    if (snapIndex === worksIndex) {
      if (dir > 0 && projectIndex < PROJECT_COUNT - 1) {
        scrollProject(projectIndex + 1);
        return;
      }
      if (dir < 0 && projectIndex > 0) {
        scrollProject(projectIndex - 1);
        return;
      }
    }
    snapTo(snapIndex + dir);
  }

  // 휠
  window.addEventListener('wheel', function (e) {
    if (isMobile()) return;
    e.preventDefault();
    handleDir(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  // 터치 (모바일 스냅 비활성 — 자연 스크롤 유지)
  let touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (isMobile()) return;
    if (snapLocked) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 40) return;
    handleDir(diff > 0 ? 1 : -1);
  }, { passive: true });

  // 키보드 (↑↓, PageUp/Down, Space)
  $(window).on('keydown.snap', function (e) {
    if (isMobile()) return;
    if ([40, 34, 32].includes(e.which)) { e.preventDefault(); handleDir(1); }
    if ([38, 33].includes(e.which))     { e.preventDefault(); handleDir(-1); }
  });

  // 도트 클릭으로 직접 이동
  $(document).on('click', '.project-dot', function () {
    if (isMobile() || snapLocked || snapIndex !== worksIndex) return;
    const idx = $(this).index();
    if (idx !== projectIndex) scrollProject(idx);
  });

  // 모바일에서 캐러셀 X 위치 리셋 + 도트 숨김
  function handleResize() {
    if (isMobile()) {
      gsap.set($projectList[0], { x: 0 });
      $('.project-dots').hide();
    } else {
      $('.project-dots').show();
    }
  }
  $(window).on('resize', handleResize);
  handleResize();

}); // end $(function)
