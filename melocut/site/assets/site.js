(() => {
  const cfg = window.MELOCUT_CONFIG || {};

  // One address only: send www visitors to melocut.com (the server-side redirect rule does this too).
  if (location.hostname === 'www.melocut.com') { location.replace(`https://melocut.com${location.pathname}${location.search}${location.hash}`); return; }

  // Mobile menu
  const top = document.querySelector('.top');
  document.querySelector('.menu-btn')?.addEventListener('click', () => top.classList.toggle('open'));
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // Ads. The AdSense script itself is in every page's <head> (needed for site verification
  // and Auto ads). The fixed ad boxes only switch on for ad units that have an id in config.js,
  // so the page never shows empty "Advertisement" boxes.
  if (cfg.adsenseClient) {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(cfg.adsenseClient)}`;
      document.head.appendChild(s);
    }
    document.querySelectorAll('.ad[data-slot]').forEach((box) => {
      const slot = cfg.adSlots?.[box.dataset.slot];
      if (!slot) return;
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.dataset.adClient = cfg.adsenseClient;
      ins.dataset.adSlot = slot;
      ins.dataset.adFormat = 'auto';
      ins.dataset.fullWidthResponsive = 'true';
      box.classList.add('on');
      box.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  // Offline support + "install as an app".
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
  let installEvent = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installEvent = e;
    document.documentElement.classList.add('can-install', 'can-native-install');
  });
  document.querySelectorAll('.install-btn').forEach((b) => b.addEventListener('click', async (e) => {
    if (!installEvent) return; // no native prompt (e.g. iPhone): the link opens the install guide
    e.preventDefault();
    installEvent.prompt();
    await installEvent.userChoice.catch(() => {});
    installEvent = null;
    document.documentElement.classList.remove('can-install', 'can-native-install');
  }));
  // iPhone/iPad Safari has no install prompt, so always show the guide link there.
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone) document.documentElement.classList.add('can-install');

  // Analytics (privacy-friendly, optional)
  if (cfg.umamiWebsiteId) {
    const s = document.createElement('script');
    s.defer = true;
    s.dataset.websiteId = cfg.umamiWebsiteId;
    s.src = 'https://cloud.umami.is/script.js';
    document.head.appendChild(s);
  }
  if (cfg.plausibleDomain) {
    const s = document.createElement('script');
    s.defer = true;
    s.dataset.domain = cfg.plausibleDomain;
    s.src = 'https://plausible.io/js/script.tagged-events.js';
    document.head.appendChild(s);
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
  }
})();
