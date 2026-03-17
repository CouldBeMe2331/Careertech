    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
        document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });

        var page = document.getElementById(pageId);
        page.classList.add('active');
        var navEl = document.getElementById('nav-' + pageId);
        if (navEl) navEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Animate page banner
        var banner = page.querySelector('.page-banner');
        if (banner) {
            ['.page-banner-label', '.page-banner-title', '.page-banner-rule'].forEach(function(sel) {
                var el = banner.querySelector(sel);
                if (!el) return;
                el.classList.remove('is-visible');
                void el.offsetWidth; // force reflow
                el.classList.add('is-visible');
            });
        }

        // Stagger fade-in for content cards
        var items = Array.from(page.querySelectorAll('.fade-item'));
        items.forEach(function(el) {
            el.classList.remove('is-visible');
        });
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                items.forEach(function(el, i) {
                    el.style.transitionDelay = (i * 0.06) + 's';
                    el.classList.add('is-visible');
                });
            });
        });
    }

    window.onload = function () { showPage('home'); };
